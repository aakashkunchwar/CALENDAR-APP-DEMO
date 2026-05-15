# Bollywood Calendar App

A simple, zero-dependency desk-calendar app built with plain HTML, CSS, and JavaScript. No install required — just open `index.html` in a browser and start using it.

---

## Features

- **Monthly calendar grid** — Displays all days of the current month in a 7-column layout. Overflow days from the previous and next months fill in the edges in a lighter colour.
- **Bollywood celebrity banner** — A different Bollywood celebrity photo appears at the top of the calendar every month, sourced from Wikimedia Commons.
- **Photo credit** — The photographer, license, and a link to the original Wikimedia page appear below the calendar and update automatically as you navigate months.
- **Add an event** — Click any day to open a form. Enter a title (required), date, optional time, and optional notes, then click **Save**.
- **Edit an event** — Click any saved event label to reopen the form with its details pre-filled. Update anything and save.
- **Delete an event** — Open any existing event and click the **Delete** button to remove it instantly.
- **Events persist** — Everything is saved to your browser's `localStorage`, so your events survive page refreshes and browser restarts without needing an account or internet connection.
- **Month navigation** — Use the **←** and **→** buttons in the header to move between months.
- **Responsive design** — The layout adapts for phones and tablets.
- **Fully keyboard accessible** — Every day cell and event is reachable and usable with just a keyboard. See the keyboard shortcuts section below.

---

## Getting Started

You do not need Node, npm, or any other tool.

1. **Clone the repository:**

   ```bash
   git clone https://github.com/aakashkunchwar/CALENDAR-APP-DEMO.git
   ```

2. **Open the app:**

   ```bash
   cd CALENDAR-APP-DEMO
   ```

   Then double-click `index.html`, or open it directly in your browser:

   - **Mac:** `open index.html`
   - **Windows:** `start index.html`

The calendar loads immediately — no setup needed.

---

## How to Use

### Adding an event
1. Click on any day cell in the calendar grid.
2. A pop-up form appears, already filled in with that date.
3. Type a title — for example, `Team meeting`.
4. Optionally pick a time and add notes.
5. Click **Save**. A small label appears on that day.

### Editing an event
1. Click the coloured label on any day that has an event.
2. The form reopens with all the details already filled in.
3. Change what you need and click **Save**.

### Deleting an event
1. Click the event label to open the edit form.
2. Click the **Delete** button (bottom-left of the form).
3. The event is removed right away.

### Navigating between months
- Click **←** to go back one month.
- Click **→** to go forward one month.
- The celebrity photo and credit bar update automatically.

### Keyboard shortcuts

| Key | What it does |
|-----|-------------|
| `Tab` | Move focus to the next day cell or event |
| `Shift + Tab` | Move focus to the previous day cell or event |
| `Enter` or `Space` | Open the focused day or event |
| `Escape` | Close the pop-up form |

---

## Project Structure

```
CALENDAR-APP-DEMO/
├── index.html              # The page — calendar layout, photo banner, pop-up form
├── style.css               # All visual styles — grid, colours, modal, responsive
├── app.js                  # All logic — render calendar, save/edit/delete events
├── commands/
│   ├── ally-check.md       # /ally-check  — runs an accessibility audit
│   └── docs-helper.md      # /docs-helper — regenerates this README
├── tasks/
│   └── todo.md             # Development checklist (used during building)
└── README.md               # This file
```

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Markup | HTML5 |
| Styles | CSS3 (Grid, Flexbox, animations) |
| Logic | Vanilla JavaScript (no frameworks) |
| Storage | Browser `localStorage` |
| Images | Wikimedia Commons (Creative Commons licensed) |

---

## Accessibility

This app meets **WCAG 2.1 AA** accessibility standards:

- Every day cell and event chip is reachable by keyboard (`Tab`) and activatable with `Enter` or `Space`.
- The pop-up form traps focus while it is open — pressing `Tab` cycles only through the form's buttons and fields.
- The month heading announces changes to screen readers automatically (`aria-live`).
- All text meets a minimum 4.5:1 colour contrast ratio.
- Required form fields are clearly marked for screen readers (`aria-required`).
- Error messages are linked to their input fields so screen readers announce them together.
- Decorative elements (the spiral binding, banner image) are hidden from screen readers.
