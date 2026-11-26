let timer;
export function showToast(msg, type = 'info') {
  const el = document.getElementById('toast');
  const msgEl = document.getElementById('toast-msg');
  clearTimeout(timer);
  el.className = '';
  void el.offsetWidth; // force reflow
  msgEl.textContent = msg;
  el.className = 'show ' + type;
  timer = setTimeout(() => { el.className = ''; }, 3200);
}
