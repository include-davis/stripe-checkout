// utils/themeDefaults.ts - Enhanced with full Stripe support

import { 
  TextOptions, 
  ColorOptions, 
  FontOptions, 
  SpacingOptions, 
  EffectOptions, 
  LayoutOptions, 
  StripeConfigOptions,
  ElementRules,
  ThemeOptions
} from '../types';

/**
 * Default text content options
 */
export const defaultTextOptions: Required<TextOptions> = {
  heading: 'Complete Your Purchase',
  subheading: 'Please review your items and enter payment details below',
  orderSummaryTitle: 'Order Summary',
  paymentDetailsTitle: 'Payment Details',
  payButtonText: 'Pay Now',
  processingText: 'Processing...',
  securityMessage: '🔒 Payments are securely processed by Stripe',
  showOrderSummary: true,
  showSecurityMessage: true,
};

/**
 * Default color scheme
 */
export const defaultColors: Required<ColorOptions> = {
  primary: '#4f46e5', // Indigo
  background: '#ffffff',
  text: '#1f2937',
  error: '#ef4444',
  success: '#10b981',
  secondary: '#6b7280',       // For secondary text
  placeholder: '#9ca3af',     // For placeholder text
  border: '#e5e7eb',          // For input borders
  borderHover: '#a5b4fc',     // For input borders on hover
  inputBackground: '#ffffff', // For input background
  buttonText: '#ffffff',      // Text color for buttons
  cardBackground: '#f9fafb',  // Background color for cards/panels
};

/**
 * Default font settings
 */
export const defaultFonts: Required<FontOptions> = {
  family: 'system-ui, -apple-system, sans-serif',
  sizeBase: '16px',
  sizeSmall: '14px',
  sizeLarge: '18px', 
  weightNormal: '400',
  weightMedium: '500',
  weightBold: '600',
  headingSize: '24px',
  subheadingSize: '18px',
  buttonTextSize: '16px',
};

/**
 * Default spacing values
 */
export const defaultSpacing: Required<SpacingOptions> = {
  unit: '4px',
  gridRow: '16px',
  gridColumn: '16px',
  sectionGap: '24px',
  contentPadding: '16px',
  tabSpacing: '8px',
  tabPadding: '12px 16px',
  tabMargin: '0 4px 0 0',
  paymentElementPadding: '0',
};

/**
 * Default visual effects
 */
export const defaultEffects: Required<EffectOptions> = {
  focusShadow: '0 0 0 3px rgba(79, 70, 229, 0.3)', // Focus ring for input elements
  focusOutline: 'none',                            // Outline on focus
  inputShadow: '0 1px 2px 0 rgb(0 0 0 / 0.05)',    // Default input shadow
  transition: 'all 0.15s ease-in-out',             // Transitions for hover/focus effects
  cardShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',      // Shadow for cards
  buttonShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',   // Shadow for buttons
};

/**
 * Default layout options
 */
export const defaultLayout: Required<LayoutOptions> = {
  tabDirection: 'row',
  tabWrap: 'wrap',
  tabMinWidth: '80px',
  tabMinHeight: 'auto',
  tabShrink: '1',
  tabWhiteSpace: 'nowrap',
  methodOptionHeight: 'auto',
  paymentElementLayout: 'tabs',
};

/**
 * Default Stripe configuration options
 */
export const defaultConfig: Required<StripeConfigOptions> = {
  labels: 'above',
  disableAnimations: false,
};

/**
 * Complete default theme with all options
 */
export const defaultTheme = {
  theme: 'stripe' as const,
  colors: defaultColors,
  borderRadius: '8px',
  fonts: defaultFonts,
  spacing: defaultSpacing,
  effects: defaultEffects,
  text: defaultTextOptions,
  layout: defaultLayout,
  rules: {} as ElementRules,
  config: defaultConfig,
};