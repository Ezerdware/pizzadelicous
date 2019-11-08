$('document').ready(function(){
    $('#couponGenerateCodeButton').on('click',function(){
        
        $.ajax({
            type:'get',
            url:'/coupongeneratecouponcode',
            success:function(data){
                $('#couponGenerateCode').val(data)
            }
        })

        

    });
})