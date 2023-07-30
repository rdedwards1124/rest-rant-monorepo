const db = require("../models")
const jwt = require('json-web-token')

const { User } = db;

async function defineCurrentUser(req, res, next){
    let currentUser;
    try {
        const [authMethod, token] = req.headers.authorization.split(" ");
        if (authMethod == "Bearer") {
            const result = await jwt.decode(process.env.JWT_SECRET, token);
            const { userId } = result.value;
            currentUser = await User.findOne({
                where: {
                    userId,
                },
            });
            req.currentUser = currentUser
        }
        next()
    } catch (e) {
        req.currentUser = null;
        next()
    }
}

module.exports = defineCurrentUser


