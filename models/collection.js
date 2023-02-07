"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class collection extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  collection.init(
    {
      collection_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: DataTypes.STRING,
      time_created: DataTypes.DATE,
      user_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "user",
          key: "user_id",
        },
      },
    },
    {
      sequelize,
      modelName: "collection",
    }
  );
  return collection;
};
