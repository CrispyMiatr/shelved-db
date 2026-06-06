<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

#[Fillable(['name', 'country_code', 'website_url'])]
class Company extends Model implements HasMedia
{
    use InteractsWithMedia;

    /**
     * A company can own many brands (e.g., Coca-Cola Co. owns Sprite, Fanta, etc.).
     */
    public function brands(): HasMany
    {
        return $this->hasMany(Brand::class);
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
     * Create manufacturer logo path.
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

    protected $appends = ['logo_url'];
}