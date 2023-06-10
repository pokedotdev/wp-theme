import * as fs from 'node:fs/promises'
import { defineConfig, type UserConfig } from 'vite'

const config: UserConfig = {
	publicDir: 'dist',
	base: './',
	build: {
		assetsDir: '',
		emptyOutDir: true,
		manifest: true,
		outDir: 'dist',
		rollupOptions: {
			input: ['src/main.ts', 'src/main.css'],
		},
	},
	server: {
		open: false,
		port: 8081,
		strictPort: true,
		host: true,
	},
	plugins: [
		{
			name: 'php',
			handleHotUpdate({ file, server }) {
				if (file.endsWith('.php')) {
					server.ws.send({ type: 'full-reload', path: '*' })
				}
			},
		},
	],
}

// declare environment variables Vite
let started = false
export default defineConfig(async ({ command }) => {
	if (!started) {
		const isDev = command === 'serve'
		const file = `<?php global $VITE_DEV; $VITE_DEV = ${isDev}; ?>`
		await fs.writeFile('env.php', file, 'utf-8')
		started = true
	}
	return config
})
