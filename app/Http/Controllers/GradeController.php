<?php

namespace App\Http\Controllers;

use App\Models\Grade;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class GradeController extends Controller
{
    public function index(Request $request): Response
    {
        $this->authorizeAdmin($request);

        $grades = Grade::withCount(['subjects', 'students'])
            ->orderBy('name')
            ->get();

        return Inertia::render('grades/index', [
            'grades' => $grades,
        ]);
    }

    public function create(Request $request): Response
    {
        $this->authorizeAdmin($request);

        return Inertia::render('grades/create');
    }

    public function store(Request $request): RedirectResponse
    {
        $this->authorizeAdmin($request);

        $validated = $request->validate([
            'name' => 'required|string|max:100',
            'description' => 'nullable|string|max:500',
        ]);

        Grade::create([...$validated, 'created_by' => $request->user()->id]);

        return redirect()->route('grades.index')
            ->with('success', 'Grado creado exitosamente.');
    }

    public function edit(Request $request, Grade $grade): Response
    {
        $this->authorizeAdmin($request);

        return Inertia::render('grades/edit', ['grade' => $grade]);
    }

    public function update(Request $request, Grade $grade): RedirectResponse
    {
        $this->authorizeAdmin($request);

        $validated = $request->validate([
            'name' => 'required|string|max:100',
            'description' => 'nullable|string|max:500',
        ]);

        $grade->update($validated);

        return redirect()->route('grades.index')
            ->with('success', 'Grado actualizado.');
    }

    public function destroy(Request $request, Grade $grade): RedirectResponse
    {
        $this->authorizeAdmin($request);

        $grade->delete();

        return redirect()->route('grades.index')
            ->with('success', 'Grado eliminado.');
    }

    private function authorizeAdmin(Request $request): void
    {
        abort_unless($request->user()?->isAdmin(), 403);
    }
}
