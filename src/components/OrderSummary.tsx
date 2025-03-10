'use client';

import { CartItem } from '../types';
import { CompleteTheme } from '../utils/themeProcessor';

interface OrderSummaryProps {
  cartItems: CartItem[];
  theme: CompleteTheme;
  title?: string;
}

/**
 * A standalone Order Summary component that we can style directly
 * without relying on Stripe's styling
 */
const OrderSummary: React.FC<OrderSummaryProps> = ({
  cartItems,
  theme,
  title = 'Order Summary'
}) => {
  // Calculate total amount
  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  
  // Custom styles for a more visually appealing order summary
  const cardStyle: React.CSSProperties = {
    backgroundColor: 'white',
    borderRadius: theme.borderRadius,
    padding: '20px',
    marginBottom: '24px',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    border: '1px solid rgba(0, 0, 0, 0.05)',
  };

  const titleStyle: React.CSSProperties = {
    fontSize: '20px',
    fontWeight: 600,
    color: theme.colors.primary,
    marginBottom: '16px',
    paddingBottom: '12px',
    borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
  };

  const itemRowStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 0',
    borderBottom: '1px dashed rgba(0, 0, 0, 0.05)',
  };

  const itemNameStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    fontWeight: 500,
  };

  const quantityStyle: React.CSSProperties = {
    fontSize: '14px',
    color: theme.colors.secondary,
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    padding: '2px 8px',
    borderRadius: '12px',
  };

  const priceStyle: React.CSSProperties = {
    fontWeight: 500,
  };

  const totalRowStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px 0 6px 0',
    marginTop: '8px',
    borderTop: '2px solid rgba(0, 0, 0, 0.1)',
  };

  const totalLabelStyle: React.CSSProperties = {
    fontSize: '18px',
    fontWeight: 600,
  };

  const totalPriceStyle: React.CSSProperties = {
    fontSize: '20px',
    fontWeight: 700,
    color: theme.colors.primary,
  };

  return (
    <div style={cardStyle}>
      <h2 style={titleStyle}>{title}</h2>
      
      <div>
        {cartItems.map((item) => (
          <div key={item.id} style={itemRowStyle}>
            <div style={itemNameStyle}>
              {item.name}
              <span style={quantityStyle}>×{item.quantity}</span>
            </div>
            <div style={priceStyle}>${((item.price * item.quantity) / 100).toFixed(2)}</div>
          </div>
        ))}
      </div>
      
      <div style={totalRowStyle}>
        <div style={totalLabelStyle}>Total</div>
        <div style={totalPriceStyle}>${(total / 100).toFixed(2)}</div>
      </div>
    </div>
  );
};

export default OrderSummary;