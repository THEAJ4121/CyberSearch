
import { motion } from 'framer-motion';
import { FiFolderMinus } from 'react-icons/fi';

const EmptyState = ({ title = 'No results found', description = 'We couldn\'t find what you were looking for.', icon: Icon = FiFolderMinus, action }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col items-center justify-center p-12 text-center glass-panel w-full"
    >
      <div className="w-16 h-16 rounded-2xl bg-surface border border-border flex items-center justify-center mb-6 shadow-glow-sm">
        <Icon className="w-8 h-8 text-primary" />
      </div>
      <h3 className="text-xl font-display font-semibold text-text-main mb-2">{title}</h3>
      <p className="text-text-muted max-w-sm mb-6">{description}</p>
      
      {action && (
        <div className="mt-2">
          {action}
        </div>
      )}
    </motion.div>
  );
};

export default EmptyState;
