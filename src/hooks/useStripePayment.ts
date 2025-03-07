'use client';

// Custom hook for managing Stripe payment operations
import { useState, useEffect } from 'react';
import { CartItem, CheckoutOptions } from '../types';
import { createPaymentIntent } from '../utils/stripeClient';

interface UseStripePaymentReturn {
  clientSecret: string | null;
  loading: boolean;
  error: string | null;
  totalAmount: number;
}

/**
 * Hook to manage Stripe payment intent creation and status
 * @param cartItems - Items in the cart
 * @param options - Checkout options
 * @returns Payment state and helpers
 */
export const useStripePayment = (
  cartItems: CartItem[],
  options: CheckoutOptions
): UseStripePaymentReturn => {
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Calculate total amount once
  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  useEffect(() => {
    const fetchPaymentIntent = async () => {
      if (!cartItems.length) {
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        // Format items for the API call
        const itemsForPayment = cartItems.map(item => ({
          price: item.price,
          quantity: item.quantity
        }));

        const { clientSecret, error } = await createPaymentIntent(
          itemsForPayment,
          options.currency || 'usd'
        );

        if (error) {
          setError(error);
        } else if (clientSecret) {
          setClientSecret(clientSecret);
        } else {
          setError('Failed to create payment intent');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchPaymentIntent();
  }, [cartItems, options.currency]);

  return {
    clientSecret,
    loading,
    error,
    totalAmount
  };
};