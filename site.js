// Сайт «Нота Есеп»: кнопки страницы управляют виджетом через его публичный API (open, setLang).
//
// Для проверки виджета на локальном стеке без пересборки:
//   ?api=http://localhost:8080   адрес бэкенда (по умолчанию — зашитый в виджет)
//   ?key=<ключ сайта>            ключ сайта из админки (по умолчанию — анонимный тариф)
// ?api= принимает только localhost: иначе ссылка на этот сайт с ?api=https://чужой-сервер увела бы вопросы
// посетителей туда и показала бы чужие ответы под нашим брендом. CSP в <head> разрешает те же адреса.
// Скрипт идёт до скрипта виджета, поэтому атрибуты стоят на месте к моменту, когда виджет их читает.

const chat = document.querySelector('ai-dana-chat');
const params = new URLSearchParams(location.search);

const localApi = (value) => {
  try {
    const url = new URL(value);
    return url.protocol === 'http:' && (url.hostname === 'localhost' || url.hostname === '127.0.0.1') ? url.origin : null;
  } catch {
    return null;
  }
};

const api = localApi(params.get('api') ?? '');
if (api) chat.setAttribute('api-url', api);
// Ключ сайта публичный и работает только на нашем бэкенде: подставить его можно, увести данные им нельзя
if (params.get('key')) chat.setAttribute('site-key', params.get('key'));

document.addEventListener('click', (event) => {
  const target = event.target.closest('[data-action], [data-lang]');
  if (!target) return;
  customElements.whenDefined('ai-dana-chat').then(() => {
    if (target.dataset.action === 'open') chat.open();
    const lang = target.dataset.lang;
    if (!lang) return;
    chat.setLang(lang);
    document.querySelectorAll('[data-lang]').forEach((button) => {
      button.setAttribute('aria-pressed', String(button === target));
    });
  });
});
