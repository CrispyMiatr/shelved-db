<?php

namespace App\Support;

use Spatie\MediaLibrary\MediaCollections\Models\Media;
use Spatie\MediaLibrary\Support\PathGenerator\PathGenerator;
use App\Models\User;
use App\Models\Beverage;
use App\Models\Brand;
use App\Models\Manufacturer;
use App\Models\Company;

class CustomPathGenerator implements PathGenerator
{
    /**
     * Get the path for the given media.
     */
    public function getPath(Media $media): string
    {
        $prefix = $this->getFolderPrefix($media);

        // media->model_id = Beverage || User ID
        // media->id       = specific image ID
        return "{$prefix}/{$media->model_id}/{$media->id}/";
    }

    /**
     * Get the path for conversions.
     */
    public function getPathForConversions(Media $media): string
    {
        return $this->getPath($media) . 'conversions/';
    }

    /**
     * Get the path for responsive images.
     */
    public function getPathForResponsiveImages(Media $media): string
    {
        return $this->getPath($media) . 'responsive/';
    }

    /**
     * Determine folder name based on the Model Type
     */
    protected function getFolderPrefix(Media $media): string
    {
        return match ($media->model_type) {
            User::class => 'avatars',
            Beverage::class => 'beverages',
            Brand::class => 'brands',
            Manufacturer::class => 'manufacturers',
            Company::class => 'companies',
            default => 'misc',
        };
    }
}