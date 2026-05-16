<?php

namespace App\Http\Requests;

use App\Models\User;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ProfileUpdateRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array <string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'username' => [
                'required',
                'string',
                'lowercase',
                'max:255',
                // a-z, 0-9, period (.), underscore (_), dash (-)
                'regex:/^[a-zA-Z0-9\.\-_]+$/',
                Rule::unique(User::class)->ignore($this->user()->id),
            ],
            'email' => [
                'required',
                'string',
                'lowercase',
                'email',
                'max:255',
                Rule::unique(User::class)->ignore($this->user()->id),
            ],
            'bio' => ['nullable', 'string', 'max:500'],
            'is_private' => ['boolean'],
            'social_links' => ['nullable', 'array'],
            'social_links.facebook' => ['nullable', 'url'],
            'social_links.instagram' => ['nullable', 'url'],
            'social_links.twitter' => ['nullable', 'url'],
            'social_links.tiktok' => ['nullable', 'url'],
            'social_links.threads' => ['nullable', 'url'],
            'social_links.bluesky' => ['nullable', 'url'],
            'social_links.youtube' => ['nullable', 'url'],
            'social_links.ebay' => ['nullable', 'url'],
        ];
    }

    /**
     * Custom error messages for the regex
     */
    public function messages(): array
    {
        return [
            'username.regex' => 'The username may only contain letters, numbers, dots, dashes, and underscores.',
        ];
    }
}
