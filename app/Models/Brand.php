<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Str;

#[Fillable(['company_id', 'name', 'website_url', 'logo_path'])]
class Brand extends Model
{

    /**
     * Get the company that owns the brand.
     */
    public function company(): BelongsTo
    {
        return $this->belongsTo(Company::class);
    }

    /**
     * Get the beverages for the brand.
     */
    public function beverages(): HasMany
    {
        return $this->hasMany(Beverage::class);
    }

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
     * Create url slug for brand.
     */
    protected function slug(): Attribute
    {
        return Attribute::make(
            get: fn() => $this->id . '-' . Str::slug($this->name),
        );
    }

    /**
     * Create brand logo path.
     */
    protected static function booted()
    {
        static::creating(function ($brand) {
            if (!$brand->logo_path) {
                $slug = Str::slug($brand->name);
                $brand->logo_path = "/assets/logos/brand/{$slug}.png";
            }
        });
    }

    protected $appends = ['slug'];
}