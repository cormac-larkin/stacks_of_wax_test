"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  user.init(
    {
      user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      username: DataTypes.STRING,
      password_hash: DataTypes.STRING,
      profile_pic_url: DataTypes.STRING,
      first_name: DataTypes.STRING,
      last_name: DataTypes.STRING,
      date_of_birth: DataTypes.DATE,
      join_date: DataTypes.DATE,
      last_login: DataTypes.DATE,
      country_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "country",
          key: "country_id",
        },
      },
    },
    {
      sequelize,
      modelName: "user",
    }
  );
  return user;
};
