'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    
    //the classId column is added to our quizzes
    await queryInterface.addColumn('Quizzes', 'ClassId', {
      type: Sequelize.DataTypes.INTEGER,
      references: {
        model: {
          tableName: 'Classes'
        },
        key: 'id'
      },
      allowNull: true
    })
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeColumn('Quizzes', 'ClassId')
  }
};
