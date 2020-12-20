'use strict'

const db = require('../lib/db');
const express = require('express');
const router = express.Router();
const cors = require('cors');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const jsonwebtoken = require('jsonwebtoken');
const jwt = require('express-jwt');
const config = require('../middleware/Auth');
const getErrorMessage = require('../middleware/messagehandler');
require('dotenv').config();
const secretkey = process.env.SECRET_KEY;

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended:false}));
router.use(cors({origin:true}));
router.use(session({
    secret : 'djksjdka@JKdkj*#&*!',
    resave : false,
    saveUninitialized : true //식별값
}))
router.use(cookieParser());

router.post('/inquiry',(req,res) => {
    var data = [req.body.id];
    let sql = 'select * from hotel where user_id = ?';
    db.query(sql,data,function(err,rows){
        if(rows.length != 0){
            res.send('1');  //아이디가 존재 
        }else{
            res.send('0'); //아이디가 존재하지 않음
        }
    });
})

router.post('/join',(req,res) => {

    crypto.randomBytes(64,(err,buf) => {
        if(err)console.log(err);
        const salt = buf.toString('hex');
        crypto.pbkdf2(req.body.pw,salt,106204,64,'sha512',(err,key) => {
            if(err)console.log(err);
            const pw = key.toString('hex');

            var data = [req.body.id,pw,req.body.email,salt];
            let sql = 'insert into hotel values(?,?,?,?)';
            db.query(sql,data,function(err,rows){
                res.send(rows);
            })
        })
    })
})

router.post('/login',(req,res) => {
    console.log(1);
    var pw = req.body.pw;
    var data = [req.body.id];
    let sql = 'select * from hotel where user_id = ?';
    db.query(sql,data,function(err,rows){
        if(rows.length != 0){
            var user = rows[0];
            crypto.pbkdf2(pw,user.salt,106204,64,'sha512',function(err,key){
                if(err)console.log(err);
                if(key.toString('hex') === user.user_pw){
                    console.log('패스워드 동일함');
                    console.log(user.user_id);
                    const token = jsonwebtoken.sign({
                        user_id : user.user_id
                    },secretkey,{
                        expiresIn : config.token.expired
                    })
                    res.json({
                        user_id : user.user_id,
                        token : token
                    })
                }else{
                    res.send('2'); //패스워드 불일치
                }
            })
        }else{
            res.send('0'); //해당 아이디가 존재하지 않음
        }
        if(err)console.log(err);
    })
})



module.exports = router;
