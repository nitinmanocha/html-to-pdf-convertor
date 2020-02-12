
const path = require('path')
const bodyParser = require('body-parser')
const express = require('express')
const ejs = require('ejs')
const fs = require('fs')
const app = express()
var conversion = require("phantom-html-to-pdf")();



app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');



app.get('/',(req,res)=>{
res.render('index')
})

app.get('/convert',(req,res)=>{
    // var html = req.body.html
    var html = "<html><i>its</i><b> working</b></html>"

    conversion({ html: html }, function(err, pdf) {
        if(err){
            res.status(400).send(err)
        }
        console.log(pdf.stream.path)
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
        res.header('content-type', 'application/pdf');
        res.download(pdf.stream.path)
    });

})

app.listen(3000, () => {
    console.log('server started at 3000')
});

