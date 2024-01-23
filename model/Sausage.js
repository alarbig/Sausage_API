const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Sausage extends Model {}

Sausage.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
          },
          sausage_name: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          sausage_type: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          sausage_img: {
            type: DataTypes.STRING,
            allowNull: true,
          },
          sausage_desc: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          sausage_country_of_origin: {
            type: DataTypes.STRING,
            allowNull: false,
          }
          
    },
    {
        sequelize,
        timestamps: true,
        freezeTableName: true,
        underscored: true,
        modelName: 'sausage',
      }
);

module.exports = Sausage;