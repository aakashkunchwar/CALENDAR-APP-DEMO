/* ── State ────────────────────────────────────────────────── */
const STORAGE_KEY = 'cal_events';

const MONTH_IMAGES = [
  'https://pixabay.com/get/g261a81b317c6b5f28e8279ce28dc4c8a8bf663d041b48677355b8705ddc18e6ac79cd19d8b4673b0bf22c85e76928f73890821b2bc69531bb0c58fb3679d5b84_640.jpg',
  'https://pixabay.com/get/g7aad369f6f7ba23035b478e85c9ce27f5e9fe9b270a787c0cf0656c7d38a07c6c230c9f140306f7740a40bfd1671e928f2250e44e0892fb69a998a99e47866b8_640.jpg',
  'https://pixabay.com/get/g62a5d896ea8357009eb762a2e857f5e31ed0b5f546edd1ec33d8c9508a44fff8e4112c48ad436497fbdc50af208149fca1f3122cce2f0a73384df6370d59e22b_640.jpg',
  'https://pixabay.com/get/g13a3276de994c582b71a892be25360e4147b22e219a6845c01dba702f9c0b66a7a491fa614d9ff3e66d0d1a580d71b7e5698309205456e7ca424fd7c868863c9_640.jpg',
  'https://pixabay.com/get/gb2865ab813a5d6afbcd195848a8fe07bd1232ffac4c29a9c8cfd3bf9ab7f9fb6751b9868cd5548553838d65342be85f789bdaf3db075936bb84293a712b7d71a_640.jpg',
  'https://pixabay.com/get/g5444708b4ebffcf1786ed94e841790345f9ccd78e9dd6207cca08152da7066022a458db0db0963feb7619cbd7262e85a9f9f117de5b364a41f560d61fe3e1056_640.jpg',
  'https://pixabay.com/get/g36f94ffba8e2962fe3dafecdb213b7b29d5286b33461ba801f2ebdcf8d17798196b49c0c2c325ba81f5286c63a76f80e67b41dd6a40743474aa878c474a522ea_640.jpg',
  'https://pixabay.com/get/g58851685fe2b6608f3bc92168050c71c5e4dcd0a0d73be9671ba94ccd43cf56bbb62e2af7c013d33269530daf0680e4aec68734c44b54b65b94917294eb60297_640.jpg',
  'https://pixabay.com/get/g160e79b2582fcb13f0aa6b5c155f9aed45aeedaba46c11870c3aba0cc6bf5ab1bf2fe98f8f68e9446f8e5ad67949742a42f93e633b61061125dae0c8d35f4d43_640.jpg',
  'https://pixabay.com/get/g31504b369a519bc5af4cf539c9e6c70adab5a9f769cc59aaa613527f76421c90fe24a06cb20821c5f7af87f4d3c530480ee64bea6a7787d16f9ac62bd86c6287_640.jpg',
  'https://pixabay.com/get/gb804d0ed0b6e1b073d2110f468683a2e92230fd412a3f4dd8622d46ad9c8f4a79e82848c8c71c20580f6fa26f989db6c3f60cabf6d8f6c086a447c8860b7ab67_640.jpg',
  'https://pixabay.com/get/g00410c88c7bb47fb218dcbaf6a4d4fbd2952d22f74cdf7ae4f96900448cf6d9a10e0a950d82df731d292de97f9d8f1c5_640.jpg',
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
