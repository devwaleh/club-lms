<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Announcement;
use App\Models\Classroom;
use Illuminate\Http\Request;

class AnnouncementController extends Controller
{
    public function index(Classroom $classroom)
    {
        return response()->json(
            $classroom->announcements()->orderBy('created_at', 'desc')->get()
        );
    }

    public function store(Request $request, Classroom $classroom)
    {
        $data = $request->validate([
            'title' => 'required|string',
            'body' => 'required|string',
            'pinned' => 'boolean'
        ]);

        $data['classroom_id'] = $classroom->id;
        $data['user_id'] = $request->user()->id;

        $announcement = Announcement::create($data);

        return response()->json($announcement, 201);
    }

    public function update(Request $request, Announcement $announcement)
    {
        $data = $request->validate([
            'title' => 'string',
            'body' => 'nullable|string',
            'pinned' => 'boolean'
        ]);

        $announcement->update($data);

        return response()->json($announcement);
    }

    public function destroy(Announcement $announcement)
    {
        $announcement->delete();

        return response()->json(['message' => 'Announcement deleted']);
    }
}
