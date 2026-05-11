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

        // 2. Create a few random users
        $users = User::factory(10)->create();

        // 3. Create a Brand
        $brand = Brand::create([
            'name' => 'Monster Energy',
            'website_url' => 'https://www.monsterenergy.com',
        ]);

        // 4. Create a Manufacturer
        $manufacturer = Manufacturer::create([
            'name' => 'Ball Corporation',
            'logo_path' => 'logos/ball_corp.png'
        ]);

        // 5. Create a Beverage with Nutrition JSONB
        $beverage = Beverage::create([
            'brand_id' => $brand->id,
            'name' => 'Punch Pipeline Punch',
            'country_code' => 'JP',
            'volume' => '355mL',
            'barcode' => '4897036692134',
            'release_date' => '2019-03-01',
            // Detailed nutrition for 100ml
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
            ],
            // Scale automatically for 500ml (example data)
            'nutrition_500ml' => [
                'energy_kj' => 925,
                'energy_kcal' => 220,
                'fat' => 0,
                'fat_saturated' => 0,
                'carbohydrates' => 50,
                'sugars' => 50,
                'protein' => 0,
                'salt' => 0.3,
                'vitamin_b2' => 3.5,
                'vitamin_b3' => 42.5,
                'vitamin_b6' => 4.0,
                'vitamin_b12' => 12.5,
                'caffeine' => 200,
                'taurine' => 625,
            ]
        ]);

        // 6. Create Translations for the Beverage
        // Original (Japanese)
        $beverage->translations()->create([
            'language_code' => 'jp',
            'ingredients' => '高麗人参根エキス、L-カルニチンL-酒石酸塩、塩化ナトリウム、ガラナ種子エキス...',
            'warning_text' => 'お子様、妊娠中の方、またはカフェインに敏感な方にはお勧めしません。',
            'is_original' => true,
        ]);

        // English Translation (What users see by default)
        $beverage->translations()->create([
            'language_code' => 'en',
            'ingredients' => 'Carbonated Water, Sugar, Fruit Juices, Glucose, Ginseng Root Extract, L-Carnitine, Caffeine, Guarana...',
            'warning_text' => 'Not recommended for children, people sensitive to caffeine, pregnant women or women who are nursing.',
            'is_original' => false,
        ]);

        // 7. Establish Connections
        
        // Link Manufacturer to Beverage
        $beverage->manufacturers()->attach($manufacturer->id);

        // Add drink to Head Admin's and the first user's collection
        $admin->collection()->attach($beverage->id, ['created_at' => now()]);
        $users[0]->collection()->attach($beverage->id, ['created_at' => now()]);
        
        // Follow system test
        $users[0]->following()->attach($admin->id); // User follows Admin
        $admin->following()->attach($users[0]->id); // Admin follows User back (Mutual)
    }
}