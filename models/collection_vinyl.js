"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class collection_vinyl extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  collection_vinyl.init(
    {
      collection_vinyl_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      collection_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "collection",
          key: "collection_id",
        },
      },
      vinyl_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "vinyl",
          key: "vinyl_id",
        },
      },
    },
    {
      sequelize,
      modelName: "collection_vinyl",
    }
  );
  return collection_vinyl;
};
