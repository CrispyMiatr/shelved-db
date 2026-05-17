<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::table('beverages', function (Blueprint $table) {
            // used in 'orderBy' and 'where' clauses
            $table->index('country_code');
            $table->index('release_date');
            $table->index('volume');
            $table->index('lineup_flavor');
            $table->index('brand_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down()
    {
        Schema::table('beverages', function (Blueprint $table) {
            $table->dropIndex(['country_code']);
            $table->dropIndex(['release_date']);
            $table->dropIndex(['volume']);
            $table->dropIndex(['lineup_flavor']);
            $table->dropIndex(['brand_id']);
        });
    }
};
