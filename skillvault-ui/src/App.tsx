import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Landing } from './pages/Landing';
import { Vault } from './pages/Vault';
import { ProofBuilder } from './pages/ProofBuilder';
import { JobMarketplace } from './pages/JobMarketplace';
import { Employer } from './pages/Employer';
import { Demo } from './pages/Demo';
import UseCases from './pages/UseCases';
import { Navbar } from './components/Navbar';
import { ParticleBackground } from './components/ParticleBackground';
import { ToastProvider } from './components/Toast';

function App() {
    return (
        <ToastProvider>
            <Router>
                <ParticleBackground />
                <div className="min-h-screen relative">
                    <Navbar />
                    <main>
                        <Routes>
                            <Route path="/" element={<Landing />} />
                            <Route path="/vault" element={<Vault />} />
                            <Route path="/proof-builder" element={<ProofBuilder />} />
                            <Route path="/jobs" element={<JobMarketplace />} />
                            <Route path="/employer" element={<Employer />} />
                            <Route path="/demo" element={<Demo />} />
                            <Route path="/use-cases" element={<UseCases />} />
                        </Routes>
                    </main>
                </div>
            </Router>
        </ToastProvider>
    );
}

export default App;
