<?php

use Illuminate\Support\Facades\Route;
//use App\Http\Controllers\ProdutoController;

Route::get('/produtos/{any?}', function () {
    return view('app');
})->where('any', '.*');