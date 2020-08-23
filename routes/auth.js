const router = require('express').Router()
const User = require('../models/user')

router.post('/register',async (req,res) => {
    const user = new User({
        name : req.body.name,
        password : req.body.password,
        email : req.body.email
    })
    try{
        const savedUser = await user.save()
        res.send(savedUser)
    }catch(err){
        res.status(400).send(err)
    }
    res.send('Register');
})


module.exports = router