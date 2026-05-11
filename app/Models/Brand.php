<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

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
}