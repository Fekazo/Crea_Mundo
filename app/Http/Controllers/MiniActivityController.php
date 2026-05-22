<?php

namespace App\Http\Controllers;

use App\Models\Activity;
use App\Models\MiniActivity;
use App\Models\StudentProgress;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class MiniActivityController extends Controller
{
    public function store(Request $request, Activity $activity): RedirectResponse
    {
        $validated = $request->validate([
            'title'   => 'required|string|max:255',
            'type'    => 'required|in:video,image,quiz,flashcard,text',
            'content' => 'required|array',
        ]);

        $order = $activity->miniActivities()->max('order') + 1;

        $activity->miniActivities()->create([
            ...$validated,
            'order' => $order,
        ]);

        return back()->with('success', 'Mini-actividad añadida.');
    }

    public function update(Request $request, MiniActivity $miniActivity): RedirectResponse
    {
        $validated = $request->validate([
            'title'   => 'required|string|max:255',
            'content' => 'required|array',
        ]);

        $miniActivity->update($validated);

        return back()->with('success', 'Mini-actividad actualizada.');
    }

    public function reorder(Request $request, Activity $activity): \Illuminate\Http\JsonResponse
    {
        abort_unless($request->user()->isTeacherOrAdmin(), 403);

        $request->validate([
            'ids'   => 'required|array',
            'ids.*' => 'integer|exists:mini_activities,id',
        ]);

        foreach ($request->ids as $order => $id) {
            $activity->miniActivities()->where('id', $id)->update(['order' => $order]);
        }

        return response()->json(['ok' => true]);
    }

    public function destroy(MiniActivity $miniActivity): RedirectResponse
    {
        $miniActivity->delete();

        return back()->with('success', 'Mini-actividad eliminada.');
    }

    public function saveProgress(Request $request, MiniActivity $miniActivity): RedirectResponse
    {
        $validated = $request->validate([
            'score' => 'required|integer|min:0|max:100',
        ]);

        StudentProgress::updateOrCreate(
            [
                'user_id'          => $request->user()->id,
                'mini_activity_id' => $miniActivity->id,
            ],
            [
                'score'        => $validated['score'],
                'completed_at' => now(),
            ]
        );

        return back()->with('success', 'Progreso guardado.');
    }
}
