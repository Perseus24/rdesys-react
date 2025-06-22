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
        Schema::create('user_encryption_keys', function (Blueprint $table) {
            $table->id();

            $table->foreignId('user_id')
                ->constrained('users')
                ->onDelete('cascade');

            $table->text('encrypted_private_key');
            $table->string('iv');
            $table->text('rsa_public_key'); 

            // created at, updated at
            $table->timestamps();

            // Indexes for performance
            $table->unique('user_id'); // Each user should have only one key pair
            $table->index('created_at'); // For querying by creation date
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_encryption_keys');
    }
};
