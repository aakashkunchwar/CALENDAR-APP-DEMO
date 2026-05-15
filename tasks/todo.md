# Calendar App — Todo

## Checklist

- [x] **1. Create `index.html`** — semantic shell: header nav, calendar grid container, modal markup, script/style links
  - Acceptance: page loads in browser with no 404 errors on linked assets; modal is hidden by default; grid container is present

- [x] **2. Create `style.css`** — layout, grid, event chips, modal overlay, responsive breakpoints
  - Acceptance: month grid renders in 7 columns; today's date is highlighted; modal is centered and overlays the page; layout is usable at 375 px width

- [x] **3. Create `app.js`** — state, `init`, `renderCalendar`, `renderEvents`, `navigate`, `openModal`, `closeModal`, `saveEvent`, `deleteEvent`, `persistEvents`
  - Acceptance: calendar renders current month on load; prev/next navigation works; events load from localStorage on refresh

- [x] **4. Add/Edit event flow** — clicking a day opens modal pre-filled with date; clicking an event chip opens modal with existing data; Save button upserts event
  - Acceptance: new event chip appears on correct day after save; edited event reflects updated title/time

- [x] **5. Delete event flow** — Delete button in edit modal removes the event
  - Acceptance: chip disappears immediately; event gone after page reload

- [x] **6. Validation** — Title required; Date required (enforced by `<input type="date">`); show inline error if title is empty on submit
  - Acceptance: submitting with blank title shows an error message and does not save; valid form saves cleanly

- [x] **7. localStorage persistence** — `persistEvents()` called after every mutation; `init()` loads from `localStorage`
  - Acceptance: add an event, hard-reload, event still shows

---

## Phase 3 — Replace Images + Attribution

- [x] **12. Replace 12 Pixabay URLs with Wikimedia Commons CC-licensed URLs in `app.js`** — one per month (Jan–Dec), each confirmed CC-licensed
- [x] **13. Add attribution data array in `app.js`** — artist name, license, and Wikimedia Commons page link per image
- [x] **14. Add a credit bar in `index.html`** — small `<div id="photoCredit">` below the calendar card
- [x] **15. Wire credit bar in `app.js`** — update on every navigation to show current month's photo credit
- [x] **16. Style the credit bar in `style.css`** — small muted text, right-aligned, unobtrusive

---

## Phase 2 — Bollywood Celebrity Images

- [x] **8. Add month image banner in `index.html`** — insert an `<img id="monthBanner">` between the spiral and the cal-header
- [x] **9. Add 12 Pixabay image URLs in `app.js`** — one per month (Jan–Dec), fetched via Pixabay API key
- [x] **10. Wire banner to navigation in `app.js`** — update `renderCalendar()` to set `monthBanner.src` to the current month's image
- [x] **11. Style the banner in `style.css`** — 180px tall (120px mobile), `object-fit: cover`, sits between spiral and month header

---

## Phase 4 — Accessibility (a11y) Audit

### Issues found

#### Critical — WCAG 2.1 AA failures

| # | File | Issue | WCAG criterion |
|---|------|-------|----------------|
| A1 | `index.html` + `app.js` | `div.day-cell` — has click handler but no `tabindex="0"` or `role="button"`; unreachable by keyboard | 2.1.1 Keyboard |
| A2 | `app.js` | `span.event-chip` — same problem: click-only, no keyboard access | 2.1.1 Keyboard |
| A3 | `style.css` | `.cal-dow .dow-sun` — `#ff3d4f` on `#f2f3f8` ≈ 3.15:1; needs 4.5:1 for normal text | 1.4.3 Contrast |
| A4 | `style.css` | `.photo-credit` / `.photo-credit a` — `#888` on `#d6dae6` ≈ 2.5:1; needs 4.5:1 | 1.4.3 Contrast |
| A5 | `style.css` | `.day-cell.other-month .day-num` — `#c2c6d6` on `#fff` ≈ 1.67:1; needs 4.5:1 | 1.4.3 Contrast |
| A6 | `index.html` | `#monthLabel` — no `aria-live`; month change not announced to screen readers | 4.1.3 Status Messages |
| A7 | `index.html` | `#fieldTitle` and `#fieldDate` — missing `required` attribute and `aria-required="true"` | 1.3.1 Info & Relationships |
| A8 | `index.html` | `#fieldTitle` — not linked to `#titleError` via `aria-describedby`; error not announced | 1.3.1 Info & Relationships |
| A9 | `style.css` | Buttons (`.nav-btn`, `.close-btn`, `.btn-save`, `.btn-delete`) — no `:focus-visible` style | 2.4.7 Focus Visible |
| A10 | `style.css` | Form inputs — `outline: none` on `:focus` without a robust replacement | 2.4.7 Focus Visible |

#### Moderate — best practice violations

| # | File | Issue |
|---|------|-------|
| B1 | `index.html` + `app.js` | `alt="Month photo"` is static; should name the celebrity shown each month |
| B2 | `index.html` | `.spiral` rings — purely decorative but not `aria-hidden="true"` |
| B3 | `index.html` | `<main id="calGrid">` — no `aria-label` to identify it as a calendar |
| B4 | `app.js` | Day cells — accessible name is just a number; no full date for screen readers |
| B5 | `app.js` | Modal — no focus trap; Tab can escape an open modal |
| B6 | `style.css` | `.close-btn` — `#888` on `#fff` ≈ 3.54:1; fails 4.5:1 (button text is ~22px non-bold) |
| B7 | `app.js` | Photo credit link opens `target="_blank"` with no accessible new-tab warning |

