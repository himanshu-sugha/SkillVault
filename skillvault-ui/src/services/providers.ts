/**
 * Midnight Network Provider Setup
 * 
 * Simplified version that gracefully handles when MidnightJS packages aren't fully available.
 */

import '../types/midnight.d';

// State tracking
let isInitialized = false;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let cachedProviders: any = null;

/**
 * Check if Lace wallet is installed and available
 */
export function isLaceWalletAvailable(): boolean {
    return typeof window !== 'undefined' &&
        window.midnight?.mnLace !== undefined;
}

/**
 * Setup providers for Midnight Network interaction
 * This is a simplified version that will be expanded when Compact compiler is available
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function setupProviders(): Promise<any> {
    // Return cached providers if already initialized
    if (isInitialized && cachedProviders) {
        return cachedProviders;
    }

    // Check for Lace wallet
    const wallet = window.midnight?.mnLace;
    if (!wallet) {
        throw new Error(
            "Lace Beta Wallet not detected. Please install Lace wallet and enable Midnight Network support."
        );
    }

    try {
        // Enable wallet and get API
        const walletAPI = await wallet.enable();
        const walletState = await walletAPI.state();
        const uris = await wallet.serviceUriConfig();

        // Basic providers object - will be expanded with full SDK when available
        cachedProviders = {
            wallet: walletAPI,
            walletState,
            uris,
            // Wallet provider interface
            walletProvider: {
                coinPublicKey: walletState.coinPublicKey,
                encryptionPublicKey: walletState.encryptionPublicKey,
                balanceTx: (tx: unknown, newCoins: unknown) => walletAPI.balanceAndProveTransaction(tx, newCoins),
            },
            // Midnight provider interface  
            midnightProvider: {
                submitTx: (tx: unknown) => walletAPI.submitTransaction(tx),
            },
        };

        isInitialized = true;
        console.log('[SkillVault] Midnight providers initialized');

        return cachedProviders;
    } catch (error) {
        console.error('[SkillVault] Failed to setup providers:', error);
        throw error;
    }
}

/**
 * Reset providers
 */
export function resetProviders(): void {
    isInitialized = false;
    cachedProviders = null;
}

/**
 * Get wallet address if connected
 */
export async function getWalletAddress(): Promise<string | null> {
    try {
        const wallet = window.midnight?.mnLace;
        if (!wallet) return null;

        const walletAPI = await wallet.enable();
        const state = await walletAPI.state();
        return state.coinPublicKey;
    } catch {
        return null;
    }
}
