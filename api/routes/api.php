<?php

use App\Http\Controllers\Api\ClassroomController;
use App\Http\Controllers\Api\LessonController;
use App\Http\Controllers\Api\AssignmentController;
use App\Http\Controllers\Api\SubmissionController;
use App\Http\Controllers\Api\AnnouncementController;
use App\Http\Controllers\Api\DiscussionThreadController;
use App\Http\Controllers\Api\DiscussionCommentController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use Illuminate\Http\Request;

Route::get('/sanctum/csrf-cookie', function () {
    return response()->noContent(); // Sanctum middleware will set the cookie
});

Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/api/user', function (Request $request) {
        return $request->user();
    });
});

Route::middleware('auth:sanctum')->group(function () {
    // Classrooms
    Route::get('/classrooms', [ClassroomController::class, 'index']);
    Route::post('/classrooms', [ClassroomController::class, 'store']);
    Route::get('/classrooms/{classroom}', [ClassroomController::class, 'show']);
    Route::put('/classrooms/{classroom}', [ClassroomController::class, 'update']);
    Route::delete('/classrooms/{classroom}', [ClassroomController::class, 'destroy']);

    // Membership & joining via invite code
    Route::post('/classrooms/{classroom}/join', [ClassroomController::class, 'join']);
    Route::post('/classrooms/join-with-code', [ClassroomController::class, 'joinWithCode']);
    Route::get('/classrooms/{classroom}/members', [ClassroomController::class, 'members']);

    // Lessons
    Route::get('/classrooms/{classroom}/lessons', [LessonController::class, 'index']);
    Route::post('/classrooms/{classroom}/lessons', [LessonController::class, 'store']);
    Route::get('/lessons/{lesson}', [LessonController::class, 'show']);
    Route::put('/lessons/{lesson}', [LessonController::class, 'update']);
    Route::delete('/lessons/{lesson}', [LessonController::class, 'destroy']);

    // Assignments
    Route::get('/classrooms/{classroom}/assignments', [AssignmentController::class, 'index']);
    Route::post('/classrooms/{classroom}/assignments', [AssignmentController::class, 'store']);
    Route::get('/assignments/{assignment}', [AssignmentController::class, 'show']);
    Route::put('/assignments/{assignment}', [AssignmentController::class, 'update']);
    Route::delete('/assignments/{assignment}', [AssignmentController::class, 'destroy']);

    // Submissions
    Route::get('/assignments/{assignment}/submissions', [SubmissionController::class, 'index']);
    Route::post('/assignments/{assignment}/submissions', [SubmissionController::class, 'store']);
    Route::get('/submissions/{submission}', [SubmissionController::class, 'show']);
    Route::put('/submissions/{submission}', [SubmissionController::class, 'update']); // grading

    // Announcements
    Route::get('/classrooms/{classroom}/announcements', [AnnouncementController::class, 'index']);
    Route::post('/classrooms/{classroom}/announcements', [AnnouncementController::class, 'store']);
    Route::put('/announcements/{announcement}', [AnnouncementController::class, 'update']);
    Route::delete('/announcements/{announcement}', [AnnouncementController::class, 'destroy']);

    // Discussions
    Route::get('/classrooms/{classroom}/threads', [DiscussionThreadController::class, 'index']);
    Route::post('/classrooms/{classroom}/threads', [DiscussionThreadController::class, 'store']);
    Route::get('/threads/{thread}', [DiscussionThreadController::class, 'show']);

    Route::post('/threads/{thread}/comments', [DiscussionCommentController::class, 'store']);
});
