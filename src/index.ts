// Main entry point for the Stripe checkout package

// Export components
export { default as StripeCheckout } from './components/StripeCheckout';
export { default as PaymentStatus } from './components/PaymentStatus';

// Export types
export type {
  CartItem,
  CheckoutOptions,
  ThemeOptions,
  StripeCheckoutProps,
  PaymentStatusProps,
  ElementRules,
  CSSProperties,
  StripeElementClass,
  ElementState,
  ElementPseudoClass,
  ElementPseudoElement,
  ColorOptions,
  FontOptions,
  SpacingOptions,
  EffectOptions,
  LayoutOptions,
  TextOptions
} from './types';

// Export utilities for theming
export { 
  createTheme, 
  createStripeAppearance,
  createStripeVariables,
  createCommonRules
} from './utils/themeProcessor';

// Export rule builder utilities
export {
  createRule,
  RuleBuilder,
  isValidElementClass,
  isValidState,
  isValidPseudoClass,
  isValidPseudoElement
} from './utils/ruleBuilder';

// Export server utilities
export { createPaymentIntentHandler } from './server';