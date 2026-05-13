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
        Schema::table('users', function (Blueprint $table) {
            // username is likely already indexed due to unique(), 
            // but adding it here is "safe" (Laravel will just skip it or merge it)
            $table->index('name');
            $table->index('username');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            // When dropping indexes, Laravel uses the convention: table_column_index
            $table->dropIndex(['name']);
            $table->dropIndex(['username']);
        });
    }
};
