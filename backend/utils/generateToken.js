const jwt = require("jsonwebtoken");

const generateToken = id =>{
    return jwt.sign({id}, "ASDFGHJKL", {
        expiresIn: "30d",
    })
}
module.exports = generateToken