const KEY = 'save-little-state';
const DEFAULT = {
  streak: 0, totalXP: 0, checked: {}, weekDone: {}, lastCompleted: null, quoteIndex: 0,
};
export function loadState() {
  try { return Object.assign({}, DEFAULT, JSON.parse(localStorage.getItem(KEY) || '{}')); }
  catch { return { ...DEFAULT }; }
}
export function saveState(s) { localStorage.setItem(KEY, JSON.stringify(s)); }
