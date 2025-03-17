import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { getToken } from 'next-auth/jwt';
import connectDB from '@/config/db';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2023-10-16'
});

export async function POST(req: Request) {
    try {
        const { amount, description } = await req.json();

        // Create Stripe payment intent
        const paymentIntent = await stripe.paymentIntents.create({
            amount: Math.round(amount * 100), // Convert to smallest currency unit (e.g., cents for USD)
            currency: 'inr',
            payment_method_types: ['card'],
            description: description || 'Order transaction',
        });

        return NextResponse.json({
            clientSecret: paymentIntent.client_secret
        });
    } catch (error: any) {
        console.error('Stripe Error:', error.message);

        // Return the actual error details in the response
        return NextResponse.json(
            {
                error: 'Failed to initialize payment',
                message: error.message,
                type: error.type,
                code: error.code,
                // Include the raw error for debugging
                details: error.raw || error
            },
            { status: 500 }
        );
    }
}

