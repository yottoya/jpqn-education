# Plan: f6fa30d8-81de-4edd-b8cd-1234d1d0dd3a

## Overview

Modernize homepage sections after HeroSection using shadcn components, cards, and icons. Build FAQ section with Accordion. FAQ is the last section before footer.

---

## Phase 1: Install accordion + build FAQ

| # | File | Change |
|---|---|---|
| 1 | shadcn add accordion | Install accordion component |
| 2 | faq-section.tsx | Build FAQ using Accordion with 8 Q&A items |

## Phase 2: Modernize existing sections

| # | File | Change |
|---|---|---|
| 3 | problems-section.tsx | Card grid with lucide icons |
| 4 | solution-section.tsx | Card grid with lucide icons |
| 5 | mission-section.tsx | Centered card with accent styling |
| 6 | vision-section.tsx | Card with quote styling |
| 7 | services-section.tsx | Refine card spacing + hover effects |
| 8 | policy-section.tsx | Card container |

## Phase 3: Wire up

| # | File | Change |
|---|---|---|
| 9 | index.ts | Add FaqSection to barrel export |
| 10 | page.tsx | Add FaqSection at bottom (before footer) |

## UUID
f6fa30d8-81de-4edd-b8cd-1234d1d0dd3a