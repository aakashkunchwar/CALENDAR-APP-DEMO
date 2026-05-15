# Bollywood Calendar App

A browser-based desk calendar with a Bollywood twist. No installs, no accounts, no internet required after the page loads — just open one file and start scheduling your life.

---

## Features

- **Monthly calendar grid** — Displays every day of the current month in a Sun-through-Sat layout. Days that spill over from the previous or next month appear in a lighter shade so you always see a full grid.
- **Today highlight** — The current date is circled automatically so it is easy to find at a glance.
- **Bollywood celebrity banner** — A different Bollywood celebrity photo appears at the top of the card every month (Shah Rukh Khan in January, Deepika Padukone in February, and so on through the year).
- **Photo credit bar** — The photographer's name, Creative Commons license, and a link to the original Wikimedia page update automatically as you navigate months.
- **Add an event** — Click any day to open a small form. Give the event a title (required), an optional time, and optional notes, then click Save.
- **Edit an event** — Click any saved event label to reopen the form with its details pre-filled. Change anything and save again.
- **Delete an event** — Open an existing event and click the Delete button to remove it instantly.
- **Events persist across sessions** — All events are saved in your browser's built-in storage (`localStorage`). They survive page refreshes and browser restarts without an account or server.
- **Month navigation** — Arrow buttons in the header let you move forward or backward one month at a time.
- **Responsive layout** — The calendar resizes cleanly for phones and tablets as well as desktop browsers.
- **Fully keyboard accessible** — Every day cell and every saved event can be reached and activated using only a keyboard.

---

## Getting Started

You do not need Node.js, npm, Python, or any other tool installed. There is nothing to compile or build.

1. **Download or clone the project.**

   If you have Git installed, run this command in your terminal:

   ```bash
   git clone https://github.com/aakashkunchwar/CALENDAR-APP-DEMO.git
   ```

   If you do not have Git, click the green **Code** button on GitHub and choose **Download ZIP**, then unzip the folder anywhere on your computer.

2. **Open the app in your browser.**

   Navigate into the project folder and double-click `index.html`. Your default browser will open the calendar immediately.

   Alternatively, from a terminal:

   ```bash
   # Mac
   open index.html

   # Windows
   start index.html

   # Linux
   xdg-open index.html
   ```

That is it. The calendar is ready to use.

---

## How to Use

### Adding an event

1. Look at the calendar grid and click on the day you want.
2. A pop-up form slides in. The date is already filled in for you.
3. Type a title in the **Title** box — for example: `Doctor appointment`.
4. Optionally pick a **Time** — for example: `14:30`.
5. Optionally type any extra notes in the **Description** box.
6. Click **Save**. The form closes and a small label appears on that day.

### Editing an event

1. Find a day that has a coloured event label on it.
2. Click the label (not the date number — click the label text itself).
3. The form reopens with all the saved details already filled in.
4. Change whatever you need and click **Save**.

### Deleting an event

1. Click the event label to open the edit form.
2. Click the red **Delete** button in the bottom-left corner of the form.
3. The event disappears from the calendar immediately.

### Moving between months

- Click the **left arrow (←)** in the dark header bar to go back one month.
- Click the **right arrow (→)** to go forward one month.
- The celebrity photo and the photo credit at the bottom both update automatically.

### Keyboard shortcuts

If you prefer not to use a mouse, you can do everything from the keyboard:

| Key | What it does |
|-----|--------------|
| `Tab` | Move focus to the next day cell or event label |
| `Shift + Tab` | Move focus to the previous day cell or event label |
| `Enter` or `Space` | Open the focused day or event |
| `Escape` | Close the pop-up form without saving |

While the form is open, pressing `Tab` keeps focus inside the form. It will not accidentally jump to something behind the overlay.

---

## Project Structure

```
CALENDAR-APP-DEMO/
├── index.html          # The page — calendar layout, photo banner, and pop-up form
├── style.css           # All visual styles — grid, colours, modal, and responsive rules
├── app.js              # All logic — render calendar, load/save/edit/delete events
├── agents/             # Empty folder reserved for future agent configs
├── commands/
│   └── ally-check.md   # Custom /ally-check command (accessibility audit)
├── tasks/
│   └── todo.md         # Development checklist used during building
└── README.md           # This file
```

---

## Tech Stack

| Layer | Technology | Notes |
|-------|-----------|-------|
| Markup | HTML5 | Semantic elements and ARIA attributes throughout |
| Styles | CSS3 | CSS Grid, Flexbox, custom animations |
| Logic | Vanilla JavaScript | No frameworks or build tools |
| Storage | Browser `localStorage` | Events saved locally; no server needed |
| Images | Wikimedia Commons | Creative Commons licensed Bollywood photos |

---

## Accessibility

This app is built to meet **WCAG 2.1 AA** accessibility standards so it works well for everyone, including people who use screen readers or navigate by keyboard.

- Every day cell and event chip is focusable with `Tab` and activatable with `Enter` or `Space`.
- The pop-up form traps focus while it is open, so keyboard users do not accidentally leave the dialog.
- The month heading announces changes automatically to screen readers via `aria-live`.
- All body text meets at least a **4.5:1 colour contrast ratio** against its background.
- Required form fields are marked with `aria-required="true"` so screen readers announce them.
- Validation error messages are linked to their input fields so they are read aloud together.
- Decorative elements (the spiral binding rings) are hidden from screen readers with `aria-hidden="true"`.
