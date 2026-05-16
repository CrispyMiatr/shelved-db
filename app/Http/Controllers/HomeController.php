<?php

namespace App\Http\Controllers;

use App\Models\Beverage;
use App\Models\User;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index()
    {
        return Inertia::render('Home', [
            'newlyAdded' => Beverage::with(['brand', 'englishTranslation'])
                ->latest()
                ->take(25)
                ->get(),

            'newlyReleased' => Beverage::with(['brand', 'englishTranslation'])
                ->orderBy('release_date', 'desc')
                ->take(25)
                ->get(),

            'popularProfiles' => User::query()
                ->withCount('followers')
                ->orderBy('followers_count', 'desc')
                ->take(25)
                ->get(),
        ]);
    }
}
