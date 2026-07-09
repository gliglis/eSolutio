'use strict';

const I18N = (() => {
  const STORAGE_KEY = 'esolutio-lang';
  const DEFAULT_LANG = 'en';
  const dict = window.LANG || {};

  let current = DEFAULT_LANG;

  function t(key) {
    const pack = dict[current] || dict[DEFAULT_LANG] || {};
    const value = pack[key];
    if (value !== undefined) return value;

    // fallback: brakujące tłumaczenie -> wersja domyślna
    const base = dict[DEFAULT_LANG] || {};
    if (base[key] !== undefined) {
      console.warn(`i18n: brak klucza "${key}" dla "${current}"`);
      return base[key];
    }

    console.warn(`i18n: nieznany klucz "${key}"`);
    return key;
  }

  function apply() {
    document.documentElement.lang = current;
    document.title = t('title');

    document.querySelectorAll('[data-i18n]').forEach((el) => {
      el.textContent = t(el.dataset.i18n);
    });

    document.querySelectorAll('[data-i18n-html]').forEach((el) => {
      el.innerHTML = t(el.dataset.i18nHtml);
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
      el.placeholder = t(el.dataset.i18nPlaceholder);
    });

    document.querySelectorAll('.lang button').forEach((btn) => {
      btn.setAttribute('aria-pressed', String(btn.dataset.lang === current));
    });
  }

  function set(next) {
    current = dict[next] ? next : DEFAULT_LANG;
    apply();
    try {
      localStorage.setItem(STORAGE_KEY, current);
    } catch (e) { /* tryb prywatny */ }
  }

  function detect() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved && dict[saved]) return saved;
    } catch (e) { /* ignoruj */ }

    const browser = (navigator.language || '').toLowerCase();
    return browser.startsWith('pl') && dict.pl ? 'pl' : DEFAULT_LANG;
  }

  function init() {
    document.querySelectorAll('.lang button').forEach((btn) => {
      btn.addEventListener('click', () => set(btn.dataset.lang));
    });
    set(detect());
  }

  return { init, set, t, get lang() { return current; } };
})();
