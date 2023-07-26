const router = require('express').Router()
const db = require("../models")
const bcrypt = require('bcrypt')

const { User } = db

router.post('/', async (req, res) => {
    console.log('logged in with', req.body)
    let {email, password} = req.body
    let user = await User.findOne({
        where: {
            email
        }
    })

    if (!user || !await bcrypt.compare(password, user.passwordDigest)){
        res.status(404).json({
            message: 'Could not find user...'
        })
    } else {
        res.status(200).json({user})
    }

    console.log(user)
})

module.exports = router
