import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Theme palette specifications
        sage: { DEFAULT: "#879B80", dark: "#6E8367", light: "#A2B59C" },
        softcream: "#F7F4EB",
        forest: { DEFAULT: "#344C3D", dark: "#24352A", soft: "#496352" },
        warmbeige: "#E8DFD0",

        // Mapping legacy tokens to new color theme palette
        terracotta: { DEFAULT: "#879B80", dark: "#6E8367" },
        sand: "#F7F4EB",
        brown: { DEFAULT: "#344C3D", soft: "#496352" },
        peach: "#E8DFD0",
        cream: "#FFFFFF",
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      keyframes: {
        rise: { from: { opacity: "0", transform: "translateY(16px)" }, to: { opacity: "1", transform: "none" } },
        "fade-in": { from: { opacity: "0" }, to: { opacity: "1" } },
        "pulse-ring": { "0%": { boxShadow: "0 0 0 0 rgba(196,119,91,.5)" }, "70%,100%": { boxShadow: "0 0 0 12px rgba(196,119,91,0)" } },
      },
      animation: {
        rise: "rise .35s ease-out both",
        "fade-in": "fade-in .25s ease-out both",
        "pulse-ring": "pulse-ring 2s ease-out infinite",
      },
    },
  },
  plugins: [],
};
export default config;
