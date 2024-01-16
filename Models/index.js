const { Sequelize } = require("sequelize");
const sequelize = new Sequelize("nodejsstarter", 'root', '', {
    host: "localhost",
    dialect: "mysql",
    //make your DB connection as follows :
    // ...new Sequelize('database name','database username','password',{ ...})

});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
// let's add our user model to our DB instance
db.User = require("./User")(sequelize, Sequelize);

//and export our db instance
module.exports = db;
