"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class vinyl extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  vinyl.init(
    {
      vinyl_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: DataTypes.STRING,
      year: DataTypes.DATE,
      image_url: DataTypes.STRING,
      artist_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "artist",
          key: "artist_id",
        },
      },
    },
    {
      sequelize,
      modelName: "vinyl",
    }
  );
  return vinyl;
};
