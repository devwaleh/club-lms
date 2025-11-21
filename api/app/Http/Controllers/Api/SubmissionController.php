<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Submission;
use App\Models\Assignment;
use Illuminate\Http\Request;

class SubmissionController extends Controller
{
    public function index(Assignment $assignment)
    {
        return response()->json(
            $assignment->submissions()->with('student')->get()
        );
    }

    public function store(Request $request, Assignment $assignment)
    {
        $data = $request->validate([
            'text_answer' => 'nullable|string',
            'file' => 'nullable|file|max:4096'
        ]);

        $user = $request->user();

        $payload = [
            'assignment_id' => $assignment->id,
            'user_id' => $user->id,
            'text_answer' => $data['text_answer'] ?? null,
            'submitted_at' => now()
        ];

        if ($request->hasFile('file')) {
            $payload['file_path'] = $request->file('file')->store('submissions', 'public');
        }

        $submission = Submission::updateOrCreate(
            ['assignment_id' => $assignment->id, 'user_id' => $user->id],
            $payload
        );

        return response()->json($submission, 201);
    }

    public function show(Submission $submission)
    {
        return response()->json($submission->load('student'));
    }

    public function update(Request $request, Submission $submission)
    {
        // grading
        $data = $request->validate([
            'score' => 'numeric|nullable',
            'feedback' => 'nullable|string'
        ]);

        $data['graded_at'] = now();

        $submission->update($data);

        return response()->json($submission);
    }
}
