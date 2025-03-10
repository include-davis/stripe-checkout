// utils/themeProcessor.ts - Enhanced to support all Stripe appearance options

import {
  ThemeOptions,
  ElementRules,
  StripeElementClass,
  ElementState,
  ElementPseudoClass,
  ElementPseudoElement,
  StripeVariables
} from '../types';
import { defaultTheme } from './themeDefaults';
import { Appearance } from '@stripe/stripe-js';

/**
 * Helper function to check if an object is a plain object
 */
const isObject = (item: any): boolean => {
  return (item && typeof item === 'object' && !Array.isArray(item));
};

/**
 * Deep merge function for theme objects
 * @param target The base object to merge into
 * @param source The source object to get properties from
 * @returns A new merged object
 */
function mergeDeep<T extends Record<string, any>>(target: T, source: Partial<T>): T {
  const result = { ...target };
  
  for (const key in source) {
    if (source.hasOwnProperty(key)) {
      const sourceValue = source[key];
      const targetValue = target[key];
      
      // Skip undefined values
      if (sourceValue === undefined) continue;
      
      // Handle objects (recursively merge)
      if (
        isObject(sourceValue) && 
        isObject(targetValue)
      ) {
        // Cast result to allow indexing
        (result as any)[key] = mergeDeep(targetValue, sourceValue as any);
      } 
      // Handle all other values (direct assignment)
      else {
        (result as any)[key] = sourceValue;
      }
    }
  }
  
  return result;
}

// Define the complete theme type from defaultTheme
export type CompleteTheme = typeof defaultTheme;

/**
 * Merge user theme options with default theme
 * @param userTheme - User provided theme options
 * @returns Complete theme with defaults for missing values
 */
export const createTheme = (userTheme?: Partial<ThemeOptions>): CompleteTheme => {
  if (!userTheme) return defaultTheme;
  
  // Create a deep copy of defaultTheme
  const base = JSON.parse(JSON.stringify(defaultTheme));
  
  // Recursively merge properties
  return mergeDeep(base, userTheme);
};

/**
 * Get a safe property value with fallback
 * @param obj The object to get the property from
 * @param key The property key to access
 * @param fallback The fallback value if the property doesn't exist
 * @returns The property value or fallback
 */
export const getSafeValue = <T, K extends keyof T>(
  obj: T | undefined, 
  key: K, 
  fallback: T[K]
): T[K] => {
  return obj && obj[key] !== undefined ? obj[key] : fallback;
};

/**
 * Create a valid selector for Stripe rules
 * @param element The element class name
 * @param state Optional element state
 * @param pseudoClass Optional pseudo-class
 * @param pseudoElement Optional pseudo-element
 * @returns A valid selector string
 */
export const createSelector = (
  element: StripeElementClass,
  state?: ElementState,
  pseudoClass?: ElementPseudoClass,
  pseudoElement?: ElementPseudoElement
): string => {
  let selector = `.${element}`;
  
  if (state) {
    selector += `--${state}`;
  }
  
  if (pseudoClass) {
    selector += `:${pseudoClass}`;
  }
  
  if (pseudoElement) {
    selector += `::${pseudoElement}`;
  }
  
  return selector;
};

/**
 * Map our custom theme format to Stripe Variables format
 * @param theme Our theme format
 * @returns Variables for Stripe appearance
 */
export const createStripeVariables = (theme: CompleteTheme): StripeVariables => {
  const variables: StripeVariables = {
    // Colors
    colorPrimary: theme.colors.primary,
    colorBackground: theme.colors.background,
    colorText: theme.colors.text,
    colorDanger: theme.colors.error,
    colorSuccess: theme.colors.success,
    colorTextSecondary: theme.colors.secondary,
    colorTextPlaceholder: theme.colors.placeholder,
    
    // Fonts
    fontFamily: theme.fonts.family,
    fontSizeBase: theme.fonts.sizeBase,
    fontSizeSm: theme.fonts.sizeSmall,
    fontSizeLg: theme.fonts.sizeLarge,
    fontWeightNormal: theme.fonts.weightNormal,
    fontWeightMedium: theme.fonts.weightMedium,
    fontWeightBold: theme.fonts.weightBold,
    
    // Spacing
    borderRadius: theme.borderRadius,
    spacingUnit: theme.spacing.unit,
    spacingGridRow: theme.spacing.gridRow,
    spacingGridColumn: theme.spacing.gridColumn,
  };
  
  return variables;
};

