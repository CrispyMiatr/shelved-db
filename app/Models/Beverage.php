<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Carbon\Carbon;
use Illuminate\Support\Str;
use Symfony\Component\Intl\Countries;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

#[Fillable([
    'brand_id',
    'name',
    'lineup_flavor',
    'country_code',
    'sku',
    'barcode',
    'volume',
    'release_date',
    'release_date_precision',
    'nutrition_100ml',
    'nutrition_full'
])]
class Beverage extends Model implements HasMedia
{
    use InteractsWithMedia;

    /**
     * Get the attributes that should be cast.
     */
    protected function casts(): array
    {
        return [
            'release_date' => 'date:Y-m-d',
            'nutrition_100ml' => 'array',
            'nutrition_full' => 'array',
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
        return $this->hasMany(BeverageTranslation::class)
            ->orderBy('language_code', 'asc');
    }

    /**
     * Helper to get the English translation specifically.
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
     */
    protected function slug(): Attribute
    {
        return Attribute::make(
            get: fn() => $this->id . '-' . Str::slug($this->name),
        );
    }

    /**
     * Define the 6 specific image slots.
     */
    public function registerMediaCollections(): void
    {
        $slots = ['front', 'back', 'left', 'right', 'top', 'bottom'];

        foreach ($slots as $slot) {
            $this->addMediaCollection($slot)
                ->singleFile() // each slot only holds one image
                ->useFallbackUrl('/assets/images/placeholder_product.png');
        }
    }

    /**
     * Automatically generate optimized versions (thumbnails).
     */
    public function registerMediaConversions(?Media $media = null): void
    {
        $this->addMediaConversion('thumb')
            ->width(200)
            ->keepOriginalImageFormat()
            ->sharpen(10)
            ->nonQueued();

        $this->addMediaConversion('card')
            ->width(400)
            ->quality(90)
            ->keepOriginalImageFormat()
            ->sharpen(10)
            ->nonQueued();
    }

    /**
     * Accessor to get all image URLs for the frontend easily.
     */
    protected function imageUrls(): Attribute
    {
        return Attribute::make(
            get: function () {
                $slots = ['front', 'back', 'left', 'right', 'top', 'bottom'];
                $urls = [];
                foreach ($slots as $slot) {
                    if ($this->hasMedia($slot)) {
                        $media = $this->getFirstMedia($slot);
                        $data[$slot] = [
                            'original' => $media->getFullUrl(),
                            'card' => $media->hasGeneratedConversion('card')
                                ? $media->getUrl('card')
                                : $media->getFullUrl(),
                            'thumb' => $media->hasGeneratedConversion('card')
                                ? $media->getUrl('card')
                                : $media->getFullUrl(),
                        ];
                    } else {
                        $data[$slot] = null;
                    }
                }
                return $data;
            },
        );
    }

    protected function releaseDateFormatted(): Attribute
    {
        return Attribute::make(
            get: function () {
                if (!$this->release_date)
                    return null;

                $date = Carbon::parse($this->release_date);

                return match ($this->release_date_precision) {
                    0 => $date->format('Y'),           // "2014"
                    1 => $date->format('m-Y'),         // "05-2014"
                    default => $date->format('d-m-Y'), // "15-05-2014"
                };
            },
        );
    }

    protected $appends = ['slug', 'country_name', 'image_urls', 'release_date_formatted'];
}