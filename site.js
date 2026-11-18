// Сайт «Нота Есеп»: кнопки страницы управляют виджетом через его публичный API (open, setLang).
//
// Для проверки виджета на другом бэкенде без пересборки:
//   ?api=http://localhost:8080   адрес бэкенда (по умолчанию — зашитый в виджет)
//   ?key=<ключ сайта>            ключ сайта из админки (по умолчанию — анонимный тариф)
// Скрипт идёт до скрипта виджета, поэтому атрибуты стоят на месте к моменту, когда виджет их читает.

const chat = document.querySelector('ai-dana-chat');
const params = new URLSearchParams(location.search);
if (params.has('api')) chat.setAttribute('api-url', params.get('api'));
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
