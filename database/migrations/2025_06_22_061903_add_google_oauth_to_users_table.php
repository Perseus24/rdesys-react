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
            $table->string('google_id')->nullable()->unique()->after('id');
            $table->string('picture')->nullable()->after('email');
            $table->string('user_division')->nullable()->after('picture');

            $table->enum('status', ['active', 'inactive', 'pending'])->default('active')->after('user_division');
            // Add indexes for performance
            $table->index('google_id');
            $table->index(['status', 'created_at']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropIndex(['users_google_id_index']);
            $table->dropIndex(['users_status_created_at_index']);

            $table->dropColumn('google_id');
            $table->dropColumn('picture');
            $table->dropColumn('user_division');
            $table->dropColumn('status');
        });
    }
};
