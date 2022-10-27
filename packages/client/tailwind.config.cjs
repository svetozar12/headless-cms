/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                transparent: 'transparent',
                mainPurple: '#5d55f9',
                textPurple: "#4b46a1",
                offBlack: "#0c0c0c",
                mainBlack: '#000000',
                inputBlack: "#171719"
            },
            borderColor: {
                mainPurple: '#5d55f9',
            }
        },
    },
    plugins: [],
};
