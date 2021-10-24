const express = require('express')
const app = express()
const request = require('request');  
const { base64encode, base64decode } = require('nodejs-base64');
var crypto = require("crypto");
let fs = require("fs");
var ress = true;

const url = {"url":"1"};

const file = {"file":"","url":""};

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
                request("http://127.0.0.1:5000/check");
            } catch (err) {}

        }
    )
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.send("");
})
app.get('/check', function (req, res) {
    console.log(url["url"]);
    if (file["url"] != url["url"]) {
        var id = crypto.randomBytes(10).toString('hex');
        file["file"] = id+".mp3";
        file["url"] = url["url"];
        request(url["url"]).pipe(fs.createWriteStream(file["file"]));
    }
    res.send("{")
})
app.get('/musiccheck', function (req, res) {
    console.log(file["file"])
    res.sendfile(file["file"], {acceptRanges: false});
})
app.listen(5000)

function base64_encode(file) {
    return "data:image/gif;base64," + fs.readFileSync(file, 'base64');
}
