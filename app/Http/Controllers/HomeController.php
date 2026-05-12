<?php

namespace App\Http\Controllers;

use App\Models\Beverage;
use App\Models\Brand;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index()
    {
        return Inertia::render('Home', [
            'newlyAdded' => Beverage::with(['brand', 'englishTranslation'])
                ->latest()
                ->take(12)
                ->get(),
            'popularBrands' => Brand::withCount('beverages')
                ->orderBy('beverages_count', 'desc')
                ->take(6)
                ->get()
        ]);
    }
}
