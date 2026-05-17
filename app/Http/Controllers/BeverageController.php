<?php

namespace App\Http\Controllers;

use App\Models\Beverage;
use Inertia\Inertia;

class BeverageController extends Controller
{
    public function show(string $brandName, Beverage $beverage)
    {
        // eager load all complex data
        $beverage->load(['brand', 'manufacturers', 'translations']);

        return Inertia::render('Product', [
            'beverage' => $beverage,
            // for contextual search:
            'relatedFromBrand' => Beverage::where('brand_id', $beverage->brand_id)
                ->where('id', '!=', $beverage->id)
                ->take(4)
                ->get()
        ]);
    }
}
