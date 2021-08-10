module.exports = (sequelize, DataTypes) => {
    const Workout = sequelize.define('user',{
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        }
        })
    return Workout;
};