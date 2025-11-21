<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Classroom extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'cover_image',
        'invite_code',
        'is_public',
        'created_by',
    ];

    protected static function booted(): void
    {
        static::creating(function (Classroom $classroom) {
            if (empty($classroom->invite_code)) {
                $classroom->invite_code = strtoupper(str()->random(8));
            }
        });
    }

    public function owner()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function members()
    {
        return $this->belongsToMany(User::class)
            ->withPivot(['role', 'status'])
            ->withTimestamps();
    }

    public function lessons()
    {
        return $this->hasMany(Lesson::class);
    }

    public function assignments()
    {
        return $this->hasMany(Assignment::class);
    }

    public function announcements()
    {
        return $this->hasMany(Announcement::class);
    }

    public function threads()
    {
        return $this->hasMany(DiscussionThread::class);
    }
}
