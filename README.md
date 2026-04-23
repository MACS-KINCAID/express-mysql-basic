# Running
1. To bootstrap first setup your database connection in the file .env

2. Run the following commands:
```bash
npm install

npm start
```

Endpoints can be accessed via browser with addresses like:
- http://localhost:3000/info
- http://localhost:3000/id/1
- http://localhost:3000/summary

# Relevant source code files
- .env = Credencials to connecto to the database
- src/index.ts = Define all available endpoints
- node_modules/ = This folder is automatically created when `npm install` command is run, store all external libraries

# Project Creation
This project was created with the following commands:
```bash
npm init -y

npm install --save express

npm install -D @types/express @types/node

npm install -D eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin typescript

npm install --save mysql2
```

# Database creation
A simple database was provisioned with the following commands:
```bash
podman run --name some-mysql -v ./mysql-data:/var/lib/mysql:Z -e MYSQL_ROOT_PASSWORD=pass -p 3306:3306 -d mysql

mkdir mysql-data

podman exec -it some-mysql /bin/bash

mysql -u root -p

CREATE DATABASE califs;

use califs;

CREATE TABLE califs(
  id INT AUTO_INCREMENT, 
  name VARCHAR(100) NOT NULL, 
  grade INT,
  PRIMARY KEY(id)
);

INSERT INTO califs(name, grade) 
VALUES 
  ('Mitsiu', 9), 
  ('Maria', 10);
```

