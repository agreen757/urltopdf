var request = require('request'),
    cheerio = require('cheerio'),
    blockspring = require('blockspring'),
    xr = require('x-ray'),
    mongodb = require('mongodb');

//var url = 'http://medium.com/@aptaube/bud-light-and-the-brand-fail-outrage-cycle-cffc0e03f296';

exports.get = function(url,cb){
    xr(url)
        .select([{content:'.section-content',pics:'img[src]'}]).run(function(err,data){
        //console.log(data);
        var htmlstring = "";

        data.map(function(ele,index){
            //if(ele.content){
            
            
            //INSERT FUNCTION TO SEND ALL OF THIS CONTENT TO CLOUD MONGO TO BE FURTHER EVALUATED
            //******************************************************************************
            
            //SEND (USERNAME IN FUTURE),URL,TEXT,PICTURES - MAYBE WE SHOULD NUMBER THE ENTRIES IN ORDER TO BETTER KEEP THEM LINED UP?  IN 
            //THAT CASE WE WOULD NEED TO INCLUDE THE INDEX WITH THE SUBMISSION TO THE DB
            
            /*
            db.collection('magni').update({date:todaysDate},{$set:{content:ele.content,pics:ele.pics}},{upsert:true},function(err,res){
                //LOG THE RESULT
                //RETURN IF FINISHED
                
                if(index == data.length - 1){
                    return cb(null,'done')
                }
            })
            
            */
            
            //******************************************************************************
            
            
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