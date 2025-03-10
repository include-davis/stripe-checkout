// Extended ThemeOptions interface with complete Stripe appearance options

// Tab-specific style options
export interface TabOptions {
  backgroundColor?: string;
  borderColor?: string;
  color?: string;
  fontWeight?: string;
  padding?: string;
  borderRadius?: string;
  border?: string;
  boxShadow?: string;
  fontSize?: string;
  margin?: string;
}

// Input field style options
export interface InputOptions {
  backgroundColor?: string;
  borderColor?: string;
  color?: string;
  fontWeight?: string;
  padding?: string;
  borderRadius?: string;
  border?: string;
  boxShadow?: string;
  fontSize?: string;
}

// Label style options
export interface LabelOptions {
  color?: string;
  fontSize?: string;
  fontWeight?: string;
  marginBottom?: string;
  opacity?: string;
}

// Error message style options
export interface ErrorOptions {
  color?: string;
  fontSize?: string;
  margin?: string;
  padding?: string;
}

// Checkbox style options
export interface CheckboxOptions {
  backgroundColor?: string;
  borderColor?: string;
  borderRadius?: string;
  border?: string;
}

// All supported class names that can be targeted with custom rules
export type StripeElementClass = 
  | 'Tab' | 'TabIcon' | 'TabLabel'               // Payment method tabs
  | 'Label'                                      // Form labels
  | 'Input'                                      // Form input fields
  | 'Error'                                      // Error messages
  | 'Block' | 'BlockDivider' | 'BlockAction'     // Block elements
  | 'Checkbox' | 'CheckboxInput' | 'CheckboxLabel'// Checkboxes
  | 'Switch' | 'SwitchControl'                   // Switches
  | 'RadioIcon' | 'RadioIconOuter' | 'RadioIconInner' // Radio buttons
  | 'Menu' | 'MenuIcon' | 'MenuAction'           // Menu components
  | 'PaymentMethodMessaging';                    // Payment method messaging

// Supported element states
export type ElementState = 
  | 'selected' | 'invalid' | 'focused' | 'empty' 
  | 'checked' | 'floating' | 'resting' | 'highlight'
  | 'active' | 'disabled' | 'open' | 'negative'
  | 'new' | 'hovered';

// Supported pseudo-classes
export type ElementPseudoClass =
  | 'hover' | 'focus' | 'active' | 'disabled'
  | 'autofill' | 'focus-visible';

// Supported pseudo-elements
export type ElementPseudoElement =
  | 'placeholder' | 'selection';

// CSS property values (strings only)
export type CSSPropertyValue = string;

// Map of CSS properties for a specific element selector
export interface CSSProperties {
  [property: string]: CSSPropertyValue;
}

// Structure for custom rules targeting specific elements and states
export interface ElementRules {
  [selector: string]: CSSProperties;
}

// Expanded layout options interface
export interface LayoutOptions {
  // Tab layout
  tabDirection?: 'row' | 'column';    // Direction for tabs (horizontal/vertical)
  tabWrap?: 'wrap' | 'nowrap';        // Allow tabs to wrap to next line
  tabMinWidth?: string;               // Minimum width for payment tabs
  tabMinHeight?: string;              // Minimum height for payment tabs
  tabShrink?: string;                 // Control if tabs can shrink (0 = no shrink)
  tabWhiteSpace?: 'normal' | 'nowrap'; // Text wrapping in tabs
  
  // Payment method options
  methodOptionHeight?: string;        // Height for payment method options
  
  // Overall component layout
  paymentElementLayout?: 'tabs' | 'accordion'; // Layout style (if supported)
}

// Cart item interface
export interface CartItem {
  id: string;
  name: string;
  description?: string;
  price: number; // Price in cents
  quantity: number;
  image?: string; // Optional URL to product image
}

// Basic checkout options
export interface CheckoutOptions {
  successUrl: string;
  cancelUrl: string;
  currency?: string; // Default: 'usd'
}

// Text content customization options
export interface TextOptions {
  // Heading customization
  heading?: string;                // Main checkout heading
  subheading?: string;             // Checkout subheading
  orderSummaryTitle?: string;      // Order summary section title
  paymentDetailsTitle?: string;    // Payment details section title
  
  // Button text
  payButtonText?: string;          // Text for the pay button
  processingText?: string;         // Text shown during payment processing
  
  // Footer text
  securityMessage?: string;        // Security message below payment button
  
