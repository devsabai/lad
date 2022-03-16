'use strict';
module.exports = (sequelize, DataTypes) => {
  const organization = sequelize.define('organization', {
    no: DataTypes.INTEGER,
    content_la: DataTypes.TEXT,
    image_la: DataTypes.STRING,
    content_en: DataTypes.TEXT,
    image_en: DataTypes.STRING,
    delete_at: DataTypes.DATE
  }, { tableName: 'organizations' });
  organization.associate = function(models) {
    // associations can be defined here
  };
  return organization;
};