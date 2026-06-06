<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Str;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

#[Fillable(['company_id', 'name', 'website_url'])]
class Brand extends Model implements HasMedia
{
    use InteractsWithMedia;

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

        // check if the first part is a number
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
     * Automatically generate optimized versions (thumbnails).
     */
    public function registerMediaConversions(?Media $media = null): void
    {
        $this->addMediaConversion('card')
            ->width(400)
            ->quality(90)
            ->keepOriginalImageFormat()
            ->sharpen(10)
            ->nonQueued();
    }

    /**
     * Create brand logo path.
     */
    public function registerMediaCollections(): void
    {
        $this->addMediaCollection('logo')->singleFile();
    }

    protected function logoUrl(): Attribute
    {
        return Attribute::make(
            get: function () {
                if (!$this->hasMedia('logo')) {
                    $folder = strtolower(class_basename($this));
                    return "/assets/logos/{$folder}/placeholder.png";
                }

                $media = $this->getFirstMedia('logo');

                return [
                    'original' => $media->getFullUrl(),
                    'card' => ($media->mime_type !== 'image/svg+xml' && $media->hasGeneratedConversion('card'))
                        ? $media->getUrl('card')
                        : $media->getFullUrl(),
                ];
            }
        );
    }

    protected $appends = ['slug', 'logo_url'];
}