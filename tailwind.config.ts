import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./client/src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      fontSize: {
        'xs': ['12px', { lineHeight: '1.4', letterSpacing: '0.01em' }],
        'sm': ['14px', { lineHeight: '1.5', letterSpacing: '0.01em' }],
        'base': ['16px', { lineHeight: '1.6', letterSpacing: '0' }],
        'lg': ['18px', { lineHeight: '1.6', letterSpacing: '0' }],
        'xl': ['21px', { lineHeight: '1.5', letterSpacing: '-0.01em' }],
        '2xl': ['28px', { lineHeight: '1.4', letterSpacing: '-0.02em' }],
        '3xl': ['37px', { lineHeight: '1.3', letterSpacing: '-0.02em' }],
        '4xl': ['49px', { lineHeight: '1.2', letterSpacing: '-0.03em' }],
        '5xl': ['65px', { lineHeight: '1.1', letterSpacing: '-0.03em' }],
      },
      spacing: {
        '0': '0px',
        '1': '8px',
        '2': '16px',
        '3': '24px',
        '4': '32px',
        '5': '40px',
        '6': '48px',
        '7': '56px',
        '8': '64px',
        '9': '72px',
        '10': '80px',
      },
      borderWidth: {
        DEFAULT: '1px',
        '0': '0px',
        '2': '2px',
        '3': '3px',
        '4': '4px',
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      transitionDuration: {
        'fast': '100ms',
        'normal': '150ms',
        'slow': '300ms',
      },
      keyframes: {
        'collapsible-down': {
          from: { height: '0', opacity: '0' },
          to: { height: 'var(--radix-collapsible-content-height)', opacity: '1' },
        },
        'collapsible-up': {
          from: { height: 'var(--radix-collapsible-content-height)', opacity: '1' },
          to: { height: '0', opacity: '0' },
        },
      },
      animation: {
        'collapsible-down': 'collapsible-down 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        'collapsible-up': 'collapsible-up 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
