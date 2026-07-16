const fs = require('fs/promises');
const path = require('path');
const logger = require('../utils/logger');

/**
 * Custom Migration Runner
 * Executes raw SQL migrations deterministically, ensuring idempotency.
 * Note: MySQL implicitly commits on DDL statements. Real rollbacks of CREATE TABLE
 * are not possible in MySQL. We rely on IF NOT EXISTS and careful order parsing.
 */
async function runMigrations(pool) {
  logger.info('Initializing migration sequence...');
  const connection = await pool.getConnection();

  try {
    // Ensure migrations table exists (our only manual DB setup script)
    await connection.query(`
      CREATE TABLE IF NOT EXISTS schema_migrations (
        id INT AUTO_INCREMENT PRIMARY KEY,
        file_name VARCHAR(255) NOT NULL UNIQUE,
        executed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Fetch already executed migrations
    const [rows] = await connection.query('SELECT file_name FROM schema_migrations');
    const executedMigrations = new Set(rows.map((row) => row.file_name));

    // Read the migrations directory
    const migrationsDir = path.join(__dirname, 'migrations');
    let files = await fs.readdir(migrationsDir);
    // Ensure chronological execution (001... before 002...)
    files = files.filter(f => f.endsWith('.sql')).sort();

    let executedCount = 0;

    for (const file of files) {
      if (!executedMigrations.has(file)) {
        logger.info(`Applying migration: ${file}`);
        const sqlPath = path.join(migrationsDir, file);
        const sqlContent = await fs.readFile(sqlPath, 'utf8');

        // Extract individual ';' terminated statements
        const statements = sqlContent
          .split(';')
          .map((s) => s.trim())
          .filter((s) => s.length > 0);

        // Execute file queries pseudo-atomically (as best as MySQL allows with DDL)
        await connection.beginTransaction();
        try {
          for (const stmt of statements) {
            await connection.query(stmt);
          }
          // Mark as executed
          await connection.query('INSERT INTO schema_migrations (file_name) VALUES (?)', [file]);
          await connection.commit();
          logger.success(`Migration ${file} applied successfully.`);
          executedCount++;
        } catch (migrationError) {
          await connection.rollback();
          logger.error(`Migration ${file} failed. Halting deployment.`, migrationError);
          throw migrationError;
        }
      }
    }

    if (executedCount === 0) {
      logger.info('Database up-to-date. No new migrations applied.');
    }
    
    return { status: 'up_to_date', newlyApplied: executedCount };

  } catch (err) {
    logger.error('CRITICAL: Migration subsystem failure.', err);
    throw err;
  } finally {
    connection.release();
  }
}

module.exports = {
  runMigrations
};
