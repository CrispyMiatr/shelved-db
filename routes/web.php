<?php

use App\Http\Controllers\HomeController;
use App\Http\Controllers\BeverageController;
use App\Http\Controllers\BrandController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ManufacturerController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Public Routes (Available to everyone)
|--------------------------------------------------------------------------
*/

// Home Page - Shows carousels
Route::get('/', [HomeController::class, 'index'])->name('home');

// Catalogue & Brands
Route::get('/catalogue', [BrandController::class, 'index'])->name('catalogue');
Route::get('/catalogue/{brand}', [BrandController::class, 'show'])->name('brand.show');
Route::get('/catalogue/{brand}/{beverage}', [BeverageController::class, 'show'])->name('beverage.show');

// Manufacturers List
Route::get('/manufacturers', [ManufacturerController::class, 'index'])->name('manufacturers.index');

// Collector search page
Route::get('/collectors', [ProfileController::class, 'index'])->name('collectors.index');

// Public Social Profile (using the @username format)
Route::get('/@{username}', [ProfileController::class, 'show'])->name('profile.show');


/*
|--------------------------------------------------------------------------
| Protected Routes (Login required)
|--------------------------------------------------------------------------
*/
Route::middleware('auth')->group(function () {

    // Profile Editing (Breeze Defaults)
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // Profile Setup
    Route::get('/setup', function () {
        return Inertia::render('Auth/RegisterSetup');
    })->name('register.setup');

    // Social Actions
    Route::post('/follow/{user}', [ProfileController::class, 'toggleFollow'])->name('follow.toggle');

    // Adding/Editing Beverages (OCR flow would start here)
    Route::get('/beverages/create', [BeverageController::class, 'create'])->name('beverage.create');
    Route::post('/beverages', [BeverageController::class, 'store'])->name('beverage.store');

    // User Collection
    Route::post('/collection/add/{beverage}', [BeverageController::class, 'addToCollection'])->name('collection.add');
});

// Include standard Breeze Auth routes (Login, Register, etc.)
require __DIR__ . '/auth.php';