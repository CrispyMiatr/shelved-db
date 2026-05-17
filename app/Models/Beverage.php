<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Support\Str;
use Symfony\Component\Intl\Countries;

#[Fillable([
    'brand_id',
    'name',
    'lineup_flavor',
    'country_code',
    'sku',
    'barcode',
    'volume',
    'release_date',
    'nutrition_100ml',
    'nutrition_500ml'
])]
class Beverage extends Model
{
    /**
     * Get the attributes that should be cast.
     */
    protected function casts(): array
    {
        return [
            'release_date' => 'date',
            'nutrition_100ml' => 'array',
            'nutrition_500ml' => 'array',
        ];
    }

    /**
     * Get the brand that owns the beverage.
     */
    public function brand(): BelongsTo
    {
        return $this->belongsTo(Brand::class);
    }

    /**
     * All translations (EN, Original Languages) for this beverage.
     */
    public function translations(): HasMany
    {
        return $this->hasMany(BeverageTranslation::class);
    }

    /**
     * Helper to get the English translation specifically.
     * Use this in your React frontend: beverage.english_translation
     */
    public function englishTranslation(): HasOne
    {
        return $this->hasOne(BeverageTranslation::class)->where('language_code', 'en');
    }

    /**
     * The manufacturers that produce this beverage.
     */
    public function manufacturers(): BelongsToMany
    {
        return $this->belongsToMany(Manufacturer::class, 'beverage_manufacturer');
    }

    /**
     * The users who have this beverage in their collection.
     */
    public function collectors(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'beverage_user')->withTimestamps();
    }

    /**
     * Customizing Route Model Binding to handle "ID-Name" format.
     */
    public function resolveRouteBinding($value, $field = null)
    {
        $id = explode('-', $value)[0];

        // check if the first part is actually a number
        if (!is_numeric($id)) {
            abort(404);
        }

        return $this->where('id', $id)->firstOrFail();
    }

    /**
     * Helper to convert CC to Country Code full name.
     */
    protected function countryName(): Attribute
    {
        return Attribute::make(
            get: function () {
                $code = strtoupper($this->country_code);
                return Countries::exists($code) ? Countries::getName($code) : $code;
            },
        );
    }

    /**
     * Helper to generate the URL slug in React.
     * Use this in your frontend: beverage.slug
     */
    protected function slug(): Attribute
    {
        return Attribute::make(
            get: fn() => $this->id . '-' . Str::slug($this->name),
        );
    }

    // make sure 'slug' is sent to frontend
    protected $appends = ['slug', 'country_name'];
}