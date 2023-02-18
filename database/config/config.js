require('dotenv').config();

module.exports = {
  "development": {
    "username": process.env.MYSQL_USER,
    "password": process.env.MYSQL_PASS,
    "database": "database_development",
    "host": "127.0.0.1",
    "dialect": "mysql",
    "define": {
      "freezeTableName": true,
      "createdAt": false,
      "updatedAt": false
    },
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql",
    "define": {
      "freezeTableName": true
    }
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql",
    "define": {
      "freezeTableName": true
    }
  }
}
