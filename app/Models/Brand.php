<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Str;

#[Fillable(['name', 'website_url', 'logo_path'])]
class Brand extends Model
{
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

        // Check if the first part is actually a number
        if (!is_numeric($id)) {
            abort(404);
        }

        return $this->where('id', $id)->firstOrFail();
    }

    protected function slug(): \Illuminate\Database\Eloquent\Casts\Attribute
    {
        return \Illuminate\Database\Eloquent\Casts\Attribute::make(
            get: fn () => $this->id . '-' . \Illuminate\Support\Str::slug($this->name),
        );
    }

    protected $appends = ['slug'];
}