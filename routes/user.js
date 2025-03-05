
const router = require('express').Router();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const User = require('../db/user.db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const veryfyToken = require('../middleware/verifytoken');

router.get('/test',(req,res) => {
    res.send('Hello World test');
})

router.post('/login',async (req, res) => {
    try {
        const username = req.body.username;
        const password = req.body.password;
        console.log(req.body)
        if(!(username && password)){
            return res.status(400).send('request is incomplete');
        }else{
            const users = await User.findOne({username:username});
            if(users && (await bcrypt.compare(password, users.password))){
                const token = jwt.sign(
                    {userId: users.id, username: users.username},
                    process.env.JWT_SECRET,
                    {expiresIn: '1d'}
                );
                
                console.log(token)
                return res.json({
                    status: 201,
                    message: "login successfully",
                    data: users,
                    token: token
                });
            }else{
                return res.status(404).send('login failed is not this username');
            }
        }
        
    }catch(err){
        res.status(500).send(err)
    }
})

router.post('/register', async (req, res, next) => {
    try{
        const {username,password,fullname} = req.body;
        if(!(username && password && fullname)){
            return res.status(400).send('request is incomplete');
        }
        const oldUser = await User.findOne({username:username});
        if(oldUser){
            return res.status(409).send('have this username please orther username');
        }
        const encryptedPassword = await bcrypt.hash(password,10);
        const users = await User.create({
            username: username,
            password: encryptedPassword,
            fullname: fullname
        });
        if(users){
            const token = jwt.sign(
                {userId: users.id, username: users.username},
                process.env.JWT_SECRET,
                {expiresIn: '1d'}
            );
            return res.json({
                status: 201,
                message:"User created successfully",
                data: users,
                token: token
            })
        }
    }catch(err){
        res.status(500).send(err)
    }
})

router.get('/profile', veryfyToken,async (req, res) => {
    try{
        const users = await User.findById(req.user.userId).select('-password');
        console.log(users)
        return res.json({
            status: 201,
            message: "get profile success",
            data: users
        });
    }catch(err){
        return res.status(404).json({message: "user not fond",err:err})
    }
})

module.exports = router;