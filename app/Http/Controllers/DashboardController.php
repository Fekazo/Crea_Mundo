<?php

namespace App\Http\Controllers;

use App\Models\Activity;
use App\Models\MiniActivity;
use App\Models\Student;
use App\Models\StudentProgress;
use App\Models\Subject;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function __invoke(Request $request): Response
    {
        $user = $request->user();

        if ($user->isAdmin()) {
            $stats = [
                'subjects'   => Subject::count(),
                'activities' => Activity::count(),
                'students'   => Student::count(),
                'progress'   => null,
            ];
        } elseif ($user->isTeacher()) {
            $subjectIds = Subject::where('teacher_id', $user->id)->pluck('id');
            $stats = [
                'subjects'   => $subjectIds->count(),
                'activities' => Activity::whereIn('subject_id', $subjectIds)->count(),
                'students'   => Student::whereHas('subjects', fn ($q) => $q->whereIn('subjects.id', $subjectIds))->count(),
                'progress'   => null,
            ];
        } else {
            // padre
            $childIds  = $user->children()->pluck('id');
            $subjectIds = Subject::whereHas('students', fn ($q) => $q->whereIn('students.id', $childIds))->pluck('id');
            $miniIds    = MiniActivity::whereHas('activity', fn ($q) => $q->whereIn('subject_id', $subjectIds))->pluck('id');
            $total     = $miniIds->count();
            $completed = $total > 0
                ? StudentProgress::where('user_id', $user->id)->whereIn('mini_activity_id', $miniIds)->count()
                : 0;

            $stats = [
                'subjects'   => $subjectIds->count(),
                'activities' => Activity::whereIn('subject_id', $subjectIds)->count(),
                'students'   => $childIds->count(),
                'progress'   => $total > 0 ? (int) round(($completed / $total) * 100) : 0,
            ];
        }

        $children = $user->isParent()
            ? $user->children()->orderBy('first_name')->get(['id', 'first_name', 'last_name', 'age'])
            : collect();

        return Inertia::render('dashboard', [
            'stats'    => $stats,
            'children' => $children,
            'userType' => $user->user_type,
        ]);
    }
}
