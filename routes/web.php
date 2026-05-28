<?php

use App\Http\Controllers\HomeController;
use App\Http\Controllers\BeverageController;
use App\Http\Controllers\BrandController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ManufacturerController;
use App\Http\Controllers\SearchController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Public Routes
|--------------------------------------------------------------------------
*/

Route::get('/', [HomeController::class, 'index'])->name('home');

// Search
Route::get('/api/search', [SearchController::class, 'globalSearch'])->name('api.search');
Route::get('/search', [SearchController::class, 'index'])->name('search.results');

// Catalogue & Brands
Route::get('/catalogue', [BrandController::class, 'index'])->name('catalogue');
Route::get('/catalogue/{brand}', [BrandController::class, 'show'])->name('brand.show');
Route::get('/catalogue/{brand}/{beverage}', [BeverageController::class, 'show'])->name('beverage.show');

// Manufacturers
Route::get('/manufacturers', [ManufacturerController::class, 'index'])->name('manufacturers.index');
Route::get('/manufacturers/{manufacturer}', [ManufacturerController::class, 'show'])->name('manufacturers.show');

// Collectors
Route::get('/collectors', [ProfileController::class, 'index'])->name('collectors.index');

Route::get('/about', function () {
    return Inertia::render('About');
})->name('about');

/*
|--------------------------------------------------------------------------
| Protected Routes (Auth Required)
|--------------------------------------------------------------------------
*/
Route::middleware('auth')->group(function () {

    // Profile
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::get('/setup', function () {
        return Inertia::render('Auth/RegisterSetup');
    })->name('register.setup');

    // Social
    Route::post('/follow/{user}', [ProfileController::class, 'toggleFollow'])->name('follow.toggle');

    // Beverages & OCR
    Route::get('/beverages/create', [BeverageController::class, 'create'])->name('beverage.create');
    Route::post('/beverages', [BeverageController::class, 'store'])->name('beverage.store');
    Route::post('/beverages/analyze', [BeverageController::class, 'analyze'])->name('beverage.analyze');

    // Collection Management
    Route::post('/collection/add/{beverage}', [BeverageController::class, 'addToCollection'])->name('collection.add');
    Route::delete('/collection/remove/{beverage}', [BeverageController::class, 'removeFromCollection'])->name('collection.remove');
});

/*
|--------------------------------------------------------------------------
| Catch-All
|--------------------------------------------------------------------------
*/
Route::get('/@{username}', [ProfileController::class, 'show'])->name('profile.show');

require __DIR__ . '/auth.php';