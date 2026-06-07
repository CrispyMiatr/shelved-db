<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title inertia>{{ config('app.name', 'Shelved.') }}</title>

    <!-- Favicon-->
    <!-- <link rel="icon" type="image/x-icon" href="/favicon.ico"> -->
    <link rel="icon" type="image/svg+xml" href="/logo_small-w.svg" />

    <!-- Scripts -->
    <script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer></script>

    @routes
    @viteReactRefresh
    @vite(['resources/js/main.tsx', "resources/js/Pages/{$page['component']}.tsx"])
    @inertiaHead
</head>

<body class="font-sans antialiased">
    @inertia
</body>

</html>