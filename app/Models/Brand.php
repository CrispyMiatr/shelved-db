<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Casts\Attribute;
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

        // check if the first part is actually a number
        if (!is_numeric($id)) {
            abort(404);
        }

        return $this->where('id', $id)->firstOrFail();
    }

    protected function slug(): Attribute
    {
        return Attribute::make(
            get: fn() => $this->id . '-' . Str::slug($this->name),
        );
    }

    protected $appends = ['slug'];
}