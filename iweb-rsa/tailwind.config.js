/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            keyframes: {
                float: {
                    "0%": { transform: "translateY(100vh)" },
                    "100%": { transform: "translateY(-100vh)" },
                },
            },
            animation: {
                float: "float linear infinite",
            },
        },
    },
    plugins: [],
};
