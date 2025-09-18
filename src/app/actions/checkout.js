'use server';
import { publicApi } from "@/lib/axiosInstance";
import { log } from '@/lib/utils';
import stripe from "@/lib/stripe/stripe-server";


/**
 * Action for Create Payment Intent
 * @param {object} payload { amount and currency } required
 * @returns {object} {success , clientSecret}
 */
export const createPaymentIntent = async (payload = {}) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: payload.amount,
      currency: payload.currency,
      receipt_email: payload.email,
    });
    
    return {
      success: true,
      clientSecret: paymentIntent.client_secret,
      paymentIntent: paymentIntent.id,
    };
  } catch (error) {
    log(error);
    return {
      success: false,
      error: `Server Error Please Try Again: ${error.message}`,
    };
  }
};


export const testAction = async () => {
  return { ok: true };
};