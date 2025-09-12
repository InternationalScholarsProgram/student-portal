// src/utils/stripe.ts
import { loadStripe, Stripe } from '@stripe/stripe-js';

const stripeKey =
  "pk_test_51P6lWSFFEh3IsfPFGTSvBCH7gkkclDWdP1qvW1xzSQUPFegCpfxmueHwUfdUCVXNlz6MQtbBEybwTGS7RHxlzt9z00WIoEXVtT";
  
let stripePromise: Promise<Stripe | null>;

const getStripe = (): Promise<Stripe | null> => {
  if (!stripePromise) {
    stripePromise = loadStripe(stripeKey);
  }
  return stripePromise;
};

export default getStripe;