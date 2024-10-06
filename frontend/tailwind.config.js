// tailwind.config.js
export default {
	content: [
	  './src/**/*.{js,jsx,ts,tsx}', // Adjust the paths as needed
	],
	theme: {
	  extend: {
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
  