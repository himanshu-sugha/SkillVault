import { motion } from 'framer-motion';
import { Shield, Plus, Lock, CheckCircle, MoreVertical, Zap } from 'lucide-react';
import { useState } from 'react';
import { useToast } from '../components/Toast';
import { fireSmallConfetti } from '../utils/confetti';

interface Credential {
    id: number;
    issuer: string;
    skill: string;
    level: number;
    years: number;
    verified: boolean;
    color: string;
    issuedDate: string;
}

export function Vault() {
    const { showToast } = useToast();
    const [credentials] = useState<Credential[]>([
        { id: 1, issuer: 'TechCorp Inc.', skill: 'React Development', level: 9, years: 7, verified: true, color: '#667eea', issuedDate: '2024-06' },
        { id: 2, issuer: 'Design Academy', skill: 'UI/UX Design', level: 8, years: 5, verified: true, color: '#764ba2', issuedDate: '2024-03' },
        { id: 3, issuer: 'Blockchain Labs', skill: 'Smart Contracts', level: 9, years: 4, verified: true, color: '#f093fb', issuedDate: '2024-09' },
        { id: 4, issuer: 'Data Science Bootcamp', skill: 'Machine Learning', level: 7, years: 3, verified: false, color: '#4facfe', issuedDate: '2024-01' },
    ]);

    const [generatingProof, setGeneratingProof] = useState<number | null>(null);
    const [generatedProofs, setGeneratedProofs] = useState<number[]>([]);

    const handleGenerateProof = async (credId: number, skillName: string) => {
        setGeneratingProof(credId);
        await new Promise(resolve => setTimeout(resolve, 1500));
        setGeneratingProof(null);
        setGeneratedProofs([...generatedProofs, credId]);
        fireSmallConfetti();
        showToast('success', 'Proof Ready', `${skillName} proof generated`);
    };

    return (
        <div style={{ paddingTop: '120px', paddingBottom: '60px', minHeight: '100vh' }}>
            <div className="container">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex-between mb-8 flex-wrap gap-4"
                >
                    <div>
                        <h1 className="flex items-center gap-3">
                            <Shield className="text-primary" size={40} />
                            Your Vault
                        </h1>
                        <p className="opacity-70">Encrypted credentials stored on Midnight Network</p>
                    </div>
                    <button className="btn btn-primary">
                        <Plus size={20} />
                        <span>Add Credential</span>
                    </button>
                </motion.div>

                {/* Stats Bar */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="grid grid-4 mb-8"
                >
                    {[
                        { label: 'Total Credentials', value: credentials.length, color: '#667eea' },
                        { label: 'Verified', value: credentials.filter(c => c.verified).length, color: '#51cf66' },
                        { label: 'Pending', value: credentials.filter(c => !c.verified).length, color: '#ffd43b' },
                        { label: 'Proofs Generated', value: 12, color: '#764ba2' },
                    ].map((stat, i) => (
                        <div key={i} className="card-flat p-4 text-center">
                            <div className="text-2xl font-bold" style={{ color: stat.color }}>{stat.value}</div>
                            <div className="text-xs opacity-60 uppercase tracking-wide">{stat.label}</div>
                        </div>
                    ))}
                </motion.div>

                {/* Credentials Grid */}
                <div className="grid grid-3">
                    {credentials.map((cred, index) => {
                        const isGenerated = generatedProofs.includes(cred.id);
                        const isGenerating = generatingProof === cred.id;

                        return (
                            <motion.div
                                key={cred.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 + index * 0.1 }}
                                whileHover={{ y: -8 }}
                                className="card relative overflow-hidden"
                                style={{ padding: '28px' }}
                            >
                                {/* Accent Bar */}
                                <div
                                    style={{
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        width: '4px',
                                        height: '100%',
                                        background: cred.color,
                                    }}
                                />

                                {/* Header */}
                                <div className="flex-between mb-4">
                                    <span className={`badge ${cred.verified ? 'badge-success' : 'badge-warning'}`}>
                                        {cred.verified ? <><CheckCircle size={12} /> Verified</> : 'Pending'}
                                    </span>
                                    <button className="opacity-50 hover:opacity-100" aria-label="More options">
                                        <MoreVertical size={18} />
                                    </button>
                                </div>

                                {/* Content */}
                                <div className="mb-4">
                                    <p className="text-xs opacity-50 mb-1">Issued by {cred.issuer}</p>
                                    <h3 style={{ fontSize: '1.25rem', marginBottom: '4px' }}>{cred.skill}</h3>
                                    <p className="text-xs opacity-40">Since {cred.issuedDate}</p>
                                </div>

                                {/* Stats */}
                                <div className="grid grid-2 gap-3 mb-4">
                                    <div className="glass-dark rounded-lg p-3 text-center">
                                        <div className="text-xs opacity-50 mb-1">LEVEL</div>
                                        <div className="text-xl font-bold" style={{ color: cred.color }}>{cred.level}/10</div>
                                    </div>
                                    <div className="glass-dark rounded-lg p-3 text-center">
                                        <div className="text-xs opacity-50 mb-1">YEARS</div>
                                        <div className="text-xl font-bold" style={{ color: cred.color }}>{cred.years}y</div>
                                    </div>
                                </div>

                                {/* Generate Proof Button - Always visible */}
                                {isGenerated ? (
                                    <button className="btn btn-success w-full" style={{ justifyContent: 'center' }} disabled>
                                        <CheckCircle size={16} />
                                        <span>Proof Ready</span>
                                    </button>
                                ) : (
                                    <button
                                        className="btn btn-primary w-full"
                                        style={{ justifyContent: 'center' }}
                                        onClick={() => handleGenerateProof(cred.id, cred.skill)}
                                        disabled={isGenerating}
                                    >
                                        {isGenerating ? (
                                            <>
                                                <span className="spinner" />
                                                <span>Generating...</span>
                                            </>
                                        ) : (
                                            <>
                                                <Zap size={16} />
                                                <span>Generate ZK Proof</span>
                                            </>
                                        )}
                                    </button>
                                )}
                            </motion.div>
                        );
                    })}

                    {/* Add New Card */}
                    <motion.button
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        whileHover={{ scale: 1.02 }}
                        className="card flex-center flex-col gap-4"
                        style={{
                            minHeight: '280px',
                            border: '2px dashed rgba(255,255,255,0.2)',
                            background: 'transparent',
                            cursor: 'pointer',
                        }}
                    >
                        <div
                            className="flex-center rounded-full"
                            style={{
                                width: '64px',
                                height: '64px',
                                background: 'rgba(255,255,255,0.1)',
                            }}
                        >
                            <Plus size={28} className="opacity-60" />
                        </div>
                        <span className="opacity-60">Request New Credential</span>
                    </motion.button>
                </div>

                {/* Info Box */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="glass-dark rounded-xl p-8 mt-12 text-center"
                    style={{ maxWidth: '700px', margin: '48px auto 0' }}
                >
                    <Lock className="mx-auto mb-4 opacity-60" size={32} />
                    <h4 className="mb-2">Your Data is Encrypted</h4>
                    <p className="opacity-60 text-sm" style={{ lineHeight: 1.8 }}>
                        All credentials are stored using Midnight's zero-knowledge technology.
                        Only you can access the full details. Employers only see verified proofs.
                    </p>
                </motion.div>
            </div>
        </div>
    );
}
