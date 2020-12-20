const express = require('express');
const router = express.Router();
const db = require('../lib/db');
const bodyParser = require('body-parser');
const cors = require('cors');
const nodemailer = require('nodemailer');
const smtpTransport = nodemailer.createTransport({
    service : 'Gmail',
    auth : {
        user : 'kn2414e@gmail.com',
        pass : 'emailpw'
    },
    tls : {
        rejectUnauthorized : false
    }
})
const crypto = require('crypto');

router.use(cors());
router.use(bodyParser.urlencoded({extended:false}));
router.use(bodyParser.json());


router.post('/register',function(req,res){

    crypto.randomBytes(64,(err,buf) => {
        if(err) console.log(err);
       const salt = buf.toString('hex');

    crypto.pbkdf2(req.body.pw,salt,99999,64,'sha512',(err,key) =>{
        if(err)console.log(err);
        const pw = key.toString('hex');
    
        var data = [req.body.id,pw, req.body.email,salt];
        let sql = 'insert into shop_member(id,pw,email,salt) values(?,?,?,?)';
        db.query(sql,data,function(err,rows){
            if(err)console.log(err);
            res.send(rows);
        })
    });
    })
})


router.post('/login', function(req,res){
    var pw = req.body.pw;
    var data = [req.body.id];
    let sql = "select * from shop_member where id=?";
    db.query(sql,data,function(err,rows){
        if(rows.length != 0){
            var user = rows[0];
            crypto.pbkdf2(pw,user.salt,99999,64,'sha512',function(err,key){
                if(err)console.log(err);
                if(key.toString('hex') === user.pw){
                    console.log('패스워드 동일함')
                    res.send('1');
                }else{
                    res.send('2');
                }
            })
        }else{
            res.send('0');
        }
        if(err)console.log(err);
    })
});


router.post('/auth', async(req,res) => {

    let authcode = Math.random().toString().substr(2,6);

    const mailOptions = {
        from : 'kn2414e@gmail.com',
        to : req.body.email,
        subject : 'MyShop 회원가입 인증메일입니다.',
        text : `인증코드 : ${authcode}`
    };

    res.send(authcode);

    await smtpTransport.sendMail(mailOptions, (err,res) =>{
        if(err)console.log(err);

        smtpTransport.close();
    })
})

router.post('/matchguest',(req,res) =>{
    var data = [req.body.id, req.body.email];
    let sql = 'select * from shop_member where id = ? and email = ?';
    db.query(sql,data, function(err,rows){
        if(rows.length === 0){
            res.send('1');  //id가 없는 경우
        }else{
            res.send('0'); //id가 있는 경우
        }
    })
})

router.post('/auth_pw', async(req,res) => {

    let authcode = Math.random().toString().substr(2,6);

    const mailOptions = {
        from : 'kn2414e@gmail.com',
        to : req.body.email,
        subject : 'MyShop 회원가입 비밀번호 재설정 메일입니다.',
        text : `인증코드 : ${authcode}`
    };

    res.send(authcode);

    await smtpTransport.sendMail(mailOptions, (err,res) =>{
        if(err)console.log(err);

        smtpTransport.close();
    })
})

router.post('/reset_pw',function(req,res){

    
    crypto.randomBytes(64,(err,buf) => {
        if(err) console.log(err);
       const salt = buf.toString('hex');

    crypto.pbkdf2(req.body.pw,salt,99999,64,'sha512',(err,key) =>{
        if(err)console.log(err);
        const pw = key.toString('hex');
    
        var data = [pw,req.body.id, req.body.email];
        let sql = 'update shop_member set pw = ? where id=? and email = ?';
        db.query(sql,data,function(err,rows){
            res.send(rows);
        })
    });
    })

})

module.exports = router;