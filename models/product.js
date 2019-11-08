//pissa
module.exports.pizza=function(db,req, res){
    var date = new Date();
    var time=new Date();
    var timeStamp=time.toLocaleTimeString();
    var dateTimeStamp = date.toLocaleDateString() + "  " + date.toLocaleTimeString();


    let p1='pizza'
    

    const data=db.all('SELECT * FROM product WHERE type="'+p1+'"',function(err, data,){
        
        if(err){
            console.log('['+timeStamp+'] product : '+err)
        }
        else{
            //req.session.pizza=data
            return data
        }
        
    });
    
return data
}
//pasta
module.exports.pasta=function(db,req, res){
    var date = new Date();
    var time=new Date();
    var timeStamp=time.toLocaleTimeString();
    var dateTimeStamp = date.toLocaleDateString() + "  " + date.toLocaleTimeString();


    let p2='pasta'

    db.all('SELECT * FROM product WHERE type="'+p2+'"',function(err, data){
       
        if(err){
            console.log('['+timeStamp+'] product : '+err)
        }
        else{
            //console.log(data)
            req.session.pasta=data
        }
        
    });
}
//burger
module.exports.burger=function(db,req, res){
    var date = new Date();
    var time=new Date();
    var timeStamp=time.toLocaleTimeString();
    var dateTimeStamp = date.toLocaleDateString() + "  " + date.toLocaleTimeString();


    let p3='burger'

    db.all('SELECT * FROM product WHERE type="'+p3+'"',function(err, data){
        
        if(err){
            console.log('['+timeStamp+'] product : '+err)
        }
        else{
            // console.log(data)
            req.session.burger=data
        }
        
        
    });
}
//drink
module.exports.drink=function(db,req, res){
    var date = new Date();
    var time=new Date();
    var timeStamp=time.toLocaleTimeString();
    var dateTimeStamp = date.toLocaleDateString() + "  " + date.toLocaleTimeString();


    let p4='drink'

    db.all('SELECT * FROM product WHERE type="'+p4+'"',function(err, data){
        
        if(err){
            console.log('['+timeStamp+'] product : '+err)
        }
        else{
            //console.log(data)
            req.session.drink=data
        }
        
    });
}