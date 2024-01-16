const express = require("express");
const router = express.Router();
const UserController = require('../Controllers/UserController')
var cors = require('cors')

//disabling cors so we can call these routes from localhost
var cors = require('cors')
router.use(cors())


router.post("/signup", function (req, res) {
    let body = req.body
    UserController.signup(body.username, body.password, function (status, response) {
        res.status(status).send(response)
    })
});

router.post("/login", function (req, res) {
    let body = req.body
    if (body.username && body.password) {
        UserController.login(body.username, body.password, function (status, result) {
            res.status(status).send(result)
        })
    } else {
        res.status(500).send({ success: false, msg: "body format incorrect" })
    }
})

//example of a protected route
router.get('/getHelloWorld', UserController.checkauthenticated, function (req, res) {
    res.status(200).send({ msg: "Hello world , You are Authenticated ! ^^", user: req.decodedUser })
})

module.exports = router;
