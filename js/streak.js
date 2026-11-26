import { HABITS, DAYS_SHORT } from './data.js';

function getTodayKey() {
  return new Date().toISOString().slice(0, 10);
}

function getYesterdayKey() {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toISOString().slice(0, 10);
}

function getMondayOfWeek() {
  const d = new Date();
  const day = d.getDay(); // 0=Sun, 1=Mon...
  const diff = (day === 0) ? -6 : 1 - day;
  d.setDate(d.getDate() + diff);
  return d.toISOString().slice(0, 10);
}

function getDayKeysForWeek() {
  const monday = new Date(getMondayOfWeek());
  const keys = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    keys.push(d.toISOString().slice(0, 10));
  }
  return keys;
}

function getTodayDayIndex() {
  const day = new Date().getDay();
  return day === 0 ? 6 : day - 1; // Mon=0 ... Sun=6
}

export function updateStats(state) {
  const checkedCount = Object.keys(state.checked || {}).length;
  const totalHabits = HABITS.length;
  const pct = Math.round((checkedCount / totalHabits) * 100);

  const statStreak = document.getElementById('stat-streak');
  const statHabits = document.getElementById('stat-habits');
  const statXP = document.getElementById('stat-xp');
  const streakDisplay = document.getElementById('streak-display');
  const progressPct = document.getElementById('progress-pct');
  const progressFill = document.getElementById('progress-fill');
  const progressBarWrap = document.getElementById('progress-bar-wrap');

  if (statStreak) statStreak.textContent = state.streak || 0;
  if (statHabits) statHabits.textContent = checkedCount + '/' + totalHabits;
  if (statXP) statXP.textContent = state.totalXP || 0;
  if (streakDisplay) streakDisplay.textContent = state.streak || 0;
  if (progressPct) progressPct.textContent = pct + '%';
  if (progressFill) progressFill.style.width = pct + '%';
  if (progressBarWrap) progressBarWrap.setAttribute('aria-valuenow', pct);

  renderWeekGrid(state);
}

function renderWeekGrid(state) {
  const grid = document.getElementById('week-grid');
  if (!grid) return;

  const weekKeys = getDayKeysForWeek();
  const todayIdx = getTodayDayIndex();

  grid.innerHTML = '';
  DAYS_SHORT.forEach((label, i) => {
    const div = document.createElement('div');
    div.className = 'week-day';
    div.setAttribute('role', 'listitem');
    div.setAttribute('aria-label', label + (state.weekDone && state.weekDone[weekKeys[i]] ? ' - completed' : ''));

    if (i === todayIdx) div.classList.add('today');
    if (state.weekDone && state.weekDone[weekKeys[i]]) div.classList.add('done');

    const dayLabel = document.createElement('span');
    dayLabel.className = 'week-day-label';
    dayLabel.textContent = label;

    const dot = document.createElement('span');
    dot.className = 'week-day-dot';

    div.appendChild(dayLabel);
    div.appendChild(dot);
    grid.appendChild(div);
  });
}

export function initStreak(state, saveState, showToast) {
  renderWeekGrid(state);

  const completeBtn = document.getElementById('complete-day-btn');
  if (!completeBtn) return;

  completeBtn.addEventListener('click', () => {
    const checkedCount = Object.keys(state.checked || {}).length;

    if (checkedCount < 3) {
      showToast('Complete at least 3 habits to finish the day!', 'info');
      return;
    }

    const today = getTodayKey();
    if (state.weekDone && state.weekDone[today]) {
      showToast('You already completed today! Come back tomorrow.', 'info');
      return;
    }

    const yesterday = getYesterdayKey();
    const wasConsecutive = state.lastCompleted === yesterday || state.lastCompleted === null;

    if (wasConsecutive && state.lastCompleted !== null) {
      state.streak = (state.streak || 0) + 1;
    } else if (state.lastCompleted === null) {
      state.streak = 1;
    } else {
      state.streak = 1;
    }

    state.lastCompleted = today;
    if (!state.weekDone) state.weekDone = {};
    state.weekDone[today] = true;

    saveState();
    updateStats(state);

    showToast('Day complete! Streak: ' + state.streak + ' day' + (state.streak !== 1 ? 's' : '') + '!', 'success');
  });
}
