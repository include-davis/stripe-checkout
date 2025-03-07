'use client';

import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { StripeCheckoutProps } from '../types';
import { getStripeClient } from '../utils/stripeClient';
import { createTheme, createStripeAppearance } from '../utils/theme';
import { useStripePayment } from '../hooks/useStripePayment';
import CheckoutForm from './CheckoutForm';

const StripeCheckout: React.FC<StripeCheckoutProps> = ({
  cartItems,
  options,
  theme: userTheme,
  stripePublicKey,
  onPaymentSuccess,
  onPaymentError,
}) => {
  // Get Stripe client
  const stripePromise = getStripeClient(stripePublicKey);
  
  // Get payment intent and status
  const { clientSecret, loading, error, totalAmount } = useStripePayment(cartItems, options);
  
  // Create theme with defaults
  const theme = createTheme(userTheme);
  
  if (loading) {
    return (
      <div className="min-h-64 flex items-center justify-center">
        <div className="text-center py-12">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-48 mx-auto mb-8"></div>
            <div className="h-64 bg-gray-100 rounded w-full max-w-md mx-auto"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 max-w-md mx-auto text-center">
        <div className="text-red-500 mb-4 text-xl">❌ Error</div>
        <p className="mb-4">{error}</p>
        <button 
          onClick={() => window.location.href = options.cancelUrl}
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
        >
          Return to Cart
        </button>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="p-6 max-w-md mx-auto text-center">
        <h1 className="text-2xl font-bold mb-4">Your Cart is Empty</h1>
        <p className="mb-6">Add some items to your cart to proceed with checkout</p>
        <a 
          href={options.cancelUrl} 
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Continue Shopping
        </a>
      </div>
    );
  }

  if (!clientSecret) {
    return (
      <div className="p-6 max-w-md mx-auto text-center">
        <div className="text-yellow-500 mb-4 text-xl">⚠️ Missing Configuration</div>
        <p className="mb-4">Unable to initialize payment. Please check your Stripe configuration.</p>
        <button 
          onClick={() => window.location.href = options.cancelUrl}
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
        >
          Return to Cart
        </button>
      </div>
    );
  }

  // Configure Stripe Elements
  const appearance = createStripeAppearance(theme);
  const elementsOptions = {
    clientSecret,
    appearance,
  };

  return (
    <Elements stripe={stripePromise} options={elementsOptions}>
      <CheckoutForm
        cartItems={cartItems}
        clientSecret={clientSecret}
        successUrl={options.successUrl}
        cancelUrl={options.cancelUrl}
        theme={theme}
        onPaymentSuccess={onPaymentSuccess}
        onPaymentError={onPaymentError}
      />
    </Elements>
  );
};

export default StripeCheckout;