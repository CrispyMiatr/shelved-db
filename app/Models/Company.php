<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Attributes\Fillable;

#[Fillable(['name', 'country_code', 'website_url', 'logo_path'])]
class Company extends Model
{
    /**
     * A company can own many brands (e.g., Coca-Cola Co. owns Sprite, Fanta, etc.).
     */
    public function brands(): HasMany
    {
        return $this->hasMany(Brand::class);
    }
}