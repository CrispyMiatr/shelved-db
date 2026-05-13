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

class ProfileController extends Controller
{
    /**
     * Display a user's public profile.
     */
    public function show(Request $request, string $username): Response
    {
        // 1. Find user by username, or 404
        $user = User::where('username', $username)
            ->withCount(['collection', 'followers', 'following'])
            ->firstOrFail();

        $authUser = $request->user();

        // 2. Privacy Logic
        $isOwner = $authUser && $authUser->id === $user->id;
        $isFollowing = $authUser ? $authUser->following()->where('following_id', $user->id)->exists() : false;
        $followsBack = $authUser ? $user->following()->where('following_id', $authUser->id)->exists() : false;

        $canSeeContent = !$user->is_private || $isOwner || ($isFollowing && $followsBack);

        return Inertia::render('Profile/Show', [
            'user' => $user->makeHidden(['email']), // Security: hide email on public profiles
            'collection' => $canSeeContent 
                ? $user->collection()->with('brand')->latest()->get() 
                : [],
            'isFollowing' => $isFollowing,
            'isMutual' => $isFollowing && $followsBack,
            'canSeeContent' => $canSeeContent,
            'isOwner' => $isOwner
        ]);
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
}