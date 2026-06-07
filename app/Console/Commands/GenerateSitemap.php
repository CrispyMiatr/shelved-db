<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Spatie\Sitemap\Sitemap;
use Spatie\Sitemap\Tags\Url;
use App\Models\Beverage;
use App\Models\Brand;
use App\Models\Manufacturer;
use App\Models\User;

class GenerateSitemap extends Command
{
    protected $signature = 'sitemap:generate';
    protected $description = 'Generate the sitemap for Shelved.';

    public function handle()
    {
        $sitemap = Sitemap::create();

        // static pages
        $sitemap->add(Url::create('/')->setPriority(1.0)->setChangeFrequency(Url::CHANGE_FREQUENCY_DAILY))
            ->add(Url::create('/catalogue')->setPriority(0.9))
            ->add(Url::create('/manufacturers')->setPriority(0.8))
            ->add(Url::create('/collectors')->setPriority(0.8))
            ->add(Url::create('/about')->setPriority(0.5));

        // beverages
        // chunking to prevent memory issues if 10,000+ beverages
        Beverage::with('brand')->chunk(100, function ($beverages) use ($sitemap) {
            foreach ($beverages as $beverage) {
                $sitemap->add(
                    Url::create("/catalogue/{$beverage->brand->slug}/{$beverage->slug}")
                        ->setPriority(0.9)
                        ->setLastModificationDate($beverage->updated_at)
                );
            }
        });

        // brands
        Brand::all()->each(function (Brand $brand) use ($sitemap) {
            $sitemap->add(Url::create("/catalogue/{$brand->slug}")->setPriority(0.8));
        });

        // manufacturers
        Manufacturer::all()->each(function (Manufacturer $manu) use ($sitemap) {
            $sitemap->add(Url::create("/manufacturers#manu-{$manu->id}")->setPriority(0.6));
        });

        // public collectors
        User::where('is_private', false)->chunk(100, function ($users) use ($sitemap) {
            foreach ($users as $user) {
                $sitemap->add(Url::create("/@{$user->username}")->setPriority(0.7));
            }
        });

        $sitemap->writeToFile(public_path('sitemap.xml'));

        $this->info('Sitemap generated successfully!');
    }
}