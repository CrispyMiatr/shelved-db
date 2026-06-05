<?php

namespace App\Http\Controllers;

use App\Models\Beverage;
use App\Models\Manufacturer;
use App\Models\Brand;
use App\Models\Company;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Symfony\Component\Intl\Countries;
use Symfony\Component\Intl\Languages;

class BeverageController extends Controller
{
    public function show(string $brandName, Beverage $beverage)
    {
        $beverage->load(['brand', 'brand.company', 'manufacturers', 'translations']);

        return Inertia::render('Product', [
            'beverage' => $beverage,
            'relatedFromBrand' => Beverage::where('brand_id', $beverage->brand_id)
                ->where('id', '!=', $beverage->id)
                ->take(4)
                ->get()
        ]);
    }

    public function create()
    {
        // get all languages in English -> ['en' => 'English', 'fr' => 'French'...]
        $languages = collect(Languages::getNames())->map(fn($name, $code) => [
            'code' => $code,
            'name' => $name
        ])->values();

        return Inertia::render('Beverage/Create', [
            'brands' => Brand::orderBy('name')->get(['id', 'name', 'company_id']),
            'companies' => Company::orderBy('name')->get(['id', 'name']),
            'manufacturers' => Manufacturer::orderBy('name')->get(),
            'countries' => collect(Countries::getNames())->map(fn($name, $code) => [
                'code' => $code,
                'name' => $name
            ])->values(),
            'languages' => $languages,
        ]);
    }

    public function store(Request $request)
    {
        $input = $request->all();
        if (isset($input['company_id']) && $input['company_id'] === '')
            $input['company_id'] = null;
        if (isset($input['brand_id']) && $input['brand_id'] === '')
            $input['brand_id'] = null;
        $request->replace($input);

        $request->validate([
            // Brand/Company logic
            'company_id' => 'nullable|required_without:new_company_name|exists:companies,id',
            'new_company_name' => 'nullable|string|max:255',
            'brand_id' => 'nullable|required_without:new_brand_name|exists:brands,id',
            'new_brand_name' => 'nullable|string|max:255',

            // basic info
            'name' => 'required|string|max:255',
            'lineup_flavor' => 'nullable|string',
            'country_code' => 'required|string|size:2',
            'sku' => 'nullable|string',
            'release_date' => 'required|string',
            'volume' => 'required|integer',
            'barcode' => 'required|string',

            'manufacturer_ids' => 'nullable|array',
            'manufacturer_ids.*' => 'exists:manufacturers,id',
            'new_manufacturer_name' => 'nullable|string|max:255',

            // translations: language_code set to max 10 to allow codes like 'en-US' or 'jp'
            'translations' => 'required|array|min:1',
            'translations.*.language_code' => 'required|string|max:10',
            'translations.*.ingredients' => 'required|string',
            'translations.*.warning_text' => 'nullable|string',
            'translations.*.extra_info' => 'nullable|string',
            'translations.*.is_original' => 'boolean',

            'nutrition_items' => 'nullable|array',
            'nutrition_items.*.name' => 'required|string|max:100',
            'nutrition_items.*.per_100ml' => 'nullable|string|max:50',
            'nutrition_items.*.per_full_volume' => 'nullable|string|max:50',

            'img_front' => 'required|image|max:5120',
            'img_back' => 'nullable|image|max:5120',
            'img_left' => 'nullable|image|max:5120',
            'img_right' => 'nullable|image|max:5120',
            'img_top' => 'nullable|image|max:5120',
            'img_bottom' => 'nullable|image|max:5120',

            // add to personal collection
            'add_to_collection' => 'boolean'
        ]);

        $primarySlots = ['img_front', 'img_back', 'img_left', 'img_right'];
        $primaryImageCount = collect($primarySlots)
            ->filter(fn($slot) => $request->hasFile($slot))
            ->count();

        if ($primaryImageCount < 3) {
            return back()->withErrors(['img_front' => 'At least 3 primary images (Front, Back, Left, or Right) are required.']);
        }

        return DB::transaction(function () use ($request) {

            // resolve company
            $companyId = $request->company_id;
            if ($request->filled('new_company_name')) {
                $company = Company::firstOrCreate([
                    'name' => $request->new_company_name
                ], [
                    'country_code' => $request->country_code
                ]);
                $companyId = $company->id;
            }

            // resolve brand
            $brandId = $request->brand_id;
            if ($request->filled('new_brand_name')) {
                $brand = Brand::firstOrCreate([
                    'name' => $request->new_brand_name,
                    'company_id' => $companyId
                ]);
                $brandId = $brand->id;
            }

            // flexible date normalization
            // DB requires YYYY-MM-DD, fill missing info with January 1st
            $rawDate = $request->release_date;
            $parsedDate = null;
            $precision = 2;

            if (preg_match('/^\d{4}$/', $rawDate)) {
                $parsedDate = "$rawDate-01-01";
                $precision = 0; // year only
            } elseif (preg_match('/^\d{2}-\d{4}$/', $rawDate)) {
                [$m, $y] = explode('-', $rawDate);
                $parsedDate = "$y-$m-01";
                $precision = 1; // month only
            } elseif (preg_match('/^\d{2}-\d{2}-\d{4}$/', $rawDate)) {
                [$d, $m, $y] = explode('-', $rawDate);
                $parsedDate = "$y-$m-$d";
                $precision = 2; // full date
            } else {
                $parsedDate = now()->toDateString();
                $precision = 2;
            }

            // convert dynamic flat list from form back to DB layout
            $nutrition100 = [];
            $nutritionFull = [];
            if ($request->has('nutrition_items')) {
                foreach ($request->nutrition_items as $item) {
                    if (!empty($item['name'])) {
                        $nutrition100[$item['name']] = $item['per_100ml'] ?? '';
                        $nutritionFull[$item['name']] = $item['per_full_volume'] ?? '';
                    }
                }
            }
            // create beverage
            $beverage = Beverage::create([
                'brand_id' => $brandId,
                'name' => $request->name,
                'volume' => $request->volume,
                'country_code' => $request->country_code,
                'barcode' => $request->barcode,
                'release_date' => $parsedDate,
                'release_date_precision' => $precision,
                'lineup_flavor' => $request->lineup_flavor,
                'sku' => $request->sku,
                'nutrition_100ml' => $nutrition100,
                'nutrition_full' => $nutritionFull,
            ]);

            // sync manufacturers
            $mIds = $request->manufacturer_ids ?? [];
            if ($request->filled('new_manufacturer_name')) {
                $newM = Manufacturer::firstOrCreate(['name' => $request->new_manufacturer_name]);
                $mIds[] = $newM->id;
            }
            $beverage->manufacturers()->sync($mIds);

            // save translations
            foreach ($request->translations as $trans) {
                $beverage->translations()->create($trans);
            }

            // attach media
            $slots = ['front', 'back', 'left', 'right', 'top', 'bottom'];
            foreach ($slots as $slot) {
                if ($request->hasFile("img_$slot")) {
                    $beverage->addMediaFromRequest("img_$slot")->toMediaCollection($slot);
                }
            }

            if ($request->add_to_collection) {
                $beverage->collectors()->attach(auth()->id());
            }

            $beverage->load('brand');
            $brandSlug = $beverage->brand->id . '-' . Str::slug($beverage->brand->name);
            $beverageSlug = $beverage->id . '-' . Str::slug($beverage->name);

            return redirect()->route('beverage.show', [$brandSlug, $beverageSlug]);
        });
    }
}