  // Section toggles
  showOrderSummary?: boolean;      // Whether to show the order summary section
  showSecurityMessage?: boolean;   // Whether to show the security message
}

// Color customization options
export interface ColorOptions {
  primary?: string;              // Primary accent color
  background?: string;           // Background color
  text?: string;                 // Primary text color
  error?: string;                // Error text/border color
  success?: string;              // Success text/border color
  secondary?: string;            // Secondary/muted text color
  placeholder?: string;          // Placeholder text color
  border?: string;               // Border color for inputs
  borderHover?: string;          // Border color on hover
  inputBackground?: string;      // Background color for inputs
  buttonText?: string;           // Text color for buttons
  cardBackground?: string;       // Background color for cards/panels
}

// Font customization options
export interface FontOptions {
  family?: string;               // Font family
  sizeBase?: string;             // Base font size
  sizeSmall?: string;            // Small font size
  sizeLarge?: string;            // Large font size
  weightNormal?: string;         // Normal font weight
  weightMedium?: string;         // Medium font weight
  weightBold?: string;           // Bold font weight
  headingSize?: string;          // Size for main headings
  subheadingSize?: string;       // Size for subheadings
  buttonTextSize?: string;       // Size for button text
}

// Spacing customization options
export interface SpacingOptions {
  unit?: string;                 // Base spacing unit
  gridRow?: string;              // Vertical spacing between elements
  gridColumn?: string;           // Horizontal spacing between elements
  sectionGap?: string;           // Gap between major sections
  contentPadding?: string;       // Padding for content areas
  
  // Tab-specific spacing
  tabSpacing?: string;           // Space between tabs
  tabPadding?: string;           // Padding inside tabs
  tabMargin?: string;            // Margin around tabs
  
  // Payment element padding
  paymentElementPadding?: string; // Padding for payment element container
}

// Visual effects customization options
export interface EffectOptions {
  focusShadow?: string;          // Box shadow on focus
  focusOutline?: string;         // Outline on focus
  inputShadow?: string;          // Default shadow for inputs
  transition?: string;           // Transition for hover/focus effects
  cardShadow?: string;           // Shadow for cards/panels
  buttonShadow?: string;         // Shadow for buttons
}

// Additional configuration options from Stripe
export interface StripeConfigOptions {
  labels?: 'above' | 'floating';     // Label style ('above' or 'floating')
  disableAnimations?: boolean;       // Whether to disable animations
}

// Main theme options interface
export interface ThemeOptions {
  theme?: 'stripe' | 'night' | 'flat' | 'none'; // Base theme (defaults to 'stripe')
  colors?: ColorOptions;               // Color customizations
  borderRadius?: string;               // Global border radius
  fonts?: FontOptions;                 // Font customizations
  spacing?: SpacingOptions;            // Spacing customizations
  effects?: EffectOptions;             // Visual effect customizations
  text?: TextOptions;                  // Text content customizations
  layout?: LayoutOptions;              // Layout customization options
  rules?: ElementRules;                // Custom CSS-like rules
  config?: StripeConfigOptions;        // Additional configuration options
}

// Variables that can be used in the appearance API
export interface StripeVariables {
  colorPrimary?: string;
  colorBackground?: string;
  colorText?: string;
  colorDanger?: string;
  colorSuccess?: string;
  colorWarning?: string;
  colorTextSecondary?: string;
  colorTextPlaceholder?: string;
  fontFamily?: string;
  fontSizeBase?: string;
  fontSizeSm?: string;
  fontSizeLg?: string;
  fontSizeXl?: string;
  fontSizeXs?: string;
  fontSize2Xs?: string;
  fontSize3Xs?: string;
  fontWeightLight?: string;
  fontWeightNormal?: string;
  fontWeightMedium?: string;
  fontWeightBold?: string;
  fontLineHeight?: string;
  spacingUnit?: string;
  spacingGridRow?: string;
  spacingGridColumn?: string;
  borderRadius?: string;
  // And other variables as needed
}

// Stripe Element customization props
export interface StripeCheckoutProps {
  cartItems: CartItem[];
  options: CheckoutOptions;
  theme?: ThemeOptions;
  stripePublicKey: string;
  stripeSecretKey?: string; // For server-side operations only
  onPaymentSuccess?: (paymentId: string) => void;
  onPaymentError?: (error: any) => void;
}

// Payment status display props
export interface PaymentStatusProps {
  status: 'success' | 'error' | 'canceled';
  message?: string;
  returnUrl: string;
  theme?: ThemeOptions;
}