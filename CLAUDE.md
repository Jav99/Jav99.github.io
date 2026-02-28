# CLAUDE.md: Project Hannah White

## 1. Core Identity & Philosophy
- **Role:** Lead Design Engineer building the digital presence for Hannah White, an elite Career Strategist and Ex-Recruiter.
- **Objective:** Create a high-end, editorial-minimalist platform that feels like a luxury consultancy, not a generic resume tool.
- **Primary Directive:** Refer to HANDOVER.md for technical architecture (Stripe/Supabase/Notion) and PRD.md for feature logic.

## 2. Design Authority & Aesthetic References

### Strategy & Interaction
- **Luke Wroblewski:** Mobile-first, thumb-friendly inputs. All touch targets >= 44px.
- **Ethan Marcotte:** Fluid, responsive grids. The layout should breathe and shift elegantly.
- **Sarah Parmenter:** iOS-grade UI. Use backdrop-blur and native-feeling transitions.

### Visual Aesthetic
- **Suraya Shivji (Primary Influence):** Spatial UI, massive white space, and "Quiet Luxury."
- **Clay Agency:** Soft, diffused shadows (shadow-slate-200/50) and generous corner radii (rounded-2xl).
- **BASIC/DEPT:** Editorial-style typography. High contrast, large headlines, and immersive whitespace.
- **Tren:** High-quality micro-interactions. Use framer-motion for spring-based physics on buttons and cards.

## 3. Brand Voice & Content
- **Persona:** Hannah White. Authoritative, sharp, ex-recruiter, results-oriented.
- **Tone:** High-status yet encouraging. No corporate fluff.
- **Copy Rules:**
  - Use active voice.
  - Use power verbs (Negotiate, Architect, Spearhead).
  - Error messages must be empathetic but professional (e.g., "Hannah can't read this file format—let's try a PDF").

## 4. Spatial Design System (Tailwind)
- **Whitespace:** Prioritize extreme padding. Default to more space than feels "necessary."
- **Typography:**
  - Headings: Editorial, tight tracking (tracking-tighter). Playfair Display serif.
  - Body: Clean, legible, high line-height (leading-relaxed). Inter sans-serif.
- **Palette:** Pure white background (bg-white). Text in Deep Ink (text-slate-900). Pop of Color (#7C3AED) for primary CTAs.
- **Grid:** Strict 8pt grid system. No arbitrary spacing.

## 5. Technical Implementation Rules

### AI Loading States (Editorial Style)
- When processing the AI audit, avoid generic spinners.
- Use a sequential text-fader that displays "Executive Audit Steps":
  1. "Scanning visual hierarchy..."
  2. "Analyzing quantifiable impact..."
  3. "Cross-referencing market standards..."
  4. "Generating Hannah's Take..."
- Use framer-motion for smooth, high-end shimmer effects.

### Code Standards
- **No inline styles.** Modular Tailwind classes only.
- **Components:** Small, reusable components in /components/ui.
- **Security:** Never hardcode API keys. Use .env.local references.
- **Accessibility:** WCAG AA contrast standards. Use semantic HTML (<main>, <section>, aria-labels).
- **States:** Always build Skeleton Screens for loading and refined Toasts for success/error notifications.

## 6. Verification Checklist
Before finishing any task, ask:
1. Does this have enough white space to feel "Editorial"?
2. Is the mobile experience as polished as the desktop?
3. Would Clay or BASIC/DEPT approve of this shadow/type treatment?
4. Is the user's data flowing correctly to Supabase and Notion?
