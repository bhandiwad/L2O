// Sify Brand Theme Configuration
// Based on https://www.sifytechnologies.com/us/

export const sifyTheme = {
  colors: {
    // Primary Sify Colors
    primary: {
      50: '#f0f9ff',
      100: '#e0f2fe', 
      500: '#0ea5e9', // Sify Blue
      600: '#0284c7',
      700: '#0369a1',
      900: '#0c4a6e'
    },
    // Sify Green (accent color from website)
    accent: {
      50: '#f0fdf4',
      100: '#dcfce7',
      400: '#4ade80',
      500: '#22c55e', // Sify Green
      600: '#16a34a',
      700: '#15803d'
    },
    // Sify Yellow (from website highlights)
    yellow: {
      400: '#facc15',
      500: '#eab308',
      600: '#ca8a04'
    },
    // Dark theme colors (from website header)
    dark: {
      50: '#f8fafc',
      100: '#f1f5f9',
      800: '#1e293b',
      900: '#0f172a', // Dark header background
      950: '#020617'
    },
    // Neutral grays
    gray: {
      50: '#f8fafc',
      100: '#f1f5f9',
      200: '#e2e8f0',
      300: '#cbd5e1',
      400: '#94a3b8',
      500: '#64748b',
      600: '#475569',
      700: '#334155',
      800: '#1e293b',
      900: '#0f172a'
    }
  },
  
  typography: {
    fontFamily: {
      sans: ['Inter', 'system-ui', 'sans-serif'],
      heading: ['Inter', 'system-ui', 'sans-serif']
    },
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem', 
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem'
    }
  },

  components: {
    // Header styling (dark theme like Sify website)
    header: {
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
      text: '#ffffff',
      accent: '#22c55e'
    },
    
    // Card styling
    card: {
      background: '#ffffff',
      border: '#e2e8f0',
      shadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      hover: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
    },
    
    // Button styling
    button: {
      primary: {
        background: 'linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)',
        hover: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)',
        text: '#ffffff'
      },
      secondary: {
        background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
        hover: 'linear-gradient(135deg, #16a34a 0%, #15803d 100%)',
        text: '#ffffff'
      }
    },
    
    // Status indicators
    status: {
      success: '#22c55e',
      warning: '#eab308', 
      error: '#ef4444',
      info: '#0ea5e9'
    }
  },

  // Layout specifications
  layout: {
    maxWidth: '1280px',
    padding: {
      sm: '1rem',
      md: '1.5rem', 
      lg: '2rem'
    },
    borderRadius: {
      sm: '0.375rem',
      md: '0.5rem',
      lg: '0.75rem',
      xl: '1rem'
    }
  }
};

export default sifyTheme;

