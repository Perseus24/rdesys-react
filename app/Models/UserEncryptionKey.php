<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserEncryptionKey extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'encrypted_private_key',
        'iv',
        'rsa_public_key',
    ];

    // Relationship to User model
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
