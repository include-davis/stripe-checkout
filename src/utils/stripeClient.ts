// Utilities for client-side Stripe integration
import { loadStripe, Stripe } from '@stripe/stripe-js';

// Cache the Stripe instance to avoid multiple loads
let stripePromise: Promise<Stripe | null> | null = null;

/**
 * Get or initialize the Stripe client
 * @param publicKey - Stripe publishable key
 * @returns Promise that resolves to the Stripe client
 */
export const getStripeClient = (publicKey: string): Promise<Stripe | null> => {
  if (!stripePromise && publicKey) {
    stripePromise = loadStripe(publicKey);
  }
  return stripePromise || Promise.resolve(null);
};

/**
 * Create a Payment Intent on the server
 * @param items - Cart items to be paid for
 * @param currency - Currency code (default: 'usd')
 * @returns Promise that resolves to the client secret
 */
export const createPaymentIntent = async (
  items: Array<{ price: number; quantity: number }>,
  currency: string = 'usd'
): Promise<{ clientSecret: string | null; error?: string }> => {
  if (!items.length) {
    return { clientSecret: null, error: 'No items in cart' };
  }

  try {
    const response = await fetch('/api/create-payment-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items, currency }),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    return { clientSecret: data.clientSecret };
  } catch (error) {
    console.error('Error creating payment intent:', error);
    return {
      clientSecret: null,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
};
