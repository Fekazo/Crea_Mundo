<?php

namespace App\Http\Controllers;

use App\Models\Grade;
use App\Models\Student;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class StudentController extends Controller
{
    public function index(Request $request): Response
    {
        $this->authorizeTeacherOrAdmin($request);

        $user = $request->user();

        $students = $user->isAdmin()
            ? Student::with(['grade', 'parent'])->get()
            : Student::where('created_by', $user->id)->with(['grade', 'parent'])->get();

        return Inertia::render('students/index', [
            'students' => $students,
        ]);
    }

    public function create(Request $request): Response
    {
        $this->authorizeTeacherOrAdmin($request);

        return Inertia::render('students/create', [
            'grades' => Grade::orderBy('name')->get(['id', 'name']),
            'parents' => User::where('user_type', 'padre')
                ->orderBy('name')
                ->get(['id', 'name', 'email']),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $this->authorizeTeacherOrAdmin($request);

        $validated = $request->validate([
            'first_name' => 'required|string|max:100',
            'last_name' => 'required|string|max:100',
            'age' => 'nullable|integer|min:3|max:20',
            'grade_id' => 'required|exists:grades,id',
            'parent_id' => 'required|exists:users,id',
        ]);

        Student::create([...$validated, 'created_by' => $request->user()->id]);

        return redirect()->route('students.index')
            ->with('success', 'Estudiante registrado exitosamente.');
    }

    public function edit(Request $request, Student $student): Response
    {
        $this->authorizeTeacherOrAdmin($request);

        $student->load(['grade', 'parent']);

        return Inertia::render('students/edit', [
            'student' => $student,
            'grades' => Grade::orderBy('name')->get(['id', 'name']),
            'parents' => User::where('user_type', 'padre')
                ->orderBy('name')
                ->get(['id', 'name', 'email']),
        ]);
    }

    public function update(Request $request, Student $student): RedirectResponse
    {
        $this->authorizeTeacherOrAdmin($request);

        $validated = $request->validate([
            'first_name' => 'required|string|max:100',
            'last_name' => 'required|string|max:100',
            'age' => 'nullable|integer|min:3|max:20',
            'grade_id' => 'required|exists:grades,id',
            'parent_id' => 'required|exists:users,id',
        ]);

        $student->update($validated);

        return redirect()->route('students.index')
            ->with('success', 'Estudiante actualizado.');
    }

    public function destroy(Request $request, Student $student): RedirectResponse
    {
        $this->authorizeTeacherOrAdmin($request);

        $student->delete();

        return redirect()->route('students.index')
            ->with('success', 'Estudiante eliminado.');
    }

    private function authorizeTeacherOrAdmin(Request $request): void
    {
        abort_unless($request->user()?->isTeacherOrAdmin(), 403);
    }
}
