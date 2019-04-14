
jQuery(function($) {

    $('#addBook').click(function(){

        
        $('#title').val("");
        $('#author_select').val("");
        $('#genre_select').val("");
        $('#publisher_id').val("");
        $('#publishedYear').val("");
        $('#myModal-book').modal('show');

    });

    

    $('.dropdown_publisher li').click(function(){
        $('#publisher_id').val($(this).text());
        $('#edit_publisher_id').val($(this).text());
        $('#_publisher_id').val($(this).attr('id'));
        $('#_edit_publisher_id').val($(this).attr('id'));
        
    });


    $('.select2').select2();
    $.ajax({
                    
        url: '/api/v1/books/'+'all?relations[]=authors&relations[]=genres&relations[]=publisher',
        type: 'get',
        dataType: 'json',
        success: function(data) {



            var output = "";
            var j, q = "";

            for(var i = 0; i < data.length; i++){
                var k = [];
                var p = [];
                var au = [];
                var ge = [];
                for(j in data[i].authors){
                    k.push(data[i].authors[j].id);
                    au.push(data[i].authors[j].name);
                }
                for(q in data[i].genres){
                    p.push(data[i].genres[q].id);
                    ge.push(data[i].genres[q].genreType);
                }
                output +=   "<tr>"
                                +"<td class='text-center'>"+data[i].id+"</td>"
                                +"<td class='text-center'>"+data[i].title+"</td>"
                                +"<td class='text-center'>"+au+"</td>"
                                +"<td class='text-center'>"+ge+"</td>"
                                +"<td class='text-center'>"+data[i].publisher.publisherName+"</td>"
                                +"<td class='text-center'>"+data[i].publishedYear+"</td>"
                                +"<td class='text-center'>"
                                    +"<a href='#' class='text-blue' data-toggle='modal' id_edit_book="+data[i].id+" data-type='update-book' title="+data[i].title+" publisher_id="+data[i].publisher_id+" author_id="+k+" genre_id="+p+" publishedYear="+data[i].publishedYear+">"
                                        +"<i class='ace-icon fa fa-pencil bigger-130'></i>"
                                    +"</a>"
                                +"</td>"
                                +"<td class='text-center'>"
                                    +"<a href='#' class='text-red delete_book' id_delete_book="+data[i].id+" data-type='delete-book'>"
                                        +"<i class='ace-icon fa fa-trash-o bigger-130'></i>"
                                    +"</a>"
                                +"</td>"
                                
                            +"</tr>";

            }
            $('#body_list_book').html(output);
            $('#addBook').click(function(){

        
                $('#title').val("");
                $('#author_select').val("");
                $('#genre_select').val("");
                $('#publisher_id').val("");
                $('#publishedYear').val("");
                $('#myModal-book').modal('show');

            });
            $('a[data-type=update-book]').on('click', function(){

                $('#edit_title').val("");
                $('#select_author').val('');
                $('#select_genre').val('');
                $('#edit_published_year').val("");
                $('#editModal-book').modal('show');


                var id = $(this).attr("id_edit_book");
                var edit_title = "";
                var edit_author_id = $(this).attr("author_id");
                var edit_genre_id = $(this).attr("genre_id");
                var edit_publisher_id = $(this).attr("publisher_id");
                var edit_published_year = $(this).attr("publishedYear");

                // var author = $(this).attr("author");
                // var genre = $(this).attr("genre");
                var author_array = [];
                var genre_array = [];

                author_array = edit_author_id.split(",");
                // author_array = author_array.split(",");

                genre_array = edit_genre_id.split(",");
                // genre_array = genre_array.split(",");
                // console.log(author_array);
                // console.log(genre_array);
                $.ajax({
                            
                    url: '/api/v1/books/get?id='+id,
                    type: 'get',
                    dataType: 'json',
                    success: function(data) {
                        title = data.title;
                        $('#edit_title').val(title);
                        // alert(title);
                    },
                    error: function(){
                        alert("Error get data book");
                    }
                });
                // console.log(title);
                $.ajax({
                            
                    url: '/api/v1/publishers/get?id='+edit_publisher_id,
                    type: 'get',
                    dataType: 'json',
                    success: function(data) {
                        edit_publisher_id = data.publisherName;
                        $('#edit_publisher_id').val(edit_publisher_id);
                    },
                    error: function(){
                        alert("Error get data publisher");
                    }
                });

                var nameAuthor = [];
                
                for(var a = 0; a < author_array.length; a++){
                    // alert(author_array[a]);
                    $.ajax({
                        
                        url: '/api/v1/authors/get?id='+author_array[a],
                        type: 'get',
                        dataType: 'json',
                        success: function(data) {
                            nameAuthor.push(data.name);
                            $('#select_author').val(nameAuthor);
                            
                        },
                        error: function(){
                            alert("Error get data author");
                        }
                    });
                }
                
                
                
                
                
                var genreType = [];
                
                for(var g = 0; g < genre_array.length; g++){
                    // alert(genre_array[g]);
                    $.ajax({
                            
                        url: '/api/v1/genres/get?id='+genre_array[g],
                        type: 'get',
                        dataType: 'json',
                        success: function(data) {
                            genreType.push(data.genreType);
                            $('#select_genre').val(genreType);
                            
                        },
                        error: function(){
                            alert("Error get data genre");
                        }
                    });
                }
                
                


                // $('#edit_title').val(title);
                
                $('#edit_published_year').val(edit_published_year);
                $('#editModal-book').modal('show');
                // console.log(nameAuthor);
                // console.log(genreType);
            });

            $('a[data-type=delete-book]').on('click', function(){

                var id = $(this).attr("id_delete_book");

                $('#book-delete').val(id);
                $('#deleteModal-book').modal('show');
                
            });


            // alert('success');
        },
        error: function(err){
            alert(1);
        }
    });

    


    $('#add-book').on('click', function(){

        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }

        });

        var title = $('#title').val();

        var publisher_id = $('#_publisher_id').val();
        // var author_id = $('#_author_id').val();
        // var genre_id = $('#_genre_id').val();
        var publishedYear = $('#publishedYear').val();
        // alert(publisher_id);

        var author=[];
        var author_id_ = [];
        $('#author_select :selected').each(function(){
             author.push($(this).text());
             author_id_.push($(this).attr('id'));
        });
        // console.log(author);

        var genre=[];
        var genre_id_ = [];
        $('#genre_select :selected').each(function(){
             genre.push($(this).text());
             genre_id_.push($(this).attr('id'));
        });
        // console.log(genre_id_);
        // console.log(author_id_);
        // console.log(genre);
        // console.log(author);
        // console.log(publisher_id);
        // console.log(publishedYear);
        // console.log(title);

        $.ajax({
            
            url: "/api/v1/books/post",
            type: 'post',
            dataType: "json",
            data:{
                
                title: title,
                authors: author_id_,
                genres: genre_id_,
                publisher_id: publisher_id,
                publishedYear: publishedYear
                
            },
            success: function () {
                alert("success!");
                $('#myModal-book').modal('hide');
                $.ajax({
                    
                    url: '/api/v1/books/'+'all?relations[]=authors&relations[]=genres&relations[]=publisher',
                    type: 'get',
                    dataType: 'json',
                    success: function(data) {



                        var output = "";
                        var j, q = "";

                        for(var i = 0; i < data.length; i++){
                            var k = [];
                            var p = [];
                            var au = [];
                            var ge = [];
                            for(j in data[i].authors){
                                k.push(data[i].authors[j].id);
                                au.push(data[i].authors[j].name);
                            }
                            for(q in data[i].genres){
                                p.push(data[i].genres[q].id);
                                ge.push(data[i].genres[q].genreType);
                            }
                            output +=   "<tr>"
                                            +"<td class='text-center'>"+data[i].id+"</td>"
                                            +"<td class='text-center'>"+data[i].title+"</td>"
                                            +"<td class='text-center'>"+au+"</td>"
                                            +"<td class='text-center'>"+ge+"</td>"
                                            +"<td class='text-center'>"+data[i].publisher.publisherName+"</td>"
                                            +"<td class='text-center'>"+data[i].publishedYear+"</td>"
                                            +"<td class='text-center'>"
                                                +"<a href='#' class='text-blue' data-toggle='modal' id_edit_book="+data[i].id+" data-type='update-book' title="+data[i].title+" publisher_id="+data[i].publisher_id+" author_id="+k+" genre_id="+p+" publishedYear="+data[i].publishedYear+">"
                                                    +"<i class='ace-icon fa fa-pencil bigger-130'></i>"
                                                +"</a>"
                                            +"</td>"
                                            +"<td class='text-center'>"
                                                +"<a href='#' class='text-red delete_book' id_delete_book="+data[i].id+" data-type='delete-book'>"
                                                    +"<i class='ace-icon fa fa-trash-o bigger-130'></i>"
                                                +"</a>"
                                            +"</td>"
                                            
                                        +"</tr>";

                        }
                        $('#body_list_book').html(output);
                        $('#addBook').click(function(){

        
                            $('#title').val("");
                            $('#author_select').val("");
                            $('#genre_select').val("");
                            $('#publisher_id').val("");
                            $('#publishedYear').val("");
                            $('#myModal-book').modal('show');

                        });
                        $('a[data-type=update-book]').on('click', function(){

                            $('#edit_title').val("");
                            $('#select_author').val('');
                            $('#select_genre').val('');
                            $('#edit_published_year').val("");
                            $('#editModal-book').modal('show');


                            var id = $(this).attr("id_edit_book");
                            var edit_title = "";
                            var edit_author_id = $(this).attr("author_id");
                            var edit_genre_id = $(this).attr("genre_id");
                            var edit_publisher_id = $(this).attr("publisher_id");
                            var edit_published_year = $(this).attr("publishedYear");
                            // var author = $(this).attr("author");
                            // var genre = $(this).attr("genre");
                            var author_array = [];
                            var genre_array = [];

                            author_array = edit_author_id.split(",");
                            // author_array = author_array.split(",");

                            genre_array = edit_genre_id.split(",");
                            // genre_array = genre_array.split(",");
                            // console.log(author_array);
                            // console.log(genre_array);
                            $.ajax({
                                        
                                url: '/api/v1/books/get?id='+id,
                                type: 'get',
                                dataType: 'json',
                                success: function(data) {
                                    title = data.title;
                                    $('#edit_title').val(title);
                                    // alert(title);
                                },
                                error: function(){
                                    alert("Error get data book");
                                }
                            });
                            // console.log(title);
                            $.ajax({
                                        
                                url: '/api/v1/publishers/get?id='+edit_publisher_id,
                                type: 'get',
                                dataType: 'json',
                                success: function(data) {
                                    edit_publisher_id = data.publisherName;
                                    $('#edit_publisher_id').val(edit_publisher_id);
                                },
                                error: function(){
                                    alert("Error get data publisher");
                                }
                            });

                            var nameAuthor = [];
                            
                            for(var a = 0; a < author_array.length; a++){
                                // alert(author_array[a]);
                                $.ajax({
                                    
                                    url: '/api/v1/authors/get?id='+author_array[a],
                                    type: 'get',
                                    dataType: 'json',
                                    success: function(data) {
                                        nameAuthor.push(data.name);
                                        $('#select_author').val(nameAuthor);
                                        
                                    },
                                    error: function(){
                                        alert("Error get data author");
                                    }
                                });
                            }
                            
                            
                            
                            
                            
                            var genreType = [];
                            
                            for(var g = 0; g < genre_array.length; g++){
                                // alert(genre_array[g]);
                                $.ajax({
                                        
                                    url: '/api/v1/genres/get?id='+genre_array[g],
                                    type: 'get',
                                    dataType: 'json',
                                    success: function(data) {
                                        genreType.push(data.genreType);
                                        $('#select_genre').val(genreType);
                                        
                                    },
                                    error: function(){
                                        alert("Error get data genre");
                                    }
                                });
                            }
                            
                            


                            // $('#edit_title').val(title);
                            
                            $('#edit_published_year').val(edit_published_year);
                            $('#editModal-book').modal('show');
                            // console.log(nameAuthor);
                            // console.log(genreType);
                        });

                        $('a[data-type=delete-book]').on('click', function(){

                            var id = $(this).attr("id_delete_book");

                            $('#book-delete').val(id);
                            $('#deleteModal-book').modal('show');
                            
                        });


                        // alert('success');
                    },
                    error: function(err){
                        alert(1);
                    }
                });
            },
            error: function(mess){
                alert("error! Please, try again.");
                console.log(mess);
            }
        });
    });

    $('#edit-book').on('click', function () {
        
        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }

        });
        var id = $('#book-id').val();
        var title = $('#edit_title').val();

        var author=[];
        var author_id_ = [];
        $('#select_author :selected').each(function(){
             author.push($(this).text());
             author_id_.push($(this).attr('id'));
        });
        // console.log(author);

        var genre=[];
        var genre_id_ = [];
        $('#select_genre :selected').each(function(){
             genre.push($(this).text());
             genre_id_.push($(this).attr('id'));
        });

        var publisher_id = $('#_edit_publisher_id').val();
        // var author_id = $('#_edit_author_id').val();
        // var genre_id = $('#_edit_genre_id').val();
        var publishedYear = $('#edit_publishedYear').val();
        console.log(publisher_id);

        $.ajax({
                
            url: '/api/v1/books/patch?id='+parseInt(id),
            type: 'patch',
            dataType: "json",
            data: {
                title: title,
                authors: author_id_,
                genres: genre_id_,
                publisher_id: publisher_id,
                publishedYear: publishedYear
            },
            success: function () {
                alert('success!');
                $('#editModal-book').modal('hide');
                $.ajax({
                    
                    url: '/api/v1/books/'+'all?relations[]=authors&relations[]=genres&relations[]=publisher',
                    type: 'get',
                    dataType: 'json',
                    success: function(data) {



                        var output = "";
                        var j, q = "";

                        for(var i = 0; i < data.length; i++){
                            var k = [];
                            var p = [];
                            var au = [];
                            var ge = [];
                            for(j in data[i].authors){
                                k.push(data[i].authors[j].id);
                                au.push(data[i].authors[j].name);
                            }
                            for(q in data[i].genres){
                                p.push(data[i].genres[q].id);
                                ge.push(data[i].genres[q].genreType);
                            }
                            output +=   "<tr>"
                                            +"<td class='text-center'>"+data[i].id+"</td>"
                                            +"<td class='text-center'>"+data[i].title+"</td>"
                                            +"<td class='text-center'>"+au+"</td>"
                                            +"<td class='text-center'>"+ge+"</td>"
                                            +"<td class='text-center'>"+data[i].publisher.publisherName+"</td>"
                                            +"<td class='text-center'>"+data[i].publishedYear+"</td>"
                                            +"<td class='text-center'>"
                                                +"<a href='#' class='text-blue' data-toggle='modal' id_edit_book="+data[i].id+" data-type='update-book' title="+data[i].title+" publisher_id="+data[i].publisher_id+" author_id="+k+" genre_id="+p+" publishedYear="+data[i].publishedYear+">"
                                                    +"<i class='ace-icon fa fa-pencil bigger-130'></i>"
                                                +"</a>"
                                            +"</td>"
                                            +"<td class='text-center'>"
                                                +"<a href='#' class='text-red delete_book' id_delete_book="+data[i].id+" data-type='delete-book'>"
                                                    +"<i class='ace-icon fa fa-trash-o bigger-130'></i>"
                                                +"</a>"
                                            +"</td>"
                                            
                                        +"</tr>";

                        }
                        $('#body_list_book').html(output);
                        $('#addBook').click(function(){

        
                            $('#title').val("");
                            $('#author_select').val("");
                            $('#genre_select').val("");
                            $('#publisher_id').val("");
                            $('#publishedYear').val("");
                            $('#myModal-book').modal('show');

                        });
                        $('a[data-type=update-book]').on('click', function(){

                            $('#edit_title').val("");
                            $('#select_author').val('');
                            $('#select_genre').val('');
                            $('#edit_published_year').val("");
                            $('#editModal-book').modal('show');


                            var id = $(this).attr("id_edit_book");
                            var edit_title = "";
                            var edit_author_id = $(this).attr("author_id");
                            var edit_genre_id = $(this).attr("genre_id");
                            var edit_publisher_id = $(this).attr("publisher_id");
                            var edit_published_year = $(this).attr("publishedYear");
                            // var author = $(this).attr("author");
                            // var genre = $(this).attr("genre");
                            var author_array = [];
                            var genre_array = [];

                            author_array = edit_author_id.split(",");
                            // author_array = author_array.split(",");

                            genre_array = edit_genre_id.split(",");
                            // genre_array = genre_array.split(",");
                            // console.log(author_array);
                            // console.log(genre_array);
                            $.ajax({
                                        
                                url: '/api/v1/books/get?id='+id,
                                type: 'get',
                                dataType: 'json',
                                success: function(data) {
                                    title = data.title;
                                    $('#edit_title').val(title);
                                    // alert(title);
                                },
                                error: function(){
                                    alert("Error get data book");
                                }
                            });
                            // console.log(title);
                            $.ajax({
                                        
                                url: '/api/v1/publishers/get?id='+edit_publisher_id,
                                type: 'get',
                                dataType: 'json',
                                success: function(data) {
                                    edit_publisher_id = data.publisherName;
                                    $('#edit_publisher_id').val(edit_publisher_id);
                                },
                                error: function(){
                                    alert("Error get data publisher");
                                }
                            });

                            var nameAuthor = [];
                            
                            for(var a = 0; a < author_array.length; a++){
                                // alert(author_array[a]);
                                $.ajax({
                                    
                                    url: '/api/v1/authors/get?id='+author_array[a],
                                    type: 'get',
                                    dataType: 'json',
                                    success: function(data) {
                                        nameAuthor.push(data.name);
                                        $('#select_author').val(nameAuthor);
                                        
                                    },
                                    error: function(){
                                        alert("Error get data author");
                                    }
                                });
                            }
                            
                            
                            
                            
                            
                            var genreType = [];
                            
                            for(var g = 0; g < genre_array.length; g++){
                                // alert(genre_array[g]);
                                $.ajax({
                                        
                                    url: '/api/v1/genres/get?id='+genre_array[g],
                                    type: 'get',
                                    dataType: 'json',
                                    success: function(data) {
                                        genreType.push(data.genreType);
                                        $('#select_genre').val(genreType);
                                        
                                    },
                                    error: function(){
                                        alert("Error get data genre");
                                    }
                                });
                            }
                            
                            


                            // $('#edit_title').val(title);
                            
                            $('#edit_published_year').val(edit_published_year);
                            $('#editModal-book').modal('show');
                            // console.log(nameAuthor);
                            // console.log(genreType);
                        });

                        $('a[data-type=delete-book]').on('click', function(){

                            var id = $(this).attr("id_delete_book");

                            $('#book-delete').val(id);
                            $('#deleteModal-book').modal('show');
                            
                        });


                        // alert('success');
                    },
                    error: function(err){
                        alert(1);
                    }
                });
            },
            error: function(mess){
                alert("error! Please, try again.");
                console.log(mess);
                $('#editModal-book').modal('hide');
                
            }
        });
    });


    // $('a[data-type=delete-book]').on('click', function(){

    //     var id = $(this).attr("id");

    //     $('#book-delete').val(id);
    //     $('#deleteModal-book').modal('show');
        
    // });

    $('#_delete-book').on('click', function(){

        var id = $('#book-delete').val();
        // alert(id);

        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }

        });

        $.ajax({
                
            url: '/api/v1/books/delete/'+id,
            type: 'delete',
            data: {id: id, _method: "delete"},
            success: function () {
                alert('success!');
                $('#deleteModal-book').modal('hide');
                $.ajax({
                    
                    url: '/api/v1/books/'+'all?relations[]=authors&relations[]=genres&relations[]=publisher',
                    type: 'get',
                    dataType: 'json',
                    success: function(data) {



                        var output = "";
                        var j, q = "";

                        for(var i = 0; i < data.length; i++){
                            var k = [];
                            var p = [];
                            var au = [];
                            var ge = [];
                            for(j in data[i].authors){
                                k.push(data[i].authors[j].id);
                                au.push(data[i].authors[j].name);
                            }
                            for(q in data[i].genres){
                                p.push(data[i].genres[q].id);
                                ge.push(data[i].genres[q].genreType);
                            }
                            output +=   "<tr>"
                                            +"<td class='text-center'>"+data[i].id+"</td>"
                                            +"<td class='text-center'>"+data[i].title+"</td>"
                                            +"<td class='text-center'>"+au+"</td>"
                                            +"<td class='text-center'>"+ge+"</td>"
                                            +"<td class='text-center'>"+data[i].publisher.publisherName+"</td>"
                                            +"<td class='text-center'>"+data[i].publishedYear+"</td>"
                                            +"<td class='text-center'>"
                                                +"<a href='#' class='text-blue' data-toggle='modal' id_edit_book="+data[i].id+" data-type='update-book' title="+data[i].title+" publisher_id="+data[i].publisher_id+" author_id="+k+" genre_id="+p+" publishedYear="+data[i].publishedYear+">"
                                                    +"<i class='ace-icon fa fa-pencil bigger-130'></i>"
                                                +"</a>"
                                            +"</td>"
                                            +"<td class='text-center'>"
                                                +"<a href='#' class='text-red delete_book' id_delete_book="+data[i].id+" data-type='delete-book'>"
                                                    +"<i class='ace-icon fa fa-trash-o bigger-130'></i>"
                                                +"</a>"
                                            +"</td>"
                                            
                                        +"</tr>";

                        }
                        $('#body_list_book').html(output);

                        $('#addBook').click(function(){

        
                            $('#title').val("");
                            $('#author_select').val("");
                            $('#genre_select').val("");
                            $('#publisher_id').val("");
                            $('#publishedYear').val("");
                            $('#myModal-book').modal('show');

                        });
                        
                        $('a[data-type=update-book]').on('click', function(){

                            $('#edit_title').val("");
                            $('#select_author').val('');
                            $('#select_genre').val('');
                            $('#edit_published_year').val("");
                            $('#editModal-book').modal('show');


                            var id = $(this).attr("id_edit_book");
                            var edit_title = "";
                            var edit_author_id = $(this).attr("author_id");
                            var edit_genre_id = $(this).attr("genre_id");
                            var edit_publisher_id = $(this).attr("publisher_id");
                            var edit_published_year = $(this).attr("publishedYear");
                            // var author = $(this).attr("author");
                            // var genre = $(this).attr("genre");
                            var author_array = [];
                            var genre_array = [];

                            author_array = edit_author_id.split(",");
                            // author_array = author_array.split(",");

                            genre_array = edit_genre_id.split(",");
                            // genre_array = genre_array.split(",");
                            // console.log(author_array);
                            // console.log(genre_array);
                            $.ajax({
                                        
                                url: '/api/v1/books/get?id='+id,
                                type: 'get',
                                dataType: 'json',
                                success: function(data) {
                                    title = data.title;
                                    $('#edit_title').val(title);
                                    // alert(title);
                                },
                                error: function(){
                                    alert("Error get data book");
                                }
                            });
                            // console.log(title);
                            $.ajax({
                                        
                                url: '/api/v1/publishers/get?id='+edit_publisher_id,
                                type: 'get',
                                dataType: 'json',
                                success: function(data) {
                                    edit_publisher_id = data.publisherName;
                                    $('#edit_publisher_id').val(edit_publisher_id);
                                },
                                error: function(){
                                    alert("Error get data publisher");
                                }
                            });

                            var nameAuthor = [];
                            
                            for(var a = 0; a < author_array.length; a++){
                                // alert(author_array[a]);
                                $.ajax({
                                    
                                    url: '/api/v1/authors/get?id='+author_array[a],
                                    type: 'get',
                                    dataType: 'json',
                                    success: function(data) {
                                        nameAuthor.push(data.name);
                                        $('#select_author').val(nameAuthor);
                                        
                                    },
                                    error: function(){
                                        alert("Error get data author");
                                    }
                                });
                            }
                            
                            
                            
                            
                            
                            var genreType = [];
                            
                            for(var g = 0; g < genre_array.length; g++){
                                // alert(genre_array[g]);
                                $.ajax({
                                        
                                    url: '/api/v1/genres/get?id='+genre_array[g],
                                    type: 'get',
                                    dataType: 'json',
                                    success: function(data) {
                                        genreType.push(data.genreType);
                                        $('#select_genre').val(genreType);
                                        
                                    },
                                    error: function(){
                                        alert("Error get data genre");
                                    }
                                });
                            }
                            
                            


                            // $('#edit_title').val(title);
                            
                            $('#edit_published_year').val(edit_published_year);
                            $('#editModal-book').modal('show');
                            // console.log(nameAuthor);
                            // console.log(genreType);
                        });

                        $('a[data-type=delete-book]').on('click', function(){

                            var id = $(this).attr("id_delete_book");

                            $('#book-delete').val(id);
                            $('#deleteModal-book').modal('show');
                            
                        });


                        // alert('success');
                    },
                    error: function(err){
                        alert(1);
                    }
                });
            },
            error: function(mess){
                alert("error! Please, try again.");
                console.log(mess);
            }
        });
        
        
    });

});