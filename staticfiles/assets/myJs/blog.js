$('document').ready(function(){
    $('#blogCategoryRemove').click(function(){
        let text=$('#blogCategoryEnter').val();
        if(text===''){
            alert('Field should not be empty')
        }
        else{
            $.ajax({
                type:'delete',
                url:'/blogcategoryremove/'+$('#blogCategoryEnter').val(),
                success:function(info){
                    alert(info)
                }
            })
        }
        
    })
    $('#blogTagRemove').click(function(){
        let text=$('#blogTagEnter').val();
        if(text===''){
            alert('Field should not be empty')
        }
        else{
            $.ajax({
                type:'delete',
                url:'/blogtagremove/'+$('#blogTagEnter').val(),
                success:function(info){
                    alert(info)
                }
            })
        }
        
    })
})