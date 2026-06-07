<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Http;
use Illuminate\Validation\Rules;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        // Turnstile
        if (config('services.turnstile.enabled')) {
            $response = Http::asForm()->post(config('services.turnstile.url'), [
                'secret' => config('services.turnstile.secret_key'),
                'response' => $request->input('captcha_token'),
                'remoteip' => $request->ip(),
            ]);

            if (!$response->json('success')) {
                throw ValidationException::withMessages([
                    'captcha_token' => 'Security check failed. Please try again.',
                ]);
            }
        }

        $request->validate([
            'email' => 'required|string|lowercase|email|max:255|unique:' . User::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        $user = User::create([
            'name' => 'New User', // updated in RegisterSetup
            'username' => 'user_' . bin2hex(random_bytes(4)), // updated in RegisterSetup
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        event(new Registered($user));

        Auth::login($user);

        return redirect(route('register.setup'));
    }
}
