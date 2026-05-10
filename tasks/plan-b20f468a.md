# Plan: b20f468a-ce08-41c6-9ec2-574f2194dbd9

## Overview

Two-part feature: (1) make waiver-inquiry form support multi-service selection, (2) build enrollment form with Stripe Checkout on a dedicated page accessible via `?email=` query param.

---

## Phase 1: Waiver Inquiry Form — Multi-Select Services

### Data Model
- Change `selected_service VARCHAR(255)` → `selected_services TEXT` (JSON array of service IDs)
- Drop `weekly_hours INTEGER` and `weekly_rate INTEGER` from waiver_inquiries table (these move to enrollment form)
- Service IDs come from `data/services.json` (stable, in source control)

### Files
| # | File | Change |
|---|---|---|
| 1 | `lib/db/schema.ts` | `selectedService: text("selected_services")`, remove `weeklyHours`/`weeklyRate` |
| 2 | `lib/db/migrate.ts` | `ALTER TABLE` — drop old columns, add new `selected_services TEXT` |
| 3 | `data/waiver-form-questions.json` | Add `selected_services` field (checkbox array) |
| 4 | `components/forms/waiver-inquiry-form.tsx` | Replace `<Select>` with checkboxes per service, remove hours/rate/location |
| 5 | `app/api/waiver-inquiry/route.ts` | Accept `selected_service_ids: string[]`, store as JSON, update email templates |
| 6 | `app/inquiry-booking-calendar/page.tsx` | (no change, already exists) |

---

## Phase 2: Enrollment Form

### Pages & Routes
| Route | Purpose |
|---|---|
| `GET /api/enrollment?email=` | Fetch waiver inquiry data by parent email, join with services.json |
| `POST /api/create-checkout-session` | Create Stripe Checkout Session with dynamic line items |
| `/enrollment?email=` | Enrollment form page (pre-filled, grayed-out fields + hours selectors) |
| `/enrollment-thank-you` | Post-payment thank-you page with GHL booking iframe |

### Files
| # | File | Change |
|---|---|---|
| 7 | `pnpm add stripe` | Install Stripe SDK |
| 8 | `app/api/enrollment/route.ts` | `GET ?email=` → query waiver_inquiries, return parent/student/services data |
| 9 | `components/forms/enrollment-form.tsx` | Client form: read-only pre-filled fields, hours-per-service dropdowns, computed total, Stripe Checkout button |
| 10 | `app/enrollment/page.tsx` | Server page reads `?email=`, fetches data, renders form |
| 11 | `app/api/create-checkout-session/route.ts` | `POST` — accept line_items, create Stripe Checkout Session, return `{ url }` |
| 12 | `app/enrollment-thank-you/page.tsx` | Thank-you page with GHL booking iframe |
| 13 | `next.config.ts` | Add `stripe` to `serverExternalPackages` |

---

## Config

### ENV Vars to add to `.env`:
```
STRIPE_SECRET_KEY=op://developer/jpqn-dev-env/stripe-secret-key
```

### Cloudflare (manual):
```
npx wrangler secret put STRIPE_SECRET_KEY
```

---

## Flow

```
/waiver-inquiry (multi-checkbox services)
    → /inquiry-booking-calendar (book call with Julia)
        → Julia sends link: /enrollment?email=parent@email.com
            → Pre-filled form, pick hours per service, Stripe Checkout
                → /enrollment-thank-you (GHL booking iframe)
```

---

## UUID
`b20f468a-ce08-41c6-9ec2-574f2194dbd9`
