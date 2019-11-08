module.exports= function(db,data,res){
	var date = new Date();
	var time = new Date();
	var timeStamp=time.toLocaleTimeString();
		db.all('SELECT email, password FROM userData WHERE email="'+data.username+'"',(err,results)=>{
			if(!err){
				if(results.length == 0){
					console.log('['+timeStamp+']'+'	loginModel : '+data.username +' does not exist in the database');
					res.json('Access denied! You entered an incorrect username and password');
				}
				else{
					if(results[0].password !== data.password){
						console.log('[' + timeStamp + ']' + '	loginModel : ' + data.username + ' entered an incorrect password!');
						console.log(results[0].password)
						res.json('Access denied! You entered an incorrect password');
					}
					else{
						
						var dateTimeStamp=date.toLocaleDateString()+' '+time.toLocaleTimeString();
						db.run('UPDATE userData SET lastSeen="'+dateTimeStamp+'" WHERE email="'+data.username+'"');
						console.log('[' + timeStamp + ']' + '	loginModel : ' + data.username + ' logged in');
						res.json('Access granted!');
					}
				}
			}
			else{
				consol.log('[' + timeStamp + ']' + '	loginModel : couldn\'t execute query ' + err);
				res.json('Server couldn\'t log you in');
			}
			
		});
			
		
		
}