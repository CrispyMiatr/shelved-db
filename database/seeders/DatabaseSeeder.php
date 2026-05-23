<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Brand;
use App\Models\Beverage;
use App\Models\Manufacturer;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // 1. Create Head Admin
        $admin = User::factory()->create([
            'name' => 'Head Admin',
            'username' => 'head.admin',
            'email' => 'admin@shelved.com',
            'role' => 'head_admin',
            'social_links' => [
                'instagram' => 'https://www.instagram.com/crispy.drinks',
                'bluesky' => 'https://bsky.app/profile/crispydrinks.bsky.social'
            ]
        ]);

        // 2. Create random users
        $users = User::factory(10)->create();

        // 3. Create Brands
        $brandMonster = Brand::create(['name' => 'Monster Energy', 'website_url' => 'https://www.monsterenergy.com']);
        $brandRedBull = Brand::create(['name' => 'Red Bull', 'website_url' => 'https://www.redbull.com']);
        $brandCocaCola = Brand::create(['name' => 'Coca-Cola', 'website_url' => 'https://www.coca-cola.com']);

        // 4. Create Manufacturers
        $mfgBall = Manufacturer::create(['name' => 'Ball Corporation', 'logo_path' => 'logos/ball_corp.png']);
        $mfgRauch = Manufacturer::create(['name' => 'Rauch Fruchtsäfte', 'logo_path' => 'logos/rauch.png']);
        $mfgCcep = Manufacturer::create(['name' => 'Coca-Cola Europacific Partners', 'logo_path' => 'logos/ccep.png']);

        // 5. BEVERAGE 1: Monster Pipeline Punch (Japan)
        $bevMonster = Beverage::create([
            'brand_id' => $brandMonster->id,
            'name' => 'Punch Pipeline Punch',
            'country_code' => 'JP',
            'volume' => '355',
            'barcode' => '4897036692134',
            'release_date' => '2019-03-01',
            'nutrition_100ml' => [
                'energy_kj' => 185,
                'energy_kcal' => 44,
                'fat' => 0,
                'fat_saturated' => 0,
                'carbohydrates' => 10,
                'sugars' => 10,
                'protein' => 0,
                'salt' => 0.06,
                'vitamin_b2' => 0.7,
                'vitamin_b3' => 8.5,
                'vitamin_b6' => 0.8,
                'vitamin_b12' => 2.5,
                'caffeine' => 40,
                'taurine' => 125,
            ]
        ]);
        $bevMonster->translations()->create(['language_code' => 'jp', 'ingredients' => '高麗人参根エキス...', 'is_original' => true]);
        $bevMonster->translations()->create(['language_code' => 'en', 'ingredients' => 'Carbonated Water, Sugar...', 'is_original' => false]);
        $bevMonster->manufacturers()->attach($mfgBall->id);

        // 6. BEVERAGE 2: Red Bull Energy Drink (Austria)
        $bevRedBull = Beverage::create([
            'brand_id' => $brandRedBull->id,
            'name' => 'Original',
            'country_code' => 'AT',
            'volume' => '250',
            'barcode' => '9002490100070',
            'release_date' => '1987-04-01',
            'nutrition_100ml' => [
                'energy_kj' => 194,
                'energy_kcal' => 45,
                'fat' => 0,
                'fat_saturated' => 0,
                'carbohydrates' => 11,
                'sugars' => 11,
                'protein' => 0,
                'salt' => 0.1,
                'vitamin_b3' => 8,
                'vitamin_b5' => 2,
                'vitamin_b6' => 2,
                'vitamin_b12' => 2,
                'caffeine' => 32,
                'taurine' => 400,
            ]
        ]);
        $bevRedBull->translations()->create(['language_code' => 'de', 'ingredients' => 'Wasser, Saccharose, Glucose, Säuerungsmittel (Citronensäure), Kohlensäure...', 'is_original' => true]);
        $bevRedBull->translations()->create(['language_code' => 'en', 'ingredients' => 'Water, Sucrose, Glucose, Citric Acid, Carbon Dioxide, Taurine...', 'is_original' => false]);
        $bevRedBull->manufacturers()->attach($mfgRauch->id);

        // 7. BEVERAGE 3: Coca-Cola Classic (USA)
        $bevCoke = Beverage::create([
            'brand_id' => $brandCocaCola->id,
            'name' => 'Classic',
            'country_code' => 'US',
            'volume' => '355',
            'barcode' => '049000028904',
            'release_date' => '1886-05-08',
            'nutrition_100ml' => [
                'energy_kj' => 180,
                'energy_kcal' => 42,
                'fat' => 0,
                'fat_saturated' => 0,
                'carbohydrates' => 10.6,
                'sugars' => 10.6,
                'protein' => 0,
                'salt' => 0.01,
                'caffeine' => 10,
            ]
        ]);
        $bevCoke->translations()->create([
            'language_code' => 'en',
            'ingredients' => 'Carbonated Water, High Fructose Corn Syrup, Caramel Color, Phosphoric Acid, Natural Flavors, Caffeine.',
            'is_original' => true
        ]);
        $bevCoke->manufacturers()->attach($mfgCcep->id);

        // 8. Establish Connections
        // Add all drinks to Admin collection
        $admin->collection()->attach([$bevMonster->id, $bevRedBull->id, $bevCoke->id], ['created_at' => now()]);

        // Follow system test
        $users[0]->following()->attach($admin->id);
        $admin->following()->attach($users[0]->id);
    }
}