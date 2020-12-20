const express = require('express');
const app = express();
require('dotenv').config()
const member = require('./routes/member');
const product = require('./routes/product');
const myinform = require('./routes/myinform');
const question = require('./routes/question');
const board = require('./routes/board');
const cors = require('cors');

app.use(cors());
const multer = require('multer');
const upload = multer({dest:'./upload'});
app.use('/img',express.static('./upload'));

//회원관련
app.use('/member',member);
//상품관련 
app.use('/product', product);
//내정보
app.use('/myinform',myinform);
//문의관련
app.use('/question',question);
//회원게시판
app.use('/board',board);

app.listen(5000, () => {
    console.log('server on');
});