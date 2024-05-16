/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        fontFamily: {
            sans: [
                'Pretendard Variable',
                'Pretendard',
                '-apple-system',
                'BlinkMacSystemFont',
                'system-ui',
                'Roboto',
                'Helvetica Neue',
                'Segoe UI',
                'Apple SD Gothic Neo',
                'Noto Sans KR',
                'Malgun Gothic',
                'Apple Color Emoji',
                'Segoe UI Emoji',
                'Segoe UI Symbol',
                'sans-serif',
            ],
        },
        extend: {
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic':
                    'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
            },
            keyframes: {
                'cursor-blink': {
                    '0%, 100%': { borderColor: 'transparent' },
                    '50%': { borderColor: 'currentColor' },
                }
            },
        },
    },
    plugins: [],
}
