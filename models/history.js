'use strict';
module.exports = (sequelize, DataTypes) => {
  const history = sequelize.define('history', {
    no: DataTypes.INTEGER,
    topic_la: DataTypes.TEXT,
    topic_en: DataTypes.TEXT,
    content_la: DataTypes.TEXT,
    content_en: DataTypes.TEXT,
    image_la: DataTypes.STRING,
    image_en: DataTypes.STRING,
    delete_at: DataTypes.DATE
  }, {});
  history.associate = function(models) {
    // associations can be defined here
  };
  return history;
};