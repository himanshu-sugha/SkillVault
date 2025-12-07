import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

interface AnimatedCounterProps {
    value: string;
    duration?: number;
}

export function AnimatedCounter({ value, duration = 2000 }: AnimatedCounterProps) {
    const ref = useRef<HTMLSpanElement>(null);
    const isInView = useInView(ref, { once: true });
    const [displayValue, setDisplayValue] = useState('0');

    // Extract numeric part and suffix
    const numericMatch = value.match(/^([\d.]+)(.*)$/);
    const targetNumber = numericMatch ? parseFloat(numericMatch[1]) : 0;
    const suffix = numericMatch ? numericMatch[2] : value;

    useEffect(() => {
        if (!isInView) return;

        const startTime = Date.now();
        const isFloat = value.includes('.');

        const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Easing function (ease out)
            const eased = 1 - Math.pow(1 - progress, 3);

            const current = targetNumber * eased;

            if (isFloat) {
                setDisplayValue(current.toFixed(1));
            } else {
                setDisplayValue(Math.floor(current).toString());
            }

            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                setDisplayValue(numericMatch ? numericMatch[1] : value);
            }
        };

        requestAnimationFrame(animate);
    }, [isInView, targetNumber, duration, value, numericMatch]);

    // Handle non-numeric values
    if (!numericMatch) {
        return (
            <motion.span
                ref={ref}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5 }}
            >
                {value}
            </motion.span>
        );
    }

    return (
        <span ref={ref}>
            {displayValue}{suffix}
        </span>
    );
}
