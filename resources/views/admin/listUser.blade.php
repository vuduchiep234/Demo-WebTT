@extends('admin.master')
@section('content')

    <!-- Main content -->
        
        <div class="breadcrumbs ace-save-state" id="breadcrumbs">
            <ul class="breadcrumb">
                <li>
                    <i class="ace-icon fa fa-home home-icon"></i>
                    <a href="">Home</a>
                </li>

                <li>
                    <a href="">Manage User</a>
                </li>
                <li class="active">List User</li>

            </ul><!-- /.breadcrumb -->

        </div>

       
        <div class="box">
            <div class="box-header">
                <h3 class="box-title"><b>List User</b></h3>
                <button class="btn btn-sm btn-success" data-toggle="modal" data-target="#myModal-member" id="addUser" style="float: right;">
                    <i class=" "></i>
                    Add
                      
                </button>
            </div>
            <!-- /.box-header -->
            <div class="box-body">
              <table id="example1" class="table table-bordered table-striped">
                <thead>
                    <tr>
                      <th class="text-center">ID</th>
                      <th class="text-center">Name</th>
                      <th class="text-center">Email</th>
                      <th class="text-center">Password</th>
                      <th class="text-center">Role ID</th>
                      <th class="text-center">Edit</th>
                      <th class="text-center">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                      <td class="text-center">Trident</td>
                      <td class="text-center">Internet
                        Explorer 4.0
                      </td>
                      <td class="text-center">Win 95+</td>
                      <td class="text-center">1234</td>
                      <td class="text-center">1</td>
                      <td class="text-center">
                      <a href="#" class="text-blue edit-role" data-toggle="modal" data-target="#editModal-member">
                        <i class="ace-icon fa fa-pencil bigger-130"></i>
                      </a>
                    </td>
                    <td class="text-center">
                      <a class="text-red" href="#" data-toggle="modal" data-target="#deleteModal-member">
                        <i class="ace-icon fa fa-trash-o bigger-130"></i>
                      </a>
                    </td>
                    </tr>
                    
                </tbody>
                
              </table>
            </div>
            <!-- /.box-body -->
        </div>
        <!-- /.box -->
    
    <!-- /.content -->

<div class="modal fade" id="myModal-member" role="dialog">
    <div class="modal-dialog">

        <form action="" method="get" id="form-member">
            <!-- Modal content-->
            {{csrf_field()}}
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                    <h4 class="modal-title">Add User</h4>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-xs-12">
                            <!-- PAGE CONTENT BEGINS -->

                            <div class="col-sm-11">
                                <div class="form-group">
                                    <label class="col-sm-3 control-label no-padding-right" for="form-field-1" style="margin-top: 5px;">Name: </label>

                                    <div class="col-sm-9" style="margin-left: -15px; width: 380px;">
                                        <input type="text" id="email-member" placeholder="Enter name ..." class="form-control" name="email-member"/>
                                    </div>
                                </div>

                            </div>
                            <div class="col-sm-11" style="margin-top: 5px;">
                                <div class="form-group">
                                    <label class="col-sm-3 control-label no-padding-right" for="form-field-1" style="margin-top: 5px;">Email: </label>

                                    <div class="col-sm-9" style="margin-left: -15px; width: 380px;">
                                        <input type="text" id="password-member" placeholder="Enter email ..." class="form-control" name="password-member"/>
                                    </div>
                                </div>

                            </div>

                            <div class="col-sm-11" style="margin-top: 5px;">
                                <div class="form-group">
                                    <label class="col-sm-3 control-label no-padding-right" for="form-field-1" style="margin-top: 5px;">Password: </label>

                                    <div class="col-sm-9" style="margin-left: -15px; width: 380px;">
                                        <input type="text" id="first_name-member" placeholder="Enter password ..." class="form-control" name="first-name"/>
                                    </div>
                                </div>

                            </div>

                             <div class="col-sm-11" style="margin-top: 5px;">
                                <div class="form-group">
                                    <label class="control-label col-xs-12 col-sm-3 no-padding-right" for="password2" style="margin-top: 5px;">Role ID:</label>
                                    <!-- <div class="col-xs-12 col-sm-9" style="width: 300px;">
                                        <select class="form-control" id="role_id-member" name="role_id-member">
                                            <option value="">1</option>
                                            <option value="">2</option>
                                            <option value="">3</option>
                                    
                                        </select>
                                    </div> -->

                                    <div class="input-group " style="width: 350px;" >
                                      <div class="input-group-btn" style="margin-left: 30px;">
                                        <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-expanded="false">Action
                                          <span class="fa fa-caret-down"></span></button>
                                        <ul class="dropdown-menu">
                                          <li><a href="#">Action</a></li>
                                          <li><a href="#">Another action</a></li>
                                          <li><a href="#">Something else here</a></li>
                                          <li class="divider"></li>
                                          <li><a href="#">Separated link</a></li>
                                        </ul>
                                      </div>
                                      <!-- /btn-group -->
                                      <input type="text" class="form-control">
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>

                </div>  
                <br/>
                <div class="modal-footer">
                  <button type="button" class="btn btn-default pull-left" data-dismiss="modal">Close</button>
                    <button class="btn btn-info" type="submit" id="add-member">
                        <i class="ace-icon fa fa-check bigger-110"></i>
                        Add
                    </button>
                </div>
            </div>
        </form>
    </div>
