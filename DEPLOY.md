# DEPLOY.md — выкладка на Plesk (hoster.kz)

> Прод: Plesk, поддомен, PHP 8.2, MariaDB 10.4.34, **1 ГБ диска**.
> Основание — `CLAUDE.md` §9.

---

## Разовая настройка (делается один раз)

1. **Поддомен** — создать в Plesk, выпустить сертификат Let's Encrypt, включить редирект HTTP → HTTPS.
2. **Document root** — выставить на `<папка сайта>/public`.
   Если оставить корень на папке проекта — наружу утечёт `.env` со всеми паролями. Проверить обязательно.
3. **PHP** — версия 8.2 или выше. Включить расширения: `gd` (или `imagick`), `exif`, `fileinfo`, `zip`, `intl`, `mbstring`, `pdo_mysql`, `opcache`.
   `memory_limit` не ниже 256M, `upload_max_filesize` 20M, `post_max_size` 24M — иначе фото с телефона не зальются.
4. **База данных** — создать БД и пользователя в Plesk.
   Кодировка `utf8mb4`, сравнение **`utf8mb4_unicode_ci`**.
5. **Git** — подключить репозиторий в Plesk (Git → Add Repository) либо готовить деплой через SSH + архив.
6. **`.env`** — создать на сервере вручную по `.env.example`. В git его нет и не будет.
   Обязательно: `APP_ENV=production`, `APP_DEBUG=false`, `APP_URL=https://<поддомен>`, `APP_KEY` (сгенерировать), доступы к БД,
   `LOG_CHANNEL=daily`, `LOG_DAILY_DAYS=7`, `CACHE_STORE=file`, `SESSION_DRIVER=file`, `QUEUE_CONNECTION=sync`.
7. **Первый запуск:**
   ```
   composer install --no-dev --optimize-autoloader
   php artisan key:generate
   php artisan migrate --force
   php artisan db:seed --force        # только первый раз
   php artisan storage:link
   php artisan config:cache && php artisan route:cache && php artisan view:cache
   ```
8. **Админ-пользователь** — создать artisan-командой на сервере, пароль не хранить в репозитории.
9. **Права** — на запись нужны только `storage/` и `bootstrap/cache/`.

---

## Обычный деплой (каждый раз)

```
git pull
composer install --no-dev --optimize-autoloader
php artisan migrate --force
php artisan config:cache
php artisan route:cache
php artisan view:cache
```

**Сборки ассетов нет.** CSS написан руками и лежит готовым файлом, Filament приезжает со своими собранными ассетами (`php artisan filament:assets`). Node и npm на хостинге не нужны вообще.

## Деплой статической вёрстки (этап M0/M1)

Пока админки нет, показать клиенту можно проще некуда: залить содержимое папки `site/` в корень поддомена. Document root — на саму папку, PHP и база не нужны.

---

## Чего на сервер не попадает

`node_modules/`, `_content/`, `.env`, `tests/`, dev-зависимости Composer, оригиналы фотографий.
При 1 ГБ диска это не педантизм: один `node_modules` съест треть тома.

---

## Регулярное обслуживание

- **Бэкап БД** — крон Plesk, дамп + выгрузка наружу. На хостинге не копить: место кончится.
- **Логи** — канал `daily`, хранение 7 дней. Раз в квартал проверять размер `storage/logs`.
- **Диск** — следить за `storage/app/public`: это фото товаров, единственный растущий каталог.

---

## Проверить после каждого деплоя

- [ ] Главная открывается по HTTPS, оба языка (`/` и `/kk`)
- [ ] `https://<поддомен>/.env` отдаёт 403 или 404, а не текст
- [ ] `/admin` пускает по паролю
- [ ] Карточка товара: фото грузятся, цены на месте, дата прайса свежая
- [ ] Кнопка WhatsApp открывает чат с правильным номером и текстом
- [ ] Ссылка, отправленная в WhatsApp, показывает превью с картинкой
- [ ] В админке загружается новое фото и сохраняется цена
