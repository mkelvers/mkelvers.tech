import { defineConfig } from 'vite'
import { paraglideVitePlugin } from '@inlang/paraglide-js'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        paraglideVitePlugin({
            project: './project.inlang',
            outdir: './src/paraglide',
            emitTsDeclarations: true,
        }),
        svelte(),
        tailwindcss(),
    ],
    preview: {
        allowedHosts: ['mkelvers.tech'],
    },
})
