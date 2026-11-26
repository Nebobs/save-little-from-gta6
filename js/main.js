import { loadState, saveState } from './state.js';
import { initHabits } from './habits.js';
import { initStreak, updateStats } from './streak.js';
import { initQuotes } from './quotes.js';
import { showToast } from './toast.js';
import { initReveal } from './reveal.js';

document.addEventListener('DOMContentLoaded', () => {
  const state = loadState();
  const save = () => saveState(state);
  initHabits(state, save, showToast, () => updateStats(state));
  initStreak(state, save, showToast);
  initQuotes(state, save);
  updateStats(state);
  initReveal();
});
