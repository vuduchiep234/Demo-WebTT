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
                <a href="">Manage Book</a>
            </li>
            <li class="active">List Book</li>

        </ul><!-- /.breadcrumb -->

    </div>

    <div class="box">
        <div class="box-header">
            <h3 class="box-title"><b>List Book</b></h3>
            <button class="btn btn-sm btn-success" data-toggle="modal" id="addBook" style="float: right;">
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

                      <th class="text-center">Title</th>

                      <th class="text-center">Author ID</th>
                      <th class="text-center">Genre ID</th>

                      <th class="text-center">Publisher ID</th>
                      <th class="text-center">Published Year</th>
                      
                      <th class="text-center">Edit</th>
                      <th class="text-center">Delete</th>
                    </tr>
                </thead>

                <tbody id="body_list_book">
                    <!-- @foreach($list as $book)

                        <tr>
                            <td class="text-center">{{$book->id}}</td>
                            <td class="text-center">{{$book->title}}</td>
                            <td class="text-center">{{$book->publisher_id}}</td>
                            <td class="text-center">{{$book->publishedYear}}</td>
                            
                            <td class="text-center">
                                <a href="#" class="text-blue" id="<?php echo $book->id; ?>" title="{{$book->title}}" publisher_id="{{$book->publisher_id}}" publishedYear="{{$book->publishedYear}}"  data-type="update-book" data-toggle="modal">
                                    <i class="ace-icon fa fa-pencil bigger-130"></i>
                                </a>
                            </td>
                            
                            <td class="text-center">
                                <a class="text-red" href="#" id="<?php echo $book->id; ?>" data-type="delete-book" data-toggle="modal">
                                    <i class="ace-icon fa fa-trash-o bigger-130"></i>
                                </a>

                            </td>
                        </tr>

                    @endforeach -->

                </tbody>
              </table>
            </div>
            <!-- /.box-body -->
        </div>
        <!-- /.box -->
</div>
    <!-- /.content -->

