import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";
import colors from "tailwindcss/colors";

const config = {
  darkMode: ["class"],
  content: ["./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    extend: {
      boxShadow: {
        "big-red-btn": `inset 0 3px 0 0 ${colors.rose[300]}, inset 0 -9px 0 0 ${colors.rose[700]}, 0 24px 48px -16px #120662`,
        "red-btn": `inset 0 3px 0 0 ${colors.rose[300]}, inset 0 -5px 0 0 ${colors.rose[700]}`,
        "yellow-btn": `inset 0 3px 0 0 ${colors.yellow[200]}, inset 0 -5px 0 0 ${colors.amber[500]}`,
      },
      backgroundImage: {
        "blue-gradient": `linear-gradient(${colors.blue[400]}, ${colors.blue[600]});`,
        "yellow-gradient": `linear-gradient(${colors.amber[300]}, ${colors.amber[500]});`,
        star: `radial-gradient(circle at center, #ffffffb3 0, #ffffffb3 10%, #ffffff00 50%), url("@/assets/bg_star.png"), linear-gradient(${colors.blue[400]}, ${colors.blue[600]})`,
      },
      backgroundPosition: { star: `center center` },
      backgroundSize: { star: "cover" },
      fontFamily: {
        sans: ["Prompt", "sans-serif"],
        mono: ["Montserrat", "monospace"],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        drawer: "50% 24px",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      height: {
        fill: "100vh",
      },
    },
  },
  plugins: [animate],
} satisfies Config;

export default config;
