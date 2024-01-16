//import our DB instance
const db = require("../Models");
const jwt = require("jsonwebtoken");
var bcrypt = require('bcryptjs');
const SECRET = 'OUR_SECRET_HERE'


exports.login = function (username, password, callback) {
    try {
        db.User.findOne({ where: { username: username } }).then(response => {
            if (response != null) {
                response = response.dataValues
                bcrypt.compare(password, response.password, function (err, isMatch) {
                    if (err) {
                        callback(500, "something went wrong : ", err)
                    };
                    if (isMatch) {
                        callback(200, { jwt: CreateJWTtoken({ data: response }), user: response })
                    } else {
                        callback(404, { success: false, msg: "user not found" })
                    }
                })
            } else {
                callback(404, { success: false, msg: "user not found" })
            }
        })
    } catch (error) {
        callback({ success: false, msg: "something went wrong : " + error })
    }
}


exports.signup = function (username, password, callback) {
    bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(password, salt, function (err, hash) {
            db.User.create(
                { username: username, password: hash }
            ).then(() => {
                callback(200, { success: true, msg: "user added successfully" })
            }).catch((error) => callback(500, error))
        })
    })
}


const CreateJWTtoken = function (payload) {
    const JWTtoken = jwt.sign(
        { jwt: payload },
        SECRET,
        {
            expiresIn: "4h",
        }
    );
    return JWTtoken
}


exports.checkauthenticated = (req, res, next) => {

    if (!req.headers.token) {
        res.status(403).send('Access denied.')
        return;
    }
    jwt.verify(req.headers.token, SECRET, (err, decoded) => {
        if (err) {
            res.status(403).send('Access denied.')
            return;
        }
        req.decodedUser = decoded;
        next()
    });
}
