<?php

namespace App\Http\Controllers;

use App\Models\Brand;
use App\Models\Beverage;
use Illuminate\Http\Request;

class SearchController extends Controller
{
    public function globalSearch(Request $request)
    {
        $q = $request->input('q');
        $brandContextId = $request->input('brand_id');

        if (!$q || strlen($q) < 2) {
            return response()->json(['brands' => [], 'beverages' => []]);
        }

        try {
            // 1. Search Brands
            // We ONLY select real database columns: id, name, logo_path
            // The 'slug' will be added automatically by Laravel when it converts to JSON
            $brands = Brand::query()
                ->where('name', 'ilike', "%{$q}%")
                ->limit(5)
                ->get(['id', 'name', 'logo_path']);

            // 2. Search Beverages
            $beverages = Beverage::query()
                // We load the brand relationship, selecting only what we need
                ->with('brand:id,name')
                ->where('name', 'ilike', "%{$q}%")
                ->when(is_numeric($brandContextId), function ($query) use ($brandContextId) {
                    // Prioritize the current brand
                    $query->orderByRaw("brand_id = ? DESC", [$brandContextId]);
                })
                ->orderBy('name', 'asc')
                ->limit(10)
                ->get(['id', 'name', 'brand_id']);

            // Return as JSON. 
            // Because of $appends in your models, 'slug' will appear in the result!
            return response()->json([
                'brands' => $brands,
                'beverages' => $beverages
            ]);

        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}