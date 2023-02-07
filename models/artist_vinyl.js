"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class artist_vinyl extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  artist_vinyl.init(
    {
      artist_vinyl_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      artist_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "artist",
          key: "artist_id",
        },
      },
    vinyl_id: {
      type:  DataTypes.INTEGER,
      references: {
        model: "vinyl",
        key: "vinyl_id"
      }
    },
    },
    {
      sequelize,
      modelName: "artist_vinyl",
    }
  );
  return artist_vinyl;
};
