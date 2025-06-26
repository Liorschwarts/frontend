// src/styles/theme.js - נושא מרכזי מודרני וצבעוני

export const theme = {
  colors: {
    primary: {
      main: "#6366f1", // Indigo modern
      light: "#818cf8",
      dark: "#4f46e5",
      contrastText: "#ffffff",
      gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    },
    secondary: {
      main: "#f59e0b", // Amber vibrant
      light: "#fbbf24",
      dark: "#d97706",
      contrastText: "#ffffff",
      gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    },
    accent: {
      main: "#10b981", // Emerald
      light: "#34d399",
      dark: "#059669",
      purple: "#8b5cf6",
      pink: "#ec4899",
      teal: "#14b8a6",
    },
    status: {
      success: "#10b981",
      warning: "#f59e0b",
      error: "#ef4444",
      info: "#3b82f6",
    },
    text: {
      primary: "#1f2937",
      secondary: "#6b7280",
      disabled: "#9ca3af",
      light: "#f9fafb",
    },
    background: {
      default: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      paper: "#ffffff",
      glass: "rgba(255, 255, 255, 0.1)",
      dark: "#111827",
      gradient: "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)",
    },
    divider: "#e5e7eb",
    glass: {
      light: "rgba(255, 255, 255, 0.25)",
      medium: "rgba(255, 255, 255, 0.15)",
      dark: "rgba(0, 0, 0, 0.1)",
    },
  },

  spacing: {
    xs: "4px",
    sm: "8px",
    md: "16px",
    lg: "24px",
    xl: "32px",
    xxl: "48px",
    "3xl": "64px",
    "4xl": "80px",
  },

  borderRadius: {
    sm: "6px",
    md: "12px",
    lg: "16px",
    xl: "20px",
    "2xl": "24px",
    full: "9999px",
  },

  shadows: {
    sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
    md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
    lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
    xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
    "2xl": "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
    inner: "inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)",
    glass: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
    neon: "0 0 20px rgba(99, 102, 241, 0.5)",
  },

  effects: {
    blur: "blur(16px)",
    backdropBlur: "blur(10px)",
    glassmorphism: {
      background: "rgba(255, 255, 255, 0.25)",
      boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
      backdropFilter: "blur(8.5px)",
      border: "1px solid rgba(255, 255, 255, 0.18)",
    },
  },

  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontSize: {
      xs: "0.75rem",
      sm: "0.875rem",
      md: "1rem",
      lg: "1.125rem",
      xl: "1.25rem",
      xxl: "1.5rem",
    },
  },

  zIndex: {
    appbar: 1100,
    drawer: 1200,
    modal: 1300,
    tooltip: 1500,
  },
};

// Helper functions
export const getSpacing = (size) => theme.spacing[size] || size;
export const getColor = (path) => {
  const keys = path.split(".");
  return keys.reduce((obj, key) => obj?.[key], theme.colors);
};
export const getBorderRadius = (size) => theme.borderRadius[size] || size;
export const getShadow = (size) => theme.shadows[size] || size;
export const getFontSize = (size) => theme.typography.fontSize[size] || size;
