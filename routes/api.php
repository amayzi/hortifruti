<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProdutoController;

Route::middleware('api')->group(function () {
    Route::apiResource('produtos', ProdutoController::class);
});
