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
      first_name: DataTypes.STRING,
      last_name: DataTypes.STRING,
      email: DataTypes.STRING,
      password_hash: DataTypes.STRING,
      date_of_birth: DataTypes.DATEONLY,
      profile_pic_url: DataTypes.STRING,
      join_date: DataTypes.DATEONLY,
      last_login: DataTypes.DATEONLY,
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
