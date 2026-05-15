# Calendar App

A lightweight, zero-dependency calendar app built with vanilla HTML, CSS, and JavaScript. No build step, no framework — just open `index.html` in a browser.

![Calendar App](https://img.shields.io/badge/HTML-CSS-JS-4361ee?style=flat)

---

## Features

### Month View
Browse any month with a clean 7-column grid. Previous and next month days are shown in muted tones to give the grid context without cluttering the current month.

### Add Events
Click any day cell to open the **Add Event** modal, pre-filled with that date. Fill in a title (required), date, optional time, and an optional description, then hit **Save**.

### Edit Events
Click any event chip on the calendar to reopen the modal in **Edit** mode. All fields are pre-populated — update whatever you need and save.

### Delete Events
When editing an existing event, a **Delete** button appears in the modal. One click removes the event immediately.

### localStorage Persistence
Events are saved to the browser's `localStorage` as JSON. They survive page refreshes and browser restarts — no server or account needed.

### Basic Validation
The form prevents saving without a title. An inline error message appears below the title field if you try to submit with it blank.

### Responsive Design
The layout adapts to smaller screens. On mobile (≤ 600 px) the grid compresses gracefully — day cells shrink, text scales down, and the modal fits within the viewport.

### Keyboard & Accessibility
- Press **Escape** to close the modal
- Click the backdrop outside the modal to dismiss it
- Semantic HTML with `role="dialog"`, `aria-modal`, and `aria-label` attributes throughout

---

## Getting Started

No installation required.

1. Clone the repo:
   ```bash
   git clone https://github.com/aakashkunchwar/CALENDAR-APP-DEMO.git
   ```
2. Open `index.html` in any modern browser.

---

## Project Structure

```
CALENDAR-APP-DEMO/
├── index.html      # Page structure — header, grid, modal
├── style.css       # Layout, grid, event chips, modal, responsive
├── app.js          # All logic — render, CRUD, localStorage, validation
└── tasks/
    └── todo.md     # Development checklist
```

---

## Tech Stack

| Layer | Choice |
|-------|--------|
| Markup | HTML5 (semantic elements) |
| Styles | CSS3 (Grid, custom properties, animations) |
| Logic | Vanilla JavaScript (ES2020+) |
| Storage | `localStorage` (JSON) |
| IDs | `crypto.randomUUID()` |
