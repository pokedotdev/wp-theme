import type { Config } from 'tailwindcss'

export default {
	darkMode: 'class',
	content: ['./*.php', './templates/**/*.php', './src/**/*.{ts,js,css}'],
	theme: {},
	plugins: [],
} satisfies Config
