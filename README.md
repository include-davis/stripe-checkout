# Stripe Checkout

A simplified Stripe checkout integration for React and Next.js applications with extensive theme customization. Adapted from Winson Yu's easy-stripe-checkout.

## Features

- 🔒 **Simple Integration**: Add Stripe checkout with minimal code
- 🎨 **Highly Customizable**: Extensive theme system with pre-built themes
- 📱 **Responsive Design**: Works on all devices
- 🛒 **Order Summary**: Built-in display of cart items
- ⚡ **Next.js Ready**: Server components and API routes support
- 💳 **Multiple Payment Methods**: Support for cards, Apple Pay, Google Pay, and more
- 📊 **TypeScript Support**: Full type safety and IntelliSense

## Installation

```bash
npm install @includedavis/stripe-checkout
# or
yarn add @includedavis/stripe-checkout
```

## Quick Start

### 1. Create a payment intent API route

```tsx
// app/api/create-payment-intent/route.ts
import { createPaymentIntentHandler } from '@includedavis/stripe-checkout';
import { NextResponse } from 'next/server';

const handler = createPaymentIntentHandler({
  secretKey: process.env.STRIPE_SECRET_KEY!,
});

export async function POST(request: Request) {
  return handler(request, NextResponse);
}
```

### 2. Add the Checkout component

```tsx
'use client';

import { StripeCheckout } from '@includedavis/stripe-checkout';

const cartItems = [
  {
    id: '1',
    name: 'Premium Widget',
    price: 5100, // $51.00 in cents
    quantity: 1,
  },
  {
    id: '2',
    name: 'Basic Gadget',
    price: 2500, // $25.00 in cents
    quantity: 2,
  },
];

export default function CheckoutPage() {
  return (
    <StripeCheckout
      cartItems={cartItems}
      options={{
        successUrl: `${window.location.origin}/success`,
        cancelUrl: `${window.location.origin}/cancel`,
        currency: 'usd',
      }}
      stripePublicKey={process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!}
      theme={{
        colors: {
          primary: '#4f46e5', // Your brand color
        }
      }}
    />
  );
}
```

## Theme Customization

Stripe Checkout offers extensive theme customization options. You can use built-in themes or create your own:

```tsx
// Using a built-in theme
<StripeCheckout
  // other props...
  theme={{
    theme: 'night', // 'stripe', 'night', or 'flat'
    colors: {
      primary: '#00d4ff', // Override primary color
    }
  }}
/>

// Using a custom theme
<StripeCheckout
  // other props...
  theme={{
    colors: {
      primary: '#6366f1',
      background: '#ffffff',
      text: '#111827',
      // ...other colors
    },
    fonts: {
      family: 'Inter, system-ui, sans-serif',
      // ...font settings
    },
    // ...other theme properties
  }}
/>
```

For more details, see the [Theme Customization Guide](./Theme-Customization-Guide.md).

## Pre-built Themes

The package includes several pre-built themes you can use:

```tsx
import { StripeCheckout, modernMinimalTheme } from '@includedavis/stripe-checkout';

<StripeCheckout
  // other props...
  theme={modernMinimalTheme}
/>
```

Available themes:
- Standard: `modernMinimalTheme`, `softUITheme`, `darkModeTheme`, `verticalTabsTheme`, `compactTheme`, `brandedTheme`
- Experimental: `cyberpunkTheme`, `brutalistTheme`, `neumorphicTheme`, `glassmorphicTheme`, `retro80sTheme`, and more

## API Reference

### StripeCheckout Props

| Prop | Type | Description |
|------|------|-------------|
| `cartItems` | `CartItem[]` | Array of items in the cart |
| `options` | `CheckoutOptions` | Checkout options (success/cancel URLs, currency) |
| `stripePublicKey` | `string` | Your Stripe publishable key |
| `theme` | `ThemeOptions` | Theme customization options |
| `onPaymentSuccess` | `(paymentId: string) => void` | Success callback |
| `onPaymentError` | `(error: any) => void` | Error callback |

### CartItem Interface

```ts
interface CartItem {
  id: string;
  name: string;
  description?: string;
  price: number; // In cents
  quantity: number;
  image?: string; // Optional URL
}
```

### CheckoutOptions Interface

```ts
interface CheckoutOptions {
  successUrl: string;
  cancelUrl: string;
  currency?: string; // Default: 'usd'
}
```

## Browser Support

Stripe Checkout works in all modern browsers. Internet Explorer is not supported.

## License

MIT