module.exports= function(db,data,res){
		db.all('SELECT email FROM userData WHERE email="'+data.email+'"',(err,results)=>{
			if(!err){
				if(!results.length==0){
					console.log(data.email+"already existed");
					res.json('You\'av registered with us already');
				}
				else{

					var insertQuery = db.prepare('INSERT INTO userData (country, firstName, lastName, companyName, address, apartment, state, zip, email, phone, password, dateRegTimeStamp) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', (err) => {
						if (!err) {
							var date = new Date();
							var time=new Date();
							var timeStamp=time.toLocaleTimeString();
							var dateTimeStamp = date.toLocaleDateString() + "  " + date.toLocaleTimeString();


							insertQuery.run(data.country, data.fName, data.lName, data.cName, data.address, data.apartment, data.state, data.zip, data.email, data.phone, data.password, dateTimeStamp);
							insertQuery.finalize();
							console.log('[' + timeStamp + ']' + '	rigisterModel : '+data.email + ' just registered');
							res.json('Thanks for registering with us!');
						} else {
							console.log('[' + timeStamp + ']' + '	registerModel : '+err);
						}
					})

				}
			}
			else{
				console.log('[' + timeStamp + ']' + 'registerModel : '+'Unable to check if User already existed ' + err);
			}
		});
			
		
			
	

}