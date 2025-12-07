import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
    server: {
        port: 5173,
        open: true,
    },
    build: {
        rollupOptions: {
            // Externalize packages that have native dependencies
            external: [
                '@midnight-ntwrk/midnight-js-level-private-state-provider',
            ],
        },
    },
    // Handle packages that might not be available
    optimizeDeps: {
        exclude: [
            '@midnight-ntwrk/midnight-js-level-private-state-provider',
        ],
    },
})

