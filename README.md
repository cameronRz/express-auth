# Express Auth

## Description
This is a simple authentication scaffold ready to use in new Express applications. This version supports register, login and logout, and has a MySQL database in Docker. More features will be added in the future.

## Project Setup
Set `.env` variables:
```dotenv
PORT=

DATABASE_URL=

MYSQL_ROOT_PASSWORD=
MYSQL_DATABASE=
MYSQL_USER=
MYSQL_PASSWORD=

JWT_SECRET=
```

Run the following commands:
```shell
npm install
docker compose build --no-cache
docker compose up -d
npm run prisma:migrate
```

Run the project with `npm run dev`.

### Notes
I left the HTTP JSON response messages generic so they can be updated to fit  any application requirements.

