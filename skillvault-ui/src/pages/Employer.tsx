import { motion } from 'framer-motion';
import { Plus, Users, Briefcase, BarChart } from 'lucide-react';

export function Employer() {
    return (
        <div className="min-h-screen pt-28 pb-20">
            <div className="container">
                <div className="flex-between mb-12">
                    <div>
                        <h1>Employer Dashboard</h1>
                        <p className="text-gray-400">Manage job postings and verify ZK proofs</p>
                    </div>
                    <button className="btn btn-primary">
                        <Plus size={20} />
                        <span>Post New Job</span>
                    </button>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-3 mb-12">
                    {[
                        { label: 'Active Jobs', value: '4', icon: Briefcase, color: '#667eea' },
                        { label: 'Total Applicants', value: '128', icon: Users, color: '#764ba2' },
                        { label: 'Verified Proofs', value: '96', icon: BarChart, color: '#f093fb' },
                    ].map((stat, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="card"
                        >
                            <div className="flex items-center gap-4">
                                <div className="p-3 rounded-lg" style={{ background: `${stat.color}20`, color: stat.color }}>
                                    <stat.icon size={24} />
                                </div>
                                <div>
                                    <p className="text-sm opacity-60 mb-1">{stat.label}</p>
                                    <p className="text-3xl font-bold">{stat.value}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Active Jobs List */}
                <h2 className="mb-6">Active Postings</h2>
                <div className="grid gap-4">
                    {[
                        { title: 'Senior React Developer', applicants: 23, verified: 18, posted: '2d ago' },
                        { title: 'Smart Contract Engineer', applicants: 31, verified: 25, posted: '5h ago' },
                    ].map((job, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 + (i * 0.1) }}
                            className="glass p-6 rounded-xl flex-between group hover:bg-white/5 transition-colors"
                        >
                            <div>
                                <h3 className="text-xl font-bold mb-1">{job.title}</h3>
                                <p className="text-sm opacity-60">Posted {job.posted} • High Priority</p>
                            </div>
                            <div className="flex items-center gap-8">
                                <div className="text-center">
                                    <p className="text-xs opacity-60 uppercase mb-1">Applicants</p>
                                    <p className="font-bold text-xl">{job.applicants}</p>
                                </div>
                                <div className="text-center">
                                    <p className="text-xs opacity-60 uppercase mb-1">Verified</p>
                                    <p className="font-bold text-xl text-green-400">{job.verified}</p>
                                </div>
                                <button className="btn btn-secondary">Manage</button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
