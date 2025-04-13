import type { Config } from 'tailwindcss'

const config: Config = {
    darkMode: 'class',
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
    ], 
    theme : {
        container: {
            center: true,
            padding: {
                DEFAULT: '1rem', 
                md: '1.5rem', 
                lg: '2rem'
            }
        }
    },
    plugins: []
}

export default config