<?php

namespace App\Http\Controllers;

use App\Models\Grade;
use App\Models\Student;
use App\Models\Subject;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class SubjectController extends Controller
{
    public function index(Request $request): Response
    {
        $user = $request->user();

        if ($user->isAdmin()) {
            $subjects = Subject::with('grade', 'teacher')
                ->withCount('students', 'activities')
                ->get();

            return Inertia::render('subjects/index', [
                'subjects'        => $subjects,
                'canCreate'       => true,
                'children'        => [],
                'selectedChildId' => null,
            ]);
        }

        if ($user->isTeacher()) {
            $subjects = Subject::where('teacher_id', $user->id)
                ->with('grade')
                ->withCount('students', 'activities')
                ->get();

            return Inertia::render('subjects/index', [
                'subjects'        => $subjects,
                'canCreate'       => false,
                'children'        => [],
                'selectedChildId' => null,
            ]);
        }

        // padre
        $children        = $user->children()->orderBy('first_name')->get(['id', 'first_name', 'last_name']);
        $selectedChildId = $request->query('child_id') ? (int) $request->query('child_id') : null;

        if ($selectedChildId) {
            $subjects = Subject::whereHas('students', fn ($q) => $q->where('students.id', $selectedChildId))
                ->with('grade', 'teacher')
                ->withCount('activities')
                ->get();
        } elseif ($children->count() === 1) {
            $selectedChildId = $children->first()->id;
            $subjects = Subject::whereHas('students', fn ($q) => $q->where('students.id', $selectedChildId))
                ->with('grade', 'teacher')
                ->withCount('activities')
                ->get();
        } else {
            // Multiple children, none selected yet — return empty list; UI shows selector
            $subjects = collect();
        }

        return Inertia::render('subjects/index', [
            'subjects'        => $subjects,
            'canCreate'       => false,
            'children'        => $children,
            'selectedChildId' => $selectedChildId,
        ]);
    }

    public function create(Request $request): Response
    {
        abort_unless($request->user()->isAdmin(), 403);

        return Inertia::render('subjects/create', [
            'grades' => Grade::orderBy('name')->get(['id', 'name']),
            'teachers' => User::where('user_type', 'docente')->orderBy('name')->get(['id', 'name', 'email']),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        abort_unless($request->user()->isAdmin(), 403);

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string|max:1000',
            'color' => 'required|string|max:20',
            'icon' => 'required|string|max:50',
            'grade_id' => 'required|exists:grades,id',
            'teacher_id' => 'required|exists:users,id',
        ]);

        $subject = Subject::create($validated);

        return redirect()->route('subjects.show', $subject)
            ->with('success', 'Materia creada exitosamente.');
    }

    public function show(Subject $subject): Response
    {
        $user = request()->user();

        $subject->load([
            'grade',
            'teacher',
            'students.grade',
        ]);

        $activitiesQuery = $subject->activities()->with('miniActivities');
        if ($user->isParent()) {
            $activitiesQuery->where('is_published', true);
        }
        $subject->setRelation('activities', $activitiesQuery->orderBy('order')->get());

        // Grade students available to enroll (not already enrolled)
        $gradeStudents = $subject->grade_id
            ? Student::where('grade_id', $subject->grade_id)
                ->orderBy('last_name')
                ->get(['id', 'first_name', 'last_name', 'age'])
            : collect();

        return Inertia::render('subjects/show', [
            'subject' => $subject,
            'gradeStudents' => $gradeStudents,
            'canManage' => $user->isTeacherOrAdmin(),
            'breadcrumbs' => [
                ['title' => 'Materias', 'href' => route('subjects.index')],
                ['title' => $subject->name, 'href' => route('subjects.show', $subject)],
            ],
        ]);
    }

    public function edit(Subject $subject): Response
    {
        abort_unless(request()->user()->isAdmin(), 403);

        return Inertia::render('subjects/edit', [
            'subject' => $subject->load('grade'),
            'grades' => Grade::orderBy('name')->get(['id', 'name']),
            'teachers' => User::where('user_type', 'docente')->orderBy('name')->get(['id', 'name', 'email']),
        ]);
    }

    public function update(Request $request, Subject $subject): RedirectResponse
    {
        abort_unless($request->user()->isAdmin(), 403);

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string|max:1000',
            'color' => 'required|string|max:20',
            'icon' => 'required|string|max:50',
            'grade_id' => 'required|exists:grades,id',
            'teacher_id' => 'required|exists:users,id',
        ]);

        $subject->update($validated);

        return redirect()->route('subjects.show', $subject)
            ->with('success', 'Materia actualizada.');
    }

    public function destroy(Subject $subject): RedirectResponse
    {
        abort_unless(request()->user()->isAdmin(), 403);

        $subject->delete();

        return redirect()->route('subjects.index')
            ->with('success', 'Materia eliminada.');
    }

    public function assignStudents(Request $request, Subject $subject): RedirectResponse
    {
        abort_unless($request->user()->isTeacherOrAdmin(), 403);

        $request->validate([
            'student_ids' => 'present|array',
            'student_ids.*' => 'exists:students,id',
        ]);

        $subject->students()->sync($request->student_ids);

        return back()->with('success', 'Estudiantes actualizados.');
    }
}
