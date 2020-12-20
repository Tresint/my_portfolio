const express = require('express');
const router = express.Router();
const db = require('../lib/db');
const bodyParser = require('body-parser');
const cors = require('cors');

router.use(cors());
router.use(bodyParser.urlencoded({extended:false}));
router.use(bodyParser.json());


router.get('/list',(req,res) => {
    let sql = 'select * from shop_board order by idx desc';

    db.query(sql,function(err,rows){
        res.send(rows)
    })
})

router.post('/write_ok',(req,res) =>{
    var data = [req.body.title,req.body.content,req.body.writer];
    let sql = 'insert into shop_board values(null,?,?,?,NOW())';
    db.query(sql,data,function(err,rows){
        if(err)console.log(err);
        res.send(rows);
    })
})

router.post('/incontent',(req,res) =>{
    var data = [req.body.idx];
    let sql = 'select * from shop_board where idx = ?';

    db.query(sql,data,function(err,rows){
        res.send(rows);
    })
})

router.post('/delete',(req,res) => {
    var data = [req.body.idx];
    let sql = 'delete from shop_board where idx = ?';
    db.query(sql,data,function(err,rows){
        res.send(rows);
    })
})

router.post('/getcontent',(req,res) => {
    var data = [req.body.idx];
    let sql = 'select * from shop_board where idx = ?';
    db.query(sql,data,function(err,rows){
        res.send(rows);
    })
})

router.post('/update',(req,res) => {
    var data = [req.body.title,req.body.content,req.body.idx];
    let sql = 'update shop_board set title = ? ,content = ? where idx = ?';
    db.query(sql,data, function(err,rows){
        res.send(rows);
    })
})

router.post('/comment',(req,res) => {
    var data = [req.body.content,req.body.writer,req.body.b_idx];
    let sql = 'insert into shop_comment values(null,?,?,?)';
    if(req.body.content === ''){
        return false;
    }
    db.query(sql,data,function(err,rows){
        res.send(rows);
    })
})

router.post('/commentlist',(req,res) => {
    var data = [req.body.b_idx];
    let sql = 'select * from shop_comment where b_idx = ? order by idx desc';
    db.query(sql,data,function(err,rows){
        res.send(rows);
    })
})

router.post('/commentdelete',(req,res) => {
    var data = [req.body.idx];
    let sql = 'delete from shop_comment where idx = ?';
    db.query(sql,data,function(err,rows){
        res.send(rows);
    })
})

module.exports = router;