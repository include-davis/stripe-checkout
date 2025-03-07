'use client';

import React from 'react';
import { PaymentStatusProps, ThemeOptions } from '../types';
import { createTheme } from '../utils/theme';

interface PaymentStatusComponentProps extends PaymentStatusProps {
  theme?: ThemeOptions;
}

const PaymentStatus: React.FC<PaymentStatusComponentProps> = ({
  status,
  message,
  returnUrl,
  theme: userTheme,
}) => {
  const theme = createTheme(userTheme);

  // Determine status-specific properties
  const statusConfig = {
    success: {
      icon: '✅',
      title: 'Payment Successful!',
      defaultMessage: 'Thank you for your purchase.',
      buttonText: 'Return to Shop',
      buttonColor: theme.colors.success,
      bgColor: `${theme.colors.success}10`, // 10% opacity
    },
    error: {
      icon: '❌',
      title: 'Payment Failed',
      defaultMessage: 'There was a problem processing your payment.',
      buttonText: 'Try Again',
      buttonColor: theme.colors.error,
      bgColor: `${theme.colors.error}10`, // 10% opacity
    },
    canceled: {
      icon: '🚫',
      title: 'Payment Canceled',
      defaultMessage: 'Your payment was canceled.',
      buttonText: 'Return to Shop',
      buttonColor: theme.colors.primary,
      bgColor: `${theme.colors.primary}10`, // 10% opacity
    },
  };

  const config = statusConfig[status];
  const displayMessage = message || config.defaultMessage;

  // Style objects based on theme
  const containerStyle = {
    backgroundColor: config.bgColor,
    borderRadius: theme.borderRadius,
    fontFamily: theme.fonts.family,
  };

  const buttonStyle = {
    backgroundColor: config.buttonColor,
    borderRadius: theme.borderRadius,
  };

  return (
    <div
      style={containerStyle}
      className="max-w-md mx-auto my-12 p-8 text-center rounded-lg shadow-md"
    >
      <div className="text-5xl mb-4">{config.icon}</div>
      <h1 className="text-3xl font-bold mb-4">{config.title}</h1>
      <p className="mb-8 text-gray-700">{displayMessage}</p>
      
      <a
        href={returnUrl}
        style={buttonStyle}
        className="inline-block px-6 py-3 text-white font-medium rounded hover:opacity-90 transition-opacity"
      >
        {config.buttonText}
      </a>
    </div>
  );
};

export default PaymentStatus;