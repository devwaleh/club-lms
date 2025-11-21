<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Assignment;
use App\Models\Classroom;
use Illuminate\Http\Request;

class AssignmentController extends Controller
{
    public function index(Classroom $classroom)
    {
        return response()->json(
            $classroom->assignments()->orderBy('created_at', 'desc')->get()
        );
    }

    public function store(Request $request, Classroom $classroom)
    {
        $data = $request->validate([
            'lesson_id' => 'nullable|exists:lessons,id',
            'title' => 'required|string',
            'instructions' => 'nullable|string',
            'due_at' => 'nullable|date',
            'max_score' => 'integer',
            'allow_file_upload' => 'boolean',
            'allow_text_answer' => 'boolean'
        ]);

        $data['classroom_id'] = $classroom->id;

        $assignment = Assignment::create($data);

        return response()->json($assignment, 201);
    }

    public function show(Assignment $assignment)
    {
        return response()->json(
            $assignment->load('submissions', 'lesson')
        );
    }

    public function update(Request $request, Assignment $assignment)
    {
        $data = $request->validate([
            'title' => 'string',
            'instructions' => 'nullable|string',
            'due_at' => 'nullable|date',
            'max_score' => 'integer',
            'allow_file_upload' => 'boolean',
            'allow_text_answer' => 'boolean'
        ]);

        $assignment->update($data);

        return response()->json($assignment);
    }

    public function destroy(Assignment $assignment)
    {
        $assignment->delete();

        return response()->json(['message' => 'Assignment deleted']);
    }
}
