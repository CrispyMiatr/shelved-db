<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Brand;
use App\Models\Company;
use App\Models\Beverage;
use App\Models\Manufacturer;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

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

        // 3. Create Companies (Requested Addition)
        $compCoke = Company::create(['name' => 'The Coca-Cola Company', 'country_code' => 'US']);
        $compMonster = Company::create(['name' => 'Monster Beverage Corporation', 'country_code' => 'US']);
        $compRedBull = Company::create(['name' => 'Red Bull GmbH', 'country_code' => 'AT']);

        // 4. Create Brands
        $brandCoke = Brand::create([
            'company_id' => $compCoke->id,
            'name' => 'Coca-Cola',
            'website_url' => 'https://www.coca-cola.com',
            'logo_path' => 'logos/brands/coca-cola.png'
        ]);
        $brandMonster = Brand::create([
            'company_id' => $compMonster->id,
            'name' => 'Monster Energy',
            'website_url' => 'https://www.monsterenergy.com',
            'logo_path' => 'logos/brands/monster.png'
        ]);
        $brandRedBull = Brand::create([
            'company_id' => $compRedBull->id,
            'name' => 'Red Bull',
            'website_url' => 'https://www.redbull.com',
            'logo_path' => 'logos/brands/redbull.png'
        ]);

        // 5. Create Manufacturers
        $mfgBall = Manufacturer::create(['name' => 'Ball Corporation', 'logo_path' => 'logos/manufacturers/ball.png']);
        $mfgRauch = Manufacturer::create(['name' => 'Rauch Fruchtsäfte', 'logo_path' => 'logos/manufacturers/rauch.png']);
        $mfgCcep = Manufacturer::create(['name' => 'Coca-Cola Europacific Partners', 'logo_path' => 'logos/manufacturers/ccep.png']);

        $allBeverages = [];

        // --- COCA-COLA (4 total) ---

        // Bev 1: Coke Classic (3 Languages: EN, ES, FR)
        $bev = Beverage::create([
            'brand_id' => $brandCoke->id,
            'name' => 'Classic',
            'lineup_flavor' => 'Classic',
            'country_code' => 'US',
            'sku' => 'CC-CLA-355-US',
            'barcode' => '049000028904',
            'volume' => '355',
            'release_date' => '1886-05-08',
        ]);
        $bev->translations()->create(['language_code' => 'en', 'ingredients' => 'Carbonated Water, Sugar...', 'is_original' => true]);
        $bev->translations()->create(['language_code' => 'es', 'ingredients' => 'Agua carbonatada, Azúcar...', 'is_original' => false]);
        $bev->translations()->create(['language_code' => 'fr', 'ingredients' => 'Eau gazéifiée, Sucre...', 'is_original' => false]);
        $bev->manufacturers()->attach($mfgCcep->id);
        $allBeverages[] = $bev->id;

        // Bev 2: Coke Zero (2 Languages: EN, PL)
        $bev = Beverage::create([
            'brand_id' => $brandCoke->id,
            'name' => 'Zero Sugar',
            'lineup_flavor' => 'Zero',
            'country_code' => 'PL',
            'sku' => 'CC-ZERO-330-PL',
            'barcode' => '5449000133335',
            'volume' => '330',
            'release_date' => '2005-06-01',
        ]);
        $bev->translations()->create(['language_code' => 'en', 'ingredients' => 'Water, Carbon Dioxide, Colour (E150d)...', 'is_original' => false]);
        $bev->translations()->create(['language_code' => 'pl', 'ingredients' => 'Woda, Dwutlenek Węgla, Barwnik (E150d)...', 'is_original' => true]);
        $bev->manufacturers()->attach($mfgCcep->id);
        $allBeverages[] = $bev->id;

        // Bev 3: Coke Cherry (English Only)
        $bev = Beverage::create([
            'brand_id' => $brandCoke->id,
            'name' => 'Cherry',
            'lineup_flavor' => 'Cherry',
            'country_code' => 'GB',
            'sku' => 'CC-CHER-500-GB',
            'barcode' => '5449000050205',
            'volume' => '500',
            'release_date' => '1985-02-01',
        ]);
        $bev->translations()->create(['language_code' => 'en', 'ingredients' => 'Carbonated Water, Sugar, Fruit juice from concentrate...', 'is_original' => true]);
        $allBeverages[] = $bev->id;

        // Bev 4: Coke Vanilla (English Only)
        $bev = Beverage::create([
            'brand_id' => $brandCoke->id,
            'name' => 'Vanilla',
            'lineup_flavor' => 'Vanilla',
            'country_code' => 'US',
            'sku' => 'CC-VAN-355-US',
            'barcode' => '049000045277',
            'volume' => '355',
            'release_date' => '2002-05-15',
        ]);
        $bev->translations()->create(['language_code' => 'en', 'ingredients' => 'Carbonated Water, High Fructose Corn Syrup...', 'is_original' => true]);
        $allBeverages[] = $bev->id;


        // --- MONSTER ENERGY (2 total) ---

        // Bev 5: Pipeline Punch (3 Languages: EN, JP, KO)
        $bev = Beverage::create([
            'brand_id' => $brandMonster->id,
            'name' => 'Pipeline Punch',
            'lineup_flavor' => 'Juice(d)/Punch',
            'country_code' => 'JP',
            'sku' => 'MON-PIPEL-355-JP',
            'barcode' => '4897036692134',
            'volume' => '355',
            'release_date' => '2019-03-01',
        ]);
        $bev->translations()->create(['language_code' => 'jp', 'ingredients' => '高麗人参根エキス...', 'is_original' => true]);
        $bev->translations()->create(['language_code' => 'en', 'ingredients' => 'Carbonated Water, Fruit Juices...', 'is_original' => false]);
        $bev->translations()->create(['language_code' => 'ko', 'ingredients' => '정제수, 설탕...', 'is_original' => false]);
        $bev->manufacturers()->attach($mfgBall->id);
        $allBeverages[] = $bev->id;

        // Bev 6: Ultra White (English Only)
        $bev = Beverage::create([
            'brand_id' => $brandMonster->id,
            'name' => 'Ultra Red',
            'lineup_flavor' => 'Ultra',
            'country_code' => 'US',
            'sku' => 'MON-UW-473-US',
            'barcode' => '070847022847',
            'volume' => '473',
            'release_date' => '2012-09-01',
        ]);
        $bev->translations()->create(['language_code' => 'en', 'ingredients' => 'Carbonated Water, Citric Acid...', 'is_original' => true]);
        $bev->manufacturers()->attach($mfgBall->id);
        $allBeverages[] = $bev->id;


        // --- RED BULL (1 total) ---

        // Bev 7: Red Bull Original (2 Languages: EN, DE)
        $bev = Beverage::create([
            'brand_id' => $brandRedBull->id,
            'name' => 'Original',
            'lineup_flavor' => 'Original',
            'country_code' => 'AT',
            'sku' => 'RB-ORIG-250-AT',
            'barcode' => '9002490100070',
            'volume' => '250',
            'release_date' => '1987-04-01',
        ]);
        $bev->translations()->create(['language_code' => 'de', 'ingredients' => 'Wasser, Saccharose, Glucose...', 'is_original' => true]);
        $bev->translations()->create(['language_code' => 'en', 'ingredients' => 'Water, Sucrose, Glucose...', 'is_original' => false]);
        $bev->manufacturers()->attach($mfgRauch->id);
        $allBeverages[] = $bev->id;


        // 8. Establish Connections
        // Add all items to Head Admin's collection
        $admin->collection()->attach($allBeverages, ['created_at' => now()]);

        // Social Connections
        $users[0]->following()->attach($admin->id);
        $admin->following()->attach($users[0]->id);
    }
}