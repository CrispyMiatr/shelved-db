<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('brands', function (Blueprint $table) {
            $table->id();
            $table->string('name')->index();
            $table->string('website_url')->nullable();
            $table->string('logo_path')->nullable();
            $table->timestamps();
        });

        Schema::create('manufacturers', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('logo_path')->nullable();
            $table->timestamps();
        });

        Schema::create('beverages', function (Blueprint $table) {
            $table->id();
            $table->foreignId('brand_id')->constrained();
            $table->string('name')->index();
            $table->string('lineup_flavor')->nullable();
            $table->string('country_code', 2); // ISO codes
            $table->string('sku')->nullable();
            $table->string('barcode')->nullable();
            $table->string('volume')->nullable();
            $table->date('release_date')->nullable();
            $table->timestamps();
        });

        Schema::create('beverage_manufacturer', function (Blueprint $table) {
            $table->id();
            $table->foreignId('beverage_id')->constrained()->onDelete('cascade');
            $table->foreignId('manufacturer_id')->constrained()->onDelete('cascade');
        });

        Schema::create('beverage_user', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('beverage_id')->constrained()->onDelete('cascade');
            $table->timestamps();
        });

        Schema::create('follows', function (Blueprint $table) {
            $table->id();
            $table->foreignId('follower_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('following_id')->constrained('users')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Drop pivot tables first -> depend on other tables
        Schema::dropIfExists('follows');
        Schema::dropIfExists('beverage_user');
        Schema::dropIfExists('beverage_manufacturer');

        // Drop table that depends on brands
        Schema::dropIfExists('beverages');

        // Drop independent tables last
        Schema::dropIfExists('manufacturers');
        Schema::dropIfExists('brands');
    }
};