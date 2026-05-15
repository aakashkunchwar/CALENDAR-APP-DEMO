/* ── State ────────────────────────────────────────────────── */
const STORAGE_KEY = 'cal_events';

// Images: Wikimedia Commons, Creative Commons licensed (one per month Jan–Dec)
const MONTH_IMAGES = [
  'https://upload.wikimedia.org/wikipedia/commons/c/c1/Shah_Rukh_Khan_in_2023_%281%29.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/b/b6/Deepika_Padukone_Cannes_2018_%28cropped%29.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/4/45/Priyanka_Chopra_at_Bulgary_launch%2C_2024_%28cropped%29.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/f/f9/Amitabh_Bachchan.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/d/d6/Ranveer_Singh_promoting_Bajirao_Mastani.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/1/10/Alia_Bhatt_at_Berlinale_2022_Ausschnitt.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/0/0e/Salman_Khan.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/a/a6/KatrinaKaif.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/1/14/Deepika_Padukone_December_2015.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/5/57/Priyanka_Chopra_at_Filmfare_Awards_2013.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/b/bc/Soha_Ali_Khan_%281%29.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/3/36/Bobby_Darling_Actor.jpg',
];

const MONTH_CREDITS = [
  { artist: 'Bollywood Hungama', license: 'CC BY 3.0', page: 'https://commons.wikimedia.org/wiki/File:Shah_Rukh_Khan_in_2023_(1).jpg' },
  { artist: 'Georges Biard',     license: 'CC BY-SA 3.0', page: 'https://commons.wikimedia.org/wiki/File:Deepika_Padukone_Cannes_2018_(cropped).jpg' },
  { artist: 'Bollywood Hungama', license: 'CC BY 3.0', page: 'https://commons.wikimedia.org/wiki/File:Priyanka_Chopra_at_Bulgary_launch,_2024_(cropped).jpg' },
  { artist: 'Soumik (Mumbai)',   license: 'CC BY-SA 2.0', page: 'https://commons.wikimedia.org/wiki/File:Amitabh_Bachchan.jpg' },
  { artist: 'Bollywood Hungama', license: 'CC BY 3.0', page: 'https://commons.wikimedia.org/wiki/File:Ranveer_Singh_promoting_Bajirao_Mastani.jpg' },
  { artist: 'Elena Ternovaja',   license: 'CC BY-SA 3.0', page: 'https://commons.wikimedia.org/wiki/File:Alia_Bhatt_at_Berlinale_2022_Ausschnitt.jpg' },
  { artist: 'Bollywood Hungama', license: 'CC BY 3.0', page: 'https://commons.wikimedia.org/wiki/File:Salman_Khan.jpg' },
  { artist: 'Bollywood Hungama', license: 'CC BY 3.0', page: 'https://commons.wikimedia.org/wiki/File:KatrinaKaif.jpg' },
  { artist: 'Bollywood Hungama', license: 'CC BY 3.0', page: 'https://commons.wikimedia.org/wiki/File:Deepika_Padukone_December_2015.jpg' },
  { artist: 'Bollywood Hungama', license: 'CC BY 3.0', page: 'https://commons.wikimedia.org/wiki/File:Priyanka_Chopra_at_Filmfare_Awards_2013.jpg' },
  { artist: 'CNX: India',        license: 'CC BY 3.0', page: 'https://commons.wikimedia.org/wiki/File:Soha_Ali_Khan_(1).jpg' },
  { artist: 'CreativoCamaal',    license: 'CC BY 4.0', page: 'https://commons.wikimedia.org/wiki/File:Bobby_Darling_Actor.jpg' },
];

const today = new Date();
let currentYear  = today.getFullYear();
let currentMonth = today.getMonth(); // 0-based

/** @type {Array<{id:string, title:string, date:string, time:string, description:string}>} */
let events = [];

/* ── localStorage helpers ─────────────────────────────────── */
function loadEvents() {
  try {
    events = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch {
    events = [];
  }
}

function persistEvents() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
}

/* ── Date helpers ─────────────────────────────────────────── */
function toDateStr(year, month, day) {
  return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
}

function todayStr() {
  return toDateStr(today.getFullYear(), today.getMonth(), today.getDate());
}

/* ── Render ───────────────────────────────────────────────── */
const MONTHS = [
  'January','February','March','April','May','June',
  'July','August','September','October','November','December'
];

function renderCalendar() {
  const grid   = document.getElementById('calGrid');
  const label  = document.getElementById('monthLabel');
  grid.innerHTML = '';
  label.textContent = `${MONTHS[currentMonth]} ${currentYear}`;
  document.getElementById('monthBanner').src = MONTH_IMAGES[currentMonth];
  const credit = MONTH_CREDITS[currentMonth];
  const creditEl = document.getElementById('photoCredit');
  creditEl.innerHTML = `Photo: ${credit.artist} / <a href="${credit.page}" target="_blank" rel="noopener">Wikimedia Commons</a> / ${credit.license}`;

  const firstDay  = new Date(currentYear, currentMonth, 1).getDay(); // 0=Sun
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  // Days from previous month to fill the first row
  const prevMonthDays = new Date(currentYear, currentMonth, 0).getDate();

  // Total cells: always 6 rows × 7 cols = 42
  for (let i = 0; i < 42; i++) {
    const cell = document.createElement('div');
    cell.className = 'day-cell';
    if (i % 7 === 0) cell.classList.add('sunday');

    let cellDate;
    if (i < firstDay) {
      // Previous month overflow
      const d = prevMonthDays - firstDay + 1 + i;
      const m = currentMonth === 0 ? 11 : currentMonth - 1;
      const y = currentMonth === 0 ? currentYear - 1 : currentYear;
      cellDate = toDateStr(y, m, d);
      cell.classList.add('other-month');
      cell.innerHTML = `<span class="day-num">${d}</span>`;
    } else if (i >= firstDay + daysInMonth) {
      // Next month overflow
      const d = i - firstDay - daysInMonth + 1;
      const m = currentMonth === 11 ? 0 : currentMonth + 1;
      const y = currentMonth === 11 ? currentYear + 1 : currentYear;
      cellDate = toDateStr(y, m, d);
      cell.classList.add('other-month');
      cell.innerHTML = `<span class="day-num">${d}</span>`;
    } else {
      // Current month
      const d = i - firstDay + 1;
      cellDate = toDateStr(currentYear, currentMonth, d);
      if (cellDate === todayStr()) cell.classList.add('today');
      cell.innerHTML = `<span class="day-num">${d}</span>`;
    }

    cell.dataset.date = cellDate;
    cell.addEventListener('click', onDayCellClick);
    grid.appendChild(cell);
  }

  renderEvents();
}

