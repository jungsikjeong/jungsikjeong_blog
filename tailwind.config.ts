import type { Config } from 'tailwindcss'
import plugin from 'tailwindcss/plugin'

const config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        header: {
          DEFAULT: 'hsl(var(--header))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        hover: {
          bg: 'hsl(var(--hover-bg))',
          border: 'hsl(var(--hover-border))',
          shadow: 'hsla(var(--hover-shadow))',
          button: 'hsl(var(--button-hover))',
          link: 'hsl(var(--link-hover))',
        },
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: {
            height: '0',
          },
          to: {
            height: 'var(--radix-accordion-content-height)',
          },
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)',
          },
          to: {
            height: '0',
          },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'card-hover': 'card-hover 0.2s ease-out forwards',
      },
      transitionProperty: {
        github:
          'background-color, border-color, color, fill, stroke, box-shadow, transform',
      },
      boxShadow: {
        'github-hover': '0 1px 3px hsla(var(--hover-shadow))',
      },
    },
  },
  plugins: [
    require('tailwindcss-animate'),
    // GitHub 스타일 유틸리티 클래스 추가
    plugin(({ addUtilities }) => {
      addUtilities({
        '.github-transition': {
          '@apply transition-github duration-200 ease-in-out': {},
        },
        '.github-hover': {
          '@apply hover:bg-hover-bg hover:border-hover-border hover:shadow-github-hover hover:rounded-md':
            {},
        },
        '.github-button-hover': {
          '@apply hover:bg-hover-button transition-colors duration-200': {},
        },
        '.github-link-hover': {
          '@apply hover:text-hover-link transition-colors duration-200': {},
        },
      })
    }),
  ],
} satisfies Config

export default config