/**
 * Generate common rules for elements based on our theme
 * @param theme Our theme format
 * @returns Rules for Stripe appearance
 */
export const createCommonRules = (theme: CompleteTheme): ElementRules => {
  const rules: ElementRules = {
    // Input styles
    '.Input': {
      border: `1px solid ${theme.colors.border}`,
      boxShadow: theme.effects.inputShadow,
      transition: theme.effects.transition,
      backgroundColor: theme.colors.inputBackground
    },
    '.Input:focus': {
      borderColor: theme.colors.primary,
      boxShadow: theme.effects.focusShadow,
      outline: theme.effects.focusOutline
    },
    '.Input:hover:not(:focus)': {
      borderColor: theme.colors.borderHover
    },
    
    // Label styles
    '.Label': {
      color: theme.colors.text,
      fontSize: theme.fonts.sizeSmall,
      fontWeight: theme.fonts.weightMedium,
      marginBottom: theme.spacing.unit
    },
    
    // Tab styles
    '.Tab': {
      backgroundColor: theme.colors.cardBackground,
      borderColor: theme.colors.border,
      color: theme.colors.text,
      padding: theme.spacing.tabPadding,
      minWidth: theme.layout.tabMinWidth,
      minHeight: theme.layout.tabMinHeight,
      margin: theme.spacing.tabMargin,
      boxSizing: 'border-box',
      whiteSpace: theme.layout.tabWhiteSpace,
      lineHeight: '1.2',
      textOverflow: 'ellipsis',
      overflow: 'hidden'
    },
    '.Tab:hover': {
      color: theme.colors.primary,
      borderColor: theme.colors.borderHover
    },
    '.Tab--selected': {
      backgroundColor: theme.colors.background,
      borderColor: theme.colors.primary,
      color: theme.colors.primary,
      fontWeight: theme.fonts.weightMedium
    },
    
    // Tab container styles
    '.TabList': {
      display: 'flex',
      flexDirection: theme.layout.tabDirection,
      flexWrap: theme.layout.tabWrap,
      gap: theme.spacing.tabSpacing,
      marginBottom: theme.spacing.gridRow
    },
    
    // Payment element styles
    '.PaymentElement': {
      padding: theme.spacing.paymentElementPadding
    },
    
    // Checkbox styles
    '.CheckboxInput': {
      borderColor: theme.colors.border
    },
    '.CheckboxInput--checked': {
      backgroundColor: theme.colors.primary,
      borderColor: theme.colors.primary
    },
    
    // Error message styles
    '.Error': {
      color: theme.colors.error,
      fontSize: theme.fonts.sizeSmall,
      marginTop: theme.spacing.unit
    }
  };
  
  return rules;
};

/**
 * Convert our theme format to Stripe's Appearance format
 * @param theme - Our theme format
 * @returns Stripe Appearance object
 */
export const createStripeAppearance = (theme: CompleteTheme): Appearance => {
  // Generate variables and common rules
  const variables = createStripeVariables(theme);
  const commonRules = createCommonRules(theme);
  
  // Merge common rules with user-provided rules
  const mergedRules = { ...commonRules, ...(theme.rules || {}) };
  
  // Create a type-safe theme value for Stripe
  let stripeTheme: 'stripe' | 'night' | 'flat' | undefined = undefined;
  
  // Check which theme to use
  if (theme.theme === 'stripe' || theme.theme === 'night' || theme.theme === 'flat') {
    stripeTheme = theme.theme;
  }
  
  return {
    theme: stripeTheme,
    variables,
    rules: mergedRules,
    labels: theme.config.labels,
    disableAnimations: theme.config.disableAnimations,
  };
};
