<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Assignment extends Model
{
    use HasFactory;

    protected $fillable = [
        'classroom_id',
        'lesson_id',
        'title',
        'instructions',
        'due_at',
        'max_score',
        'allow_file_upload',
        'allow_text_answer',
    ];

    protected $casts = [
        'due_at' => 'datetime',
        'allow_file_upload' => 'boolean',
        'allow_text_answer' => 'boolean',
    ];

    public function classroom()
    {
        return $this->belongsTo(Classroom::class);
    }

    public function lesson()
    {
        return $this->belongsTo(Lesson::class);
    }

    public function submissions()
    {
        return $this->hasMany(Submission::class);
    }
}
