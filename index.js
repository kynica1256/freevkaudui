const request = require('request');               
request(
    "https://moa.hotmo.org/search?q=Humans",
    (err, response, body) => {
     let arr = body.split('\n');
     for (let i of arr) {
        console.log(i)
        const text = i.replace(/^\s+|\s+(?=[\n\r])/gm,"");
        const test = text.split('').slice(0, 23).join("");
        if (test === '<a data-nopjax="" href=') {
            const str = text.split('').slice(24, -34).join("");
            console.log(str)
        }
     }
     }
)
