<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
Use DB;
Use App\Models\Author;
Use App\Models\Genre;
Use App\Models\Publisher;
Use App\Models\Book;


class UserController extends Controller
{
    //
    public function getHome(){
    	
    	return view('user.home');
    	
    }

    public function getListBook(){
    	
    	return view('user.book');
    	
    }

    public function getBookDetail(){
    	
    	return view('user.detailBook');
    	
    }
}