function renderEvents() {
  // Clear existing chips first
  document.querySelectorAll('.event-chip').forEach(el => el.remove());

  events.forEach(evt => {
    const cell = document.querySelector(`.day-cell[data-date="${evt.date}"]`);
    if (!cell) return;

    const chip = document.createElement('span');
    chip.className = 'event-chip';
    chip.textContent = evt.time ? `${evt.time} ${evt.title}` : evt.title;
    chip.dataset.id = evt.id;
    chip.addEventListener('click', e => {
      e.stopPropagation(); // don't trigger day cell click
      openModal(evt.date, evt.id);
    });
    cell.appendChild(chip);
  });
}

/* ── Navigation ───────────────────────────────────────────── */
function navigate(dir) {
  currentMonth += dir;
  if (currentMonth < 0)  { currentMonth = 11; currentYear--; }
  if (currentMonth > 11) { currentMonth = 0;  currentYear++; }
  renderCalendar();
}

/* ── Modal ────────────────────────────────────────────────── */
let editingId = null; // null = new event, string = editing existing

function openModal(dateStr, eventId) {
  editingId = eventId || null;
  const overlay   = document.getElementById('modalOverlay');
  const titleEl   = document.getElementById('modalTitle');
  const deleteBtn = document.getElementById('deleteBtn');

  clearValidation();

  if (editingId) {
    const evt = events.find(e => e.id === editingId);
    titleEl.textContent = 'Edit Event';
    document.getElementById('fieldTitle').value = evt.title;
    document.getElementById('fieldDate').value  = evt.date;
    document.getElementById('fieldTime').value  = evt.time || '';
    document.getElementById('fieldDesc').value  = evt.description || '';
    deleteBtn.hidden = false;
  } else {
    titleEl.textContent = 'Add Event';
    document.getElementById('fieldTitle').value = '';
    document.getElementById('fieldDate').value  = dateStr || '';
    document.getElementById('fieldTime').value  = '';
    document.getElementById('fieldDesc').value  = '';
    deleteBtn.hidden = true;
  }

  overlay.hidden = false;
  document.getElementById('fieldTitle').focus();
}

function closeModal() {
  document.getElementById('modalOverlay').hidden = true;
  editingId = null;
}

function clearValidation() {
  document.getElementById('titleError').textContent = '';
}

/* ── Save & Delete ────────────────────────────────────────── */
function saveEvent(e) {
  e.preventDefault();
  clearValidation();

  const title = document.getElementById('fieldTitle').value.trim();
  const date  = document.getElementById('fieldDate').value;
  const time  = document.getElementById('fieldTime').value;
  const desc  = document.getElementById('fieldDesc').value.trim();

  // Validation
  if (!title) {
    document.getElementById('titleError').textContent = 'Title is required.';
    document.getElementById('fieldTitle').focus();
    return;
  }

  if (editingId) {
    const idx = events.findIndex(e => e.id === editingId);
    events[idx] = { id: editingId, title, date, time, description: desc };
  } else {
    events.push({ id: crypto.randomUUID(), title, date, time, description: desc });
  }

  persistEvents();
  renderEvents();
  closeModal();
}

function deleteEvent() {
  if (!editingId) return;
  events = events.filter(e => e.id !== editingId);
  persistEvents();
  renderEvents();
  closeModal();
}

/* ── Click handlers ───────────────────────────────────────── */
function onDayCellClick(e) {
  // Only trigger when clicking the cell background or day number, not a chip
  if (e.target.closest('.event-chip')) return;
  openModal(e.currentTarget.dataset.date, null);
}

/* ── Bootstrap ────────────────────────────────────────────── */
function init() {
  loadEvents();
  renderCalendar();

  document.getElementById('prevBtn').addEventListener('click', () => navigate(-1));
  document.getElementById('nextBtn').addEventListener('click', () => navigate(1));
  document.getElementById('closeBtn').addEventListener('click', closeModal);
  document.getElementById('eventForm').addEventListener('submit', saveEvent);
  document.getElementById('deleteBtn').addEventListener('click', deleteEvent);

  // Close modal on overlay backdrop click
  document.getElementById('modalOverlay').addEventListener('click', e => {
    if (e.target === document.getElementById('modalOverlay')) closeModal();
  });

  // Close modal on Escape key
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && !document.getElementById('modalOverlay').hidden) {
      closeModal();
    }
  });
}

document.addEventListener('DOMContentLoaded', init);
