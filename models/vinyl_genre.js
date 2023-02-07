"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class vinyl_genre extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  vinyl_genre.init(
    {
      vinyl_genre_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      vinyl_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "vinyl",
          key: "vinyl_id",
        },
      },
      genre_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "genre",
          key: "genre_id",
        },
      },
    },
    {
      sequelize,
      modelName: "vinyl_genre",
    }
  );
  return vinyl_genre;
};
