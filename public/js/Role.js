
jQuery(function($) {
    
        // $.ajax({
                    
        //         url: '/api/v1/roles/'+'all',
        //         type: 'get',
        //         dataType: 'json',
        //         success: function(data) {
        //             var output = "";
        //             for(var i = 0; i < data.length; i++){

        //                 output +=   "<tr>"
        //                                 +"<td class='text-center'>"+data[i].id+"</td>"
        //                                 +"<td class='text-center'>"+data[i].roleType+"</td>"
                                        
        //                                 +"<td class='text-center'>"
        //                                     +"<a href='#'' class='text-blue edit-role' data-toggle='modal' id="+data[i].id+" roleType="+data[i].roleType+" data-type='update-role' >"
        //                                         +"<i class='ace-icon fa fa-pencil bigger-130'></i>"
        //                                     +"</a>"
        //                                 +"</td>"
        //                                 +"<td class='text-center'>"
        //                                     +"<a class='text-red' href='#'' data-toggle='modal'  id="+data[i].id+" data-role='delete-role'>"
        //                                         +"<i class='ace-icon fa fa-trash-o bigger-130'></i>"
        //                                     +"</a>"
        //                                 +"</td>"
        //                             +"</tr>";

        //             }
        //             $('#body_list_role').html(output);
        //         },
        //         error: function(err){
        //             alert(1);
        //         }
        // });

	$('#addRole').click(function(){

        $('#myModal-role').modal('show');
        $('#form-role')[0].reset();
        
    });

    

	$('#add-role').on('click', function(){

		$.ajaxSetup({
	        headers: {
	            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
	        }

        });
		
		var data = $('#type-role').val();
		
		$.ajax({
            type: 'post',
            url: "/api/v1/roles/post",
            dataType: "json",
            data: {
                
                roleType: data

            },
            success: function () {
                alert("success!");
            },
            error: function(){
                alert("error! Please, try again.");
            }
        });
	});

    $('a[data-role=update-role]').on('click', function(){


    	var id = $(this).attr("id");
    	var type = $(this).attr("data-type");
    	// alert(type);

    	$('#role-type').val(type);
    	$('#role-id').val(id);
    	$('#editModal-role').modal('show');
    });

    $('#edit-role').on('click', function () {
        var id=$('#role-id').val();
        var data = $('#role-type').val();
        
        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }

        });

        $.ajax({
                
                url: '/api/v1/roles/'+id,
                type: 'patch',
                data: {type: data, _method: "patch"},
            success: function () {
                alert("success!");
            },
            error: function(){
                alert("error! Please, try again.");
            }
        });
    });

    $('a[data-role=delete-role]').on('click', function(){

    	var id = $(this).attr("id");

        $('#role-delete').val(id);
		$('#deleteModal-role').modal('show');
		


    });
    $('#_delete-role').on('click', function(){

    	var id = $('#role-delete').val();
        // alert(id);

        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }

        });

        $.ajax({
                
                url: '/api/v1/roles/'+id,
                type: 'delete',
                data: {id: id, _method: "delete"},
            success: function () {
                alert("success!");
            },
            error: function(){
                alert("error! Please, try again.");
            }
        });
    	
		
	});

    $('#search_role').on('click', function(){

        $('#myModal-searchRole').modal('show');
    });

});