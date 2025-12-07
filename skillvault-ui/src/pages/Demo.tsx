import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Shield, Eye, Lock, ArrowRight, RotateCcw, Check, ArrowLeft } from 'lucide-react';
import { ZKCircuitVisualizer } from '../components/ZKCircuitVisualizer';
import { ZKTooltip } from '../components/ZKTooltip';
import { fireConfetti } from '../utils/confetti';
import { useToast } from '../components/Toast';

export function Demo() {
    const [step, setStep] = useState(1);
    const [isGenerating, setIsGenerating] = useState(false);
    const { showToast } = useToast();

    const nextStep = () => setStep((s) => Math.min(s + 1, 5));
    const prevStep = () => setStep((s) => Math.max(s - 1, 1));
    const restart = () => {
        setStep(1);
        setIsGenerating(false);
    };

    const handleGenerateProof = () => {
        setIsGenerating(true);
    };

    const handleProofComplete = () => {
        setIsGenerating(false);
        fireConfetti(); // 🎉 Celebration!
        showToast('success', 'ZK Proof Generated!', 'Your credentials were verified without revealing private data.');
        setTimeout(() => nextStep(), 500);
    };

    const stepContent = [
        { icon: Eye, iconBg: 'rgba(255, 107, 107, 0.2)', iconColor: '#ff6b6b', title: 'The Problem', subtitle: 'Resumes expose everything to everyone.' },
        { icon: Lock, iconBg: 'rgba(118, 75, 162, 0.2)', iconColor: '#764ba2', title: 'Your Private Vault', subtitle: 'Credentials encrypted on Midnight. Only you have the keys.' },
        { icon: Shield, iconBg: 'rgba(79, 172, 254, 0.2)', iconColor: '#4facfe', title: 'Job Requirements', subtitle: 'React ≥ Level 7, Experience ≥ 5 years' },
        { icon: Shield, iconBg: 'rgba(255, 212, 59, 0.2)', iconColor: '#ffd43b', title: 'Generating Proof', subtitle: 'ZK circuit computing...' },
        { icon: Check, iconBg: 'rgba(81, 207, 102, 1)', iconColor: '#fff', title: 'Verified!', subtitle: 'Employer sees qualification, not details.' },
    ];

    const current = stepContent[step - 1];

    return (
        <div style={{ paddingTop: '120px', paddingBottom: '32px', minHeight: '100vh' }}>
            <div className="container" style={{ maxWidth: '800px' }}>
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center mb-4">
                    <h2 style={{ fontSize: '1.75rem', marginBottom: '4px' }}>Interactive Demo</h2>
                    <p className="text-sm opacity-70">Experience Zero-Knowledge Proofs<ZKTooltip /></p>
                </motion.div>

                {/* Main Card - Compact */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="card overflow-hidden"
                    style={{ padding: 0 }}
                >
                    {/* Progress Bar */}
                    <div className="flex">
                        {[1, 2, 3, 4, 5].map((s) => (
                            <div
                                key={s}
                                style={{
                                    flex: 1,
                                    height: '3px',
                                    background: s <= step ? 'linear-gradient(90deg, #667eea, #764ba2)' : 'rgba(255, 255, 255, 0.1)',
                                    transition: 'background 0.3s',
                                }}
                            />
                        ))}
                    </div>

                    {/* Step Numbers - Compact */}
                    <div className="flex-between px-4 py-2 border-b" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
                        {stepContent.map((_, i) => (
                            <div
                                key={i}
                                className="flex-center rounded-full text-xs font-semibold"
                                style={{
                                    width: '24px',
                                    height: '24px',
                                    background: i + 1 <= step ? 'var(--gradient-primary)' : 'rgba(255,255,255,0.1)',
                                    opacity: i + 1 === step ? 1 : 0.5,
                                }}
                            >
                                {i + 1}
                            </div>
                        ))}
                    </div>

                    {/* Content Area - Compact */}
                    <div className="p-6" style={{ minHeight: '320px' }}>
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={step}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.2 }}
                                className="text-center"
                            >
                                {/* Icon - Smaller */}
                                {step !== 4 && (
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        className="flex-center mx-auto mb-4 rounded-full"
                                        style={{
                                            width: step === 5 ? '64px' : '56px',
                                            height: step === 5 ? '64px' : '56px',
                                            background: current.iconBg,
                                            boxShadow: step === 5 ? '0 0 30px rgba(81, 207, 102, 0.5)' : 'none',
                                        }}
                                    >
                                        <current.icon size={step === 5 ? 32 : 28} color={current.iconColor} />
                                    </motion.div>
                                )}

                                <h3 style={{ fontSize: '1.25rem', color: step === 5 ? '#51cf66' : 'white', marginBottom: '4px' }}>
                                    {current.title}
                                </h3>
                                <p className="text-sm opacity-70 mb-4">{current.subtitle}</p>

                                {/* Step Content - Compact */}
                                {step === 1 && (
                                    <div className="glass rounded-lg p-4 text-left text-sm" style={{ maxWidth: '320px', margin: '0 auto' }}>
                                        {['Employer: Google', 'Salary: $145,000', 'Location: New York', 'Years: 7.5'].map((item, i) => (
                                            <div key={i} className="flex items-center gap-2 py-1" style={{ color: '#ff6b6b' }}>
                                                <Eye size={14} /> <span>{item}</span>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {step === 2 && (
                                    <div className="card text-sm" style={{ maxWidth: '320px', margin: '0 auto', background: 'rgba(0,0,0,0.4)', borderColor: 'rgba(118, 75, 162, 0.3)', padding: '16px' }}>
                                        <div className="flex-between mb-3 pb-2 border-b" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
                                            <span className="font-mono text-xs opacity-50">ID: 0x8f3a...2c4d</span>
                                            <Lock size={12} className="opacity-50" />
                                        </div>
                                        <div style={{ filter: 'blur(5px)', userSelect: 'none' }}>
                                            <div className="mb-2 rounded" style={{ height: '12px', background: 'rgba(255,255,255,0.1)', width: '75%' }} />
                                            <div className="mb-2 rounded" style={{ height: '12px', background: 'rgba(255,255,255,0.1)', width: '55%' }} />
                                            <div className="rounded" style={{ height: '12px', background: 'rgba(255,255,255,0.1)', width: '85%' }} />
                                        </div>
                                        <div className="text-center mt-3 font-mono text-xs" style={{ color: '#764ba2' }}>🔒 ENCRYPTED</div>
                                    </div>
                                )}

                                {step === 3 && (
                                    <div className="glass rounded-lg p-4 text-sm" style={{ maxWidth: '320px', margin: '0 auto', border: '1px dashed rgba(255,255,255,0.2)' }}>
                                        {[
                                            { label: 'Skill', value: 'React', icon: '💻' },
                                            { label: 'Level', value: '7+', icon: '📊' },
                                            { label: 'Years', value: '5+', icon: '⏱️' },
                                        ].map((req, i) => (
                                            <div key={i} className="flex-between py-2 border-b" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
                                                <span className="flex items-center gap-2"><span>{req.icon}</span> {req.label}</span>
                                                <span className="font-semibold">{req.value}</span>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {step === 4 && (
                                    <div style={{ transform: 'scale(0.8)', transformOrigin: 'center' }}>
                                        <ZKCircuitVisualizer isGenerating={isGenerating} onComplete={handleProofComplete} />
                                    </div>
                                )}

                                {step === 5 && (
                                    <div className="grid grid-2 gap-4 text-sm" style={{ maxWidth: '500px', margin: '0 auto' }}>
                                        <div className="glass p-4 rounded-lg text-left" style={{ borderColor: 'rgba(81, 207, 102, 0.3)' }}>
                                            <div className="text-xs text-success uppercase mb-2">✓ Visible</div>
                                            {['Qualified: YES', 'Verified: YES', 'Valid: YES'].map((item, i) => (
                                                <div key={i} className="flex items-center gap-2 py-1">
                                                    <Check size={12} className="text-success" /> {item}
                                                </div>
                                            ))}
                                        </div>
                                        <div className="glass p-4 rounded-lg text-left" style={{ borderColor: 'rgba(118, 75, 162, 0.3)' }}>
                                            <div className="text-xs uppercase mb-2" style={{ color: '#764ba2' }}>🔒 Hidden</div>
                                            {['Level: 9/10', 'Employer', 'Salary'].map((item, i) => (
                                                <div key={i} className="flex items-center gap-2 py-1 opacity-60">
                                                    <Lock size={12} /> {item}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Footer - Compact */}
                    <div className="flex-between p-4 border-t" style={{ borderColor: 'rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.2)' }}>
                        <button
                            onClick={prevStep}
                            disabled={step === 1 || isGenerating}
                            className="btn btn-secondary btn-sm"
                            style={{ visibility: step === 1 ? 'hidden' : 'visible' }}
                        >
                            <ArrowLeft size={16} /> Back
                        </button>

                        {step === 4 ? (
                            <button onClick={handleGenerateProof} disabled={isGenerating} className="btn btn-primary btn-sm">
                                {isGenerating ? <><span className="spinner" /> Generating...</> : <><Shield size={16} /> Generate</>}
                            </button>
                        ) : step === 5 ? (
                            <button onClick={restart} className="btn btn-secondary btn-sm">
                                <RotateCcw size={16} /> Restart
                            </button>
                        ) : (
                            <button onClick={nextStep} className="btn btn-primary btn-sm">
                                Next <ArrowRight size={16} />
                            </button>
                        )}
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
