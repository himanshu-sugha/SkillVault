// Type definitions for Midnight Network Lace Wallet integration
// These types extend the Window interface to include Midnight wallet

export interface MidnightWalletState {
    coinPublicKey: string;
    encryptionPublicKey: string;
}

export interface MidnightWalletAPI {
    state(): Promise<MidnightWalletState>;
    balanceAndProveTransaction(tx: unknown, newCoins: unknown): Promise<unknown>;
    submitTransaction(tx: unknown): Promise<string>;
}

export interface MidnightServiceUriConfig {
    proverServerUri: string;
    indexerUri: string;
    indexerWsUri: string;
}

export interface MidnightLaceWallet {
    enable(): Promise<MidnightWalletAPI>;
    serviceUriConfig(): Promise<MidnightServiceUriConfig>;
}

export interface MidnightWindow {
    mnLace?: MidnightLaceWallet;
}

declare global {
    interface Window {
        midnight?: MidnightWindow;
    }
}

export { };
