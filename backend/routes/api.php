<?php

use App\Http\Controllers\AddressBookController;
use App\Http\Controllers\LoginController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/login', [LoginController::class, 'login']);

Route::middleware(['auth:sanctum'])->group(function () {
    Route::controller(AddressBookController::class)->group(function () {
        Route::get('/book/list', 'index');
        Route::post('/book/create', 'store');
        Route::post('/book/update/{id}', 'update');
        Route::post('/book/delete/{id}', 'destroy');
    });
});
