import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiBell, FiCheck, FiSettings, FiInbox } from 'react-icons/fi';
import { useClickOutside } from '../../hooks/useClickOutside';

// Mock notifications (normally fetched from an API/context)
const MOCK_NOTIFS = [
  { id: 1, title: 'New tool added', desc: 'Bloodhound has been added to the Active Directory category.', time: '2h ago', read: false },
  { id: 2, title: 'System Update', desc: 'Maintenance scheduled for tonight at 2 AM UTC.', time: '1d ago', read: true },
];

function NotificationMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState(MOCK_NOTIFS);
  const menuRef = useRef(null);

  useClickOutside(menuRef, () => setIsOpen(false));

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  return (
    <div ref={menuRef} className="relative z-50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-text-muted hover:text-primary transition-colors bg-surface rounded-full border border-border hover:border-primary/50"
      >
        <FiBell className="w-5 h-5" />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 transform translate-x-1/4 -translate-y-1/4 w-4 h-4 bg-red-500 rounded-full border-2 border-background text-[9px] font-bold text-white flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full right-0 mt-2 w-80 bg-background/95 backdrop-blur-xl border border-border shadow-2xl rounded-xl overflow-hidden origin-top-right"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-border/50">
              <h3 className="font-semibold text-text-main text-sm">Notifications</h3>
              <div className="flex items-center gap-2">
                {unreadCount > 0 && (
                  <button onClick={markAllRead} className="text-primary hover:text-primary/80 transition-colors" title="Mark all as read">
                    <FiCheck className="w-4 h-4" />
                  </button>
                )}
                <button className="text-text-muted hover:text-text-main transition-colors" title="Notification Settings">
                  <FiSettings className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* List */}
            <div className="max-h-[300px] overflow-y-auto no-scrollbar">
              {notifications.length > 0 ? (
                <div className="flex flex-col">
                  {notifications.map((notif) => (
                    <div
                      key={notif.id}
                      className={`flex gap-3 px-4 py-3 border-b border-border/30 last:border-0 hover:bg-surface/50 transition-colors ${
                        notif.read ? 'opacity-70' : 'bg-primary/5'
                      }`}
                    >
                      <div className={`mt-0.5 w-2 h-2 rounded-full flex-shrink-0 ${notif.read ? 'bg-transparent' : 'bg-primary shadow-glow-sm'}`} />
                      <div>
                        <p className="text-sm font-semibold text-text-main">{notif.title}</p>
                        <p className="text-xs text-text-muted mt-0.5 leading-relaxed">{notif.desc}</p>
                        <p className="text-[10px] text-text-muted/70 mt-1.5 font-medium">{notif.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-8 text-center px-4">
                  <div className="w-12 h-12 rounded-full bg-surface/50 flex items-center justify-center mb-3">
                    <FiInbox className="w-5 h-5 text-text-muted" />
                  </div>
                  <p className="text-sm font-medium text-text-main">No notifications yet</p>
                  <p className="text-xs text-text-muted mt-1">When you get notifications, they'll show up here.</p>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-2 border-t border-border/50">
              <button className="w-full py-2 text-xs font-semibold text-text-main hover:text-primary bg-surface/50 hover:bg-surface rounded-lg transition-colors">
                View All Activity
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default NotificationMenu;
