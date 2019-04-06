<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::get('homeAdmin',
 	['as'=>'homeAdmin', 'uses'=>'AdminController@getHome']
);

Route::get('listRole',
	['as'=>'listRole', 'uses'=>'AdminController@getListRole']
);

Route::get('listUser',
	['as'=>'listUser', 'uses'=>'AdminController@getListUser']
);

Route::get('listBookQuantity',
	['as'=>'listBookQuantity', 'uses'=>'AdminController@getListBookQuantity']
);

Route::get('listAuthorBook',
	['as'=>'listAuthorBook', 'uses'=>'AdminController@getListAuthorBook']
);

Route::get('listBookGenre',
	['as'=>'listBookGenre', 'uses'=>'AdminController@getListBookGenre']
);

Route::get('listPublisher',
	['as'=>'listPublisher', 'uses'=>'AdminController@getListPublisher']
);

Route::get('listAuthor',
	['as'=>'listAuthor', 'uses'=>'AdminController@getListAuthor']
);

Route::get('listGenre',
	['as'=>'listGenre', 'uses'=>'AdminController@getListGenre']
);

Route::get('listBookImage',
	['as'=>'listBookImage', 'uses'=>'AdminController@getListBookImage']
);

Route::get('listImageUser',
	['as'=>'listImageUser', 'uses'=>'AdminController@getListImageUser']
);

Route::get('listImage',
	['as'=>'listImage', 'uses'=>'AdminController@getListImage']
);

Route::get('listBookCopy',
	['as'=>'listBookCopy', 'uses'=>'AdminController@getListBookCopy']
);

Route::get('listBookHistory',
	['as'=>'listBookHistory', 'uses'=>'AdminController@getListBookHistory']
);