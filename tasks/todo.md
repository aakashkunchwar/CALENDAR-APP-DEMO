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

## Phase 2 — Bollywood Celebrity Images

- [x] **8. Add month image banner in `index.html`** — insert an `<img id="monthBanner">` between the spiral and the cal-header
- [x] **9. Add 12 Pixabay image URLs in `app.js`** — one per month (Jan–Dec), fetched via Pixabay API key
- [x] **10. Wire banner to navigation in `app.js`** — update `renderCalendar()` to set `monthBanner.src` to the current month's image
- [x] **11. Style the banner in `style.css`** — 180px tall (120px mobile), `object-fit: cover`, sits between spiral and month header

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
