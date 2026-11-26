import { HABITS } from './data.js';

function renderHabits(state, saveState, showToast, updateStats) {
  const list = document.getElementById('habit-list');
  list.innerHTML = '';

  HABITS.forEach(habit => {
    const isChecked = !!state.checked[habit.id];

    const li = document.createElement('li');
    li.className = 'habit-item' + (isChecked ? ' checked' : '');
    li.setAttribute('role', 'checkbox');
    li.setAttribute('aria-checked', isChecked ? 'true' : 'false');
    li.setAttribute('tabindex', '0');
    li.setAttribute('data-id', habit.id);
    li.setAttribute('data-xp', habit.xp);

    const checkbox = document.createElement('div');
    checkbox.className = 'habit-checkbox';
    checkbox.setAttribute('aria-hidden', 'true');
    checkbox.innerHTML = `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>`;

    const label = document.createElement('span');
    label.className = 'habit-label';
    label.textContent = habit.label;

    const xpBadge = document.createElement('span');
    xpBadge.className = 'habit-xp';
    xpBadge.textContent = '+' + habit.xp + ' XP';

    li.appendChild(checkbox);
    li.appendChild(label);
    li.appendChild(xpBadge);
    list.appendChild(li);
  });

  attachHabitListeners(state, saveState, showToast, updateStats);
}

function toggleHabit(id, state, saveState, showToast, updateStats) {
  const habit = HABITS.find(h => h.id === id);
  if (!habit) return;

  const wasChecked = !!state.checked[id];

  if (wasChecked) {
    delete state.checked[id];
    state.totalXP = Math.max(0, state.totalXP - habit.xp);
    showToast('Habit unchecked.', 'info');
  } else {
    state.checked[id] = true;
    state.totalXP = (state.totalXP || 0) + habit.xp;
    showToast('+' + habit.xp + ' XP — ' + habit.label, 'success');
  }

  saveState();
  updateStats();

  const li = document.querySelector(`[data-id="${id}"]`);
  if (li) {
    const nowChecked = !!state.checked[id];
    li.setAttribute('aria-checked', nowChecked ? 'true' : 'false');
    li.classList.toggle('checked', nowChecked);
  }
}

function attachHabitListeners(state, saveState, showToast, updateStats) {
  const items = document.querySelectorAll('.habit-item');
  items.forEach(item => {
    item.addEventListener('click', () => {
      toggleHabit(item.getAttribute('data-id'), state, saveState, showToast, updateStats);
    });
    item.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleHabit(item.getAttribute('data-id'), state, saveState, showToast, updateStats);
      }
    });
  });
}

export function initHabits(state, saveState, showToast, updateStats) {
  renderHabits(state, saveState, showToast, updateStats);

  const resetBtn = document.getElementById('reset-btn');
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      state.checked = {};
      saveState();
      updateStats();
      renderHabits(state, saveState, showToast, updateStats);
      showToast('Habits reset for a new day!', 'info');
    });
  }
}
