'use client';

import { useState } from 'react';
import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { CartItem } from '../types';
import OrderSummary from './OrderSummary';
import { CompleteTheme } from '../utils/themeProcessor';

interface CheckoutFormProps {
  cartItems: CartItem[];
  clientSecret: string;
  successUrl: string;
  cancelUrl: string;
  theme: CompleteTheme;
  onPaymentSuccess?: (paymentId: string) => void;
  onPaymentError?: (error: any) => void;
}

// Helper functions to safely get theme properties
const getTextProp = (theme: CompleteTheme, key: keyof typeof theme.text) => {
  return theme.text[key];
};

const getColor = (theme: CompleteTheme, key: keyof typeof theme.colors) => {
  return theme.colors[key];
};

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
  const containerStyle: React.CSSProperties = {
    backgroundColor: theme.colors.background,
    borderRadius: theme.borderRadius,
    fontFamily: theme.fonts.family,
    color: theme.colors.text,
    padding: theme.spacing.contentPadding,
    boxShadow: theme.effects.cardShadow,
  };

  const headerStyle: React.CSSProperties = {
    color: theme.colors.primary,
    fontSize: theme.fonts.headingSize,
    fontWeight: theme.fonts.weightBold,
    marginBottom: theme.spacing.unit,
    textAlign: 'center',
  };

  const subheaderStyle: React.CSSProperties = {
    fontSize: theme.fonts.subheadingSize,
    color: theme.colors.secondary,
    marginBottom: theme.spacing.gridRow,
    textAlign: 'center',
  };

  const cardStyle: React.CSSProperties = {
    backgroundColor: theme.colors.cardBackground,
    borderRadius: theme.borderRadius,
    padding: theme.spacing.contentPadding,
    marginBottom: theme.spacing.sectionGap,
    boxShadow: theme.effects.cardShadow,
    border: '1px solid rgba(0, 0, 0, 0.05)',
  };

  const sectionTitleStyle: React.CSSProperties = {
    color: theme.colors.primary,
    fontSize: theme.fonts.sizeLarge,
    fontWeight: theme.fonts.weightBold,
    marginBottom: theme.spacing.gridRow,
    padding: '0 0 10px 0',
    borderBottom: `1px solid ${theme.colors.border}`,
  };

  const payButtonStyle: React.CSSProperties = {
    backgroundColor: theme.colors.primary,
    color: theme.colors.buttonText || 'white',
    borderRadius: theme.borderRadius,
    fontSize: theme.fonts.buttonTextSize || '16px',
    fontWeight: theme.fonts.weightMedium,
    padding: '12px 24px',
    width: '100%',
    height: '54px',
    border: 'none',
    cursor: 'pointer',
    position: 'relative',
    overflow: 'hidden',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    marginTop: '20px',
    transition: 'all 0.2s ease',
  };

  const buttonTextStyle: React.CSSProperties = {
    position: 'relative',
    zIndex: 1,
    fontSize: '16px',
    fontWeight: 600,
  };

  const buttonSpinnerStyle: React.CSSProperties = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '22px',
    height: '22px',
    borderRadius: '50%',
    border: `2px solid rgba(255, 255, 255, 0.3)`,
    borderTopColor: 'white',
    animation: 'spin 1s linear infinite',
  };

  const errorContainerStyle: React.CSSProperties = {
    padding: '12px 16px',
    marginBottom: '20px',
    backgroundColor: `rgba(239, 68, 68, 0.1)`,
    color: theme.colors.error,
    borderRadius: theme.borderRadius,
    border: `1px solid rgba(239, 68, 68, 0.2)`,
  };

  const securityMessageStyle: React.CSSProperties = {
    textAlign: 'center',
    fontSize: '14px',
    color: theme.colors.secondary,
    marginTop: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '6px',
  };

  // Get text content from theme with fallbacks
  const showOrderSummary = getTextProp(theme, 'showOrderSummary') as boolean;
  const showSecurityMessage = getTextProp(theme, 'showSecurityMessage') as boolean;
  const heading = getTextProp(theme, 'heading') as string;
  const subheading = getTextProp(theme, 'subheading') as string;
  const orderSummaryTitle = getTextProp(theme, 'orderSummaryTitle') as string;
  const paymentDetailsTitle = getTextProp(theme, 'paymentDetailsTitle') as string;
  const payButtonText = getTextProp(theme, 'payButtonText') as string;
  const processingText = getTextProp(theme, 'processingText') as string;
  const securityMessage = getTextProp(theme, 'securityMessage') as string;

  // CSS for animation
  const spinnerCss = `
    @keyframes spin {
      0% { transform: translate(-50%, -50%) rotate(0deg); }
      100% { transform: translate(-50%, -50%) rotate(360deg); }
    }
    
    .pay-button:hover {
      filter: brightness(1.05);
      transform: translateY(-1px);
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
    
    .pay-button:active {
      filter: brightness(0.95);
      transform: translateY(1px);
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
    }
  `;

  return (
    <div style={containerStyle}>
      <style>{spinnerCss}</style>
      
      <h1 style={headerStyle}>{heading}</h1>
      <p style={subheaderStyle}>{subheading}</p>

      <form onSubmit={handleSubmit} style={{ maxWidth: '500px', margin: '0 auto' }}>
        {showOrderSummary && (
          <OrderSummary 
            cartItems={cartItems} 
            theme={theme} 
            title={orderSummaryTitle as string} 
          />
        )}

        <div style={cardStyle}>
          <h2 style={sectionTitleStyle}>
            {paymentDetailsTitle}
          </h2>
          <PaymentElement className="mb-6" />
        </div>

        {error && (
          <div style={errorContainerStyle}>
            <p style={{ fontWeight: 600, marginBottom: '4px' }}>Payment Error</p>
            <p style={{ fontSize: '14px' }}>{error}</p>
          </div>
        )}

        <button
          type="submit"
          disabled={!stripe || processing}
          style={payButtonStyle}
          className="pay-button"
        >
          {processing ? (
            <>
              <span style={buttonTextStyle}>{processingText}</span>
              <div style={buttonSpinnerStyle}></div>
            </>
          ) : (
            <span style={buttonTextStyle}>{payButtonText}</span>
          )}
        </button>

        {showSecurityMessage && (
          <div style={securityMessageStyle}>
            <span style={{ fontSize: '16px' }}>🔒</span>
            <span>{securityMessage}</span>
          </div>
        )}
      </form>
    </div>
  );
};

export default CheckoutForm;