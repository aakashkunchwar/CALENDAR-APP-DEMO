# Bollywood Calendar App

A lightweight, zero-dependency desk-calendar app built with plain HTML, CSS, and JavaScript. No install, no build step — just open `index.html` in a browser and it works.

---

## Features

- **Month view** — A clean 7-column grid shows every day of the month. Days from the previous and next months are shown in muted text so the grid always fills 6 rows.
- **Bollywood celebrity banner** — Each month displays a different Bollywood celebrity photo at the top of the calendar, sourced from Wikimedia Commons with full attribution.
- **Add events** — Click any day to open a form. Fill in a title (required), date, optional time, and optional notes, then hit **Save**.
- **Edit events** — Click any saved event chip to reopen the form pre-filled with its details. Change anything and save.
- **Delete events** — When editing an event, a **Delete** button appears. One click removes it instantly.
- **Saves automatically** — Events are stored in your browser's `localStorage`. They survive page refreshes and browser restarts — no account or internet needed.
- **Month navigation** — Use the ← and → buttons to move between any month and year.
- **Responsive layout** — Works on phones and tablets. The grid and modal scale down gracefully on small screens.
- **Accessible** — Meets WCAG 2.1 AA. Fully keyboard-navigable: Tab to any day or event, Enter/Space to open it, Escape to close the modal, focus is trapped inside the modal while it's open.

---

## Getting Started

You do not need to install anything.

1. **Clone the project:**
   ```bash
   git clone https://github.com/aakashkunchwar/CALENDAR-APP-DEMO.git
   ```

2. **Open the app:**
   Navigate into the folder and open `index.html` in any modern browser (Chrome, Firefox, Edge, Safari).

   ```bash
   cd CALENDAR-APP-DEMO
   open index.html        # macOS
   start index.html       # Windows
   ```

   That's it — the calendar loads immediately.

---

## How to Use

### Adding an event
1. Click on any day cell on the calendar.
2. A form pops up pre-filled with that date.
3. Type a title (e.g. `Doctor appointment`).
4. Optionally add a time and notes.
5. Click **Save** — a small chip appears on that day.

### Editing an event
1. Click on the event chip directly (the coloured label on the day).
2. The form reopens with all the existing details filled in.
3. Make your changes and click **Save**.

### Deleting an event
1. Click the event chip to open the edit form.
2. Click the **Delete** button on the bottom left.
3. The event disappears immediately.

### Navigating months
- Click **←** to go to the previous month.
- Click **→** to go to the next month.
- The celebrity photo and photo credit update automatically.

### Keyboard shortcuts
| Key | Action |
|-----|--------|
| `Tab` | Move focus to the next day or event |
| `Enter` or `Space` | Open the focused day or event |
| `Escape` | Close the modal |

---

## Project Structure

```
CALENDAR-APP-DEMO/
├── index.html          # Page layout — calendar card, modal form, photo banner
├── style.css           # All visual styling — grid, chips, modal, responsive design
├── app.js              # All logic — render calendar, add/edit/delete events, localStorage
├── commands/
│   ├── ally-check.md   # Slash command: runs an accessibility audit
│   └── docs-helper.md  # Slash command: regenerates this README
└── tasks/
    └── todo.md         # Development checklist used during building
```

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Markup | HTML5 (semantic elements: `header`, `main`, `dialog`) |
| Styles | CSS3 (Grid, Flexbox, animations, responsive breakpoints) |
| Logic | Vanilla JavaScript (ES2020+, no frameworks) |
| Storage | Browser `localStorage` (JSON) |
| Images | Wikimedia Commons (Creative Commons licensed) |
| IDs | `crypto.randomUUID()` (built into modern browsers) |

---

## Accessibility

This app meets **WCAG 2.1 AA** standards:

- All interactive elements (day cells, event chips, buttons) are reachable and activatable by keyboard.
- Color contrast ratios pass 4.5:1 for all text.
- Screen readers are notified when the month changes (`aria-live`).
- The modal traps focus while open so keyboard users cannot accidentally tab behind it.
- Decorative images and spiral rings are hidden from screen readers (`aria-hidden`).
- Required form fields are marked with `required` and `aria-required`.
- Error messages are linked to their input via `aria-describedby`.

---

## Photo Credits

Celebrity photos are sourced from [Wikimedia Commons](https://commons.wikimedia.org) under Creative Commons licenses. The photographer credit and license appear below the calendar each month.
