/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./**/*.jsx",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Cairo', 'sans-serif'],
            },
        },
    },
    plugins: [],
}
