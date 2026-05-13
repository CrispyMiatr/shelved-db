<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Database\Factories\UserFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Hidden;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

#[Fillable(['name', 'username', 'email', 'password', 'role', 'bio', 'social_links', 'is_private'])]
#[Hidden(['password', 'remember_token'])]
class User extends Authenticatable
{
    /** @use HasFactory<UserFactory> */
    use HasFactory, Notifiable;

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'social_links' => 'array', // Automatically converts JSON to a PHP array
            'is_private' => 'boolean',
        ];
    }

    /**
     * Ensure that usernames are saved as lowercase.
     */
    protected function username(): Attribute
    {
        return Attribute::make(
            set: fn(string $value) => strtolower($value),
        );
    }

    /**
     * Check if the user is a Head Admin (Superuser).
     */
    public function isHeadAdmin(): bool
    {
        return $this->role === 'head_admin';
    }

    /**
     * Check if the user is a regular Admin or Head Admin.
     * Useful for "Staff Only" areas.
     */
    public function isStaff(): bool
    {
        return in_array($this->role, ['admin', 'head_admin']);
    }

    /**
     * The beverages that belong to the user's collection.
     */
    public function collection(): BelongsToMany
    {
        return $this->belongsToMany(Beverage::class)->withTimestamps();
    }

    /**
     * Users that this user is following.
     */
    public function following(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'follows', 'follower_id', 'following_id')->withTimestamps();
    }

    /**
     * Users that follow this user.
     */
    public function followers(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'follows', 'following_id', 'follower_id')->withTimestamps();
    }
}