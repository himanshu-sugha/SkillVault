import { motion } from 'framer-motion';
import { Briefcase, MapPin, DollarSign, Clock, Shield, Check, TrendingUp, Lock, Sparkles, X } from 'lucide-react';
import { useState } from 'react';
import { midnightService } from '../services/MidnightService';
import { useToast } from '../components/Toast';
import { fireSmallConfetti } from '../utils/confetti';

interface Job {
    id: number;
    title: string;
    company: string;
    confidential: boolean;
    location: string;
    salary: string;
    match: number;
    requirements: { skill: string; level: number; years: number };
    posted: string;
    applicants: number;
    meetsRequirements: boolean; // New field
}

export function JobMarketplace() {
    const { showToast } = useToast();
    const [activeTab, setActiveTab] = useState('all');
    const [applyingTo, setApplyingTo] = useState<number | null>(null);
    const [appliedJobs, setAppliedJobs] = useState<number[]>([]);
    const [rejectedJobs, setRejectedJobs] = useState<number[]>([]);
    const [applyStep, setApplyStep] = useState<string>('');

    const jobs: Job[] = [
        { id: 1, title: 'Senior React Developer', company: 'Stealth Startup', confidential: true, location: 'Remote', salary: '$150k - $190k', match: 95, requirements: { skill: 'React', level: 7, years: 5 }, posted: '2h ago', applicants: 23, meetsRequirements: true },
        { id: 2, title: 'Principal Architect', company: 'TechGiant', confidential: false, location: 'New York', salary: '$250k - $350k', match: 45, requirements: { skill: 'System Design', level: 10, years: 15 }, posted: '1d ago', applicants: 8, meetsRequirements: false }, // Will FAIL - Demo rejection
        { id: 3, title: 'Smart Contract Engineer', company: 'Midnight Protocol', confidential: true, location: 'Remote', salary: '$170k - $230k', match: 92, requirements: { skill: 'Compact', level: 8, years: 4 }, posted: '5h ago', applicants: 18, meetsRequirements: true },
        { id: 4, title: 'UI/UX Designer', company: 'DesignFlow', confidential: false, location: 'San Francisco', salary: '$110k - $140k', match: 88, requirements: { skill: 'Design', level: 6, years: 3 }, posted: '1d ago', applicants: 47, meetsRequirements: true },
    ];

    const filteredJobs = activeTab === 'all' ? jobs :
        activeTab === 'high-match' ? jobs.filter(j => j.match >= 90) :
            activeTab === 'remote' ? jobs.filter(j => j.location === 'Remote') : jobs;

    const handleApply = async (job: Job) => {
        setApplyingTo(job.id);

        // Step 1: Loading credentials
        setApplyStep('Loading credentials...');
        await new Promise(resolve => setTimeout(resolve, 800));

        // Step 2: Generating proof
        setApplyStep('Generating ZK proof...');
        await midnightService.generateSkillProof({
            credentialId: 1,
            requirements: { minSkillLevel: job.requirements.level, minYears: job.requirements.years, minSalary: 0 },
            revealCategory: true
        });

        // Step 3: Verifying
        setApplyStep('Verifying...');
        await new Promise(resolve => setTimeout(resolve, 500));

        setApplyingTo(null);
        setApplyStep('');

        if (job.meetsRequirements) {
            setAppliedJobs([...appliedJobs, job.id]);
            fireSmallConfetti();
            showToast('success', 'Applied Successfully', 'Your ZK proof was verified');
        } else {
            setRejectedJobs([...rejectedJobs, job.id]);
            showToast('error', 'Requirements Not Met', 'ZK proof failed: insufficient experience');
        }
    };

    const getMatchStyle = (match: number) => {
        if (match >= 90) return { bg: 'rgba(81, 207, 102, 0.15)', border: 'rgba(81, 207, 102, 0.3)', color: '#51cf66' };
        if (match >= 80) return { bg: 'rgba(79, 172, 254, 0.15)', border: 'rgba(79, 172, 254, 0.3)', color: '#4facfe' };
        if (match >= 50) return { bg: 'rgba(255, 212, 59, 0.15)', border: 'rgba(255, 212, 59, 0.3)', color: '#ffd43b' };
        return { bg: 'rgba(255, 107, 107, 0.15)', border: 'rgba(255, 107, 107, 0.3)', color: '#ff6b6b' };
    };

    return (
        <div style={{ paddingTop: '120px', paddingBottom: '60px', minHeight: '100vh' }}>
            <div className="container">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-8"
                >
                    <div className="badge badge-primary mb-4">
                        <Sparkles size={14} />
                        <span>ZK-Powered Hiring</span>
                    </div>
                    <h1 className="flex-center gap-3">
                        <Briefcase size={40} className="text-primary" />
                        Job Marketplace
                    </h1>
                    <p className="opacity-70">Apply with zero-knowledge proofs. Your identity stays private until you choose to reveal it.</p>
                </motion.div>

                {/* Filter Tabs */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="flex-center gap-2 mb-8 flex-wrap"
                >
                    {[
                        { id: 'all', label: 'All Jobs' },
                        { id: 'high-match', label: '90%+ Match' },
                        { id: 'remote', label: 'Remote Only' },
                    ].map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`btn btn-sm ${activeTab === tab.id ? 'btn-primary' : 'btn-secondary'}`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </motion.div>

                {/* Jobs Grid */}
                <div className="grid grid-2">
                    {filteredJobs.map((job, index) => {
                        const matchStyle = getMatchStyle(job.match);
                        const isApplied = appliedJobs.includes(job.id);
                        const isRejected = rejectedJobs.includes(job.id);
                        const isApplying = applyingTo === job.id;

                        return (
                            <motion.div
                                key={job.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 + index * 0.1 }}
                                whileHover={{ y: -4 }}
                                className="card"
                                style={{ padding: '28px' }}
                            >
                                {/* Header */}
                                <div className="flex-between mb-4">
                                    <div style={{ flex: 1 }}>
                                        <h3 style={{ fontSize: '1.25rem', marginBottom: '4px' }}>{job.title}</h3>
                                        <div className="flex items-center gap-2 text-sm opacity-60">
                                            {job.confidential ? (
                                                <>
                                                    <Lock size={14} className="text-success" />
                                                    <span>Confidential Company</span>
                                                </>
                                            ) : (
                                                <span>{job.company}</span>
                                            )}
                                        </div>
                                    </div>
                                    <div
                                        className="flex items-center gap-1 px-3 py-1 rounded-full text-sm font-semibold"
                                        style={{
                                            background: matchStyle.bg,
                                            border: `1px solid ${matchStyle.border}`,
                                            color: matchStyle.color,
                                        }}
                                    >
                                        <TrendingUp size={14} />
                                        <span>{job.match}%</span>
                                    </div>
                                </div>

                                {/* Details */}
                                <div className="flex gap-4 mb-6 flex-wrap text-sm opacity-70">
                                    <div className="flex items-center gap-1">
                                        <MapPin size={14} />
                                        <span>{job.location}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <DollarSign size={14} />
                                        <span>{job.salary}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Clock size={14} />
                                        <span>{job.posted}</span>
                                    </div>
                                </div>

                                {/* Requirements */}
                                <div
                                    className="rounded-lg p-4 mb-6"
                                    style={{ background: 'rgba(0,0,0,0.3)' }}
                                >
                                    <div className="text-xs opacity-50 uppercase tracking-wide mb-2">ZK Proof Required</div>
                                    <div className="flex-between">
                                        <span className="font-semibold">{job.requirements.skill}</span>
                                        <span className="text-sm opacity-70">
                                            Level {job.requirements.level}+ • {job.requirements.years}y+
                                        </span>
                                    </div>
                                </div>

                                {/* Apply Button - 3 states: Applied, Rejected, or Apply */}
                                {isApplied ? (
                                    <button className="btn btn-success w-full" style={{ justifyContent: 'center' }} disabled>
                                        <Check size={18} />
                                        <span>Applied Successfully</span>
                                    </button>
                                ) : isRejected ? (
                                    <button className="btn w-full" style={{ justifyContent: 'center', background: 'rgba(255,107,107,0.2)', border: '1px solid rgba(255,107,107,0.4)', color: '#ff6b6b' }} disabled>
                                        <X size={18} />
                                        <span>Requirements Not Met</span>
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => handleApply(job)}
                                        disabled={isApplying}
                                        className="btn btn-primary w-full"
                                        style={{ justifyContent: 'center' }}
                                    >
                                        {isApplying ? (
                                            <>
                                                <span className="spinner" />
                                                <span>{applyStep}</span>
                                            </>
                                        ) : (
                                            <>
                                                <Shield size={18} />
                                                <span>Apply Privately</span>
                                            </>
                                        )}
                                    </button>
                                )}
                            </motion.div>
                        );
                    })}
                </div>

                {/* How It Works */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="glass rounded-xl p-8 mt-12"
                    style={{ maxWidth: '800px', margin: '48px auto 0' }}
                >
                    <h3 className="text-center mb-8">How ZK Applications Work</h3>
                    <div className="grid grid-3">
                        {[
                            { step: '1', title: 'Browse', desc: 'Find jobs matching your skills' },
                            { step: '2', title: 'Generate Proof', desc: 'ZK circuit verifies your credentials' },
                            { step: '3', title: 'Apply Privately', desc: 'Employer sees qualification, not details' },
                        ].map((item, i) => (
                            <div key={i} className="text-center">
                                <div
                                    className="flex-center mx-auto mb-3 rounded-full font-bold"
                                    style={{
                                        width: '48px',
                                        height: '48px',
                                        background: 'var(--gradient-primary)',
                                    }}
                                >
                                    {item.step}
                                </div>
                                <h4 style={{ fontSize: '1rem', marginBottom: '4px' }}>{item.title}</h4>
                                <p className="text-sm opacity-60">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
