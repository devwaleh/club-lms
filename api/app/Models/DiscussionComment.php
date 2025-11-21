<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class DiscussionComment extends Model
{
    use HasFactory;

    protected $fillable = [
        'thread_id',
        'user_id',
        'body',
    ];

    public function thread()
    {
        return $this->belongsTo(DiscussionThread::class, 'thread_id');
    }

    public function author()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
