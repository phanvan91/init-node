module.exports = (sequelize, DataTypes) => {
  const Job = sequelize.define('Job', {
    queue: DataTypes.STRING,
    payload: DataTypes.JSON,
    attempts: DataTypes.INTEGER,
    reserved_at: DataTypes.DATE,
    available_at: DataTypes.DATE,
  }, {
    tableName: 'jobs',
    underscored: true,
    timestamps: false,
  });
  return Job;
};
