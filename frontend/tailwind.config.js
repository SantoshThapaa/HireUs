// tailwind.config.js
export default {
	content: [
		'./src/**/*.{js,jsx,ts,tsx}', // Adjust the paths as needed
	],
	theme: {
		extend: {
			boxShadow: {
				custom: '0 10px 15px -3px #4273a1, 0 4px 6px -2px rgba(66, 115, 161, 0.5)',
			},
			colors: {
				border: '#e5e7eb',
				background: '#ffffff',
				foreground: '#000000',
				muted: {
					foreground: 'rgba(0, 0, 0, 0.45)', // Adjust this to your desired muted color
				},
			},
		},
	},
	plugins: [],
}
