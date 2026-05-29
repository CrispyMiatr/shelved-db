<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Support\Str;

#[Fillable(['name', 'abbreviation', 'website_url', 'logo_path'])]
class Manufacturer extends Model
{
    /**
     * The beverages produced by this manufacturer.
     */
    public function beverages(): BelongsToMany
    {
        return $this->belongsToMany(Beverage::class, 'beverage_manufacturer');
    }

    /**
     * Create manufacturer logo path.
     */
    protected static function booted()
    {
        static::creating(function ($manufacturer) {
            if (!$manufacturer->logo_path) {
                $slug = Str::slug($manufacturer->name);
                $manufacturer->logo_path = "/assets/logos/manufacturer/{$slug}.png";
            }
        });
    }
}