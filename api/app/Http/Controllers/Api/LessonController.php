<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Lesson;
use App\Models\Classroom;
use Illuminate\Http\Request;

class LessonController extends Controller
{
    public function index(Classroom $classroom)
    {
        return response()->json(
            $classroom->lessons()->orderBy('position')->get()
        );
    }

    public function store(Request $request, Classroom $classroom)
    {
        $data = $request->validate([
            'title' => 'required|string',
            'content' => 'nullable|string',
            'video_url' => 'nullable|string',
            'position' => 'integer',
            'published_at' => 'nullable|date'
        ]);

        $data['classroom_id'] = $classroom->id;

        $lesson = Lesson::create($data);

        return response()->json($lesson, 201);
    }

    public function show(Lesson $lesson)
    {
        return response()->json($lesson->load('assignments'));
    }

    public function update(Request $request, Lesson $lesson)
    {
        $data = $request->validate([
            'title' => 'string',
            'content' => 'nullable|string',
            'video_url' => 'nullable|string',
            'position' => 'integer',
            'published_at' => 'nullable|date'
        ]);

        $lesson->update($data);

        return response()->json($lesson);
    }

    public function destroy(Lesson $lesson)
    {
        $lesson->delete();

        return response()->json(['message' => 'Lesson deleted']);
    }
}
