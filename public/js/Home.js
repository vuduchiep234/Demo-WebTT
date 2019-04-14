$.ajax({
                    
        url: '/api/v1/books/'+'all?relations[]=authors&relations[]=genres&relations[]=publisher',
        type: 'get',
        dataType: 'json',
        success: function(data) {

            var output = "";
            var j, q = "";
            

            for(var i in data){
                var k = [];
                var p = [];
                var au = [];
                var ge = [];
                // var output = "";
                for(j in data[i].authors){
                    k.push(data[i].authors[j].id);
                    au.push(data[i].authors[j].name);
                }
                for(q in data[i].genres){
                    p.push(data[i].genres[q].id);
                    ge.push(data[i].genres[q].genreType);
                }
                var publisher = data[i].publisher.publisherName;
                
                output = 
                            "<div class='single-popular-carusel'>"
                                +"<div class='thumb-wrap relative'>"
                                    +"<div class='thumb relative'>"
                                        +"<div class='overlay overlay-bg'></div>"  
                                        +"<img class='img-fluid' src='frontend/img/p1.jpg' alt=''>"
                                    +"</div>"
                                    +"<div class='meta d-flex justify-content-between'>"
                                        +"<p><span class='lnr lnr-users'></span> 355 <span class='lnr lnr-bubble'></span>35</p>"
                                        +"<h4>$150</h4>"
                                    +"</div>"                                  
                                +"</div>"
                                +"<div class='details'>"
                                    +"<a href='#'>"
                                        +"<h4>"
                                            +data[i].title
                                        +"</h4>"
                                    +"</a>"
                                    
                                        +"<p>"
                                            +"Author: "+"<b style='color: black;'>"+au+"</b>"                                        
                                        +"</p>"
                                    
                                    
                                        +"<p>"
                                            +"Genre: "+"<b style='color: black;'>"+ge+"</b>"                                       
                                        +"</p>"
                                    
                                    
                                        +"<p>"
                                            +"Publisher: "+"<a href='#'>"+publisher+"</a>"                                      
                                        +"</p>"
                                    
                                    
                                        +"<p>"
                                            +"Published Year: "+"<b style='color: black;'>"+data[i].publishedYear+"</b>"                                     
                                        +"</p>"

                                +"</div>"
                            +"</div>";

                $('#_list_book').append(output);

                
            }
        },

        error: function(err){
            console.log(mess);
        }
});

$('#sign_in').click(function(){

    var email = $('#email_login').val();
    var password = $('#password_login').val();

    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });

    $.ajax({
        url: '/api/v1/users/login',
        type: 'post',
        dataType: 'json',
        data:{
            email: email,
            password: password
        },
        success: function(){
            alert("Success !");
        },
        error: function(){
            alert("Login fail !");
        }

    });
});

$('#register').click(function(){

    var name = $('#name_user').val();
    var email = $('#email_user').val();
    var password = $('#password_user').val();
    var re_password = $('#re_password_user').val();

    if(password == re_password){
        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }
        });

        $.ajax({
            url: '/api/v1/users/register',
            type: 'post',
            dataType: 'json',
            data: {
                name: name,
                email: email,
                password: password
            },
            success: function(){
                alert('Success !');
            },
            error: function(){
                alert('Register fail !');
            }
        });
    }
    else{
        alert('Confirm password is fail');
    }

    
});