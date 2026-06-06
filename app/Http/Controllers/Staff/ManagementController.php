<?php

namespace App\Http\Controllers\Staff;

use App\Http\Controllers\Controller;
use App\Models\Brand;
use App\Models\Company;
use App\Models\Manufacturer;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Symfony\Component\Intl\Countries;

class ManagementController extends Controller
{
    /**
     * Display page.
     */
    public function index()
    {
        return Inertia::render('Staff/Management', [
            'brands' => Brand::with('company')->orderBy('name')->get(),
            'companies' => Company::orderBy('name')->get(),
            'manufacturers' => Manufacturer::orderBy('name')->get(),
            'countries' => collect(Countries::getNames())->map(fn($name, $code) => [
                'value' => $code,
                'label' => $name
            ])->values(),
        ]);
    }

    /**
     * Store Brand.
     */
    public function storeBrand(Request $request)
    {
        $request->validate([
            'name' => 'required|string|unique:brands,name',
            'company_id' => 'required|exists:companies,id',
            'website_url' => 'nullable|url',
            'logo' => 'nullable|mimes:jpeg,png,jpg,webp,svg|max:2048'
        ]);

        $brand = Brand::create($request->only('name', 'company_id', 'website_url'));

        if ($request->hasFile('logo')) {
            $brand->addMediaFromRequest('logo')->toMediaCollection('logo');
        }

        return back()->with('status', 'Brand created');
    }

    /**
     * Update Brand.
     */
    public function brands()
    {
        return Inertia::render('Staff/Brands', [
            'brands' => Brand::with('company')->orderBy('name')->get()
        ]);
    }

    public function updateBrand(Request $request, Brand $brand)
    {
        $request->validate([
            'name' => 'required|string',
            'company_id' => 'required|exists:companies,id',
            'website_url' => 'nullable|url',
            'logo' => 'nullable|mimes:jpeg,png,jpg,webp,svg|max:2048'
        ]);

        $brand->update($request->only('name', 'company_id', 'website_url'));

        if ($request->hasFile('logo')) {
            $brand->addMediaFromRequest('logo')->toMediaCollection('logo');
        }

        return back()->with('status', 'Brand updated');
    }

    /**
     * Store Manufacturer.
     */
    public function storeManufacturer(Request $request)
    {
        $request->validate([
            'name' => 'required|string|unique:manufacturers,name',
            'abbreviation' => 'nullable|string|max:10',
            'website_url' => 'nullable|url',
            'logo' => 'nullable|mimes:jpeg,png,jpg,webp,svg|max:2048'
        ]);

        $manufacturer = Manufacturer::create($request->only('name', 'abbreviation', 'website_url'));

        if ($request->hasFile('logo')) {
            $manufacturer->addMediaFromRequest('logo')->toMediaCollection('logo');
        }

        return back()->with('status', 'Manufacturer created');
    }

    /**
     * Update Manufacturer.
     */
    public function manufacturers()
    {
        return Inertia::render('Staff/Manufacturers', [
            'manufacturers' => Manufacturer::orderBy('name')->get()
        ]);
    }

    public function updateManufacturer(Request $request, Manufacturer $manufacturer)
    {
        $request->validate([
            'name' => 'required|string',
            'abbreviation' => 'nullable|string|max:10',
            'website_url' => 'nullable|url',
            'logo' => 'nullable|mimes:jpeg,png,jpg,webp,svg|max:2048'
        ]);

        $manufacturer->update($request->only('name', 'abbreviation', 'website_url'));

        if ($request->hasFile('logo')) {
            $manufacturer->addMediaFromRequest('logo')->toMediaCollection('logo');
        }

        return back()->with('status', 'Manufacturer updated');
    }

    /**
     * Store Company.
     */
    public function storeCompany(Request $request)
    {
        $request->validate([
            'name' => 'required|string|unique:companies,name',
            'country_code' => 'required|string|size:2',
            'website_url' => 'nullable|url',
            'logo' => 'nullable|mimes:jpeg,png,jpg,webp,svg|max:2048'
        ]);

        $company = Company::create($request->only('name', 'country_code', 'website_url'));

        if ($request->hasFile('logo')) {
            $company->addMediaFromRequest('logo')->toMediaCollection('logo');
        }

        return back()->with('status', 'Company created');
    }

    /**
     * Update Company.
     */
    public function companies()
    {
        return Inertia::render('Staff/Companies', [
            'companies' => Company::orderBy('name')->get()
        ]);
    }

    public function updateCompany(Request $request, Company $company)
    {
        $request->validate([
            'name' => 'required|string',
            'country_code' => 'required|string|size:2',
            'website_url' => 'nullable|url',
            'logo' => 'nullable|mimes:jpeg,png,jpg,webp,svg|max:2048'
        ]);

        $company->update($request->only('name', 'country_code', 'website_url'));

        if ($request->hasFile('logo')) {
            $company->addMediaFromRequest('logo')->toMediaCollection('logo');
        }

        return back()->with('status', 'Company updated');
    }
}