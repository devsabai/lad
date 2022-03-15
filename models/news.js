'use strict';
module.exports = (sequelize, DataTypes) => {
  const news = sequelize.define('news', {
    no: DataTypes.INTEGER,
    topic_la: DataTypes.TEXT,
    content_la: DataTypes.TEXT,
    topic_en: DataTypes.TEXT,
    content_en: DataTypes.TEXT,
    cover: DataTypes.STRING,
    image: DataTypes.STRING,
    delete_at: DataTypes.DATE
  }, { tableName: 'news' });
  news.associate = function(models) {
    // associations can be defined here
  };
  return news;
};