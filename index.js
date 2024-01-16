const db = require("./Models");
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
const Routes = require('./Routes/UserRoutes')

app.use(bodyParser.urlencoded({
    extended: true
})); 
app.use(express.json());
app.use("/", Routes);

db.sequelize.sync().then(() => {
    console.log("Startup Database Sync Successful. :)");
})
    .catch((err) => {
        console.log("Startup DataBase Error : " + err.message);
        process.exit()
    });

app.listen(3000, () => {
    console.log("Nodejs Starter Running on port : 3000 !");
});
