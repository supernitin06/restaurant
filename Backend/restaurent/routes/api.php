<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\RestaurantController;
use App\Http\Controllers\OrdersController;


Route::get('/restaurants', [RestaurantController::class, 'index']);
Route::get('/restaurants/{id}', [RestaurantController::class, 'show']);
Route::get('/orders/{id}', [OrdersController::class, 'allorders']);
Route::get('/restaurants/{id}/orders', [OrdersController::class, 'getorders']);
Route::get('/restaurants/{id}/orderscount', [OrdersController::class, 'orderscount']);
Route::get('/restaurants/toprevenue/allorder', [OrdersController::class, 'toprevenue']);