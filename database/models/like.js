"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class like extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  like.init(
    {
      like_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      timestamp: DataTypes.DATE,
      user_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "user",
          key: "user_id",
        },
      },
      collection_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "collection",
          key: "collection_id",
        },
      },
    },
    {
      sequelize,
      modelName: "like",
    }
  );
  return like;
};
