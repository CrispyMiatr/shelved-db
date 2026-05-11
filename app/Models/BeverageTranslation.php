<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;

#[Fillable(['beverage_id', 'language_code', 'ingredients', 'warning_text', 'is_original'])]
class BeverageTranslation extends Model
{
    public function beverage()
    {
        return $this->belongsTo(Beverage::class);
    }
}