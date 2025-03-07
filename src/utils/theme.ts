// Theme utilities for Stripe checkout
import { ThemeOptions } from '../types';
import { Appearance } from '@stripe/stripe-js';

// Default theme values
const defaultTheme: Required<ThemeOptions> = {
  colors: {
    primary: '#4f46e5', // Indigo
    background: '#ffffff',
    text: '#1f2937',
    error: '#ef4444',
    success: '#10b981',
  },
  borderRadius: '8px',
  fonts: {
    family: 'system-ui, -apple-system, sans-serif',
  },
  showOrderSummary: true,
  customHeading: 'Complete Your Purchase',
  customSubheading: 'Please review your items and enter payment details below',
};

/**
 * Merge user theme options with default theme
 * @param userTheme - User provided theme options
 * @returns Complete theme with defaults for missing values
 */
export const createTheme = (userTheme?: ThemeOptions): Required<ThemeOptions> => {
  if (!userTheme) return defaultTheme;

  return {
    colors: {
      primary: userTheme.colors?.primary || defaultTheme.colors.primary,
      background: userTheme.colors?.background || defaultTheme.colors.background,
      text: userTheme.colors?.text || defaultTheme.colors.text,
      error: userTheme.colors?.error || defaultTheme.colors.error,
      success: userTheme.colors?.success || defaultTheme.colors.success,
    },
    borderRadius: userTheme.borderRadius || defaultTheme.borderRadius,
    fonts: {
      family: userTheme.fonts?.family || defaultTheme.fonts.family,
    },
    showOrderSummary: 
      userTheme.showOrderSummary !== undefined 
        ? userTheme.showOrderSummary 
        : defaultTheme.showOrderSummary,
    customHeading: userTheme.customHeading || defaultTheme.customHeading,
    customSubheading: userTheme.customSubheading || defaultTheme.customSubheading,
  };
};

/**
 * Convert our theme format to Stripe's Appearance format
 * @param theme - Our theme format
 * @returns Stripe Appearance object
 */
export const createStripeAppearance = (theme: Required<ThemeOptions>): Appearance => {
  return {
    theme: 'stripe',
    variables: {
      colorPrimary: theme.colors.primary,
      colorBackground: theme.colors.background,
      colorText: theme.colors.text,
      colorDanger: theme.colors.error,
      fontFamily: theme.fonts.family,
      borderRadius: theme.borderRadius,
      spacingUnit: '4px',
    },
    rules: {
      '.Input': {
        boxShadow: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
      },
      '.Label': {
        marginBottom: '8px',
      },
    },
  };
};
