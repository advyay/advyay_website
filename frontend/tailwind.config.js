/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  darkMode: "class",
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: "1.25rem", md: "2rem", lg: "2.5rem" },
      screens: { "2xl": "1320px" }
    },
    extend: {
      colors: {
        // Brand palette — see docs/design-system/colors.md
        ink: {
          DEFAULT: "#0A0B0F",      // true near-black canvas
          900: "#0A0B0F",
          800: "#0E1117",
          700: "#14181F",
          600: "#1B2029"
        },
        graphite: {
          DEFAULT: "#21262E",
          400: "#3A4150",
          300: "#5A6478"
        },
        // Off-white text hierarchy
        paper: {
          DEFAULT: "#F5F6F8",
          50: "#FFFFFF",
          100: "#F5F6F8",
          200: "#D7DAE0",
          300: "#9CA3AF"
        },
        // Accent — singular, intentional
        accent: {
          DEFAULT: "#7CFF6B",      // electric-green / agentic glow
          50: "#E9FFE3",
          100: "#C9FFB5",
          400: "#A6FF8C",
          500: "#7CFF6B",
          600: "#56E64A"
        },
        // Secondary signal
        signal: {
          DEFAULT: "#A6B1FF",      // cool indigo for subtle structure
          500: "#A6B1FF",
          600: "#8A98F2"
        },
        // Semantic
        critical: "#FF5C7A",
        warning: "#FFB454",
        success: "#7CFF6B"
      },
      fontFamily: {
        // Variable fonts loaded in app/layout.tsx
        sans: ['"Inter Variable"', "Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ['"Söhne"', '"Inter Variable"', "Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ['"JetBrains Mono"', "ui-monospace", "SFMono-Regular", "monospace"]
      },
      fontSize: {
        // Modular type scale, 1.25 ratio. Display micro-tweaked for 1.05 optical sizing.
        "eyebrow": ["0.6875rem", { lineHeight: "1", letterSpacing: "0.18em" }],
        "micro":   ["0.75rem",   { lineHeight: "1.4" }],
        "body-sm": ["0.875rem",  { lineHeight: "1.55" }],
        "body":    ["1rem",      { lineHeight: "1.65" }],
        "body-lg": ["1.125rem",  { lineHeight: "1.6" }],
        "h6":      ["1rem",      { lineHeight: "1.4", letterSpacing: "-0.01em" }],
        "h5":      ["1.25rem",   { lineHeight: "1.3", letterSpacing: "-0.015em" }],
        "h4":      ["1.5rem",    { lineHeight: "1.25", letterSpacing: "-0.02em" }],
        "h3":      ["1.875rem",  { lineHeight: "1.2",  letterSpacing: "-0.02em" }],
        "h2":      ["2.5rem",    { lineHeight: "1.1",  letterSpacing: "-0.025em" }],
        "h1":      ["3.5rem",    { lineHeight: "1.05", letterSpacing: "-0.03em" }],
        "display": ["4.75rem",   { lineHeight: "1",    letterSpacing: "-0.035em" }]
      },
      letterSpacing: {
        tightest: "-0.035em",
        tighter:  "-0.025em"
      },
      borderRadius: {
        xs: "4px",
        sm: "6px",
        DEFAULT: "10px",
        md: "14px",
        lg: "20px",
        xl: "28px",
        "2xl": "36px"
      },
      boxShadow: {
        card: "0 1px 0 rgba(255,255,255,0.04) inset, 0 4px 24px -8px rgba(0,0,0,0.4)",
        glow: "0 0 0 1px rgba(124,255,107,0.2), 0 8px 40px -8px rgba(124,255,107,0.25)"
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        },
        "pulse-ring": {
          "0%":   { transform: "scale(0.95)", opacity: "0.6" },
          "70%":  { transform: "scale(1.4)",  opacity: "0" },
          "100%": { transform: "scale(1.4)",  opacity: "0" }
        },
        "grid-drift": {
          "0%":   { transform: "translate3d(0,0,0)" },
          "100%": { transform: "translate3d(40px,40px,0)" }
        },
        "shimmer": {
          "0%":   { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" }
        }
      },
      animation: {
        "fade-up": "fade-up 0.6s cubic-bezier(0.2,0.8,0.2,1) both",
        "pulse-ring": "pulse-ring 2.4s ease-out infinite",
        "grid-drift": "grid-drift 16s linear infinite",
        "shimmer": "shimmer 6s linear infinite"
      },
      transitionTimingFunction: {
        "enterprise": "cubic-bezier(0.2, 0.8, 0.2, 1)"
      }
    }
  },
  plugins: []
};
