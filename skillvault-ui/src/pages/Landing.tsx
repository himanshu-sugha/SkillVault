import { motion } from 'framer-motion';
import { Shield, Eye, Lock, Sparkles, ArrowRight, Github, Zap, CheckCircle, Database, Cpu, Code, Briefcase, UserCheck, FileCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ZKTooltip } from '../components/ZKTooltip';

export function Landing() {
    return (
        <div style={{ minHeight: '100vh' }}>
            {/* Hero Section - Midnight Style */}
            <section style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', paddingTop: '80px' }}>
                <div className="container">
                    <div className="text-center" style={{ maxWidth: '900px', margin: '0 auto' }}>
                        {/* Midnight Badge */}
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="badge badge-primary mb-6"
                            style={{ padding: '10px 20px' }}
                        >
                            <Shield size={14} />
                            <span>Built on Midnight Network • Rational Privacy</span>
                        </motion.div>

                        {/* Midnight-style Headline */}
                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', marginBottom: '24px', lineHeight: 1.1 }}
                        >
                            The architecture of <span className="gradient-text">professional freedom</span> is rational privacy.
                        </motion.h1>

                        {/* Subtitle */}
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            style={{ fontSize: '1.25rem', marginBottom: '40px', opacity: 0.7, maxWidth: '700px', margin: '0 auto 40px' }}
                        >
                            SkillVault uses Midnight's <strong className="gradient-text">zero-knowledge proofs</strong>
                            <ZKTooltip /> to let you prove qualifications without exposing your personal data.
                        </motion.p>

                        {/* CTA Buttons */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="flex-center gap-4 flex-wrap mb-12"
                        >
                            <Link to="/demo" className="btn btn-primary btn-lg">
                                <Zap size={20} />
                                <span>Experience ZK Proofs</span>
                            </Link>
                            <Link to="/vault" className="btn btn-secondary btn-lg">
                                <span>Launch App</span>
                                <ArrowRight size={20} />
                            </Link>
                        </motion.div>

                        {/* Visual Demo Card */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.5 }}
                            className="glass rounded-2xl p-6 animate-float"
                            style={{ maxWidth: '600px', margin: '0 auto' }}
                        >
                            <div className="grid grid-2" style={{ gap: '20px' }}>
                                <div className="p-4 rounded-xl" style={{ background: 'rgba(255, 107, 107, 0.1)', border: '1px solid rgba(255, 107, 107, 0.2)' }}>
                                    <Eye size={24} className="text-danger mb-2" />
                                    <div className="font-semibold mb-1">Traditional Resume</div>
                                    <div className="text-sm opacity-60">Employer: Google<br />Salary: $145k<br />Years: 7.5</div>
                                    <div className="text-xs text-danger mt-2">❌ Everything Exposed</div>
                                </div>
                                <div className="p-4 rounded-xl" style={{ background: 'rgba(81, 207, 102, 0.1)', border: '1px solid rgba(81, 207, 102, 0.2)' }}>
                                    <Shield size={24} className="text-success mb-2" />
                                    <div className="font-semibold mb-1">SkillVault Proof</div>
                                    <div className="text-sm opacity-60">Qualified: ✓<br />Experience: ≥5 yrs<br />Skill: Expert</div>
                                    <div className="text-xs text-success mt-2">✓ Privacy Protected</div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Midnight's "Freedom" Philosophy Section */}
            <section className="py-20" style={{ background: 'linear-gradient(180deg, rgba(102, 126, 234, 0.05) 0%, transparent 100%)' }}>
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 style={{ fontSize: '2.5rem' }}>Make <span className="gradient-text">rational privacy</span> work for you</h2>
                        <p className="opacity-70">Inspired by Midnight's vision for Web3 freedom</p>
                    </motion.div>

                    <div className="grid grid-3">
                        {[
                            {
                                icon: UserCheck,
                                title: 'Freedom of Credentials',
                                subtitle: 'Prove without revealing',
                                items: ['Verify qualifications', 'Keep salary history secret', 'Prove experience levels', 'Keep employer names private'],
                                color: '#667eea',
                            },
                            {
                                icon: Briefcase,
                                title: 'Freedom of Employment',
                                subtitle: 'Apply without exposure',
                                items: ['Submit applications privately', "Don't expose your job search", 'Show qualifications only', 'Leave no trace'],
                                color: '#764ba2',
                            },
                            {
                                icon: Shield,
                                title: 'Freedom of Control',
                                subtitle: 'Own your data',
                                items: ['Selective disclosure', 'Different proofs per job', 'Revoke access anytime', 'Data stays encrypted'],
                                color: '#f093fb',
                            },
                        ].map((category, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.15 }}
                                className="card"
                                style={{ borderTop: `3px solid ${category.color}` }}
                            >
                                <category.icon size={32} style={{ color: category.color }} className="mb-4" />
                                <h3 style={{ marginBottom: '4px' }}>{category.title}</h3>
                                <p className="text-sm opacity-60 mb-4">{category.subtitle}</p>
                                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                                    {category.items.map((item, i) => (
                                        <li key={i} className="flex items-center gap-2 py-2 text-sm opacity-80" style={{ borderBottom: i < 3 ? '1px solid rgba(255,255,255,0.05)' : 'none' }}>
                                            <CheckCircle size={14} style={{ color: category.color }} />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section className="py-20">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2>How SkillVault Works</h2>
                        <p className="opacity-70">Zero-knowledge proofs made simple</p>
                    </motion.div>

                    <div className="grid grid-3" style={{ maxWidth: '900px', margin: '0 auto' }}>
                        {[
                            { step: '01', icon: Database, title: 'Store Credentials', desc: 'Add your verified skills and experience to your encrypted vault on Midnight' },
                            { step: '02', icon: Cpu, title: 'Generate ZK Proof', desc: "Compact circuits create cryptographic proofs that verify without revealing" },
                            { step: '03', icon: CheckCircle, title: 'Apply Privately', desc: 'Employers verify you meet requirements. Your secrets stay yours.' },
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="text-center"
                            >
                                <div
                                    className="flex-center mx-auto mb-4 rounded-full"
                                    style={{
                                        width: '80px',
                                        height: '80px',
                                        background: 'var(--gradient-primary)',
                                        position: 'relative',
                                    }}
                                >
                                    <item.icon size={36} color="white" />
                                    <span
                                        className="font-bold text-xs"
                                        style={{
                                            position: 'absolute',
                                            top: '-4px',
                                            right: '-4px',
                                            background: 'linear-gradient(135deg, #667eea, #764ba2)',
                                            padding: '6px 10px',
                                            borderRadius: '999px',
                                            border: '2px solid var(--dark-800)',
                                        }}
                                    >
                                        {item.step}
                                    </span>
                                </div>
                                <h3 style={{ marginBottom: '8px' }}>{item.title}</h3>
                                <p className="text-sm opacity-60" style={{ maxWidth: '250px', margin: '0 auto' }}>{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Midnight Technology Stack */}
            <section className="py-20" style={{ background: 'rgba(0,0,0,0.4)' }}>
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2>Powered by <span className="gradient-text">Midnight</span></h2>
                        <p className="opacity-70">Built with cutting-edge privacy technology</p>
                    </motion.div>

                    <div className="grid grid-4" style={{ maxWidth: '900px', margin: '0 auto' }}>
                        {[
                            { name: 'Midnight', desc: 'Network', icon: Shield, detail: '4th-gen blockchain' },
                            { name: 'Compact', desc: 'Language', icon: Code, detail: 'TypeScript-based' },
                            { name: 'MidnightJS', desc: 'SDK', icon: Zap, detail: 'Developer tools' },
                            { name: 'ZK Proofs', desc: 'Privacy', icon: Lock, detail: 'Zero-knowledge' },
                        ].map((tech, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                whileHover={{ scale: 1.05, y: -5 }}
                                className="card text-center"
                                style={{ padding: '24px' }}
                            >
                                <div
                                    className="flex-center mx-auto mb-3 rounded-lg"
                                    style={{ width: '48px', height: '48px', background: 'var(--gradient-primary)' }}
                                >
                                    <tech.icon size={24} color="white" />
                                </div>
                                <div className="font-bold">{tech.name}</div>
                                <div className="text-xs opacity-50">{tech.desc}</div>
                                <div className="text-xs text-primary mt-2">{tech.detail}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Privacy Comparison */}
            <section className="py-20">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2>What Stays <span className="gradient-text">Private</span></h2>
                        <p className="opacity-70">Verify the truth without exposing personal data</p>
                    </motion.div>

                    <div className="grid grid-2" style={{ maxWidth: '800px', margin: '0 auto', gap: '24px' }}>
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="card"
                            style={{ borderLeft: '4px solid #ff6b6b' }}
                        >
                            <div className="flex items-center gap-2 mb-4">
                                <Lock size={20} className="text-danger" />
                                <h3 style={{ marginBottom: 0, fontSize: '1.1rem' }}>Hidden from Employers</h3>
                            </div>
                            {['Current employer name', 'Exact salary figures', 'Precise years worked', 'Specific skill scores', 'Project details'].map((item, i) => (
                                <div key={i} className="flex items-center gap-2 py-2 text-sm" style={{ opacity: 0.7 }}>
                                    <span className="text-danger">✗</span> {item}
                                </div>
                            ))}
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="card"
                            style={{ borderLeft: '4px solid #51cf66' }}
                        >
                            <div className="flex items-center gap-2 mb-4">
                                <Shield size={20} className="text-success" />
                                <h3 style={{ marginBottom: 0, fontSize: '1.1rem' }}>What Gets Verified</h3>
                            </div>
                            {['Meets requirements: TRUE', 'Experience level: Sufficient', 'Skill proficiency: Qualified', 'Proof timestamp: Valid', 'Issuer: Verified'].map((item, i) => (
                                <div key={i} className="flex items-center gap-2 py-2 text-sm text-success">
                                    <CheckCircle size={14} /> {item}
                                </div>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="rounded-2xl p-12 text-center"
                        style={{
                            maxWidth: '800px',
                            margin: '0 auto',
                            background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.15) 0%, rgba(118, 75, 162, 0.15) 100%)',
                            border: '1px solid rgba(102, 126, 234, 0.3)',
                        }}
                    >
                        <Sparkles size={40} className="text-primary mx-auto mb-4" />
                        <h2 style={{ marginBottom: '12px' }}>Ready for Rational Privacy?</h2>
                        <p className="opacity-70 mb-8">Experience the future of professional credentials</p>
                        <div className="flex-center gap-4 flex-wrap">
                            <Link to="/demo" className="btn btn-primary btn-lg">
                                <Zap size={20} />
                                <span>Try Live Demo</span>
                            </Link>
                            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="btn btn-secondary btn-lg">
                                <Github size={20} />
                                <span>View on GitHub</span>
                            </a>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-12 border-t" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
                <div className="container text-center">
                    <div className="flex-center gap-3 mb-4">
                        <Shield size={24} className="text-primary" />
                        <span className="font-bold text-lg">SkillVault</span>
                    </div>
                    <p className="opacity-60 mb-2">Built with ❤️ for Midnight Summit Hackathon 2025</p>
                    <p className="opacity-40 text-sm mb-6">Powered by Midnight Network • Apache 2.0 License</p>
                    <div className="flex-center gap-8">
                        <a href="https://midnight.network" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm opacity-60 hover:opacity-100" style={{ textDecoration: 'none', color: 'white' }}>
                            <Shield size={14} /> Midnight Network
                        </a>
                        <a href="https://docs.midnight.network" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm opacity-60 hover:opacity-100" style={{ textDecoration: 'none', color: 'white' }}>
                            <FileCheck size={14} /> Developer Docs
                        </a>
                        <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm opacity-60 hover:opacity-100" style={{ textDecoration: 'none', color: 'white' }}>
                            <Github size={14} /> GitHub
                        </a>
                    </div>
                </div>
            </footer>
        </div>
    );
}