### Fix checklist

- [x] **A1** — Added `tabindex="0"`, `role="button"`, and keydown (Enter/Space) handler to each day cell in `app.js`
- [x] **A2** — Added `tabindex="0"`, `role="button"`, and keydown handler to each event chip in `app.js`
- [x] **A3** — Changed `.cal-dow .dow-sun` color from `#ff3d4f` to `#b91c1c` (5.85:1 on `#f2f3f8`) in `style.css`
- [x] **A4** — Changed `.photo-credit` text color from `#888` to `#555` (5.43:1 on `#d6dae6`) in `style.css`
- [x] **A5** — Changed `.day-cell.other-month .day-num` color from `#c2c6d6` to `#6b7280` (4.64:1 on `#f8f9fc`) in `style.css`
- [x] **A6** — Added `aria-live="polite" aria-atomic="true"` to `#monthLabel` in `index.html`
- [x] **A7** — Added `required aria-required="true"` to `#fieldTitle` and `#fieldDate` in `index.html`
- [x] **A8** — Added `aria-describedby="titleError"` to `#fieldTitle` in `index.html`
- [x] **A9** — Added `:focus-visible` outline to all four buttons in `style.css`
- [x] **A10** — Added `input:focus-visible` block with `outline: 2px solid #12152a` in `style.css`
- [x] **B1** — Added `celebrity` field to `MONTH_CREDITS`; `renderCalendar()` now sets `banner.alt` dynamically in `app.js`
- [x] **B2** — Added `aria-hidden="true"` to `.spiral` div in `index.html`
- [x] **B3** — Added `aria-label="Calendar grid"` to `<main id="calGrid">` in `index.html`
- [x] **B4** — Each day cell now gets `aria-label` set to its full localized date string in `app.js`
- [x] **B5** — Added Tab/Shift+Tab focus-trap logic inside modal keydown handler in `app.js`
- [x] **B6** — Changed `.close-btn` color from `#888` to `#666` (5.74:1 on white) in `style.css`
- [x] **B7** — Photo credit link now has `aria-label="View on Wikimedia Commons (opens in new tab)"` in `app.js`

---

## Phase 5 — Layout: Center Calendar + Credit Bar at Bottom

### Checklist
- [x] **L1** — `body`: added `flex-direction: column`, changed `align-items: flex-start` → `align-items: center`
- [x] **L2** — `.photo-credit`: now `position: fixed; bottom: 0; left: 0; right: 0` with `rgba(214,218,230,0.92)` background

---

## Review — Phase 4 (Accessibility)

All 17 a11y issues fixed across 3 files:

| File | Changes |
|------|---------|
| `index.html` | `aria-hidden` on spiral; `aria-live`+`aria-atomic` on month label; `aria-label` on calendar grid; `required`+`aria-required`+`aria-describedby` on form inputs |
| `style.css` | 4 contrast fixes (`#b91c1c`, `#6b7280`, `#555`, `#666`); `:focus-visible` outlines on all 4 buttons; `:focus-visible` outline on all form inputs |
| `app.js` | `celebrity` field added to `MONTH_CREDITS`; dynamic `alt` on banner; `role="button"` + `tabindex="0"` + keydown on day cells and event chips; full-date `aria-label` on day cells; Tab focus trap in modal; new-tab `aria-label` on credit link |

---

## Review

All 7 tasks completed in one pass. Three files created:

| File | What it does |
|------|-------------|
| `index.html` | Semantic shell — header nav, 7-col dow labels, `#calGrid` container, hidden modal with form |
| `style.css` | CSS Grid layout (7 cols, 42 cells), today highlight, event chips, modal overlay with slide-up animation, responsive at 600 px |
| `app.js` | Self-contained vanilla JS: state (`currentYear/Month`, `events[]`), `renderCalendar` (6-row × 7-col grid including prev/next month overflow), `renderEvents` (injects chips), `navigate`, `openModal`/`closeModal`, `saveEvent` (upsert with title validation), `deleteEvent`, `persistEvents` (localStorage) |

**Phase 2 changes (Bollywood images):**

| File | Change |
|------|--------|
| `index.html` | Added `<img id="monthBanner" class="month-banner">` between spiral and cal-header |
| `app.js` | Added `MONTH_IMAGES` array (12 Pixabay URLs, Jan–Dec); `renderCalendar` now sets `monthBanner.src` |
| `style.css` | `.month-banner` — 180px height, `object-fit: cover`, 120px on mobile |

**Key decisions:**
- 42-cell grid (6 rows × 7 cols) always rendered — handles all month layouts including 5- and 6-week months.
- `crypto.randomUUID()` for unique event IDs (widely supported, no dependency needed).
- `hidden` attribute on modal rather than `display:none` toggle — accessible and avoids FOUC.
- Escape key and backdrop click both close the modal.
- No external dependencies — opens directly as `file://` with no build step.
