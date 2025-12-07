import confetti from 'canvas-confetti';

// Big confetti - for Demo page proof success
export function fireConfetti() {
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#667eea', '#764ba2', '#f093fb', '#51cf66', '#4facfe'],
    });

    setTimeout(() => {
        confetti({
            particleCount: 50,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
            colors: ['#667eea', '#764ba2', '#f093fb'],
        });
    }, 150);

    setTimeout(() => {
        confetti({
            particleCount: 50,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
            colors: ['#51cf66', '#4facfe', '#ffd43b'],
        });
    }, 300);
}

// Small confetti - for Vault and Jobs success
export function fireSmallConfetti() {
    confetti({
        particleCount: 30,
        spread: 50,
        origin: { y: 0.7 },
        colors: ['#667eea', '#51cf66'],
        gravity: 1.2,
        scalar: 0.8,
    });
}
