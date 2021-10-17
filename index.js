const express = require('express')
const app = express()
const request = require('request');  
const { base64encode, base64decode } = require('nodejs-base64');

app.use(express.static(__dirname + '/use'));


var ress = true;


const url = {"url":""};
app.get('/', function (req, res) {
    console.log(base64decode(req.query.str))
    request(
        "https://moa.hotmo.org/search?q="+base64decode(req.query.str),
        (err, response, body) => {
            try {
                let arr = body.split('\n');
                for (let i of arr) {
                   var text = i.replace(/^\s+|\s+(?=[\n\r])/gm,"");
                   var test = text.split('').slice(0, 23).join("");
                   if (test == '<a data-nopjax href="ht') {
                       var str = text.split('').slice(21, -34).join("");
                       ress = false;
                       url["url"] = str;
                   }
                   if (ress == false) {
                       break;
                   }
                }
                ress = true;
            } catch (err) {}

        }
    )
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.send("{");
})
app.get('/check', function (req, res) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', 'true');
    console.log(url["url"]);
    res.send(url["url"]);
})
app.get('/music', function (req, res) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.sendfile('use/index.html');
})
app.listen(5000)

