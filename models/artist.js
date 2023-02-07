'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class artist extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  artist.init({
    artist_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: DataTypes.STRING,
    country_id:  {
      type: DataTypes.INTEGER,
      references: {
        model: "country",
        key: "country_id"
      }
    } 
  }, {
    sequelize,
    modelName: 'artist',
  });
  return artist;
};