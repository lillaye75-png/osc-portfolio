"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, XCircle, Info, X } from "lucide-react";
import { cn } from "@/lib/utils";

const iconMap = {
  success: CheckCircle,
  error: XCircle,
  info: Info,
};

const styles = {
  success:
    "bg-green-50 dark:bg-green-950 border-green-500 text-green-800 dark:text-green-200",
  error: "bg-red-50 dark:bg-red-950 border-red-500 text-red-800 dark:text-red-200",
  info: "bg-blue-50 dark:bg-blue-950 border-blue-500 text-blue-800 dark:text-blue-200",
};

type ToastData = {
  id: string;
  message: string;
  type: "success" | "error" | "info";
};

type ToastProps = ToastData & {
  onDismiss: (id: string) => void;
};

function Toast({ id, message, type, onDismiss }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => onDismiss(id), 4000);
    return () => clearTimeout(timer);
  }, [id, onDismiss]);

  const Icon = iconMap[type];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -10, scale: 0.95 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className={cn(
        "flex items-center gap-3 rounded-lg border px-4 py-3 shadow-lg",
        "fixed bottom-4 right-4 z-50 max-w-sm",
        "sm:bottom-4 sm:right-4 sm:top-auto",
        "top-4 left-1/2 -translate-x-1/2 sm:translate-x-0",
        styles[type],
      )}
      role="alert"
    >
      <Icon className="h-5 w-5 shrink-0" />
      <p className="flex-1 text-sm font-medium">{message}</p>
      <button
        onClick={() => onDismiss(id)}
        className="shrink-0 opacity-60 hover:opacity-100 transition-opacity"
        aria-label="Dismiss"
      >
        <X className="h-4 w-4" />
      </button>
    </motion.div>
  );
}

type ToastContainerProps = {
  toasts: ToastData[];
  onDismiss: (id: string) => void;
};

function ToastContainer({ toasts, onDismiss }: ToastContainerProps) {
  return (
    <AnimatePresence mode="popLayout">
      {toasts.map((toast) => (
        <Toast key={toast.id} {...toast} onDismiss={onDismiss} />
      ))}
    </AnimatePresence>
  );
}

export { ToastContainer, Toast };
export type { ToastData };
