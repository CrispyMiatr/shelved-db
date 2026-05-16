<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        // 1. Add nutrition storage to beverages
        Schema::table('beverages', function (Blueprint $table) {
            $table->jsonb('nutrition_100ml')->nullable();
            $table->jsonb('nutrition_500ml')->nullable();
        });

        // 2. Create translations table for multilingual support
        Schema::create('beverage_translations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('beverage_id')->constrained()->onDelete('cascade');
            $table->string('language_code', 2); // 'en', 'jp', 'hu'
            $table->text('ingredients');
            $table->text('warning_text')->nullable();
            $table->boolean('is_original')->default(false);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('beverage_translations');
        Schema::table('beverages', function (Blueprint $table) {
            $table->dropColumn(['nutrition_100ml', 'nutrition_500ml']);
        });
    }
};
