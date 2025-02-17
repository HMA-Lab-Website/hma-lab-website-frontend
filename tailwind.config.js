/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,jsx}"],
    theme: {
        extend: {
            colors: {
                iron: "#cfd5d8",
                firefly: "#0e2634",
                nevada: "#63767d",
                regent: "#7e979f",
                casal: "#366170",
                "san-juan": "#2b4f5d",
                gothic: "#6b8b9c",
                "limed-spruce": "#304147",
                background: "#f5f7f8",
            },
        },
    },
    plugins: [],
};
