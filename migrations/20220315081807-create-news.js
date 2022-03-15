'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('news', {
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
      content_la: {
        type: Sequelize.TEXT
      },
      topic_en: {
        type: Sequelize.TEXT
      },
      content_en: {
        type: Sequelize.TEXT
      },
      cover: {
        type: Sequelize.STRING
      },
      image: {
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
    return queryInterface.dropTable('news');
  }
};