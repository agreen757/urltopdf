/*MAIN APP TO BE THE SERVER AND TO LAUNCH THE SCRAPER ON REQUEST*/

var express = require('express'),
    bodyParser = require('body-parser'),
    scraper = require('./scrape.js');

var app = express();

app.use(bodyParser());
app.use('/bower_components',express.static(__dirname+'/bower_components'))
app.use('/public',express.static(__dirname+'/public'))

app.get('/',function(req,res){
    res.sendfile('public/index.html',{root:__dirname})
})
app.put('/scrape',function(req,res){
    var url = req.body.url;
    //console.log(req.body)
    //res.send('got it')
    scraper.get(url,function(err,data){
        res.send(data)
    })
})

app.post('/pdfdownload',function(req,res){
    var name = req.body.file;
    res.download(name, function(err){
        if(err){console.log(err)}
    })
})

app.listen(2000);
console.log('listening on 2k')