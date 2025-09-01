<?php
// use App\Http\Controllers\Api\ProductController;

// Route::get('/products', [ProductController::class, 'index']);
// Route::post('/products', [ProductController::class, 'store']);
// Route::put('/products/{id}', [ProductController::class, 'update']);
// Route::delete('/products/{id}', [ProductController::class, 'destroy']);

use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\OrderController;

Route::get('/products', [ProductController::class, 'index']);
Route::post('/products', [ProductController::class, 'store']);
Route::put('/products/{id}', [ProductController::class, 'update']);
Route::delete('/products/{id}', [ProductController::class, 'destroy']);

// Orders
Route::get('/orders', [OrderController::class, 'index']);   // fetch orders (by table)
Route::post('/orders', [OrderController::class, 'store']); // place order
Route::put('/orders/{id}', [OrderController::class, 'updateStatus']); // update status