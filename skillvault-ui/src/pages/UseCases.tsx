import { motion } from 'framer-motion';
import {
    Shield, GraduationCap, DollarSign, Award, Users, Globe,
    BarChart3, FileCheck, Lock, CheckCircle, ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface UseCase {
    id: string;
    icon: React.ElementType;
    title: string;
    description: string;
    traditional: string;
    zkWay: string;
    color: string;
}

const useCases: UseCase[] = [
    {
        id: 'education',
        icon: GraduationCap,
        title: 'Education Verification',
        description: 'Prove you have a degree without revealing your GPA, graduation year, or specific institution.',
        traditional: 'Share full transcript with GPA, courses, and dates',
        zkWay: 'Prove "I have a Bachelor\'s in CS from an accredited university"',
        color: '#8b5cf6',
    },
    {
        id: 'salary',
        icon: DollarSign,
        title: 'Salary Benchmarking',
        description: 'Prove your salary is within a range for negotiations without revealing the exact amount.',
        traditional: 'Show pay stubs or tax returns',
        zkWay: 'Prove "My salary is between $120k-$150k"',
        color: '#10b981',
    },
    {
        id: 'certification',
        icon: Award,
        title: 'Certification Proof',
        description: 'Verify professional certifications without exposing when or where you got them.',
        traditional: 'Share certificate with ID, date, issuer details',
        zkWay: 'Prove "I hold a valid AWS Solutions Architect certification"',
        color: '#f59e0b',
    },
    {
        id: 'reference',
        icon: Users,
        title: 'Reference Checks',
        description: 'Allow employers to verify your past employment without contacting your current boss.',
        traditional: 'Provide manager\'s contact info (risky!)',
        zkWay: 'Prove "I worked at a Fortune 500 company for 3+ years"',
        color: '#ec4899',
    },
    {
        id: 'work-auth',
        icon: Globe,
        title: 'Work Authorization',
        description: 'Prove you can legally work in a country without revealing visa type or nationality.',
        traditional: 'Show visa/passport with nationality exposed',
        zkWay: 'Prove "I am authorized to work in the US"',
        color: '#3b82f6',
    },
    {
        id: 'skills',
        icon: BarChart3,
        title: 'Skills Assessment',
        description: 'Prove proficiency level without revealing exact test scores or assessment details.',
        traditional: 'Share full assessment report with percentiles',
        zkWay: 'Prove "I scored in the top 10% for React skills"',
        color: '#14b8a6',
    },
];

export default function UseCases() {
    return (
        <div className="page-container">
            <section className="hero-section" style={{ paddingTop: '6rem', paddingBottom: '3rem' }}>
                <div className="container">
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        style={{ textAlign: 'center', marginBottom: '3rem' }}
                    >
                        <div style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            background: 'rgba(139, 92, 246, 0.15)',
                            border: '1px solid rgba(139, 92, 246, 0.3)',
                            padding: '0.5rem 1rem',
                            borderRadius: '9999px',
                            marginBottom: '1rem',
                        }}>
                            <Shield size={16} color="#a78bfa" />
                            <span style={{ color: '#a78bfa', fontSize: '0.85rem', fontWeight: 500 }}>
                                ZK-Powered Privacy
                            </span>
                        </div>

                        <h1 style={{
                            fontSize: '2.5rem',
                            fontWeight: 700,
                            marginBottom: '1rem',
                            background: 'linear-gradient(135deg, #fff 0%, #a78bfa 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                        }}>
                            ZK Use Cases
                        </h1>

                        <p style={{
                            fontSize: '1.1rem',
                            color: 'rgba(255,255,255,0.7)',
                            maxWidth: '600px',
                            margin: '0 auto'
                        }}>
                            Beyond job applications, Zero-Knowledge Proofs unlock privacy-preserving verification
                            for every aspect of your professional life.
                        </p>
                    </motion.div>

                    {/* Use Cases Grid */}
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
                        gap: '1.5rem',
                        marginBottom: '3rem',
                    }}>
                        {useCases.map((useCase, index) => {
                            const Icon = useCase.icon;
                            return (
                                <motion.div
                                    key={useCase.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    className="glass-card"
                                    style={{ padding: '1.5rem' }}
                                >
                                    {/* Header */}
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                                        <div style={{
                                            width: '40px',
                                            height: '40px',
                                            borderRadius: '10px',
                                            background: `${useCase.color}20`,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}>
                                            <Icon size={20} color={useCase.color} />
                                        </div>
                                        <h3 style={{ fontSize: '1.1rem', fontWeight: 600 }}>{useCase.title}</h3>
                                    </div>

                                    {/* Description */}
                                    <p style={{
                                        color: 'rgba(255,255,255,0.7)',
                                        fontSize: '0.9rem',
                                        marginBottom: '1rem',
                                        lineHeight: 1.5,
                                    }}>
                                        {useCase.description}
                                    </p>

                                    {/* Comparison */}
                                    <div style={{
                                        background: 'rgba(0,0,0,0.2)',
                                        borderRadius: '8px',
                                        padding: '1rem',
                                    }}>
                                        {/* Traditional Way */}
                                        <div style={{ marginBottom: '0.75rem' }}>
                                            <div style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '0.5rem',
                                                marginBottom: '0.25rem',
                                            }}>
                                                <span style={{ color: '#ff6b6b', fontSize: '0.75rem', fontWeight: 600 }}>
                                                    ❌ TRADITIONAL
                                                </span>
                                            </div>
                                            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.8rem' }}>
                                                {useCase.traditional}
                                            </p>
                                        </div>

                                        {/* ZK Way */}
                                        <div>
                                            <div style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '0.5rem',
                                                marginBottom: '0.25rem',
                                            }}>
                                                <span style={{ color: '#51cf66', fontSize: '0.75rem', fontWeight: 600 }}>
                                                    ✓ SKILLVAULT
                                                </span>
                                            </div>
                                            <p style={{ color: '#51cf66', fontSize: '0.8rem', fontWeight: 500 }}>
                                                {useCase.zkWay}
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>

                    {/* CTA Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.8 }}
                        className="glass-card"
                        style={{
                            padding: '2rem',
                            textAlign: 'center',
                            background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.2) 0%, rgba(79, 172, 254, 0.1) 100%)',
                        }}
                    >
                        <Lock size={32} color="#a78bfa" style={{ marginBottom: '1rem' }} />
                        <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>
                            Ready to Protect Your Privacy?
                        </h2>
                        <p style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '1.5rem' }}>
                            Try our interactive demo to see ZK proofs in action
                        </p>
                        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                            <Link to="/demo" className="btn btn-primary">
                                <FileCheck size={18} />
                                <span>Try Demo</span>
                            </Link>
                            <Link to="/vault" className="btn btn-secondary">
                                <CheckCircle size={18} />
                                <span>View Vault</span>
                                <ArrowRight size={16} />
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
