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
        // 1. Determine Sort
        $sortField = $request->input('sort', 'created_at');
        $direction = $request->input('direction', 'desc');

        // 2. Fetch Data via Helpers
        $beverages = $this->getFilteredBeverages($brand, $request, $sortField, $direction);
        $options = $this->getFilterOptions($brand);

        return Inertia::render('Brand', [
            'brand' => $brand,
            'beverages' => $beverages,
            'filters' => $request->all(['volume', 'year', 'flavor', 'country']),
            'options' => $options,
            'sort' => [
                'field' => $sortField,
                'direction' => $direction
            ]
        ]);
    }

    /**
     * Helper: filter and sort beverages.
     */
    private function getFilteredBeverages(Brand $brand, Request $request, $sort, $direction)
    {
        // Whitelist allowed sort columns
        $allowedSorts = ['name', 'volume', 'release_date', 'country_code', 'lineup_flavor', 'created_at'];
        $sort = \in_array($sort, $allowedSorts, true) ? $sort : 'created_at';
        $direction = \in_array($direction, ['asc', 'desc'], true) ? $direction : 'desc';

        return $brand->beverages()
            ->with('englishTranslation')
            ->when($request->input('volume'), fn($q, $v) => $q->where('volume', $v))
            ->when($request->input('year'), fn($q, $y) => $q->whereYear('release_date', $y))
            ->when($request->input('flavor'), fn($q, $f) => $q->where('lineup_flavor', $f))
            ->when($request->input('country'), fn($q, $c) => $q->where('country_code', $c))
            ->orderBy($sort, $direction)
            ->get();
    }

    /**
     * Helper: unique filter options.
     */
    private function getFilterOptions(Brand $brand): array
    {
        $base = $brand->beverages();

        return [
            'volumes' => $base->clone()->distinct()->pluck('volume')
                ->map(fn($v) => [
                    'label' => "{$v} mL",
                    'value' => $v
                ]),
            'years' => $base->clone()->whereNotNull('release_date')
                ->selectRaw('DISTINCT EXTRACT(YEAR FROM release_date) as year')
                ->pluck('year')->map(fn($y) => [
                    'label' => (string) $y,
                    'value' => (int) $y
                ]),
            'flavors' => $base->clone()->whereNotNull('lineup_flavor')->distinct()->pluck('lineup_flavor')
                ->map(fn($f) => [
                    'label' => $f,
                    'value' => $f
                ]),
            'countries' => $base->clone()->whereNotNull('country_code')->distinct()->pluck('country_code')
                ->map(fn($c) => [
                    'label' => Countries::exists(\strtoupper($c)) ? Countries::getName(\strtoupper($c)) : \strtoupper($c),
                    'value' => $c
                ])->sortBy('label')->values(),
        ];
    }
}