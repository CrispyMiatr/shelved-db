<?php

namespace App\Http\Controllers;

use App\Models\Brand;
use Inertia\Inertia;
use Inertia\Response;

class BrandController extends Controller
{
    /**
     * Display a list of all brands.
     */
    public function index(): Response
    {
        return Inertia::render('Catalogue', [
            // The full alphabetical list
            'brands' => Brand::withCount('beverages')
                ->orderBy('name')
                ->get(),

            // The top 10 most "popular" brands (most beverages)
            'popularBrands' => Brand::withCount('beverages')
                ->orderBy('beverages_count', 'desc')
                ->take(25)
                ->get()
        ]);
    }

    /**
     * Display a specific brand and its products.
     */
    public function show(Brand $brand): Response
    {
        return Inertia::render('Brand', [
            'brand' => $brand->load(['beverages.englishTranslation']),
        ]);
    }
}