interface ZKTooltipProps {
    className?: string;
}

export function ZKTooltip({ className = '' }: ZKTooltipProps) {
    return (
        <span className={`tooltip-container ${className}`}>
            <span className="tooltip-trigger">?</span>
            <span className="tooltip-content">
                <span className="tooltip-title">🔐 What is Zero-Knowledge Proof?</span>
                <span className="tooltip-text">
                    A ZK proof lets you prove something is true <strong>without revealing the underlying data</strong>.
                    <br /><br />
                    <strong>Example:</strong> Prove you're over 21 without showing your birthdate.
                    <br /><br />
                    In SkillVault, you can prove you meet job requirements without exposing your exact salary, employer, or years of experience.
                </span>
            </span>
        </span>
    );
}
