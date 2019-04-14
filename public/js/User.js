
jQuery(function($) {


	$('#addUser').click(function(){

        $('#myModal-user').modal('show');
        $('#form-user')[0].reset();
        
    });

   

	$('#add-user').on('click', function(){

		$.ajaxSetup({
	        headers: {
	            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
	        }

        });
		
		var data = $('#type-user').val();
        // alert(data);
		
		$.ajax({
            
            url: "/api/v1/users/post",
            type: 'post',
            dataType: "json",
            data:{
                
                userType: data
                
            },
            success: function () {
                alert("success!");
                $('#myModal-user').modal('hide');
                $.ajax({
                    
                    url: '/api/v1/users/'+'all',
                    type: 'get',
                    dataType: 'json',
                    success: function(data) {
                        var output = "";
                        for(var i = 0; i < data.length; i++){

                            output +=   "<tr>"
                                            +"<td class='text-center'>"+data[i].id+"</td>"
                                            +"<td class='text-center'>"+data[i].userType+"</td>"
                                            
                                            +"<td class='text-center'>"
                                                +"<a href='#' class='text-blue' id_edit_user="+data[i].id+" data-type='update-user'>"
                                                    +"<i class='ace-icon fa fa-pencil bigger-130'></i>"
                                                +"</a>"
                                            +"</td>"
                                            +"<td class='text-center'>"
                                                +"<a href='#' class='text-red' id_delete_user="+data[i].id+" data-type='delete-user'>"
                                                    +"<i class='ace-icon fa fa-trash-o bigger-130'></i>"
                                                +"</a>"
                                            +"</td>"
                                            
                                        +"</tr>";

                        }
                        $('#body_list_user').html(output);
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

    

    $('a[data-type=update-user]').on('click', function(){


    	var id = $(this).attr("id");
    	var name = $(this).attr("name");
    	// alert(name);

    	$('#user-type').val(name);
    	$('#user-id').val(id);
    	$('#editModal-user').modal('show');
    });

    $('#edit-user').on('click', function () {
        var id=$('#user-id').val();
        var data = $('#user-type').val();
        // alert(id + data);

        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }

        });

        $.ajax({
                
            url: '/api/v1/users/patch/'+id,
            type: 'patch',
            dataType: "json",
            data: {userType: data, _method: "patch"},
            success: function () {
                alert('success!');
                $('#editModal-user').modal('hide');
                $.ajax({
                    
                    url: '/api/v1/users/'+'all',
                    type: 'get',
                    dataType: 'json',
                    success: function(data) {
                        var output = "";
                        for(var i = 0; i < data.length; i++){

                            output +=   "<tr>"
                                            +"<td class='text-center'>"+data[i].id+"</td>"
                                            +"<td class='text-center'>"+data[i].userType+"</td>"
                                            
                                            +"<td class='text-center'>"
                                                +"<a href='#' class='text-blue' data-toggle='modal' id_edit_user="+data[i].id+" data-type='update-user'>"
                                                    +"<i class='ace-icon fa fa-pencil bigger-130'></i>"
                                                +"</a>"
                                            +"</td>"
                                            +"<td class='text-center'>"
                                                +"<a href='#' class='text-red delete_user' id_delete_user="+data[i].id+" data-type='delete-user'>"
                                                    +"<i class='ace-icon fa fa-trash-o bigger-130'></i>"
                                                +"</a>"
                                            +"</td>"
                                            
                                        +"</tr>";

                        }
                        $('#body_list_user').html(output);
                        // alert('success');
                    },
                    error: function(err){
                        alert(err);
                    }
                });
            },
            error: function(mess){
                alert("error! Please, try again.");
                // alert(mess);
                $('#editModal-user').modal('hide');
                $.ajax({
                    
                    url: '/api/v1/users/'+'all',
                    type: 'get',
                    dataType: 'json',
                    success: function(data) {
                        var output = "";
                        for(var i = 0; i < data.length; i++){

                            output +=   "<tr>"
                                            +"<td class='text-center'>"+data[i].id+"</td>"
                                            +"<td class='text-center'>"+data[i].userType+"</td>"
                                            
                                            +"<td class='text-center'>"
                                                +"<a href='#' class='text-blue' data-toggle='modal' id_edit_user="+data[i].id+" data-type='update-user'>"
                                                    +"<i class='ace-icon fa fa-pencil bigger-130'></i>"
                                                +"</a>"
                                            +"</td>"
                                            +"<td class='text-center'>"
                                                +"<a href='#' class='text-red delete_user' id_delete_user="+data[i].id+" data-type='delete-user'>"
                                                    +"<i class='ace-icon fa fa-trash-o bigger-130'></i>"
                                                +"</a>"
                                            +"</td>"
                                            
                                        +"</tr>";

                        }
                        $('#body_list_user').html(output);
                        // alert('success');
                    },
                    error: function(err){
                        alert(err);
                    }
                });
            }
        });
    });

  //   $('.delete_user').on('click', function(){

  //   	var id = $(this).attr("id");

  //       $('#user-delete').val(id);
		// $('#deleteModal-user').modal('show');
		


  //   });

    $('a[data-type=delete-user]').on('click', function(){

        var id = $(this).attr("id");

        $('#user-delete').val(id);
        $('#deleteModal-user').modal('show');
        


    });

    $('#_delete-user').on('click', function(){

    	var id = $('#user-delete').val();
        // alert(id);

        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }

        });

        $.ajax({
                
                url: '/api/v1/users/delete/'+id,
                type: 'delete',
                data: {id: id, _method: "delete"},
            success: function () {
                alert('success!');
                $('#deleteModal-user').modal('hide');
                $.ajax({
                    
                    url: '/api/v1/users/'+'all',
                    type: 'get',
                    dataType: 'json',
                    success: function(data) {
                        var output = "";
                        for(var i = 0; i < data.length; i++){

                            output +=   "<tr>"
                                            +"<td class='text-center'>"+data[i].id+"</td>"
                                            +"<td class='text-center'>"+data[i].userType+"</td>"
                                            
                                            +"<td class='text-center'>"
                                                +"<a href='' class='text-blue' data-toggle='modal' id_edit_user="+data[i].id+" data-type='update-user'>"
                                                    +"<i class='ace-icon fa fa-pencil bigger-130'></i>"
                                                +"</a>"
                                            +"</td>"
                                            +"<td class='text-center'>"
                                                +"<a href='' class='text-red' data-toggle='modal' id_delete_user="+data[i].id+" data-type='delete-user'>"
                                                    +"<i class='ace-icon fa fa-trash-o bigger-130'></i>"
                                                +"</a>"
                                            +"</td>"
                                            
                                        +"</tr>";

                        }
                        $('#body_list_user').html(output);
                        // alert('success');
                    },
                    error: function(err){
                        alert(err);
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