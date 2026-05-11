<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

#[Fillable(['name', 'logo_path'])]
class Manufacturer extends Model
{
    /**
     * The beverages produced by this manufacturer.
     */
    public function beverages(): BelongsToMany
    {
        return $this->belongsToMany(Beverage::class, 'beverage_manufacturer');
    }
}