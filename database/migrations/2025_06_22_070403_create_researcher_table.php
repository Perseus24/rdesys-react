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
        Schema::create('researcher', function (Blueprint $table) {
            $table->id();

            $table->foreignId('user_id')
                ->constrained('users')
                ->onDelete('cascade');

            $table->foreignId('college_id')
                ->constrained('college')
                ->onDelete('restrict');

            $table->string('researcher_last_name');
            $table->string('researcher_first_name');
            $table->string('researcher_middle_name')->nullable();
            $table->string('researcher_affix')->nullable();
            $table->boolean('is_affiliated_with_BUGS')->default(false);
            $table->boolean('has_research')->default(false);
            $table->boolean('is_teaching_staff')->default(false);
            $table->string('email')->nullable();


            // Indexes for performance
            $table->unique('user_id'); 
            $table->index('college_id');
            $table->index('email');
            
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('researcher');
    }
};
