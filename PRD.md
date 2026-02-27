# Product Requirements Document: Hannah White Platform

**Version:** 4.0 (Final Architecture)
**Status:** Ready for Build
**Stack:** Next.js + Supabase + Stripe + Tally + Notion

## 1. Executive Summary

The Hannah White platform is a high-ticket career consultancy site. It positions Hannah as an elite strategist through an editorial-grade flow from social proof to payment, ending in a high-touch onboarding experience.

## 2. The Tech Stack

- **Frontend:** Next.js 14+ (App Router) hosted on Vercel
- **Database/Auth:** Supabase (user profiles, payment status)
- **Storage:** Supabase Storage (private `resumes` bucket)
- **Payments:** Stripe Checkout Sessions
- **Intake Engine:** Tally.so (embedded on /onboarding)
- **Backend CRM:** Notion (via Tally integration)

## 3. User Journey & Feature Requirements

### Phase 1: The Hook (Live AI Audit)
- Interactive "Resume Scanner" providing instant, high-fidelity feedback
- Real-time scoring (0-100) based on the Hannah White rubric
- Technical Flow:
  - User drags PDF into Clay-style upload card
  - UI shows multi-stage loading sequence
  - Result: Editorial-style score with 3 bulleted critiques
- Conversion Hook: CTA changes to "Let Hannah Bridge the Gap"

### Phase 2: The Gate (Stripe Payment)
- Stripe Checkout integration with 3 service tiers
- Successful payment triggers webhook updating Supabase `is_paid` flag
- Redirect to /success page with onboarding link

### Phase 3: The Intake (Gated Onboarding)
- Protected route at /onboarding
- Embedded Tally Form (custom-themed)
- Middleware checks for valid payment session
- Tally collects: Target Role, Years of Experience, Career Hurdles
- Data flows to Notion CRM

## 4. Visual & Brand Requirements

- **Direction:** Suraya Shivji Spatial UI
- **Typography:** Large, high-contrast serif/sans-serif headers
- **Spacing:** Strict 8pt grid; extreme "breathability"
- **References:** Clay (UI), BASIC/DEPT (editorial), DD.NYC (branding)

## 5. Security & Functional Guardrails

- All keys in .env.local, never committed
- Resumes never public (Supabase RLS)
- Mobile-first per Luke Wroblewski
- WCAG AA compliance

## 6. Success Metrics

- Every Tally submission creates a new Notion page
- Notion page includes Supabase resume URL
- AI audit provides actionable, conversion-driving feedback
