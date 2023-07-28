const router = require("express").Router();
const db = require("../models");
const bcrypt = require("bcrypt");

const { User } = db;

router.post("/", async (req, res) => {
    console.log("logged in with", req.body);
    let { email, password } = req.body;
    let user = await User.findOne({
        where: {
            email,
        },
    });

    if (!user || !(await bcrypt.compare(password, user.passwordDigest))) {
        res.status(404).json({
            message: "Could not find user...",
        });
    } else {
        req.session.userId = user.userId;
        res.status(200).json({ user });
    }

    console.log(user);
});

router.get('/profile', async (req, res) => {
    let userId = req.session.userId;
    try {
        let user = await User.findOne({
            where: {
                userId
            }
        });
        if (!user) {
            res.status(404);
        } else {
            res.status(200).json(user);
        }
    } catch(e) {
        res.status(404).json({ message: 'Could not validate user'})
    }
});

module.exports = router;
