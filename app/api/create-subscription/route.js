import { NextResponse } from 'next/server';
import Razorpay from 'razorpay';

export async function POST(req) {
  try {
    const instance = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID || '',
      key_secret: process.env.RAZORPAY_KEY_SECRET || '',
    });

    const result = await instance.subscriptions.create({
      plan_id: process.env.SUBSCRIPTION_PLAN_ID || '',
      customer_notify: 1,
      quantity: 1,
      addons: [],
      total_count: 1,
      notes: {
        key1: 'Note',
      },
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error creating subscription:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
