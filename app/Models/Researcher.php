<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Researcher extends Model
{
    use HasFactory;
    protected $table = 'researcher';
    protected $fillable = [
        'user_id',
        'college_id',
        'researcher_last_name',
        'researcher_first_name',
        'researcher_middle_name',
        'researcher_affix',
        'is_affiliated_with_BUGS',
        'has_research',
        'is_teaching_staff',
        'email',
    ];

    // Relationships

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function college()
    {
        return $this->belongsTo(College::class);
    }
}
