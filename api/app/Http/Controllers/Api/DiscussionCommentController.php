<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\DiscussionComment;
use App\Models\DiscussionThread;
use Illuminate\Http\Request;

class DiscussionCommentController extends Controller
{
    public function store(Request $request, DiscussionThread $thread)
    {
        $data = $request->validate([
            'body' => 'required|string'
        ]);

        $comment = DiscussionComment::create([
            'thread_id' => $thread->id,
            'user_id' => $request->user()->id,
            'body' => $data['body']
        ]);

        return response()->json($comment, 201);
    }
}
