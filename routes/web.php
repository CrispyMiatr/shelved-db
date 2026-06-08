<?php

use App\Http\Controllers\HomeController;
use App\Http\Controllers\BeverageController;
use App\Http\Controllers\BrandController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ManufacturerController;
use App\Http\Controllers\SearchController;
use App\Http\Controllers\OcrController;
use App\Http\Controllers\Staff\ManagementController;
use App\Http\Middleware\EnsureUserIsStaff;
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

// About
Route::get('/about', function () {
    return Inertia::render('About');
})->name('about');

// Privacy policy
Route::get('/privacy', function () {
    return Inertia::render('Privacy');
})->name('privacy');

// Terms of service
Route::get('/terms', function () {
    return Inertia::render('Terms');
})->name('terms');

/*
|--------------------------------------------------------------------------
| Protected Routes (Auth Required)
|--------------------------------------------------------------------------
*/
Route::middleware('auth')->group(function () {

    // Profile
    Route::get('/settings', [ProfileController::class, 'settings'])->name('profile.settings');
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::get('/setup', function () {
        return Inertia::render('Auth/RegisterSetup');
    })->name('register.setup');

    // Social
    Route::post('/follow/{user}', [ProfileController::class, 'toggleFollow'])->name('follow.toggle');

    // Beverages & OCR - limits 5 uploads/extractions per minute
    Route::get('/beverages/create', [BeverageController::class, 'create'])->name('beverage.create');
    Route::post('/beverages', [BeverageController::class, 'store'])
        ->middleware('throttle:5,1')
        ->name('beverage.store');
    Route::post('/api/beverage/ocr', [OcrController::class, 'process'])
        ->middleware('throttle:5,1')
        ->name('beverage.ocr');

    // Collection Management
    // Route::post('/collection/add/{beverage}', [BeverageController::class, 'addToCollection'])->name('collection.add');
    // Route::delete('/collection/remove/{beverage}', [BeverageController::class, 'removeFromCollection'])->name('collection.remove');

    // Staff Management
    Route::middleware(['auth', EnsureUserIsStaff::class])
        ->prefix('staff')
        ->name('staff.')
        ->group(function () {
            Route::get('/', [ManagementController::class, 'index'])->name('dashboard');

            Route::get('/brands', [ManagementController::class, 'brands'])->name('brands');
            Route::post('/brands', [ManagementController::class, 'storeBrand'])->name('brands.store');
            Route::patch('/brands/{brand}', [ManagementController::class, 'updateBrand'])->name('brands.update');

            Route::get('/manufacturers', [ManagementController::class, 'manufacturers'])->name('manufacturers');
            Route::post('/manufacturers', [ManagementController::class, 'storeManufacturer'])->name('manufacturers.store');
            Route::patch('/manufacturers/{manufacturer}', [ManagementController::class, 'updateManufacturer'])->name('manufacturers.update');

            Route::get('/companies', [ManagementController::class, 'companies'])->name('companies');
            Route::post('/companies', [ManagementController::class, 'storeCompany'])->name('companies.store');
            Route::patch('/companies/{company}', [ManagementController::class, 'updateCompany'])->name('companies.update');
        });
});

/*
|--------------------------------------------------------------------------
| Catch-All
|--------------------------------------------------------------------------
*/
Route::get('/@{username}', [ProfileController::class, 'show'])->name('profile.show');

require __DIR__ . '/auth.php';