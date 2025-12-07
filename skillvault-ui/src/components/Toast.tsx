import { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, AlertCircle, Info, X } from 'lucide-react';

type ToastType = 'success' | 'error' | 'warning' | 'info';

interface Toast {
    id: number;
    type: ToastType;
    title: string;
    message?: string;
}

interface ToastContextType {
    showToast: (type: ToastType, title: string, message?: string) => void;
}

const ToastContext = createContext<ToastContextType | null>(null);

export function useToast() {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within ToastProvider');
    }
    return context;
}

export function ToastProvider({ children }: { children: ReactNode }) {
    const [toasts, setToasts] = useState<Toast[]>([]);

    const showToast = useCallback((type: ToastType, title: string, message?: string) => {
        const id = Date.now();
        setToasts((prev) => [...prev, { id, type, title, message }]);
        setTimeout(() => {
            setToasts((prev) => prev.filter((t) => t.id !== id));
        }, 4000);
    }, []);

    const removeToast = (id: number) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
    };

    const getIcon = (type: ToastType) => {
        switch (type) {
            case 'success': return <CheckCircle size={20} />;
            case 'error': return <XCircle size={20} />;
            case 'warning': return <AlertCircle size={20} />;
            case 'info': return <Info size={20} />;
        }
    };

    const getColor = (type: ToastType) => {
        switch (type) {
            case 'success': return '#51cf66';
            case 'error': return '#ff6b6b';
            case 'warning': return '#ffd43b';
            case 'info': return '#4facfe';
        }
    };

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
            <div
                style={{
                    position: 'fixed',
                    bottom: '24px',
                    right: '24px',
                    zIndex: 9999,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px',
                }}
            >
                <AnimatePresence>
                    {toasts.map((toast) => (
                        <motion.div
                            key={toast.id}
                            initial={{ opacity: 0, x: 100, scale: 0.9 }}
                            animate={{ opacity: 1, x: 0, scale: 1 }}
                            exit={{ opacity: 0, x: 100, scale: 0.9 }}
                            style={{
                                background: 'rgba(20, 20, 40, 0.95)',
                                backdropFilter: 'blur(10px)',
                                border: `1px solid ${getColor(toast.type)}40`,
                                borderLeft: `4px solid ${getColor(toast.type)}`,
                                borderRadius: '12px',
                                padding: '16px 20px',
                                minWidth: '300px',
                                maxWidth: '400px',
                                boxShadow: '0 10px 40px rgba(0, 0, 0, 0.4)',
                            }}
                        >
                            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                                <span style={{ color: getColor(toast.type), flexShrink: 0 }}>
                                    {getIcon(toast.type)}
                                </span>
                                <div style={{ flex: 1 }}>
                                    <div style={{ fontWeight: 600, marginBottom: toast.message ? '4px' : 0 }}>
                                        {toast.title}
                                    </div>
                                    {toast.message && (
                                        <div style={{ fontSize: '0.875rem', opacity: 0.7 }}>{toast.message}</div>
                                    )}
                                </div>
                                <button
                                    onClick={() => removeToast(toast.id)}
                                    style={{
                                        background: 'none',
                                        border: 'none',
                                        color: 'rgba(255, 255, 255, 0.5)',
                                        cursor: 'pointer',
                                        padding: '4px',
                                    }}
                                >
                                    <X size={16} />
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </ToastContext.Provider>
    );
}
