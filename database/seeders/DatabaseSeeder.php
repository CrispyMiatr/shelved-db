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

        // 3. Create Companies
        $compCoke = Company::create(['name' => 'The Coca-Cola Company', 'country_code' => 'US']);
        $compMonster = Company::create(['name' => 'Monster Beverage Corporation', 'country_code' => 'US']);
        $compRedBull = Company::create(['name' => 'Red Bull GmbH', 'country_code' => 'AT']);

        // 4. Create Brands
        $brandCoke = Brand::create(['company_id' => $compCoke->id, 'name' => 'Coca-Cola', 'website_url' => 'https://www.coca-cola.com', 'logo_path' => 'logos/brands/coca-cola.png']);
        $brandMonster = Brand::create(['company_id' => $compMonster->id, 'name' => 'Monster Energy', 'website_url' => 'https://www.monsterenergy.com', 'logo_path' => 'logos/brands/monster.png']);
        $brandRedBull = Brand::create(['company_id' => $compRedBull->id, 'name' => 'Red Bull', 'website_url' => 'https://www.redbull.com', 'logo_path' => 'logos/brands/redbull.png']);

        // 5. Create Manufacturers
        $mfgBall = Manufacturer::create([
            'name' => 'Ball Corporation',
            'abbreviation' => 'Ball',
            'website_url' => 'https://www.ball.com',
            'logo_path' => '/assets/logos/Ball-Corporation.svg'
        ]);
        $mfgAg = Manufacturer::create([
            'name' => 'Ardagh Group',
            'abbreviation' => 'AG',
            'website_url' => 'https://www.ardaghgroup.com/',
            'logo_path' => '/assets/logos/Ardagh-Group.png'
        ]);
        $mfgREX = Manufacturer::create([
            'name' => 'Rexam',
            'abbreviation' => 'Rexam',
            'website_url' => 'https://www.ball.com/',
            'logo_path' => '/assets/logos/Rexam.svg'
        ]);

        // Shared Data Strings
        $energyWarning = "High caffeine content. Not recommended for children or pregnant or breast-feeding women. Consume in moderate amounts. Not recommended for people sensitive to caffeine. High sugar content may contribute to tooth decay and weight gain if consumed excessively. Consult a physician if you have heart conditions.";

        $cokeIngredients = "Carbonated Water, High Fructose Corn Syrup, Caramel Color, Phosphoric Acid, Natural Flavors, Caffeine. Contains no artificial preservatives. Store in a cool, dry place away from direct sunlight.";
        $monsterIngredients = "Carbonated Water, Sugar, Glucose, Citric Acid, Natural Flavors, Taurine, Sodium Citrate, Color Added, Panax Ginseng Root Extract, L-Carnitine L-Tartrate, Caffeine, Sorbic Acid, Benzoic Acid, Niacinamide (Vit. B3), Sodium Chloride, Glycine, Glucuronolactone, Guarana Seed Extract, Inositol, Pyridoxine Hydrochloride (Vit. B6), Riboflavin (Vit. B2), Maltodextrin, Cyanocobalamin (Vit. B12).";
        $redBullIngredients = "Water, Sucrose, Glucose, Citric Acid, Carbon Dioxide, Taurine (0.4%), Acidity Regulator (Sodium Carbonates, Magnesium Carbonates), Caffeine (0.03%), Vitamins (Niacin, Pantothenic Acid, B6, B12), Flavorings, Colors (Plain Caramel, Riboflavins).";

        $allBeverages = [];

        // --- COCA-COLA (4 total) ---

        // 1. Coke Classic (3 Languages: EN, ES, FR)
        $bev = Beverage::create([
            'brand_id' => $brandCoke->id,
            'name' => 'Classic',
            'lineup_flavor' => 'Cola',
            'country_code' => 'US',
            'sku' => 'CC-CLA-355-US',
            'barcode' => '049000028904',
            'volume' => '355',
            'release_date' => '1886-05-08',
            'nutrition_100ml' => ['energy_kj' => 180, 'energy_kcal' => 42, 'fat' => 0, 'carbohydrates' => 10.6, 'sugars' => 10.6, 'protein' => 0, 'salt' => 0.01],
            'nutrition_500ml' => ['energy_kj' => 900, 'energy_kcal' => 210, 'fat' => 0, 'carbohydrates' => 53, 'sugars' => 53, 'protein' => 0, 'salt' => 0.05],
        ]);
        $bev->translations()->create(['language_code' => 'en', 'ingredients' => $cokeIngredients, 'warning_text' => 'Contains caffeine.', 'is_original' => true]);
        $bev->translations()->create(['language_code' => 'es', 'ingredients' => 'Agua carbonatada, jarabe de maíz de alta fructosa...', 'warning_text' => 'Contiene cafeína.', 'is_original' => false]);
        $bev->translations()->create(['language_code' => 'fr', 'ingredients' => 'Eau gazéifiée, sirop de maïs à haute teneur en fructose...', 'warning_text' => 'Contient de la caféine.', 'is_original' => false]);
        $bev->manufacturers()->attach($mfgREX->id);
        $allBeverages[] = $bev->id;

        // 2. Coke Zero (2 Languages: EN, PL)
        $bev = Beverage::create([
            'brand_id' => $brandCoke->id,
            'name' => 'Zero Sugar',
            'lineup_flavor' => 'Zero',
            'country_code' => 'PL',
            'sku' => 'CC-ZERO-330-PL',
            'barcode' => '5449000133335',
            'volume' => '330',
            'release_date' => '2005-06-01',
            'nutrition_100ml' => ['energy_kj' => 0.8, 'energy_kcal' => 0.2, 'fat' => 0, 'carbohydrates' => 0, 'sugars' => 0, 'protein' => 0, 'salt' => 0.02],
            'nutrition_500ml' => ['energy_kj' => 4, 'energy_kcal' => 1, 'fat' => 0, 'carbohydrates' => 0, 'sugars' => 0, 'protein' => 0, 'salt' => 0.1],
        ]);
        $bev->translations()->create(['language_code' => 'en', 'ingredients' => 'Water, Carbon Dioxide, Colour (E150d), Sweeteners (Aspartame, Acesulfame K), Natural Flavorings Including Caffeine, Acidity Regulator (Sodium Citrates).', 'warning_text' => 'Contains a source of phenylalanine.', 'is_original' => false]);
        $bev->translations()->create(['language_code' => 'pl', 'ingredients' => 'Woda, Dwutlenek Węgla, Barwnik (E150d), Kwas (Kwas Fosforowy), Substancje Słodzące (Aspartam, Acesulfam K), Naturalne Aromaty, Aromat Kofeiny, Regulator Kwasowości (Cytryniany Sodu).', 'warning_text' => 'Zawiera źródło fenyloalaniny.', 'is_original' => true]);
        $bev->manufacturers()->attach($mfgREX->id);
        $allBeverages[] = $bev->id;

        // 3. Coke Cherry (EN)
        $bev = Beverage::create([
            'brand_id' => $brandCoke->id,
            'name' => 'Cherry',
            'lineup_flavor' => 'Fruit',
            'country_code' => 'GB',
            'sku' => 'CC-CHER-500-GB',
            'barcode' => '5449000050205',
            'volume' => '500',
            'release_date' => '1985-02-01',
            'nutrition_100ml' => ['energy_kj' => 190, 'energy_kcal' => 45, 'fat' => 0, 'carbohydrates' => 11.2, 'sugars' => 11.2, 'protein' => 0, 'salt' => 0.01],
            'nutrition_500ml' => ['energy_kj' => 950, 'energy_kcal' => 225, 'fat' => 0, 'carbohydrates' => 56, 'sugars' => 56, 'protein' => 0, 'salt' => 0.05],
        ]);
        $bev->translations()->create(['language_code' => 'en', 'ingredients' => 'Carbonated Water, Sugar, Color (Caramel E150d), Acid (Phosphoric Acid), Natural Flavorings Including Caffeine.', 'is_original' => true]);
        $allBeverages[] = $bev->id;

        // 4. Coke Vanilla (EN)
        $bev = Beverage::create([
            'brand_id' => $brandCoke->id,
            'name' => 'Vanilla',
            'lineup_flavor' => 'Fruit',
            'country_code' => 'US',
            'sku' => 'CC-VAN-355-US',
            'barcode' => '049000045277',
            'volume' => '355',
            'release_date' => '2002-05-15',
            'nutrition_100ml' => ['energy_kj' => 185, 'energy_kcal' => 44, 'fat' => 0, 'carbohydrates' => 11, 'sugars' => 11, 'protein' => 0, 'salt' => 0.01],
            'nutrition_500ml' => ['energy_kj' => 925, 'energy_kcal' => 220, 'fat' => 0, 'carbohydrates' => 55, 'sugars' => 55, 'protein' => 0, 'salt' => 0.05],
        ]);
        $bev->translations()->create(['language_code' => 'en', 'ingredients' => 'Carbonated Water, High Fructose Corn Syrup, Caramel Color, Phosphoric Acid, Natural Flavors, Caffeine.', 'is_original' => true]);
        $allBeverages[] = $bev->id;


        // --- MONSTER ENERGY (2 total) ---

        // 5. Pipeline Punch (3 Languages: EN, JP, KO)
        $bev = Beverage::create([
            'brand_id' => $brandMonster->id,
            'name' => 'Pipeline Punch',
            'lineup_flavor' => 'Juice',
            'country_code' => 'JP',
            'sku' => 'MON-PIPEL-355-JP',
            'barcode' => '4897036692134',
            'volume' => '355',
            'release_date' => '2019-03-01',
            'nutrition_100ml' => ['energy_kj' => 185, 'energy_kcal' => 44, 'fat' => 0, 'carbohydrates' => 10, 'sugars' => 10, 'protein' => 0, 'salt' => 0.06, 'caffeine' => 40],
            'nutrition_500ml' => ['energy_kj' => 925, 'energy_kcal' => 220, 'fat' => 0, 'carbohydrates' => 50, 'sugars' => 50, 'protein' => 0, 'salt' => 0.3, 'caffeine' => 200],
        ]);
        $bev->translations()->create(['language_code' => 'jp', 'ingredients' => '高麗人参根エキス, 果汁, 砂糖...', 'warning_text' => $energyWarning, 'is_original' => true]);
        $bev->translations()->create(['language_code' => 'en', 'ingredients' => $monsterIngredients, 'warning_text' => $energyWarning, 'is_original' => false]);
        $bev->translations()->create(['language_code' => 'ko', 'ingredients' => '정제수, 설탕, 포도당, 구연산...', 'warning_text' => $energyWarning, 'is_original' => false]);
        $bev->manufacturers()->attach($mfgBall->id);
        $allBeverages[] = $bev->id;

        // 6. Ultra Red (EN)
        $bev = Beverage::create([
            'brand_id' => $brandMonster->id,
            'name' => 'Ultra Red',
            'lineup_flavor' => 'Ultra',
            'country_code' => 'US',
            'sku' => 'MON-UR-473-US',
            'barcode' => '070847022847',
            'volume' => '473',
            'release_date' => '2012-09-01',
            'nutrition_100ml' => ['energy_kj' => 12, 'energy_kcal' => 3, 'fat' => 0, 'carbohydrates' => 0.9, 'sugars' => 0, 'protein' => 0, 'salt' => 0.19, 'caffeine' => 32],
            'nutrition_500ml' => ['energy_kj' => 60, 'energy_kcal' => 15, 'fat' => 0, 'carbohydrates' => 4.5, 'sugars' => 0, 'protein' => 0, 'salt' => 0.95, 'caffeine' => 160],
        ]);
        $bev->translations()->create(['language_code' => 'en', 'ingredients' => 'Carbonated Water, Acid (Citric Acid), Taurine (0.4%), Acidity Regulator (Sodium Citrate), Panax Ginseng Root Extract, Sweeteners (Sucralose, Acesulfame K), Caffeine, Vitamins (B3, B5, B6, B12).', 'warning_text' => $energyWarning, 'is_original' => true]);
        $bev->manufacturers()->attach($mfgBall->id);
        $allBeverages[] = $bev->id;


        // --- RED BULL (1 total) ---

        // 7. Original (2 Languages: EN, DE)
        $bev = Beverage::create([
            'brand_id' => $brandRedBull->id,
            'name' => 'Energy Drink',
            'lineup_flavor' => 'Original',
            'country_code' => 'AT',
            'sku' => 'RB-ORIG-250-AT',
            'barcode' => '9002490100070',
            'volume' => '250',
            'release_date' => '1987-04-01',
            'nutrition_100ml' => ['energy_kj' => 194, 'energy_kcal' => 45, 'fat' => 0, 'carbohydrates' => 11, 'sugars' => 11, 'protein' => 0, 'salt' => 0.1, 'caffeine' => 32],
            'nutrition_500ml' => ['energy_kj' => 970, 'energy_kcal' => 225, 'fat' => 0, 'carbohydrates' => 55, 'sugars' => 55, 'protein' => 0, 'salt' => 0.5, 'caffeine' => 160],
        ]);
        $bev->translations()->create(['language_code' => 'de', 'ingredients' => 'Wasser, Saccharose, Glucose, Säuerungsmittel (Citronensäure), Kohlensäure, Taurin (0,4%), Säureregulatoren (Natriumcarbonate, Magnesiumcarbonate), Koffein (0,03%), Vitamine (Niacin, Pantothensäure, B6, B12), Aromen, Farbstoffe (Zuckerkulör, Riboflavine).', 'warning_text' => $energyWarning, 'is_original' => true]);
        $bev->translations()->create(['language_code' => 'en', 'ingredients' => $redBullIngredients, 'warning_text' => $energyWarning, 'is_original' => false]);
        $bev->manufacturers()->attach($mfgAg->id);
        $allBeverages[] = $bev->id;


        // 8. Finalize
        $admin->collection()->attach($allBeverages, ['created_at' => now()]);
        $users[0]->following()->attach($admin->id);
        $admin->following()->attach($users[0]->id);
    }
}