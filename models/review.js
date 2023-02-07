"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  review.init(
    {
      review_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      timestamp: DataTypes.DATE,
      text: DataTypes.TEXT,
      rating: DataTypes.INTEGER,
      collection_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "collection",
          key: "collection_id",
        },
      },
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
      modelName: "review",
    }
  );
  return review;
};
