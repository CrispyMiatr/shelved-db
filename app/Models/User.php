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
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

#[Fillable(['name', 'username', 'email', 'password', 'role', 'bio', 'social_links', 'is_private'])]
#[Hidden(['password', 'remember_token'])]
class User extends Authenticatable implements HasMedia
{
    use HasFactory, Notifiable, InteractsWithMedia;
    protected $appends = ['avatar_url'];

    /**
     * Ensures only one avatar exists at a time.
     */
    public function registerMediaCollections(): void
    {
        $this->addMediaCollection('avatar')->singleFile();
    }

    /**
     * Get the avatar URL or a placeholder.
     */
    protected function avatarUrl(): Attribute
    {
        return Attribute::make(
            get: function () {
                if ($this->hasMedia('avatar')) {
                    return $this->getFirstMediaUrl('avatar');
                }

                $name = urlencode($this->name ?: 'New User');
                return "https://ui-avatars.com/api/?name={$name}&background=random";
            },
        );
    }

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
            'social_links' => 'array', // automatically converts JSON to a PHP array
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