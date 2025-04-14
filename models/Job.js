module.exports = (sequelize, DataTypes) => {

  let tableName = 'jobs';

  let timestamps = false;

  let fillable = {
    queue: DataTypes.STRING,
    payload: DataTypes.JSON,
    attempts: DataTypes.INTEGER,
    reserved_at: DataTypes.DATE,
    available_at: DataTypes.DATE,
  };

  const Job = sequelize.define('Job', fillable, {
    tableName,
    timestamps,
    underscored: true,
  });
  return Job;
};
