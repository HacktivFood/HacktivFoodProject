'use strict';
const {
  Model
} = require('sequelize');
const hashPass = require('../helpers/bcrypt.js').hashPass
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  User.init({
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true
      }
    },
    password: DataTypes.STRING
  }, { hooks: {
    beforeCreate: (users, options) => {
      users.password = hashPass(users.password)
    }
  },
    sequelize,
    modelName: 'User',
  });
  return User;
};