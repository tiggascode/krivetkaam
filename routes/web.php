<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProductController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [\App\Http\Controllers\HomeController::class, 'index'])->name('home');
Route::get('/products', [ProductController::class, 'index'])->name('products');
Route::get('/about', fn () => Inertia::render('About'))->name('about');
Route::get('/cart', fn () => Inertia::render('Cart'));
Route::get('/product/{id}', [ProductController::class, 'show'])->name('product.show');
Route::fallback(fn () => Inertia::render('NotFound'));
