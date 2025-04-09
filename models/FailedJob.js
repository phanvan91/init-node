module.exports = (sequelize, DataTypes) => {
  const FailedJob = sequelize.define('FailedJob', {
    queue: DataTypes.STRING,
    payload: DataTypes.JSON,
    exception: DataTypes.TEXT,
    failed_at: DataTypes.DATE,
  }, {
    tableName: 'failed_jobs',
    underscored: true,
    timestamps: false,
  });
  return FailedJob;
};
