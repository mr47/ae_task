# Web Service

#### Dependencies

* Express.js: HTTP Server
* Sequelize: Database ORM
* Mysql2: Required drivers for ORM

#### Docker Containers

1. API RESTful (Node/Express.js with Sequelize as ORM) - `http://localhost:3001`
2. Database (MySQL)
3. Frontend (React.js) - `http://localhost:3000`

## Build & Run Project

### Start Web Service, Database & UI Service

```
docker-compose up --build -d
```

Feel free to change the server listening port in `./config/.env`, and check `docker-compose.yml` for database configuration.

### Test Suite

You can run the current test suite both inside the server container or from the project folder, in the last case, please remember to install all dependencies first with `npm install`.

```
docker-compose exec server sh
npm run test
```

#### Available Requests

[Postman Collection here!](https://documenter.getpostman.com/view/7772202/Szmk1G1e?version=latest)

Transactions:
1. POST `http://localhost:3001/transactions` (CREATE)
2. GET `http://localhost:3001/transactions` (READ - ALL)
3. GET `http://localhost:3001/transactions/id` (READ - BY ID)

Users:
1. GET `http://localhost:3001/users` (READ - ALL)
2. All CRUD operations are available but are out of task scope.
  * POST `http://localhost:3001/users` (CREATE)
  * PUT `http://localhost:3001/users/id` (UPDATE - BY ID)
  * DELETE `http://localhost:3001/users/id` (DELETE - BY ID)