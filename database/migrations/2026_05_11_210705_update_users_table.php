<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
{
    Schema::table('users', function (Blueprint $table) {
        $table->string('username')->unique()->after('name');
        $table->string('role')->default('user'); // user, admin, head_admin
        $table->text('bio')->nullable();
        $table->jsonb('social_links')->nullable();
        $table->boolean('is_private')->default(false);
    });
}

    /**
     * Reverse the migrations.
     */
    public function down(): void
{
    Schema::table('users', function (Blueprint $table) {
        // This removes the columns if we rollback
        $table->dropColumn(['username', 'role', 'bio', 'social_links', 'is_private']);
        // $table->dropColumn('profile_photo_path'); // Uncomment if using Method A
    });
}
};
