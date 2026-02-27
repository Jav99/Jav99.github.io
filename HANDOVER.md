# Technical Handover: Hannah White Career Strategist (v3.0)

## 1. System Architecture Overview

A high-end, editorial career consultancy platform built for scale and security.

- **Frontend:** Next.js 14+ (App Router), Tailwind CSS, Framer Motion
- **Styling Engine:** Editorial Minimalism (Ref: Suraya Shivji, Clay, BASIC/DEPT)
- **Database & Auth:** Supabase (PostgreSQL)
- **Storage:** Supabase Buckets (Secure Resume PDF hosting)
- **Payments:** Stripe (Checkout Sessions)
- **Onboarding/Intake:** Tally.so (Embedded multi-step form)
- **Operations CRM:** Notion (Direct Tally-to-Notion integration for fulfillment)

## 2. Integrated Data Flow

The "Happy Path" from landing to delivery:

1. **Lead Capture:** User lands on the home page and interacts with the "Rate My Resume" lead magnet.
2. **Conversion:** User selects a bundle and is redirected to Stripe Checkout.
3. **Authentication & Gating:** Upon payment, Stripe redirects the user to /onboarding.
   - Middleware verifies the Stripe checkout_session_id or a Supabase `is_paid` flag before granting access.
4. **Intake:** User completes the multi-question Tally Form and uploads their current resume.
5. **Data Storage:**
   - Resume PDF → Supabase Storage bucket `/resumes`
   - Client Context → Tally sends form data to the Notion CRM
6. **Fulfillment:** Hannah White receives a notification in Notion, reviews the resume, and begins the strategy rewrite.

## 3. Environment Variables (.env.local)

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Connection to Supabase Project |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Public key for client-side database calls |
| `STRIPE_SECRET_KEY` | Server-side key for processing payments |
| `STRIPE_WEBHOOK_SECRET` | Validates incoming payment signals from Stripe |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Used for Stripe Checkout client-side |
| `ANTHROPIC_API_KEY` | Required for the Resume Audit Brain |

## 4. AI Logic & Integration

- **AI Engine:** Claude API (Anthropic)
- **Pipeline:**
  1. PDF Extraction: `pdf-parse` (Node.js) converts File to string
  2. Analysis Route: `/api/rate-resume` receives text, sends to AI with rubric from AI_PROMPT.md
  3. Persistence: Store the score and hannah_take in Supabase `public.audits` table
- **Rate Limiting:** 3-tries-per-IP using in-memory limiter (upgrade to Upstash for production)

## 5. Key Component Directory

- `/src/app/api/webhooks/stripe/` — Stripe payment webhook listener
- `/src/app/api/rate-resume/` — AI resume audit endpoint
- `/src/app/api/checkout/` — Stripe checkout session creation
- `/src/app/onboarding/` — Protected route with Tally embed
- `/src/app/success/` — Post-payment confirmation page
- `/src/components/ui/` — Reusable UI components (Button, Card, Badge, etc.)
- `/src/lib/supabase.ts` — Supabase client singleton
- `/src/lib/stripe.ts` — Stripe client setup

## 6. Security & Guardrails

- **File Privacy:** The /resumes bucket in Supabase must be Private. Access via Signed URLs.
- **Payment Gating:** The /onboarding route has middleware to prevent URL skipping.
- **Form Integrity:** Tally hidden fields pass User_ID or Email to match paying customers.
- **Demo Mode:** When API keys are not configured, the platform returns mock data for testing.
