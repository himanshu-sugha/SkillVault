import { Link, useLocation } from 'react-router-dom';
import { Shield, Wallet, Menu, X, Home, Lock, Briefcase, Zap, Lightbulb } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { midnightService } from '../services/MidnightService';

export function Navbar() {
    const location = useLocation();
    const [isConnected, setIsConnected] = useState(false);
    const [walletAddress, setWalletAddress] = useState<string | null>(null);
    const [connectionMode, setConnectionMode] = useState<'real' | 'demo'>('demo');
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isConnecting, setIsConnecting] = useState(false);

    const navItems = [
        { path: '/', label: 'Home', icon: Home },
        { path: '/demo', label: 'Demo', icon: Zap },
        { path: '/use-cases', label: 'Use Cases', icon: Lightbulb },
        { path: '/jobs', label: 'Jobs', icon: Briefcase },
        { path: '/vault', label: 'Vault', icon: Lock },
    ];

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleConnect = async () => {
        if (isConnected) {
            await midnightService.disconnect();
            setIsConnected(false);
            setWalletAddress(null);
            setConnectionMode('demo');
            return;
        }

        setIsConnecting(true);
        try {
            const state = await midnightService.connectWallet();
            setIsConnected(state.isConnected);
            setWalletAddress(state.address);
            setConnectionMode(state.mode);
        } catch (error) {
            console.error('Connection failed:', error);
        }
        setIsConnecting(false);
    };

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ type: 'spring', stiffness: 100, damping: 20 }}
            className={`navbar ${isScrolled ? 'scrolled' : ''}`}
        >
            <div className="container">
                <div className="navbar-content">
                    {/* Logo */}
                    <Link to="/" className="navbar-logo" aria-label="SkillVault Home">
                        <div className="logo-icon">
                            <Shield size={24} color="white" />
                        </div>
                        <span className="logo-text gradient-text">SkillVault</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="nav-links">
                        {navItems.map((item) => {
                            const Icon = item.icon;
                            return (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
                                    aria-current={location.pathname === item.path ? 'page' : undefined}
                                >
                                    <Icon size={18} />
                                    <span>{item.label}</span>
                                </Link>
                            );
                        })}
                    </div>

                    {/* Actions */}
                    <div className="nav-actions">
                        {isConnected && (
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                {/* Mode Badge */}
                                <div
                                    style={{
                                        background: connectionMode === 'real'
                                            ? 'rgba(168, 85, 247, 0.15)'
                                            : 'rgba(251, 191, 36, 0.15)',
                                        border: `1px solid ${connectionMode === 'real'
                                            ? 'rgba(168, 85, 247, 0.4)'
                                            : 'rgba(251, 191, 36, 0.4)'}`,
                                        color: connectionMode === 'real' ? '#a855f7' : '#fbbf24',
                                        padding: '0.25rem 0.5rem',
                                        borderRadius: '9999px',
                                        fontSize: '0.65rem',
                                        fontWeight: 600,
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.05em',
                                    }}
                                >
                                    {connectionMode === 'real' ? '🔗 Lace' : '🎮 Demo'}
                                </div>
                                {/* Wallet Address */}
                                <div
                                    className="font-mono text-xs px-3 py-1 rounded-full"
                                    style={{
                                        background: 'rgba(81, 207, 102, 0.15)',
                                        border: '1px solid rgba(81, 207, 102, 0.3)',
                                        color: '#51cf66'
                                    }}
                                >
                                    {walletAddress || '0x...'}
                                </div>
                            </div>
                        )}
                        <button
                            onClick={handleConnect}
                            disabled={isConnecting}
                            className={`btn ${isConnected ? 'btn-success' : 'btn-primary'} btn-sm`}
                            aria-label={isConnected ? 'Wallet connected' : 'Connect wallet'}
                        >
                            {isConnecting ? (
                                <>
                                    <span className="spinner" />
                                    <span>Connecting...</span>
                                </>
                            ) : (
                                <>
                                    <Wallet size={18} />
                                    <span>{isConnected ? 'Connected' : 'Connect'}</span>
                                </>
                            )}
                        </button>

                        {/* Mobile Menu Button */}
                        <button
                            className="mobile-menu-btn"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
                            aria-expanded={isMobileMenuOpen}
                        >
                            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {isMobileMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="mobile-nav"
                        >
                            {navItems.map((item) => {
                                const Icon = item.icon;
                                return (
                                    <Link
                                        key={item.path}
                                        to={item.path}
                                        className={`mobile-nav-link ${location.pathname === item.path ? 'active' : ''}`}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        <Icon size={20} />
                                        <span>{item.label}</span>
                                    </Link>
                                );
                            })}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.nav>
    );
}
