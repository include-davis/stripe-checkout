'use client';

import { useState } from 'react';
import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { CartItem, ThemeOptions } from '../types';

interface CheckoutFormProps {
  cartItems: CartItem[];
  clientSecret: string;
  successUrl: string;
  cancelUrl: string;
  theme: Required<ThemeOptions>;
  onPaymentSuccess?: (paymentId: string) => void;
  onPaymentError?: (error: any) => void;
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({
  cartItems,
  clientSecret,
  successUrl,
  cancelUrl,
  theme,
  onPaymentSuccess,
  onPaymentError,
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);

  // Calculate total amount
  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setProcessing(true);

    try {
      const { error: submitError, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: successUrl,
        },
        redirect: 'if_required',
      });

      if (submitError) {
        setError(submitError.message ?? 'An error occurred');
        onPaymentError?.(submitError);
      } else if (paymentIntent && paymentIntent.status === 'succeeded') {
        // Payment successful without redirect
        onPaymentSuccess?.(paymentIntent.id);
        window.location.href = successUrl;
      } else if (paymentIntent) {
        // Handle other payment intent statuses
        setError(`Payment status: ${paymentIntent.status}`);
      }
    } catch (err) {
      console.error('Payment confirmation error:', err);
      setError('An unexpected error occurred');
      onPaymentError?.(err);
    } finally {
      setProcessing(false);
    }
  };

  // Prepare dynamic style object based on theme
  const containerStyle = {
    backgroundColor: `${theme.colors.background}10`, // Add transparency
    borderRadius: theme.borderRadius,
    fontFamily: theme.fonts.family,
    color: theme.colors.text,
  };

  const buttonStyle = {
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius,
  };

  const headerStyle = {
    color: theme.colors.primary,
  };

  return (
    <div style={containerStyle} className="p-8 rounded-xl shadow-lg">
      <div className="text-center mb-8">
        <h1 style={headerStyle} className="text-3xl font-bold">
          {theme.customHeading}
        </h1>
        <p className="mt-2 text-gray-600">{theme.customSubheading}</p>
      </div>

      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        {theme.showOrderSummary && (
          <div className="bg-white p-6 rounded-lg mb-8 shadow-sm">
            <h2 style={headerStyle} className="text-xl font-semibold mb-4">
              Order Summary
            </h2>
            {cartItems.map((item) => (
              <div key={item.id} className="flex justify-between mb-2">
                <span className="font-medium">
                  {item.name} × {item.quantity}
                </span>
                <span>${((item.price * item.quantity) / 100).toFixed(2)}</span>
              </div>
            ))}
            <div className="border-t mt-4 pt-4">
              <div className="flex justify-between font-semibold text-lg">
                <span>Total</span>
                <span>${(total / 100).toFixed(2)}</span>
              </div>
            </div>
          </div>
        )}

        <div className="bg-white p-6 rounded-lg mb-8 shadow-sm">
          <h2 style={headerStyle} className="text-xl font-semibold mb-4">
            Payment Details
          </h2>
          <PaymentElement className="mb-6" />
        </div>

        {error && (
          <div className="mb-4 p-4 bg-red-50 text-red-600 rounded-lg border border-red-200">
            <p className="font-medium">Payment Error</p>
            <p className="text-sm">{error}</p>
          </div>
        )}

        <button
          type="submit"
          disabled={!stripe || processing}
          style={buttonStyle}
          className="w-full text-white py-4 px-6 rounded-lg hover:opacity-90 
                   disabled:opacity-50 transition-colors duration-200 text-lg font-medium shadow-sm"
        >
          {processing ? 'Processing...' : 'Pay Now'}
        </button>

        <p className="text-center text-gray-500 text-sm mt-4">
          🔒 Payments are securely processed by Stripe
        </p>
      </form>
    </div>
  );
};

export default CheckoutForm;