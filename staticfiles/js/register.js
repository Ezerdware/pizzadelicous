$(document).ready(function(){

    $('#tab').tab();

    $('#regBtn').click(function(){

        const country=$('#country').val();
        const fname=$('#firstName').val();
        const lname=$('#lastName').val();
        const cname=$('#companyName').val();
        const address=$('#address').val();
        const apartment=$('#apartment').val();
        const state=$('#state').val();
        const zip=$('#postaZip').val();
        const email=$('#emailName').val();
        const phone=$('#phone').val();
        const password=$('#accountPassword').val();
        const verify=$('#verifyPassword').val();
        
        if(password === verify){
            const regInfo={
                country:country,
                fName:fname,
                lName:lname,
                cName:cname,
                address:address,
                apartment:apartment,
                state:state,
                zip:zip,
                email:email,
                phone:phone,
                password:password,
                verify:verify
            };
    
            if(country!='' || 
                fname!='' || 
                lname!='' || 
                cname!='' ||
                address!='' ||
                state!='' ||
                zip!='' ||
                email!='' ||
                phone!='' ||
                password!='' ||
                verify!=''
                ){
                $.ajax({
                    type: 'POST',
                    url: '/register',
                    data: regInfo,
        
                    success: function(data){
                        if(data==='Thanks for registering with us!'){
                            $('#regErr').attr('class', 'alert alert-success visible')
                            $('#regErr').text(data)
                        }
                        else{
                            $('#regErr').attr('class', 'alert alert-danger visible')
                            $('#regErr').text(data)
                            
                        }
                        
                        $('#country').val('');
                        $('#firstName').val('');
                        $('#lastName').val('');
                        $('#companyName').val('');
                        $('#address').val('');
                        $('#apartment').val('');
                        $('#state').val('');
                        $('#postaZip').val('');
                        $('#emailName').val('');
                        $('#phone').val('');
                        $('#accountPassword').val('');
                        $('#verifyPassword').val('');
                    }
                });
            }
            else{
                $('#regErr').attr('class', 'alert alert-warning visible')
                $('#regErr').text('Important fields should not be empty. ')
            }
        }
        else{
            $('#regErr').attr('class', 'alert alert-warning visible')
            $('#regErr').text('Your password and verify password fields not equal. ')
        }

 
    });



});