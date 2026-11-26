import { QUOTES } from './data.js';

let autoTimer = null;

function renderQuote(state, saveState) {
  const textEl = document.getElementById('quote-text');
  const authorEl = document.getElementById('quote-author');
  const dotsEl = document.getElementById('quote-dots');

  const idx = state.quoteIndex || 0;
  const quote = QUOTES[idx];

  if (textEl) {
    textEl.classList.add('fading');
    setTimeout(() => {
      textEl.textContent = '“' + quote.text + '”';
      textEl.classList.remove('fading');
    }, 200);
  }

  if (authorEl) {
    authorEl.classList.add('fading');
    setTimeout(() => {
      authorEl.textContent = '— ' + quote.author;
      authorEl.classList.remove('fading');
    }, 200);
  }

  if (dotsEl) {
    dotsEl.innerHTML = '';
    QUOTES.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.className = 'quote-dot' + (i === idx ? ' active' : '');
      dot.setAttribute('role', 'listitem');
      dot.setAttribute('aria-label', 'Quote ' + (i + 1));
      dot.setAttribute('aria-pressed', i === idx ? 'true' : 'false');
      dot.addEventListener('click', () => {
        state.quoteIndex = i;
        saveState();
        renderQuote(state, saveState);
        resetAutoAdvance(state, saveState);
      });
      dotsEl.appendChild(dot);
    });
  }
}

function navigate(dir, state, saveState) {
  state.quoteIndex = ((state.quoteIndex || 0) + dir + QUOTES.length) % QUOTES.length;
  saveState();
  renderQuote(state, saveState);
  resetAutoAdvance(state, saveState);
}

function resetAutoAdvance(state, saveState) {
  clearInterval(autoTimer);
  autoTimer = setInterval(() => {
    state.quoteIndex = ((state.quoteIndex || 0) + 1) % QUOTES.length;
    saveState();
    renderQuote(state, saveState);
  }, 7000);
}

export function initQuotes(state, saveState) {
  renderQuote(state, saveState);

  const prevBtn = document.getElementById('quote-prev');
  const nextBtn = document.getElementById('quote-next');

  if (prevBtn) {
    prevBtn.addEventListener('click', () => navigate(-1, state, saveState));
  }
  if (nextBtn) {
    nextBtn.addEventListener('click', () => navigate(1, state, saveState));
  }

  resetAutoAdvance(state, saveState);
}
