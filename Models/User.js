module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define('User', {
        id: {
            //id used as a primary key in SQL DBs
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        username: {
            //Username that is unique and required
            type: Sequelize.STRING,
            unique: true,
            allowNull: false
        },
        password: {
            //String type for the password so we can store the hash here
            type: Sequelize.STRING,
            allowNull: false
        },
        
    });


    return User;
}