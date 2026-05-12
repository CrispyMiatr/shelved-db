<?php

namespace App\Http\Controllers;

use App\Models\Manufacturer;
use Inertia\Inertia;
use Inertia\Response;

class ManufacturerController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Manufacturers/Index', [
            'manufacturers' => Manufacturer::orderBy('name')->get()
        ]);
    }
}