</div>

<div class="modal fade" id="editModal-member" role="dialog">
    <div class="modal-dialog">

        <form method="get" action="">
            <input type="hidden" name="_method" value="patch">
            {{csrf_field()}}
            <!-- Modal content-->
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                    <h4 class="modal-title">Thông tin thành viên</h4>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-xs-12">
                            <!-- PAGE CONTENT BEGINS -->

                            <div class="col-sm-11">
                                <div class="form-group">
                                    <label class="col-sm-3 control-label no-padding-right" for="form-field-1" style="margin-top: 5px;">Name: </label>

                                    <div class="col-sm-9" style="margin-left: -15px; width: 380px;">
                                        <input type="text" id="email-member" placeholder="Enter name ..." class="form-control" name="email-member"/>
                                    </div>
                                </div>

                            </div>
                            <div class="col-sm-11" style="margin-top: 5px;">
                                <div class="form-group">
                                    <label class="col-sm-3 control-label no-padding-right" for="form-field-1" style="margin-top: 5px;">Email: </label>

                                    <div class="col-sm-9" style="margin-left: -15px; width: 380px;">
                                        <input type="text" id="password-member" placeholder="Enter email ..." class="form-control" name="password-member"/>
                                    </div>
                                </div>

                            </div>

                            <div class="col-sm-11" style="margin-top: 5px;">
                                <div class="form-group">
                                    <label class="col-sm-3 control-label no-padding-right" for="form-field-1" style="margin-top: 5px;">Password: </label>

                                    <div class="col-sm-9" style="margin-left: -15px; width: 380px;">
                                        <input type="text" id="first_name-member" placeholder="Enter password ..." class="form-control" name="first-name"/>
                                    </div>
                                </div>

                            </div>

                             <div class="col-sm-11" style="margin-top: 5px;">
                                <div class="form-group">
                                    <label class="control-label col-xs-12 col-sm-3 no-padding-right" for="password2" style="margin-top: 5px;">Role ID:</label>
                                    <!-- <div class="col-xs-12 col-sm-9" style="width: 300px;">
                                        <select class="form-control" id="role_id-member" name="role_id-member">
                                            <option value="">1</option>
                                            <option value="">2</option>
                                            <option value="">3</option>
                                    
                                        </select>
                                    </div> -->

                                    <div class="input-group " style="width: 350px;" >
                                      <div class="input-group-btn" style="margin-left: 30px;">
                                        <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-expanded="false">Action
                                          <span class="fa fa-caret-down"></span></button>
                                        <ul class="dropdown-menu">
                                          <li><a href="#">Action</a></li>
                                          <li><a href="#">Another action</a></li>
                                          <li><a href="#">Something else here</a></li>
                                          <li class="divider"></li>
                                          <li><a href="#">Separated link</a></li>
                                        </ul>
                                      </div>
                                      <!-- /btn-group -->
                                      <input type="text" class="form-control">
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>

                </div>   
                <br/>
                <div class="modal-footer">
                    <input type="hidden" id="member-id" name="member-id" value="" />
                    <input type="hidden" id="_email" value="" />
                    <input type="hidden" id="_password" value="" />
                    <input type="hidden" id="_firt-name" value="" />
                    <input type="hidden" id="_last-name" value="" />
                    <input type="hidden" id="_phone" value="" />
                    <input type="hidden" id="_role-id" value="" />
                    <input type="hidden" id="_image-id" value="" />
                    <button type="button" class="btn btn-default pull-left" data-dismiss="modal">Close</button>
                    <input class="btn btn-info" type="submit" value="Edit" id="_edit-member" >

                </div>
            </div>
        </form>
    </div>
</div>


<div class="modal fade" id="deleteModal-member" role="dialog">
    <div class="modal-dialog">
        
        <div class="modal-content">
            <form method="get" class="form-delete">
                <input type="hidden" name="_method" value="delete">
                {{csrf_field()}}
            
        <!-- Modal content-->
        
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                    <h4 class="modal-title">Confirm</h4>
                </div>
                <div class="modal-body">
                    
                    <span id="form_output"></span>
                    <div class="row">
                        <div class="col-xs-12">
                            <!-- PAGE CONTENT BEGINS -->
                            <h4>You may want to delete ?</h4>

                        </div>
                    </div>

                </div>  
                
                <div class="modal-footer">
                    <input type="hidden" id="member-delete" value="" />
                    <button class="btn btn-white btn-round pull-left" data-dismiss="modal">
                        <i class="ace-icon fa fa-times red2"></i>
                        No
                    </button>
                    <button class="btn btn-white btn-warning btn-bold" id="_delete-member">
                        <i class="ace-icon fa fa-trash-o bigger-120 orange"></i>
                        Yes
                    </button>
                    
                </div>
            </form>
                
            
        </div>
    </div>
</div>



@endsection



