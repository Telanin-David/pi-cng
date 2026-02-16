import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        bg: "hsl(var(--bg))",
        fg: "hsl(var(--fg))",
        muted: "hsl(var(--muted))",
        "muted-fg": "hsl(var(--muted-fg))",
    
        card: "hsl(var(--card))",
        "card-2": "hsl(var(--card-2))",
    
        border: "hsl(var(--border))",

        brand: {
          50: "hsl(var(--brand-50))",
          100: "hsl(var(--brand-100))",
          200: "hsl(var(--brand-200))",
          300: "hsl(var(--brand-300))",
          400: "hsl(var(--brand-400))",
          DEFAULT: "hsl(var(--brand))",
          600: "hsl(var(--brand-600))",
          700: "hsl(var(--brand-700))",
          800: "hsl(var(--brand-800))",
          900: "hsl(var(--brand-900))",
          fg: "hsl(var(--brand-fg))",
        },

        accent: {
          50: "hsl(var(--accent-50))",
          100: "hsl(var(--accent-100))",
          200: "hsl(var(--accent-200))",
          300: "hsl(var(--accent-300))",
          400: "hsl(var(--accent-400))",
          DEFAULT: "hsl(var(--accent))",
          600: "hsl(var(--accent-600))",
          700: "hsl(var(--accent-700))",
          800: "hsl(var(--accent-800))",
          900: "hsl(var(--accent-900))",
          fg: "hsl(var(--accent-fg))",
        },
      },

      borderRadius: {
        sm: "var(--radius-sm)",
        md: "var(--radius-md)",
        lg: "var(--radius-lg)",
        xl: "var(--radius-xl)",
      },

      boxShadow: {
        soft: "var(--shadow-soft)",
        lift: "var(--shadow-lift)",
      },

      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      
      fontSize: {
        display: ["clamp(2.25rem, 4vw, 3.5rem)", { lineHeight: "1.05", letterSpacing: "-0.02em" }],
        h1: ["clamp(1.9rem, 3vw, 2.75rem)", { lineHeight: "1.12", letterSpacing: "-0.02em" }],
        h2: ["clamp(1.5rem, 2.2vw, 2rem)", { lineHeight: "1.18", letterSpacing: "-0.015em" }],
        h3: ["clamp(1.25rem, 1.5vw, 1.5rem)", { lineHeight: "1.25" }],
        h4: ["1.125rem", { lineHeight: "1.35" }],
        body: ["1rem", { lineHeight: "1.75" }],
        small: ["0.875rem", { lineHeight: "1.6" }],
        caption: ["0.8125rem", { lineHeight: "1.4" }],
      },

      


      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-up": "fade-up var(--dur-3) var(--ease-out) both",
      },

      typography: (theme: any) => ({
        DEFAULT: {
          css: {
            color: theme("colors.fg"),
            a: { color: theme("colors.brand.DEFAULT"), fontWeight: "600" },
            "a:hover": { color: theme("colors.brand.700") },
          },
        },
      }),
    },
  },
  plugins: [typography],
} satisfies Config;
