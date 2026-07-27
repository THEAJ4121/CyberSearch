import React from 'react';
import { motion } from 'framer-motion';

export const Skeleton = ({ className, ...props }) => {
  return (
    <motion.div
      initial={{ opacity: 0.5 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
      className={`bg-surface border border-border/50 rounded-md ${className}`}
      {...props}
    />
  );
};

export const CardSkeleton = () => (
  <div className="glass-panel p-5 flex flex-col gap-4">
    <div className="flex items-start gap-4">
      <Skeleton className="w-12 h-12 rounded-lg" />
      <div className="flex-1 space-y-2 py-1">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-1/2" />
      </div>
    </div>
    <div className="space-y-2 mt-2">
      <Skeleton className="h-3 w-full" />
      <Skeleton className="h-3 w-4/5" />
    </div>
    <div className="flex gap-2 mt-2">
      <Skeleton className="w-16 h-6 rounded-full" />
      <Skeleton className="w-16 h-6 rounded-full" />
    </div>
  </div>
);
