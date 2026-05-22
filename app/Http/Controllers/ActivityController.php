<?php

namespace App\Http\Controllers;

use App\Models\Activity;
use App\Models\Student;
use App\Models\StudentProgress;
use App\Models\Subject;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ActivityController extends Controller
{
    public function create(Subject $subject): Response
    {
        return Inertia::render('activities/create', [
            'subject' => $subject,
        ]);
    }

    public function store(Request $request, Subject $subject): RedirectResponse
    {
        abort_unless($request->user()->isTeacherOrAdmin(), 403);

        $validated = $request->validate([
            'title'          => 'required|string|max:255',
            'description'    => 'nullable|string|max:1000',
            'is_published'   => 'boolean',
            'minis'          => 'array',
            'minis.*.title'  => 'required_with:minis|string|max:255',
            'minis.*.type'   => 'required_with:minis|in:video,image,quiz,flashcard,text',
        ]);

        $order = $subject->activities()->max('order') + 1;

        $activity = $subject->activities()->create([
            'title'        => $validated['title'],
            'description'  => $validated['description'] ?? null,
            'is_published' => $validated['is_published'] ?? false,
            'created_by'   => $request->user()->id,
            'order'        => $order,
        ]);

        $this->storeMinis($request, $activity);

        return redirect()->route('activities.show', $activity)
            ->with('success', 'Actividad creada.');
    }

    public function show(Activity $activity): Response
    {
        $user = request()->user();

        abort_if($user->isParent() && ! $activity->is_published, 403);

        $activity->load(['miniActivities', 'subject.students.parent']);

        $progressMap = $user->progress()
            ->whereIn('mini_activity_id', $activity->miniActivities->pluck('id'))
            ->pluck('score', 'mini_activity_id')
            ->toArray();

        $studentProgress = [];
        if ($user->isTeacherOrAdmin()) {
            $miniIds = $activity->miniActivities->pluck('id');

            $studentProgress = $activity->subject->students->map(function (Student $student) use ($miniIds) {
                $scores = StudentProgress::where('user_id', $student->parent_id)
                    ->whereIn('mini_activity_id', $miniIds)
                    ->pluck('score', 'mini_activity_id')
                    ->toArray();

                $total     = $miniIds->count();
                $completed = count(array_keys($scores));
                $avg       = $completed > 0 ? (int) round(array_sum($scores) / $completed) : null;

                return [
                    'student'  => [
                        'id'         => $student->id,
                        'first_name' => $student->first_name,
                        'last_name'  => $student->last_name,
                    ],
                    'scores'    => $scores,
                    'completed' => $completed,
                    'total'     => $total,
                    'avg'       => $avg,
                ];
            })->values()->toArray();
        }

        return Inertia::render('activities/show', [
            'activity'        => $activity,
            'progressMap'     => $progressMap,
            'canManage'       => $user->isTeacherOrAdmin(),
            'studentProgress' => $studentProgress,
        ]);
    }

    public function edit(Activity $activity): Response
    {
        abort_unless(request()->user()->isTeacherOrAdmin(), 403);

        $activity->load(['miniActivities', 'subject']);

        return Inertia::render('activities/edit', [
            'activity' => $activity,
        ]);
    }

    public function update(Request $request, Activity $activity): RedirectResponse
    {
        abort_unless($request->user()->isTeacherOrAdmin(), 403);

        $validated = $request->validate([
            'title'          => 'required|string|max:255',
            'description'    => 'nullable|string|max:1000',
            'is_published'   => 'boolean',
            'minis'          => 'array',
            'minis.*.title'  => 'required_with:minis|string|max:255',
            'minis.*.type'   => 'required_with:minis|in:video,image,quiz,flashcard,text',
        ]);

        $activity->update([
            'title'        => $validated['title'],
            'description'  => $validated['description'] ?? null,
            'is_published' => $validated['is_published'] ?? $activity->is_published,
        ]);

        $this->storeMinis($request, $activity);

        return redirect()->route('activities.show', $activity)
            ->with('success', 'Actividad actualizada.');
    }

    public function destroy(Activity $activity): RedirectResponse
    {
        abort_unless(request()->user()->isTeacherOrAdmin(), 403);

        $subjectId = $activity->subject_id;
        $activity->delete();

        return redirect()->route('subjects.show', $subjectId)
            ->with('success', 'Actividad eliminada.');
    }

    private function storeMinis(Request $request, Activity $activity): void
    {
        $startOrder = $activity->miniActivities()->max('order') + 1;

        foreach ($request->input('minis', []) as $i => $miniData) {
            $raw     = $request->input("minis.{$i}.content");
            $content = is_string($raw)
                ? (json_decode($raw, true) ?? [])
                : (is_array($raw) ? $raw : []);

            $activity->miniActivities()->create([
                'title'   => $miniData['title'],
                'type'    => $miniData['type'],
                'content' => $content,
                'order'   => $startOrder + $i,
            ]);
        }
    }
}
