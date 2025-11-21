<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Classroom;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ClassroomController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();

        $classrooms = Classroom::with('owner')
            ->whereHas('members', fn ($q) => $q->where('user_id', $user->id))
            ->orWhere('created_by', $user->id)
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json($classrooms);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'is_public' => ['boolean'],
        ]);

        $data['created_by'] = $request->user()->id;

        $classroom = Classroom::create($data);

        // auto-add creator as admin
        $classroom->members()->attach($request->user()->id, [
            'role' => 'admin',
            'status' => 'active',
        ]);

        return response()->json($classroom->load('members'), 201);
    }

    public function show(Classroom $classroom, Request $request)
    {
        $this->authorizeAccess($classroom, $request->user()->id);

        $classroom->load(['owner', 'members', 'lessons', 'assignments']);

        return response()->json($classroom);
    }

    public function update(Request $request, Classroom $classroom)
    {
        $this->ensureAdmin($classroom, $request->user()->id);

        $data = $request->validate([
            'title' => ['string'],
            'description' => ['string', 'nullable'],
            'is_public' => ['boolean']
        ]);

        $classroom->update($data);

        return response()->json($classroom);
    }

    public function destroy(Request $request, Classroom $classroom)
    {
        $this->ensureAdmin($classroom, $request->user()->id);

        $classroom->delete();

        return response()->json(['message' => 'Classroom deleted']);
    }

    public function join(Request $request, Classroom $classroom)
    {
        $user = $request->user();

        if ($classroom->members()->where('user_id', $user->id)->exists()) {
            return response()->json(['message' => 'Already a member']);
        }

        $classroom->members()->attach($user->id, [
            'role' => 'student',
            'status' => 'active',
        ]);

        return response()->json(['message' => 'Joined classroom']);
    }

    public function joinWithCode(Request $request)
    {
        $request->validate(['invite_code' => 'required|string']);

        $classroom = Classroom::where('invite_code', $request->invite_code)->firstOrFail();

        return $this->join($request, $classroom);
    }

    public function members(Classroom $classroom, Request $request)
    {
        $this->ensureAdminOrTeacher($classroom, $request->user()->id);

        return response()->json(
            $classroom->members()->withPivot(['role', 'status'])->get()
        );
    }

    private function ensureAdmin(Classroom $classroom, int $userId)
    {
        $isAdmin = $classroom->members()
            ->where('user_id', $userId)
            ->wherePivot('role', 'admin')
            ->exists();

        abort_unless($isAdmin, 403, 'Only admins can do this');
    }

    private function ensureAdminOrTeacher(Classroom $classroom, int $userId)
    {
        $allowed = $classroom->members()
            ->where('user_id', $userId)
            ->whereIn('classroom_user.role', ['admin', 'teacher'])
            ->exists();

        abort_unless($allowed, 403, 'Only admins/teachers allowed');
    }

    private function authorizeAccess(Classroom $classroom, int $userId)
    {
        $member = $classroom->members()->where('user_id', $userId)->exists();
        $owner = $classroom->created_by === $userId;

        abort_unless($member || $owner || $classroom->is_public, 403, 'Forbidden');
    }
}
