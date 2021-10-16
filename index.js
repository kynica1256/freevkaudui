const express = require('express')
const app = express()
const request = require('request');  
const { base64encode, base64decode } = require('nodejs-base64');


var ress = true;

var url = "";

app.get('/', function (req, res) {
    request(
        "https://moa.hotmo.org/search?q="+base64decode(req.query.str),
        (err, response, body) => {
            let arr = body.split('\n');
            for (let i of arr) {
               const text = i.replace(/^\s+|\s+(?=[\n\r])/gm,"");
               const test = text.split('').slice(0, 23).join("");
               //console.log(test)
               if (test == '<a data-nopjax href="ht') {
                   const str = text.split('').slice(21, -34).join("");
                   ress = false;
                   url = str;
               }
               if (ress == false) {
                   break;
               }
            }
         }
    )
    res.append('Access-Control-Allow-Origin', '*');
    res.append('Access-Control-Allow-Credentials', 'true');
    res.send("true");
})
app.get('/check', function (req, res) {
    res.send(url);
})
app.listen(3000)