<div class="modal fade" id="myModal-book" role="dialog">
    <div class="modal-dialog">


        <!-- <form action="" method="get" id="form-book"> -->
            <!-- Modal content-->
            <!-- {{csrf_field()}} -->
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                    <h4 class="modal-title">Add book</h4>

                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-xs-12">
                            <!-- PAGE CONTENT BEGINS -->

                            <div class="col-sm-11">
                                <div class="form-group">
                                    <label class="col-sm-3 control-label no-padding-right" for="form-field-1" style="margin-top: 5px;">Title: </label>

                                    <div class="col-sm-9" style="margin-left: -15px; width: 380px;">

                                        <input type="text" id="title" placeholder="Enter data input ..." class="form-control" name="title-book"/>

                                    </div>
                                </div>

                            </div>


                            <div class="col-sm-11" style="margin-top: 15px;">
                                <div class="form-group">
                                    <label class="control-label col-xs-12 col-sm-3 no-padding-right" for="password2" style="margin-top: 5px;">Author ID:</label>

                                    <div class="input-group " style="width: 350px;" >
                                     
                                        <select id="author_select" class="  form-control select2 select2-hidden-accessible" multiple="" data-placeholder="Select a State" style="width: 100%;" tabindex="-1" aria-hidden="true">
                                            @foreach($listA as $author)

                                                <option id="{{$author->id}}">{{$author->name}}</option>
                                                <li class="divider"></li>

                                            @endforeach
                                          
                                        </select>

                                      <!-- </div> -->
                                      <!-- /btn-group -->
                                      <input type="hidden" class="form-control" id="_author_id">
                                      <!-- <input type="text" class="form-control" id="genre_id"> -->

                                    </div>

                                </div>
                            </div>

                            <div class="col-sm-11" style="margin-top: 5px;">
                                <div class="form-group">
                                    <label class="control-label col-xs-12 col-sm-3 no-padding-right" for="password2" style="margin-top: 5px;">Genre ID:</label>

                                    <div class="input-group " style="width: 350px;" >
                                    
                                        <select id="genre_select" class="form-control select2 select2-hidden-accessible" multiple="" data-placeholder="Select a State" style="width: 100%;" tabindex="-1" aria-hidden="true">
                                            @foreach($listG as $genre)

                                                <!-- <li id="{{$genre->id}}"><a href="#">{{$genre->genreType}}</a></li> -->
                                                <option id="{{$genre->id}}">{{$genre->genreType}}</option>
                                                <li class="divider"></li>

                                            @endforeach
                                          
                                        </select>

                                      <!-- </div> -->
                                      <!-- /btn-group -->
                                      <input type="hidden" class="form-control" id="_genre_id">
                                      <!-- <input type="text" class="form-control" id="genre_id"> -->

                                    </div>

                                </div>
                            </div>
                            
                            <div class="col-sm-11" style="margin-top: 5px;">
                                <div class="form-group">
                                    <label class="control-label col-xs-12 col-sm-3 no-padding-right" for="password2" style="margin-top: 5px;">Publisher ID:</label>
                                    
                                    <div class="input-group " style="width: 350px;" >
                                     
                                        <div class="input-group-btn" style="margin-left: 30px;">
                                            <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-expanded="false">Option
                                              <span class="fa fa-caret-down"></span></button>
                                            <ul class="dropdown-menu dropdown_publisher">
                                                @foreach($listP as $publisher)

                                                    <li id="{{$publisher->id}}"><a href="#">{{$publisher->publisherName}}</a></li>
                                                    <li class="divider"></li>

                                                @endforeach
                                            </ul>


                                        </div>
                                      <!-- /btn-group -->
                                      <input type="hidden" class="form-control" id="_publisher_id">
                                      <input type="text" class="form-control" id="publisher_id">

                                    </div>
                                </div>
                            </div>
                            <div class="col-sm-11" style="margin-top: 5px;">
                                <div class="form-group">
                                    <label class="col-sm-3 control-label no-padding-right" for="form-field-1" style="margin-top: 5px;">Published Year: </label>

                                    <div class="col-sm-9" style="margin-left: -15px; width: 380px;">

                                        <input type="text" id="publishedYear" placeholder="Enter data input ..." class="form-control" name="publishedYear"/>

                                    </div>
                                </div>

                            </div>

                        </div>
                    </div>


                </div>
  
                <br/>
                <div class="modal-footer">
                  <button type="button" class="btn btn-default pull-left" data-dismiss="modal">Close</button>
                    <button class="btn btn-info" type="submit" id="add-book">

                        <i class="ace-icon fa fa-check bigger-110"></i>
                        Add
                    </button>
                </div>
            </div>

        <!-- </form> -->

    </div>
</div>

