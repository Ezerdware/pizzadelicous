$('document').ready(function(){
    $('#loginBtn').click(function(){
        let username= $('#userEdit').val();
        let password= $('#passEdit').val();
        let auth={
            username:username,
            password:password
        }
        if(username==='' || password===''){
            $('#emptyErr').attr('class', 'alert alert-warning visible')
            $('#emptyErr').text('fields should not be empty. ')
        }
        else{
            $.ajax({
                type:'POST',
                url:'/login',
                data:auth,
                success: function(data){
                    if(data==='Access granted!'){
                        $('#emptyErr').attr('class', 'alert alert-success visible')
                        $('#emptyErr').html(data +'<b class="b float-right strong" id="usershower">'+username+'</b>')
                        $('#loginForm').hide()
                        $('#logoutBtn').attr('class', 'btn btn-danger btn-block visible')
                    }
                    else{
                        $('#emptyErr').attr('class', 'alert alert-danger visible')
                        $('#emptyErr').text(data)
                        
                    }
                    $('#userEdit').val('')
                    $('#passEdit').val('')

                }

            })
        }
    })

    // $('#logoutBtn').click(function(){
    //     const user=$('#usershower').text()

    //     $.ajax({

    //     })

    // })
})