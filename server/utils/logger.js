/**
 * Centralized Enterprise Logger
 * Wraps console logs with ANSI color sequences for structured local development
 * and formats properly for CI/CD environments.
 */

const colors = {
  reset: "\x1b[0m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  blue: "\x1b[36m",
  red: "\x1b[31m",
  dim: "\x1b[2m",
};

const logger = {
  info: (msg) => console.log(`${colors.blue}[INFO]${colors.reset} ${msg}`),
  success: (msg) => console.log(`${colors.green}[SUCCESS]${colors.reset} ${msg}`),
  warn: (msg) => console.log(`${colors.yellow}[WARN]${colors.reset} ${msg}`),
  error: (msg, err) => {
    console.error(`${colors.red}[ERROR]${colors.reset} ${msg}`);
    if (err && err.stack) console.error(`${colors.dim}${err.stack}${colors.reset}`);
    else if (err) console.error(err);
  },
  
  startup: (config) => {
    const box = `
═══════════════════════════════════════
 CyberSearch Backend v${config.version || '1.0'}
 Environment : ${config.env}
 Database    : ${config.dbStatus}
 Migrations  : ${config.migrations}
 Port        : ${config.port}
 Node Version: ${process.version}
 Started At  : ${new Date().toISOString()}
═══════════════════════════════════════
    `;
    console.log(`${colors.blue}${box}${colors.reset}`);
  }
};

module.exports = logger;
