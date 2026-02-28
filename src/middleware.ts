import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Protect the /onboarding route
  if (request.nextUrl.pathname.startsWith("/onboarding")) {
    // Check for Stripe session ID in URL params
    const sessionId = request.nextUrl.searchParams.get("session_id");

    // If Supabase and Stripe are not configured, allow access (demo mode)
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const stripeKey = process.env.STRIPE_SECRET_KEY;

    if (!supabaseUrl || !stripeKey) {
      // Demo mode: allow access
      return NextResponse.next();
    }

    // In production: check for valid session
    if (!sessionId) {
      // Check if user came from success page (has referrer)
      const referer = request.headers.get("referer") ?? "";
      if (!referer.includes("/success")) {
        return NextResponse.redirect(new URL("/#services", request.url));
      }
    }

    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/onboarding/:path*"],
};
