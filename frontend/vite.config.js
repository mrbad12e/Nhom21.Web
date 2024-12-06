import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
    plugins: [react()],
    css: {
        postcss: './postcss.config.js', // Add this line
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
            '@components': path.resolve(__dirname, './src/components'),
            '@hooks': path.resolve(__dirname, './src/hooks'),
            '@pages': path.resolve(__dirname, './src/pages'),
            '@utils': path.resolve(__dirname, './src/utils'),
        },
        extensions: ['.js', '.jsx'], // Add file extensions to resolve
    },
    esbuild: {
        loader: 'jsx',
        include: /src\/.*\.[jt]sx?$/, // Updated regex to include ts and tsx files
        exclude: [],
    },
    optimizeDeps: {
        esbuildOptions: {
            loader: {
                '.js': 'jsx',                
                '.jsx': 'jsx',
            },
        },
    },
});
