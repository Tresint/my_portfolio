const express = require('express');
const router = express.Router();
const db = require('../lib/db');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);
router.use(cors());
router.use(bodyParser.urlencoded({extended:false}));
router.use(bodyParser.json());
const multer = require('multer');
const upload = multer({dest:'./upload'})

router.use('/img',express.static('./upload'));

router.post('/add', upload.single('p_img'),(req,res) =>{
    let img = '/img/' + req.file.filename;
    var data = [img,req.body.p_name,req.body.p_content,req.body.p_price,req.body.category];
    console.log(data);
    let sql = 'insert into shop_product values(null,?,?,?,?,"no",?,"no")';
    db.query(sql,data,function(err,rows,fields){
        res.send(rows);
    })
})

router.get('/list',(req,res) =>{
    let sql = 'select * from shop_product where deleted = "no"';
    db.query(sql,function(err,rows,fields){
        res.send(rows);
    })
});

router.post('/delete',(req,res) => {
    var data =  [req.body.idx];
    let sql = 'update shop_product set deleted = "yes", main="no" where p_idx = ?';
    db.query(sql,data, function(err,rows){
        console.log(rows);
        res.send(rows);
    })
})

router.post('/product',(req,res) => {
    var data = [req.body.idx];
    let sql = 'select * from shop_product where p_idx = ?';
    db.query(sql, data, function(err,rows){
        res.send(rows);
    })
});

router.post('/update',(req,res) => {
    var data = [req.body.p_name,req.body.p_content,req.body.p_price,req.body.category,req.body.p_idx];
    let sql = 'update shop_product set p_name=?, p_content =?, p_price=?, category=? where p_idx = ?';
    db.query(sql,data, function(err,rows){
        res.send(rows);
    })
})

router.get('/back_list', (req,res) => {
    let sql = 'select * from shop_product where deleted = "yes"';
    db.query(sql,function(err,rows,fields){
        res.send(rows);
    })
})

router.post('/backup', (req,res) => {
    var data =  [req.body.idx];
    let sql = 'update shop_product set deleted = "no" where p_idx = ?';
    db.query(sql,data, function(err,rows){
        console.log(rows);
        res.send(rows);
    })
})

router.get('/category',(req,res) => {
    let sql = 'select * from shop_product where deleted = "no"';
    db.query(sql,function(err,rows){
        console.log(rows)
        res.send(rows);
    })
})

router.post('/tag',(req,res) =>{
    var data = [req.body.category];
    let sql = 'select * from shop_product where deleted = "no" and category = ?';
    db.query(sql,data,function(err,rows){
        console.log(sql);
        console.log(data);
        console.log(rows);
        res.send(rows);
    })
})

router.post('/search', (req,res) => {
    var data = [req.body.name];
    let sql = 'select * from shop_product where deleted ="no" and p_name like "%"?"%"';
    db.query(sql,data,function(err,rows){
        res.send(rows);
    })
})

router.get('/mainlist',(req,res) =>{
    let sql = 'select * from shop_product where deleted = "no" and main="yes"';
    db.query(sql,function(err,rows,fields){
        res.send(rows);
    })
});

router.post('/mainproduct',(req,res) =>{
    var data = [req.body.idx];
    let sql = 'update shop_product set main="yes" where p_idx =?';
    db.query(sql,data,function(err,rows){
        res.send(rows);
    })
})

router.post('/check', (req,res) => {
    var data = [req.body.idx];
    let sql = 'select * from shop_product where main = "yes" and p_idx = ?';
    db.query(sql,data,function(err,rows){
        res.send(rows);
    })
})

router.post('/exceptproduct',(req,res) => {
    var data = [req.body.idx];
    console.log(data);
    let sql = 'update shop_product set main="no" where p_idx =?';
    db.query(sql,data,function(err,rows){
        console.log(rows);
        res.send(rows);
    })
})

router.post('/buyproduct',(req,res) => {
    client.messages.create({
        body : '\n[결제내역 안내] \n상품명 : ' + req.body.name + '\n결제금액 : ' + req.body.price + '원이 결제되었습니다.\n   -MyShop-',
        from : '+13179363846',
        to : '+82 phonenumber'
    })
    .then(message => console.log(message.sid))
    .catch(err=>{
        console.log(err);
    })
})

router.post('/buy_ok',(req,res) => {
    var data = [req.body.id,req.body.p_idx];
    let sql = 'insert into shop_bcomment values(null,?,?,"yes")';
    db.query(sql,data,function(err,rows){
        res.send(rows);
    })
})

router.post('/check_bought',(req,res) =>{
    var data = [req.body.id,req.body.p_idx];
    let sql = 'select * from shop_bcomment where id = ? and p_idx = ?';
    db.query(sql,data,function(err,rows){
        if(rows.length === 0){
            res.send('0');
        }else{
            res.send('1');
        }
        if(err)console.log(err);
    })
})

router.get('/b_commentlist',(req,res) =>{
    let sql = 'select * from shop_buy_comment';
    db.query(sql,function(err,rows){
        res.send(rows);
    })
})

router.post('/comment_ok',(req,res) => {
    var data = [req.body.content,req.body.writer,req.body.p_idx];
    let sql = 'insert into shop_buy_comment values(null,?,?,?)';

    db.query(sql,data,function(err,rows){
        res.send(rows);
        if(err)console.log(err);
    })
})

router.post('/commentdelete',(req,res) => {
    var data = [req.body.idx];
    let sql = 'delete from shop_buy_comment where idx = ?';
    db.query(sql,data,function(err,rows){
        res.send(rows);
    })
})

module.exports = router;