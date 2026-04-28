# Mesto: деплой на сервер с pm2

## Данные сервера

IP адрес 81.26.188.97  
Frontend https://moonf1ree.nomorepartiessite.ru  
Backend https://api.moonf1ree.nomorepartiessite.ru

## Что настроено в проекте

- Добавлен `GET /crash-test` в бэкенде для проверки автоперезапуска процесса.
- Для фронтенда и бэкенда добавлены `ecosystem.config.js` с деплоем через `pm2 deploy`.
- Параметры деплоя подгружаются из `.env.deploy` (локально, не коммитится).
- Для бэкенда добавлено копирование `.env` с локальной машины на сервер перед деплоем.

## Подготовка перед деплоем

1. В `backend`:
   - скопируйте `backend/.env.deploy.example` в `backend/.env.deploy`;
   - создайте `backend/.env` с прод-переменными:
     - `NODE_ENV=production`
     - `JWT_SECRET=<секрет>`
     - `DB_ADDRESS=<адрес mongo>`
2. В `frontend`:
   - скопируйте `frontend/.env.deploy.example` в `frontend/.env.deploy`;
   - укажите `REACT_APP_API_URL=https://api.moonf1ree.nomorepartiessite.ru`.

`.env` и `.env.deploy` не должны храниться в репозитории.

## Команды деплоя

Бэкенд:

```bash
cd backend
pm2 deploy production setup
pm2 deploy production
```

Фронтенд:

```bash
cd frontend
pm2 deploy production setup
pm2 deploy production
```

## Привязка домена в сервисе доменов

- Зарегистрируйте домен `moonf1ree.nomorepartiessite.ru` и поддомен `api.moonf1ree.nomorepartiessite.ru`.
- Для обоих доменов создайте A-записи на IP `81.26.188.97`.
- В форме сервиса используйте ваш `token` и ваш `ID когорты` (эти значения индивидуальные, их храните приватно).
- После обновления DNS выпустите SSL-сертификаты и проверьте ответы:
  - `https://moonf1ree.nomorepartiessite.ru`
  - `https://api.moonf1ree.nomorepartiessite.ru`