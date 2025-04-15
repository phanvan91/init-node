module.exports = (sequelize, DataTypes) => {
  let tableName = 'app_devices';
  let timestamps = false;

  let fillable = {
    account_id: DataTypes.INTEGER,
  };

  const Device = sequelize.define('Device', fillable, {
    tableName,
    timestamps,
    underscored: true,
  });

  return Device;
};