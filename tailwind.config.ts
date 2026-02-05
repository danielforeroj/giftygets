import type { Config } from 'tailwindcss';
import plugin from 'tailwindcss/plugin';

const config: Config = {
  content: ['./src/pages/**/*.{js,ts,jsx,tsx,mdx}', './src/components/**/*.{js,ts,jsx,tsx,mdx}', './src/app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        violet: 'var(--violet)',
        pink: 'var(--pink)',
        blue: 'var(--blue)',
        cyan: 'var(--cyan)',
        orange: 'var(--orange)',
        ink: 'var(--ink)',
        paper: 'var(--paper)',
        glass: 'var(--glass)',
        glassBorder: 'var(--glassBorder)'
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem'
      },
      boxShadow: {
        glow: '0 0 40px rgba(255, 77, 109, 0.35)'
      }
    }
  },
  plugins: [
    plugin(({ addUtilities }) => {
      addUtilities({
        '.bg-canvas': {
          background:
            'radial-gradient(circle at 20% 20%, rgba(31, 111, 255, 0.35), transparent 45%), radial-gradient(circle at 80% 0%, rgba(0, 194, 255, 0.25), transparent 40%), linear-gradient(135deg, var(--violet), #5a46c7 70%)'
        },
        '.bg-noise': {
          backgroundImage:
            'radial-gradient(rgba(255,255,255,0.08) 0.5px, transparent 0.5px)',
          backgroundSize: '4px 4px'
        },
        '.card-glass': {
          backgroundColor: 'var(--glass)',
          border: '1px solid var(--glassBorder)',
          backdropFilter: 'blur(14px)'
        }
      });
    })
  ]
};

export default config;