<div class="modal fade" id="editModal-book" role="dialog">
    <div class="modal-dialog">

        <!-- <form method="get" action="">
            <input type="hidden" name="_method" value="patch">
            {{csrf_field()}} -->

            <!-- Modal content-->
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">&times;</button>



                    <h4 class="modal-title">Edit Book</h4>

                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-xs-12">
                            <!-- PAGE CONTENT BEGINS -->

                            <div class="col-sm-11">
                                <div class="form-group">
                                    <label class="col-sm-3 control-label no-padding-right" for="form-field-1" style="margin-top: 5px;">Title: </label>

                                    <div class="col-sm-9" style="margin-left: -15px; width: 380px;">
                                        <input type="text" id="edit_title" placeholder="Enter data input ..." class="form-control" name="title-book"/>

                                    </div>
                                </div>

                            </div>

                            <div class="col-sm-11" style="margin-top: 15px;">
                                <div class="form-group">
                                    <label class="control-label col-xs-12 col-sm-3 no-padding-right" for="password2" style="margin-top: 5px;">Author ID:</label>

                                    <div class="input-group " style="width: 350px;" >
                                     
                                        <select id="select_author" class="form-control select2 select2-hidden-accessible" multiple="" data-placeholder="Select a State" style="width: 100%;" tabindex="-1" aria-hidden="true">
                                            @foreach($listA as $author)

                                                <option id="{{$author->id}}">{{$author->name}}</option>
                                                <li class="divider"></li>

                                            @endforeach
                                          
                                        </select>

                                      <!-- </div> -->
                                      <!-- /btn-group -->
                                      <input type="hidden" class="form-control" id="_edit_author_id">
                                      <!-- <input type="text" class="form-control" id="genre_id"> -->

                                    </div>

                                </div>
                            </div>

                            <div class="col-sm-11" style="margin-top: 5px;">
                                <div class="form-group">
                                    <label class="control-label col-xs-12 col-sm-3 no-padding-right" for="password2" style="margin-top: 5px;">Genre ID:</label>

                                    <div class="input-group " style="width: 350px;" >
                                
                                        <select id="select_genre" class="form-control select2 select2-hidden-accessible" multiple="" data-placeholder="Select a State" style="width: 100%;" tabindex="-1" aria-hidden="true">
                                            @foreach($listG as $genre)

                                                <!-- <li id="{{$genre->id}}"><a href="#">{{$genre->genreType}}</a></li> -->
                                                <option id="{{$genre->id}}">{{$genre->genreType}}</option>
                                                <li class="divider"></li>

                                            @endforeach
                                          
                                        </select>

                                      <!-- </div> -->
                                      <!-- /btn-group -->
                                      <input type="hidden" class="form-control" id="_edit_genre_id">
                                      <!-- <input type="text" class="form-control" id="genre_id"> -->

                                    </div>

                                </div>
                            </div>
                            
                            <div class="col-sm-11" style="margin-top: 5px;">
                                <div class="form-group">
                                    <label class="control-label col-xs-12 col-sm-3 no-padding-right" for="password2" style="margin-top: 5px;">Publisher ID:</label>
                                    
                                    <div class="input-group " style="width: 350px;" >
                                     
                                        <div class="input-group-btn" style="margin-left: 30px;">
                                            <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-expanded="false">Option
                                              <span class="fa fa-caret-down"></span></button>
                                            <ul class="dropdown-menu dropdown_publisher">
                                                @foreach($listP as $publisher)

                                                    <li id="{{$publisher->id}}"><a href="#">{{$publisher->publisherName}}</a></li>
                                                    <li class="divider"></li>

                                                @endforeach
                                            </ul>


                                        </div>
                                      <!-- /btn-group -->
                                      <input type="hidden" class="form-control" id="_edit_publisher_id">
                                      <input type="text" class="form-control" id="edit_publisher_id">

                                    </div>
                                </div>
                            </div>

                            <div class="col-sm-11" style="margin-top: 5px;">
                                <div class="form-group">
                                    <label class="col-sm-3 control-label no-padding-right" for="form-field-1" style="margin-top: 5px;">Published Year: </label>

                                    <div class="col-sm-9" style="margin-left: -15px; width: 380px;">
                                        <input type="text" id="edit_published_year" placeholder="Enter data input ..." class="form-control" name="year_publisher"/>

                                    </div>
                                </div>

                            </div>

                        </div>
                    </div>

                </div>
                <br/>
                <div class="modal-footer">
                    <input type="hidden" id="book-id" name="book-id" value="" />
                  
                
                    <button type="button" class="btn btn-default pull-left" data-dismiss="modal">Close</button>
                    <button class="btn btn-info" type="submit" id="edit-book" style="float: right;">
                        <i class="ace-icon fa fa-check bigger-110"></i>
                        Edit
                    </button>

                </div>
            </div>
        <!-- </form> -->


    </div>
</div>


<div class="modal fade" id="deleteModal-book" book="dialog">
            <div class="modal-dialog">
                
                <div class="modal-content">
                    <!-- <form > -->
                        <!-- <input type="hidden" name="_method" value="delete"> -->
                        <!-- {{csrf_field()}} -->
                    
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
                            <input type="hidden" id="book-delete" value="" />
                            <button class="btn btn-white btn-round pull-left" data-dismiss="modal">
                                <i class="ace-icon fa fa-times red2"></i>
                                No
                            </button>
                            <button class="btn btn-white btn-warning btn-bold" id="_delete-book">
                                <i class="ace-icon fa fa-trash-o bigger-120 orange"></i>
                                Yes
                            </button>
                            
                        </div>
                    <!-- </form> -->
                        
                    
                </div>
            </div>
</div>

@endsection



