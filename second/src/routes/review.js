'use strict'
const express = require('express');
const router = express.Router();
const axios = require('axios');
const cheerio = require('cheerio');


router.get('/list',(req,res,next) => {

    let url = 'https://pcmap.place.naver.com/place/12159697/review/visitor?entry=pll&from=map&ts=20201214';
   
    axios.get(url).then(html => {
        let List = [];
        const $ = cheerio.load(html.data);
        const $bodyList = $("ul._1QS0G").children('li._2Cv-r');

        $bodyList.each(function(i,elem){
            List[i] = {
                information : $(this).find('div._23Rml').text(),
                nickname : $(this).find('div.hbo4A').text(),
                comment : $(this).find('span.WoYOw').text(),
            }
        })
        const data = List.filter(n => n.nickname);
        res.send(data);
        return data;
       
    })

})

module.exports = router;