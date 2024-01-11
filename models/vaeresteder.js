'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class vaeresteder extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  vaeresteder.init({
    navn: DataTypes.STRING,
    adresse: DataTypes.STRING,
    bydel: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'vaeresteder',
  });
  return vaeresteder;
};