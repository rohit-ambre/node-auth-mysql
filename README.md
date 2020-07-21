[![JavaScript Style Guide](https://cdn.rawgit.com/standard/standard/master/badge.svg)](https://github.com/standard/standard)
[![forthebadge](https://forthebadge.com/images/badges/made-with-javascript.svg)](https://forthebadge.com)
[![forthebadge](https://forthebadge.com/images/badges/powered-by-electricity.svg)](https://forthebadge.com)

# node-auth-mysql
____
Node(Express), MySql based app with Authentication Boilerplate.\
It can be used in the start of any project to have JWT authentication.


## How to install

1. clone the repo
2. run ```npm install```
3. create ```.env``` file as given in ```.env.example```
4. enter your database configs in ```.env``` at least for development in local.
5. run ```npx sequelize db:create``` It will create database for you.
6. run ```npx sequelize db:migrate``` It will create tables.
7. run ```npm run dev```
