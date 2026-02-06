import type { Config } from 'tailwindcss';
import plugin from 'tailwindcss/plugin';

const config: Config = {
  content: ['./src/pages/**/*.{js,ts,jsx,tsx,mdx}', './src/components/**/*.{js,ts,jsx,tsx,mdx}', './src/app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        violet: 'rgb(var(--violet) / <alpha-value>)',
        pink: 'rgb(var(--pink) / <alpha-value>)',
        blue: 'rgb(var(--blue) / <alpha-value>)',
        cyan: 'rgb(var(--cyan) / <alpha-value>)',
        orange: 'rgb(var(--orange) / <alpha-value>)',
        ink: 'rgb(var(--ink) / <alpha-value>)',
        paper: 'rgb(var(--paper) / <alpha-value>)',
        glass: 'rgb(var(--glass) / <alpha-value>)',
        glassBorder: 'rgb(var(--glassBorder) / <alpha-value>)'
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem'
      },
      boxShadow: {
        glow: '0 0 40px rgb(var(--pink) / 0.35)'
      }
    }
  },
  plugins: [
    plugin(({ addUtilities }) => {
      addUtilities({
        '.bg-canvas': {
          background:
            'radial-gradient(circle at 20% 20%, rgb(var(--blue) / 0.35), transparent 45%), radial-gradient(circle at 80% 0%, rgb(var(--cyan) / 0.25), transparent 40%), linear-gradient(135deg, rgb(var(--violet)), rgb(90 70 199) 70%)'
        },
        '.bg-noise': {
          backgroundImage: 'radial-gradient(rgba(255,255,255,0.08) 0.5px, transparent 0.5px)',
          backgroundSize: '4px 4px'
        },
        '.card-glass': {
          backgroundColor: 'rgb(var(--glass) / 0.12)',
          border: '1px solid rgb(var(--glassBorder) / 0.28)',
          backdropFilter: 'blur(14px)'
        }
      });
    })
  ]
};

export default config;
