# Нота Есеп — демо-сайт виджета AI-Dana

Сайт вымышленной бухгалтерской компании. Один `index.html`: вёрстка сайта и виджет AI-Dana, подключённый так, как
его подключит любой сторонний сайт:

```html
<script src="https://cdn.jsdelivr.net/npm/@dsrcjs/ai-widget@1/dist/ai-dana-chat.js" defer></script>
<ai-dana-chat launcher lang="ru"></ai-dana-chat>
```

`@1` — всегда последняя версия виджета: после релиза сайт получает её за несколько минут, ничего менять не нужно.

## Деплой на Vercel

Import Project → этот репозиторий → Framework Preset: **Other**, Build Command пустой, Output Directory `.`.
