/**
 * Create a route handler for the payment intent API
 * 
 * Usage example in Next.js API route:
 * ```
 * // app/api/create-payment-intent/route.ts
 * import { createPaymentIntentHandler } from 'easy-stripe-checkout';
 * import { NextResponse } from 'next/server';
 * 
 * const handler = createPaymentIntentHandler({
 *   secretKey: process.env.STRIPE_SECRET_KEY!,
 * });
 * 
 * export async function POST(request: Request) {
 *   return handler(request, NextResponse);
 * }
 * ```
 */

// Server-side utility for payment intent creation
import Stripe from 'stripe';

/**
 * Create a route handler for the payment intent API
 */
export function createPaymentIntentHandler({
  secretKey,
  apiVersion = '2025-02-24.acacia',
}: {
  secretKey: string;
  apiVersion?: Stripe.LatestApiVersion;
}) {
  // Initialize Stripe
  const stripe = new Stripe(secretKey, { apiVersion });

  // Return the handler function
  return async (request: Request, responseClass: any) => {
    try {
      const { items, currency = 'usd' } = await request.json();
      
      // Calculate total amount from items
      const amount = items.reduce(
        (sum: number, item: { price: number; quantity: number }) => 
          sum + item.price * item.quantity,
        0
      );

      if (!amount || amount < 50) { // Stripe minimum is 50 cents
        return responseClass.json(
          { error: 'Invalid amount' },
          { status: 400 }
        );
      }

      // Create payment intent
      const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency,
        automatic_payment_methods: {
          enabled: true,
        },
      });

      return responseClass.json({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
      console.error('Error creating payment intent:', error);
      
      return responseClass.json(
        { 
          error: 'Error creating payment intent',
          details: error instanceof Error ? error.message : 'Unknown error'
        },
        { status: 500 }
      );
    }
  };
}