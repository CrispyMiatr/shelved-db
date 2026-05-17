<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Http\Requests\ProfileUpdateRequest;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;
use Symfony\Component\Intl\Countries;

class ProfileController extends Controller
{
    /**
     * Display a user's public profile.
     */
    public function show(Request $request, string $username): Response
    {
        $user = User::where('username', $username)
            ->withCount(['collection', 'followers', 'following'])
            ->firstOrFail();

        $authUser = $request->user();

        // 1. Determine Permissions
        $isOwner = $authUser && $authUser->id === $user->id;
        $isFollowing = $authUser ? $authUser->following()->where('following_id', $user->id)->exists() : false;
        $followsBack = $authUser ? $user->following()->where('following_id', $authUser->id)->exists() : false;
        $canSeeContent = !$user->is_private || $isOwner || ($isFollowing && $followsBack);

        // 2. Prepare Collection Data
        $baseCollection = $user->collection();
        $totalInCollection = $baseCollection->count();

        $collection = [];
        $options = [];

        if ($canSeeContent) {
            // Apply filters via helper
            $collection = $this->getFilteredCollection($user, $request);
            // Get dropdown options via helper
            $options = $this->getFilterOptions($baseCollection);
        }

        return Inertia::render('Profile/Show', [
            'user' => $user->makeHidden(['email']),
            'collection' => $collection,
            'totalInCollection' => $totalInCollection,
            'followers' => $canSeeContent ? $this->getSocialList($user, 'followers') : [],
            'following' => $canSeeContent ? $this->getSocialList($user, 'following') : [],
            'isFollowing' => $isFollowing,
            'isMutual' => $isFollowing && $followsBack,
            'canSeeContent' => $canSeeContent,
            'isOwner' => $isOwner,
            'filters' => $request->all(['brand', 'volume', 'year', 'flavor', 'country']),
            'options' => $options
        ]);
    }

    /**
     * Helper: Apply filters and get beverages
     */
    private function getFilteredCollection(User $user, Request $request)
    {
        return $user->collection()
            ->with(['brand', 'englishTranslation'])
            ->when($request->brand, fn($q, $b) => $q->where('brand_id', $b))
            ->when($request->volume, fn($q, $v) => $q->where('volume', $v))
            ->when($request->year, fn($q, $y) => $q->whereYear('release_date', $y))
            ->when($request->country, fn($q, $c) => $q->where('country_code', $c))
            ->when($request->flavor, fn($q, $f) => $q->where('lineup_flavor', $f))
            ->latest()
            ->get();
    }

    /**
     * Helper: Extract unique options for dropdowns
     */
    private function getFilterOptions($baseCollection): array
    {
        $userBrands = $baseCollection->clone()
            ->join('brands', 'beverages.brand_id', '=', 'brands.id')
            ->select('brands.id', 'brands.name')
            ->distinct()
            ->get();

        return [
            'brands' => $userBrands->count() > 1
                ? $userBrands->map(fn($b) => ['label' => $b->name, 'value' => $b->id])
                : [],
            'volumes' => $baseCollection->clone()->distinct()->pluck('volume')
                ->map(fn($v) => ['label' => $v . ' mL', 'value' => $v]),
            'countries' => $baseCollection->clone()
                ->whereNotNull('country_code')
                ->distinct()
                ->pluck('country_code')
                ->map(function ($code) {
                    $upperCode = strtoupper($code);
                    return [
                        // converts CC to Country Code
                        'label' => Countries::exists($upperCode) ? Countries::getName($upperCode) : $upperCode,
                        'value' => $code
                    ];
                })
                ->sortBy('label')
                ->values(),
            'years' => $baseCollection->clone()
                ->whereNotNull('release_date')
                ->selectRaw('DISTINCT EXTRACT(YEAR FROM release_date) as year')
                ->pluck('year')
                ->map(fn($y) => ['label' => (string) (int) $y, 'value' => (int) $y]),
            'flavors' => $baseCollection->clone()
                ->whereNotNull('lineup_flavor')
                ->distinct()
                ->pluck('lineup_flavor')
                ->map(fn($f) => ['label' => $f, 'value' => $f]),
        ];
    }

    /**
     * Helper: Get social lists with correct columns
     */
    private function getSocialList(User $user, string $type)
    {
        return $user->$type()
            ->select(['users.id', 'users.name', 'users.username'])
            ->get();
    }

    /**
     * Display the user's profile form.
     */
    public function edit(Request $request): Response
    {
        return Inertia::render('Profile/Edit', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
        $user = $request->user();
        $user->fill($request->validated());

        if ($user->isDirty('email')) {
            $user->email_verified_at = null;
        }

        $user->save();

        return Redirect::route('profile.show', [
            'username' => $user->username
        ]);
    }

    /**
     * Follow/Unfollow Logic
     */
    public function toggleFollow(User $user): RedirectResponse
    {
        $authUser = Auth::user();

        if ($authUser->id === $user->id) {
            return back()->withErrors(['message' => 'You cannot follow yourself.']);
        }

        // toggle() adds if missing, removes if exists
        $authUser->following()->toggle($user->id);

        return back();
    }

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();
        Auth::logout();
        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }

    /**
     * Profile search logic
     */
    public function index(Request $request): Response
    {
        $search = $request->input('search');

        $collectors = User::query()
            ->select(['id', 'name', 'username', 'bio', 'is_private'])
            ->withCount(['collection', 'followers', 'following'])
            ->when($search, function ($query, $search) {
                $query->where('name', 'ilike', "%{$search}%") // ilike for case-insensitive Postgres search
                    ->orWhere('username', 'ilike', "%{$search}%");
            })
            ->latest()
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Collectors', [
            'collectors' => $collectors,
            'filters' => $request->only(['search'])
        ]);
    }
}