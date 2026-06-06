import Stripe from "stripe";
import { plans, type ServicePlanId } from "@/lib/service-content";

export function getStripe() {
  const secretKey = process.env.STRIPE_TEST_SECRET_KEY ?? process.env.STRIPE_SECRET_KEY;

  if (!secretKey) {
    throw new Error("Missing Stripe secret key.");
  }

  return new Stripe(secretKey, {
    typescript: true
  });
}

export function getPlanForCheckout(planId: ServicePlanId) {
  const plan = plans.find((item) => item.id === planId);

  if (!plan) {
    return null;
  }

  const priceId = process.env[plan.envKey];

  if (!priceId) {
    throw new Error(`Missing Stripe price environment variable: ${plan.envKey}`);
  }

  return {
    plan,
    priceId
  };
}

export function getBaseUrl(request: Request) {
  const host = request.headers.get("host");
  const protocol = host?.includes("localhost") ? "http" : "https";

  return process.env.NEXT_PUBLIC_SITE_URL ?? `${protocol}://${host}`;
}
