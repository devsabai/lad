'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('histories', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      no: {
        type: Sequelize.INTEGER
      },
      topic_la: {
        type: Sequelize.TEXT
      },
      topic_en: {
        type: Sequelize.TEXT
      },
      content_la: {
        type: Sequelize.TEXT
      },
      content_en: {
        type: Sequelize.TEXT
      },
      image_la: {
        type: Sequelize.STRING
      },
      image_en: {
        type: Sequelize.STRING
      },
      delete_at: {
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('histories');
  }
};