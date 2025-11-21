<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\DiscussionThread;
use App\Models\Classroom;
use Illuminate\Http\Request;

class DiscussionThreadController extends Controller
{
    public function index(Classroom $classroom)
    {
        return response()->json(
            $classroom->threads()->with('author')->orderBy('created_at', 'desc')->get()
        );
    }

    public function store(Request $request, Classroom $classroom)
    {
        $data = $request->validate([
            'title' => 'required|string',
            'body' => 'required|string'
        ]);

        $data['classroom_id'] = $classroom->id;
        $data['user_id'] = $request->user()->id;

        $thread = DiscussionThread::create($data);

        return response()->json($thread, 201);
    }

    public function show(DiscussionThread $thread)
    {
        return response()->json(
            $thread->load('author', 'comments')
        );
    }
}
