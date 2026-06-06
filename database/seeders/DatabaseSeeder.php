<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Brand;
use App\Models\Company;
use App\Models\Manufacturer;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    public function run(): void
    {
        $admin = User::factory()->create([
            'name' => 'Head Admin',
            'username' => 'head.admin',
            'email' => 'admin@shelved.com',
            'password' => Hash::make('password123'),
            'role' => 'head_admin',
        ]);

        $users = User::factory(5)->create();

        $compCoke = Company::create(['name' => 'The Coca-Cola Company', 'country_code' => 'US']);
        $compMonster = Company::create(['name' => 'Monster Beverage Corporation', 'country_code' => 'US']);
        $compTiger = Company::create(['name' => 'Maspex', 'country_code' => 'PL']);

        Brand::create(['company_id' => $compCoke->id, 'name' => 'Coca-Cola']);
        Brand::create(['company_id' => $compCoke->id, 'name' => 'Fanta']);
        Brand::create(['company_id' => $compMonster->id, 'name' => 'Monster Energy']);
        Brand::create(['company_id' => $compTiger->id, 'name' => 'Tiger']);

        $manus = [
            ['name' => 'Ball Corporation', 'abbreviation' => 'Ball'],
            ['name' => 'Ardagh Group', 'abbreviation' => 'AG'],
            ['name' => 'Crown Holdings', 'abbreviation' => 'Crown'],
            ['name' => 'Can Pack', 'abbreviation' => 'CP'],
        ];

        foreach ($manus as $manu) {
            Manufacturer::create($manu);
        }

        if ($users->count() > 0) {
            $users[0]->following()->attach($admin->id);
            $admin->following()->attach($users[0]->id);
        }
    }
}

// // 3. Create Major Companies
// $compCoke = Company::create([
//     'name' => 'The Coca-Cola Company',
//     'country_code' => 'US'
// ]);
// $compMonster = Company::create([
//     'name' => 'Monster Beverage Corporation',
//     'country_code' => 'US'
// ]);
// $compTiger = Company::create([
//     'name' => 'Maspex',
//     'country_code' => 'PL'
// ]);

// // 4. Create Iconic Brands
// Brand::create([
//     'company_id' => $compCoke->id,
//     'name' => 'Coca-Cola',
//     'website_url' => 'https://www.coca-cola.com',
//     'logo_path' => '/assets/logos/brand/coca-cola.png'
// ]);
// Brand::create([
//     'company_id' => $compCoke->id,
//     'name' => 'Fanta',
//     'website_url' => 'https://www.coca-cola.com/us/en/brands/fanta',
//     'logo_path' => '/assets/logos/brand/fanta.png'
// ]);
// Brand::create([
//     'company_id' => $compMonster->id,
//     'name' => 'Monster Energy',
//     'website_url' => 'https://www.monsterenergy.com',
//     'logo_path' => '/assets/logos/brand/monster-energy.png'
// ]);
// Brand::create([
//     'company_id' => $compTiger->id,
//     'name' => 'Tiger',
//     'website_url' => 'https://tigerpower.pl/',
//     'logo_path' => '/assets/logos/brand/tiger.png'
// ]);

// // 5. Create Packaging Manufacturers
// Manufacturer::create([
//     'name' => 'Ball Corporation',
//     'abbreviation' => 'Ball',
//     'website_url' => 'https://www.ball.com',
//     'logo_path' => '/assets/logos/manu/ball-corporation.svg'
// ]);
// Manufacturer::create([
//     'name' => 'Ardagh Group',
//     'abbreviation' => 'AG',
//     'website_url' => 'https://www.ardaghgroup.com/',
//     'logo_path' => '/assets/logos/manu/ardagh-group.png'
// ]);
// Manufacturer::create([
//     'name' => 'Ardagh Metal Packaging',
//     'abbreviation' => 'AG',
//     'website_url' => 'https://www.ardaghmetalpackaging.com/',
//     'logo_path' => '/assets/logos/manu/ardagh-metal-packaging.svg'
// ]);
// Manufacturer::create([
//     'name' => 'Rexam',
//     'abbreviation' => 'Rexam',
//     'website_url' => 'https://www.ball.com/',
//     'logo_path' => '/assets/logos/manu/rexam.svg'
// ]);
// Manufacturer::create([
//     'name' => 'Crown Holdings',
//     'abbreviation' => 'Crown',
//     'website_url' => 'https://www.crowncork.com/',
//     'logo_path' => '/assets/logos/manu/crown-holdings.svg'
// ]);
// Manufacturer::create([
//     'name' => 'Can Pack',
//     'abbreviation' => 'CP',
//     'website_url' => 'https://www.canpack.com/',
//     'logo_path' => '/assets/logos/manu/can-pack.svg'
// ]);
// Manufacturer::create([
//     'name' => 'BAGPAK',
//     'abbreviation' => 'BP',
//     'website_url' => 'https://bagpak.pl/',
//     'logo_path' => '/assets/logos/manu/bagpak.png'
// ]);
// Manufacturer::create([
//     'name' => 'Altemira Can Company',
//     'abbreviation' => 'ACC',
//     'website_url' => 'https://www.altemiracan.co.jp/',
//     'logo_path' => '/assets/logos/manu/altemira-can-company.png'
// ]);
// Manufacturer::create([
//     'name' => 'GZ Industries',
//     'abbreviation' => 'GZI',
//     'website_url' => 'https://www.gzican.com/',
//     'logo_path' => '/assets/logos/manu/gzi.png'
// ]);