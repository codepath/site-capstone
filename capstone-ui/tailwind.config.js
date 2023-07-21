/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./**/*.jsx",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['IBM Plex Sans', 'sans-serif'],
            },
        },
    },
    plugins: [],
}
