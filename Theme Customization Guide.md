# Theme Customization Guide

Easy Stripe Checkout offers extensive customization options to match your brand and design requirements. This guide explains how to use and customize themes for your checkout experience.

## Table of Contents

1. [Basic Theme Usage](#basic-theme-usage)
2. [Built-in Stripe Themes](#built-in-stripe-themes)
3. [Pre-built Custom Themes](#pre-built-custom-themes)
4. [Custom Theme Configuration](#custom-theme-configuration)
5. [Theme Properties Reference](#theme-properties-reference)
6. [Advanced: Using the Rule Builder](#advanced-using-the-rule-builder)
7. [Troubleshooting](#troubleshooting)

## Basic Theme Usage

To apply a theme, pass a `theme` prop to the `StripeCheckout` component:

```jsx
import { StripeCheckout } from 'easy-stripe-checkout';

// Minimal theme customization
const myTheme = {
  colors: {
    primary: '#4f46e5', // Your brand color
  }
};

function CheckoutPage() {
  return (
    <StripeCheckout
      cartItems={cartItems}
      options={checkoutOptions}
      stripePublicKey={process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY}
      theme={myTheme}
    />
  );
}
```

## Built-in Stripe Themes

Stripe provides three built-in themes you can use as a starting point:

- `stripe` (default) - Stripe's standard light theme
- `night` - Stripe's dark theme
- `flat` - Stripe's flat design theme

To use these themes, specify the `theme` property:

```jsx
// Using Stripe's night theme
const nightTheme = {
  theme: 'night',
  colors: {
    // Optional overrides
    primary: '#00d4ff',
  }
};
```

## Pre-built Custom Themes

Easy Stripe Checkout includes several pre-built themes you can import and use directly:

```jsx
import { 
  StripeCheckout, 
  modernMinimalTheme, 
  softUITheme,
  darkModeTheme 
} from 'easy-stripe-checkout';

// Use a pre-built theme
function CheckoutPage() {
  return (
    <StripeCheckout
      // other props...
      theme={modernMinimalTheme}
    />
  );
}
```

### Standard Themes

- `modernMinimalTheme`: Clean, modern design with subtle shadows
- `softUITheme`: Soft, rounded elements with gentle shadows
- `darkModeTheme`: Dark background with light text
- `verticalTabsTheme`: Payment methods arranged vertically
- `compactTheme`: Space-efficient layout with smaller elements
- `brandedTheme`: Bold style with prominent brand colors

### Experimental Themes

These themes push the boundaries of Stripe's customization capabilities:

- `cyberpunkTheme`: Neon colors with bold, futuristic styling
- `brutalistTheme`: Raw, structural design with stark contrasts
- `neumorphicTheme`: Soft UI with subtle shadow effects
- `glassmorphicTheme`: Modern glass-like appearance
- `retro80sTheme`: Vintage computing aesthetic
- `extremeMinimalTheme`: Ultra-stripped down interface
- `boldBrandTheme`: Exaggerated brand presence
- `extremeRoundTheme`: Maximally rounded elements

## Custom Theme Configuration

The theme system allows you to customize nearly every aspect of the checkout appearance:

### Colors

```jsx
const theme = {
  colors: {
    primary: '#4f46e5',        // Primary accent color
    background: '#ffffff',      // Background color
    text: '#1f2937',           // Text color
    error: '#ef4444',          // Error text/border color
    success: '#10b981',        // Success color
    secondary: '#6b7280',      // Secondary text color
    placeholder: '#9ca3af',    // Placeholder text color
    border: '#e5e7eb',         // Border color
    borderHover: '#d1d5db',    // Border hover color
    inputBackground: '#f9fafb', // Input field background
    buttonText: '#ffffff',     // Button text color
    cardBackground: '#f9fafb', // Card background color
  }
};
```

### Typography

```jsx
const theme = {
  fonts: {
    family: 'Inter, system-ui, sans-serif', // Font family
    sizeBase: '16px',        // Base font size
    sizeSmall: '14px',       // Small font size
    sizeLarge: '18px',       // Large font size
    weightNormal: '400',     // Normal font weight
    weightMedium: '500',     // Medium font weight
    weightBold: '600',       // Bold font weight
    headingSize: '24px',     // Main heading size
    subheadingSize: '18px',  // Subheading size
    buttonTextSize: '16px',  // Button text size
  }
};
```

### Spacing and Layout

```jsx
const theme = {
  borderRadius: '8px',      // Global border radius
  spacing: {
    unit: '4px',            // Base spacing unit
    gridRow: '16px',        // Vertical spacing
    gridColumn: '16px',     // Horizontal spacing
    sectionGap: '24px',     // Gap between sections
    contentPadding: '24px', // Content padding
    tabSpacing: '8px',      // Space between tabs
    tabPadding: '12px 16px', // Padding inside tabs
  },
  layout: {
    tabDirection: 'row',    // 'row' or 'column'
    tabWrap: 'wrap',        // 'wrap' or 'nowrap'
    tabMinWidth: '110px',   // Minimum tab width
    tabMinHeight: '60px',   // Minimum tab height
    tabShrink: '0',         // Can tabs shrink
    paymentElementLayout: 'tabs', // 'tabs' or 'accordion'
  }
};
```

### Visual Effects

```jsx
const theme = {
  effects: {
    focusShadow: '0 0 0 3px rgba(79, 70, 229, 0.3)', // Focus ring effect
    focusOutline: 'none',           // Outline on focus
    inputShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',  // Input shadow
    transition: 'all 0.2s ease',    // Transition speed/timing
    cardShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',    // Card shadow
    buttonShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',  // Button shadow
  }
};
```

### Text Content

```jsx
const theme = {
  text: {
    heading: 'Complete Your Purchase',   // Main checkout heading
    subheading: 'Enter payment details below', // Checkout subtitle
    orderSummaryTitle: 'Order Summary',  // Order summary title
    paymentDetailsTitle: 'Payment Details', // Payment section title
    payButtonText: 'Pay Now',           // Pay button text
    processingText: 'Processing...',     // Text shown during payment
    securityMessage: '🔒 Payments are securely processed', // Security message
    showOrderSummary: true,             // Whether to show order summary
    showSecurityMessage: true,          // Whether to show security message
  }
};
```

### Stripe-specific Configuration

```jsx
const theme = {
  config: {
    labels: 'above',            // 'above' or 'floating'
    disableAnimations: false,   // Whether to disable animations
  }
};
```

## Theme Properties Reference

| Category | Property | Type | Description |
|----------|----------|------|-------------|
| Theme Base | `theme` | `'stripe' \| 'night' \| 'flat' \| 'none'` | Base theme to extend |
| | `borderRadius` | `string` | Global border radius (e.g., '8px') |
| Colors | `colors.primary` | `string` | Primary accent color |
| | `colors.background` | `string` | Background color |
| | `colors.text` | `string` | Text color |
| | `colors.error` | `string` | Error color |
| | `colors.success` | `string` | Success color |
| | `colors.secondary` | `string` | Secondary text color |
| | `colors.placeholder` | `string` | Placeholder text color |
| | `colors.border` | `string` | Border color |
| | `colors.borderHover` | `string` | Border hover color |
| | `colors.inputBackground` | `string` | Input background color |
| | `colors.buttonText` | `string` | Button text color |
| | `colors.cardBackground` | `string` | Card background color |
| Fonts | `fonts.family` | `string` | Font family |
| | `fonts.sizeBase` | `string` | Base font size |
| | `fonts.sizeSmall` | `string` | Small font size |
| | `fonts.sizeLarge` | `string` | Large font size |
| | `fonts.weightNormal` | `string` | Normal font weight |
| | `fonts.weightMedium` | `string` | Medium font weight |
| | `fonts.weightBold` | `string` | Bold font weight |
| | `fonts.headingSize` | `string` | Heading font size |
| | `fonts.subheadingSize` | `string` | Subheading font size |
| | `fonts.buttonTextSize` | `string` | Button text size |
| Spacing | `spacing.unit` | `string` | Base spacing unit |
| | `spacing.gridRow` | `string` | Vertical spacing |
| | `spacing.gridColumn` | `string` | Horizontal spacing |
| | `spacing.sectionGap` | `string` | Space between sections |
| | `spacing.contentPadding` | `string` | Content area padding |
| | `spacing.tabSpacing` | `string` | Space between tabs |
| | `spacing.tabPadding` | `string` | Padding inside tabs |
| | `spacing.tabMargin` | `string` | Margin around tabs |
| Layout | `layout.tabDirection` | `'row' \| 'column'` | Direction of tabs (horizontal/vertical) |
| | `layout.tabWrap` | `'wrap' \| 'nowrap'` | Whether tabs can wrap to next line |
| | `layout.tabMinWidth` | `string` | Minimum width for tabs |
| | `layout.tabMinHeight` | `string` | Minimum height for tabs |
| | `layout.tabShrink` | `string` | Control if tabs can shrink |
| | `layout.tabWhiteSpace` | `'normal' \| 'nowrap'` | Text wrapping in tabs |
| | `layout.paymentElementLayout` | `'tabs' \| 'accordion'` | Overall layout style |
| Effects | `effects.focusShadow` | `string` | Box shadow on focus |
| | `effects.focusOutline` | `string` | Outline on focus |
| | `effects.inputShadow` | `string` | Default shadow for inputs |
| | `effects.transition` | `string` | Transition for hover/focus effects |
| | `effects.cardShadow` | `string` | Shadow for cards |
| | `effects.buttonShadow` | `string` | Shadow for buttons |
| Text | `text.heading` | `string` | Main checkout heading |
| | `text.subheading` | `string` | Checkout subheading |
| | `text.orderSummaryTitle` | `string` | Order summary title |
| | `text.paymentDetailsTitle` | `string` | Payment details title |
| | `text.payButtonText` | `string` | Pay button text |
| | `text.processingText` | `string` | Processing state text |
| | `text.securityMessage` | `string` | Security message text |
| | `text.showOrderSummary` | `boolean` | Whether to show order summary |
| | `text.showSecurityMessage` | `boolean` | Whether to show security message |
| Config | `config.labels` | `'above' \| 'floating'` | Label positioning style |
| | `config.disableAnimations` | `boolean` | Whether to disable animations |

## Advanced: Using the Rule Builder

For more fine-grained control, you can directly target Stripe Elements using the `rules` object:

```jsx
import { createRule, RuleBuilder } from 'easy-stripe-checkout';

// Option 1: Using the rule builder
const ruleBuilder = new RuleBuilder()
  .addRule('Tab', { borderRadius: '8px', padding: '12px 16px' })
  .addRule('Tab', { backgroundColor: '#4f46e5', color: '#ffffff' }, 'selected')
  .addRule('Input', { borderColor: '#e5e7eb' })
  .addRule('Input', { borderColor: '#4f46e5' }, undefined, 'focus');

// Option 2: Direct rules object
const theme = {
  // ... other theme properties
  rules: {
    '.Tab': {
      borderRadius: '8px',
      padding: '12px 16px',
    },
    '.Tab--selected': {
      backgroundColor: '#4f46e5',
      color: '#ffffff',
    },
    '.Input': {
      borderColor: '#e5e7eb',
    },
    '.Input:focus': {
      borderColor: '#4f46e5',
    },
  }
};
```

### Supported Element Classes

- `Tab`, `TabIcon`, `TabLabel`: Payment method tabs
- `Label`: Form labels
- `Input`: Form input fields
- `Error`: Error messages
- `Block`, `BlockDivider`, `BlockAction`: Block elements
- `Checkbox`, `CheckboxInput`, `CheckboxLabel`: Checkboxes
- `Switch`, `SwitchControl`: Switches
- `RadioIcon`, `RadioIconOuter`, `RadioIconInner`: Radio buttons
- `Menu`, `MenuIcon`, `MenuAction`: Menu components
- `PaymentMethodMessaging`: Payment method messaging

### Supported Element States

- `selected`, `invalid`, `focused`, `empty`
- `checked`, `floating`, `resting`, `highlight`
- `active`, `disabled`, `open`, `negative`
- `new`, `hovered`

### Supported Pseudo-classes

- `hover`, `focus`, `active`, `disabled`
- `autofill`, `focus-visible`

### Supported Pseudo-elements

- `placeholder`, `selection`

## Troubleshooting

### Vertical Tabs Not Working

If you're using the `verticalTabsTheme` and the tabs are still displaying horizontally, add the following to your theme:

```jsx
rules: {
  '.TabList': {
    flexDirection: 'column !important',
    width: '100%'
  }
}
```

### Elements Disappearing with Custom Themes

Some CSS properties may cause Stripe Elements to disappear. These are commonly:

- `backdrop-filter` and `WebkitBackdropFilter`
- `transform` (especially for input fields)
- Highly transparent background colors (use solid colors instead)

### Border Radius Issues

For consistent border-radius across all elements, set both the global `borderRadius` property and include specific rules:

```jsx
{
  borderRadius: '8px',
  rules: {
    '.Input': { borderRadius: '8px' },
    '.Tab': { borderRadius: '8px' },
    '.CheckboxInput': { borderRadius: '8px' }
  }
}
```

### Font Loading

When using custom fonts, ensure they're properly loaded before Stripe Elements renders:

```jsx
// In your global CSS or page component
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap');
```

### Style Specificity Issues

If your theme styles aren't being applied, try adding more specific selectors or use `!important` for critical styles:

```jsx
rules: {
  '.Tab': {
    backgroundColor: '#ffffff !important',
    color: '#000000 !important'
  }
}
```

Note that overuse of `!important` is not recommended and should be a last resort.