// Types for the Stripe checkout package

export interface CartItem {
  id: string;
  name: string;
  description?: string;
  price: number; // Price in cents
  quantity: number;
  image?: string; // Optional URL to product image
}

export interface CheckoutOptions {
  successUrl: string;
  cancelUrl: string;
  currency?: string; // Default: 'usd'
}

export interface ThemeOptions {
  colors?: {
    primary?: string;
    background?: string;
    text?: string;
    error?: string;
    success?: string;
  };
  borderRadius?: string;
  fonts?: {
    family?: string;
  };
  showOrderSummary?: boolean;
  customHeading?: string;
  customSubheading?: string;
}

export interface StripeCheckoutProps {
  cartItems: CartItem[];
  options: CheckoutOptions;
  theme?: ThemeOptions;
  stripePublicKey: string;
  stripeSecretKey?: string; // For server-side operations only
  onPaymentSuccess?: (paymentId: string) => void;
  onPaymentError?: (error: any) => void;
}

export interface PaymentStatusProps {
  status: 'success' | 'error' | 'canceled';
  message?: string;
  returnUrl: string;
}
