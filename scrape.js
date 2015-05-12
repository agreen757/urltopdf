var request = require('request'),
    cheerio = require('cheerio'),
    blockspring = require('blockspring'),
    xr = require('x-ray');

//var url = 'http://medium.com/@aptaube/bud-light-and-the-brand-fail-outrage-cycle-cffc0e03f296';

exports.get = function(url,cb){
    xr(url)
        .select([{content:'.section-content',pics:'img[src]'}]).run(function(err,data){
        //console.log(data);
        var htmlstring = "";

        data.map(function(ele,index){
            //if(ele.content){
            console.log(ele.content)

                if(ele.content == undefined){
                    htmlstring += ''
                }
                else{
                    htmlstring += '<div><p>'+ele.content+'</p></div><br>'
                }
                if(index == data.length - 1){
                    //console.log(htmlstring)
                    block(htmlstring)
                }   
            //}
        })


        function block(htmlstring){
            //console.log(htmlstring)
            blockspring.runParsed("html-to-pdf",{"html":htmlstring},function(res){
            return cb(null,res.params.my_pdf)
        })   
        }


    })
}