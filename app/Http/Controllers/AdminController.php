<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class AdminController extends Controller
{
    //
    
    public function getHome(){
    	return view('admin.home');
    }

    public function getListRole(){
    	return view('admin.listRole');
    }

    public function getListUser(){
    	return view('admin.listUser');
    }

    public function getListBookQuantity(){
    	return view('admin.listBookQuantity');
    }

    public function getListAuthorBook(){
    	return view('admin.listAuthorBook');
    }

    public function getListBookGenre(){
    	return view('admin.listBookGenre');
    }

    public function getListPublisher(){
    	return view('admin.listPublisher');
    }

    public function getListAuthor(){
    	return view('admin.listAuthor');
    }

    public function getListGenre(){
    	return view('admin.listGenre');
    }

    public function getListImage(){
    	return view('admin.listImage');
    }

    public function getListImageUser(){
    	return view('admin.listImageUser');
    }

    public function getListBookImage(){
    	return view('admin.listBookImage');
    }

    public function getListBookCopy(){
    	return view('admin.listBookCopy');
    }

    public function getListBookHistory(){
    	return view('admin.listBookHistory');
    }

}
