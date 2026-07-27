import { motion } from 'framer-motion';
import { FiCheckCircle, FiAlertCircle, FiInfo, FiX } from 'react-icons/fi';

const iconMap = {
  success: <FiCheckCircle className="w-5 h-5 text-green-400" />,
  error: <FiAlertCircle className="w-5 h-5 text-red-400" />,
  info: <FiInfo className="w-5 h-5 text-primary" />,
};

const bgMap = {
  success: 'bg-green-500/10 border-green-500/20',
  error: 'bg-red-500/10 border-red-500/20',
  info: 'bg-primary/10 border-primary/20',
};

const Notification = ({ id, type = 'info', message, onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
      layout
      className={`pointer-events-auto flex items-center justify-between w-full max-w-sm p-4 rounded-lg shadow-lg border backdrop-blur-md ${bgMap[type]}`}
    >
      <div className="flex items-center gap-3">
        {iconMap[type]}
        <p className="text-sm font-medium text-text-main">{message}</p>
      </div>
      <button onClick={() => onClose(id)} className="p-1 ml-4 rounded-md text-text-muted hover:text-text-main hover:bg-surface transition-colors">
        <FiX className="w-4 h-4" />
      </button>
    </motion.div>
  );
};

export default Notification;
