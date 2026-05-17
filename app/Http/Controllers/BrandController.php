<?php

namespace App\Http\Controllers;

use App\Models\Brand;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\Request;
use Symfony\Component\Intl\Countries;

class BrandController extends Controller
{
    /**
     * Display a list of all brands.
     */
    public function index(): Response
    {
        return Inertia::render('Catalogue', [
            'brands' => Brand::withCount('beverages')
                ->orderBy('name')
                ->get(),

            'popularBrands' => Brand::withCount('beverages')
                ->orderBy('beverages_count', 'desc')
                ->take(15)
                ->get()
        ]);
    }

    /**
     * Display a specific brand and its products.
     */
    public function show(Request $request, Brand $brand): Response
    {
        $query = $brand->beverages();

        // 1. Apply Filters
        $query->when($request->input('volume'), fn($q, $v) => $q->where('volume', $v))
            ->when($request->input('year'), fn($q, $y) => $q->whereYear('release_date', $y))
            ->when($request->input('flavor'), fn($q, $f) => $q->where('lineup_flavor', $f))
            ->when($request->input('country'), fn($q, $c) => $q->where('country_code', $c));

        // 2. Get unique options for filters (Performance: Use distinct on indexed columns)
        $allBeverages = $brand->beverages();

        return Inertia::render('Brand', [
            'brand' => $brand,
            'beverages' => $query->with('englishTranslation')->latest()->get(),
            'filters' => $request->all(['volume', 'year', 'flavor', 'country']),
            'options' => [
                'volumes' => $allBeverages->clone()->distinct()->pluck('volume')->map(fn($v) => ['label' => $v . 'mL', 'value' => $v]),
                'years' => $allBeverages->clone()->whereNotNull('release_date')->selectRaw('DISTINCT EXTRACT(YEAR FROM release_date) as year')->pluck('year')->map(fn($y) => ['label' => $y, 'value' => $y]),
                'flavors' => $allBeverages->clone()->whereNotNull('lineup_flavor')->distinct()->pluck('lineup_flavor')->map(fn($f) => ['label' => $f, 'value' => $f]),
                'countries' => $allBeverages->clone()
                    ->whereNotNull('country_code')
                    ->distinct()
                    ->pluck('country_code')
                    ->map(function ($code) {
                        $upperCode = strtoupper($code);
                        return [
                            /// converts CC to Country Code
                            'label' => Countries::exists($upperCode) ? Countries::getName($upperCode) : $upperCode,
                            'value' => $code
                        ];
                    })
                    ->sortBy('label')
                    ->values(),
            ]
        ]);
    }
}