import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface ZKCircuitVisualizerProps {
    isGenerating: boolean;
    onComplete?: () => void;
}

export function ZKCircuitVisualizer({ isGenerating, onComplete }: ZKCircuitVisualizerProps) {
    const [progress, setProgress] = useState(0);
    const [currentPhase, setCurrentPhase] = useState('');

    const phases = ['Loading...', 'Computing...', 'Committing...', 'Proving...', 'Verifying...'];

    useEffect(() => {
        if (!isGenerating) {
            setProgress(0);
            setCurrentPhase('');
            return;
        }

        let step = 0;
        const interval = setInterval(() => {
            step += 1;
            const newProgress = Math.min(step * 5, 100);
            setProgress(newProgress);
            const phaseIndex = Math.min(Math.floor(step / 4), phases.length - 1);
            setCurrentPhase(phases[phaseIndex]);

            if (newProgress >= 100) {
                clearInterval(interval);
                onComplete?.();
            }
        }, 100);

        return () => clearInterval(interval);
    }, [isGenerating, onComplete]);

    if (!isGenerating && progress === 0) return null;

    return (
        <div style={{ maxWidth: '400px', margin: '0 auto' }}>
            {/* Compact Circuit */}
            <div className="relative mb-4" style={{ height: '120px' }}>
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
                    style={{
                        position: 'absolute',
                        inset: 0,
                        border: '2px solid rgba(102, 126, 234, 0.3)',
                        borderRadius: '50%',
                        borderTopColor: '#667eea',
                    }}
                />
                <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                    style={{
                        position: 'absolute',
                        inset: '15px',
                        border: '2px solid rgba(118, 75, 162, 0.3)',
                        borderRadius: '50%',
                        borderRightColor: '#764ba2',
                    }}
                />
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                    style={{
                        position: 'absolute',
                        inset: '30px',
                        border: '2px solid rgba(240, 147, 251, 0.3)',
                        borderRadius: '50%',
                        borderBottomColor: '#f093fb',
                    }}
                />
                <div
                    className="flex-center"
                    style={{
                        position: 'absolute',
                        inset: '45px',
                        background: 'radial-gradient(circle, rgba(102, 126, 234, 0.2) 0%, transparent 70%)',
                        borderRadius: '50%',
                    }}
                >
                    <div className="text-center">
                        <div className="font-mono text-xs opacity-60">ZK</div>
                        <div className="font-bold">{progress}%</div>
                    </div>
                </div>
            </div>

            {/* Progress Bar */}
            <div className="rounded-full overflow-hidden mb-2" style={{ height: '6px', background: 'rgba(255,255,255,0.1)' }}>
                <motion.div
                    animate={{ width: `${progress}%` }}
                    className="h-full"
                    style={{ background: 'linear-gradient(90deg, #667eea, #764ba2, #f093fb)' }}
                />
            </div>

            <div className="text-center text-xs font-mono opacity-60">{currentPhase}</div>
        </div>
    );
}
