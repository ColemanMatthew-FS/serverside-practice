'use strict';
const {
  Model
} = require('sequelize');
//method that defines and exports the quiz model
module.exports = (sequelize, DataTypes) => {
  class Quiz extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // in this case, each quiz belongs to a class
      models.Quiz.belongsTo( models.Class )
    }
  }
  Quiz.init({
    name: DataTypes.STRING,
    //Manually added the classid field
    ClassId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Quiz',
  });
  return Quiz;
};