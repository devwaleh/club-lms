<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Lesson extends Model
{
    use HasFactory;

    protected $fillable = [
        'classroom_id',
        'title',
        'content',
        'video_url',
        'position',
        'published_at',
    ];

    protected $casts = [
        'published_at' => 'datetime',
    ];

    public function classroom()
    {
        return $this->belongsTo(Classroom::class);
    }

    public function assignments()
    {
        return $this->hasMany(Assignment::class);
    }
}
