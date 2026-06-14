module.exports = {
  content: ["./*.html", "./*.js"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'sans-serif'],
        outfit: ['Outfit', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        dark: {
          base: '#030712',
          surface: '#111827',
          surfaceAlt: '#1f2937',
          border: 'rgba(255, 255, 255, 0.08)',
        },
        cyber: {
          teal: '#06B6D4',
          tealLight: '#22d3ee',
          tealGlow: 'rgba(6, 182, 212, 0.25)',
          emerald: '#10B981',
          emeraldLight: '#34d399',
          amber: '#F59E0B',
          amberLight: '#fbbf24',
          rose: '#EF4444',
          roseLight: '#fb7185',
          indigo: '#6366F1'
        }
      }
    }
  }
}
