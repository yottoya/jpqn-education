import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import services from "@/data/services.json";

const SERVICE_MAP = new Map(services.map((s) => [s.id, s]));

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { line_items, parent_email, student_name } = body as {
      line_items: { service_id: string; hours: number }[];
      parent_email: string;
      student_name: string;
    };

    if (!line_items?.length) {
      return NextResponse.json(
        { error: "No line items provided" },
        { status: 400 },
      );
    }

    if (!parent_email) {
      return NextResponse.json(
        { error: "parent_email is required" },
        { status: 400 },
      );
    }

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

    const origin = request.headers.get("origin") || "https://jpqnedu.org";
    const cancelUrl = `${origin}/enrollment?email=${encodeURIComponent(parent_email)}`;
    const successUrl = `${origin}/enrollment-thank-you`;

    const sessionLineItems = line_items.map((item) => {
        const svc = SERVICE_MAP.get(item.service_id);
        const label = svc?.label || item.service_id;
        const ratePerHour =
          svc?.weekly_rates[String(item.hours) as keyof typeof svc.weekly_rates] || 0;
        const unitAmount = ratePerHour * 100;

        return {
          quantity: 1,
          price_data: {
            currency: "usd",
            product_data: {
              name: `${label} — ${item.hours} hrs/week`,
            },
            unit_amount: unitAmount,
          },
        };
      });

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: sessionLineItems,
      customer_email: parent_email,
      metadata: {
        student_name,
        parent_email,
      },
      success_url: successUrl,
      cancel_url: cancelUrl,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("Checkout session error:", err);
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 },
    );
  }
}
