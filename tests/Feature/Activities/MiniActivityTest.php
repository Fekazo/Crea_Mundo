<?php

use App\Models\Activity;
use App\Models\MiniActivity;
use App\Models\StudentProgress;
use App\Models\Subject;
use App\Models\User;

beforeEach(function () {
    $this->teacher = User::factory()->create(['user_type' => 'docente']);
    $this->father = User::factory()->create(['user_type' => 'padre']);
    $this->subject = Subject::factory()->create(['teacher_id' => $this->teacher->id]);
    $this->activity = Activity::factory()->create([
        'subject_id' => $this->subject->id,
        'created_by' => $this->teacher->id,
    ]);
});

describe('mini-activity store', function () {
    it('teacher can add video mini-activity', function () {
        $this->actingAs($this->teacher)
            ->post(route('mini-activities.store', $this->activity), [
                'title' => 'Aprende a sumar',
                'type' => 'video',
                'content' => ['url' => 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'],
            ])
            ->assertRedirect();

        $this->assertDatabaseHas('mini_activities', [
            'activity_id' => $this->activity->id,
            'title' => 'Aprende a sumar',
            'type' => 'video',
        ]);
    });

    it('teacher can add quiz mini-activity', function () {
        $this->actingAs($this->teacher)
            ->post(route('mini-activities.store', $this->activity), [
                'title' => 'Test de sumas',
                'type' => 'quiz',
                'content' => [
                    'questions' => [
                        ['text' => '1+1=?', 'options' => ['1', '2', '3', '4'], 'correct' => 1],
                    ],
                ],
            ])
            ->assertRedirect();

        $mini = MiniActivity::where('title', 'Test de sumas')->first();
        expect($mini)->not->toBeNull();
        expect($mini->content['questions'])->toHaveCount(1);
    });

    it('rejects invalid type', function () {
        $this->actingAs($this->teacher)
            ->post(route('mini-activities.store', $this->activity), [
                'title' => 'Test',
                'type' => 'invalid_type',
                'content' => [],
            ])
            ->assertSessionHasErrors('type');
    });
});

describe('mini-activity update', function () {
    it('teacher can update title', function () {
        $mini = MiniActivity::factory()->create([
            'activity_id' => $this->activity->id,
            'type' => 'image',
        ]);

        $this->actingAs($this->teacher)
            ->patch(route('mini-activities.update', $mini), [
                'title' => 'Nuevo título',
                'content' => $mini->content,
            ])
            ->assertRedirect();

        expect($mini->fresh()->title)->toBe('Nuevo título');
    });
});

describe('mini-activity destroy', function () {
    it('teacher can delete mini-activity', function () {
        $mini = MiniActivity::factory()->create([
            'activity_id' => $this->activity->id,
            'type' => 'flashcard',
        ]);

        $this->actingAs($this->teacher)
            ->delete(route('mini-activities.destroy', $mini))
            ->assertRedirect();

        $this->assertDatabaseMissing('mini_activities', ['id' => $mini->id]);
    });
});

describe('student progress', function () {
    it('padre can save progress', function () {
        $mini = MiniActivity::factory()->create([
            'activity_id' => $this->activity->id,
            'type' => 'quiz',
        ]);

        $this->actingAs($this->father)
            ->post(route('mini-activities.progress', $mini), ['score' => 80])
            ->assertRedirect();

        $this->assertDatabaseHas('student_progress', [
            'user_id' => $this->father->id,
            'mini_activity_id' => $mini->id,
            'score' => 80,
        ]);
    });

    it('progress is updated on repeat', function () {
        $mini = MiniActivity::factory()->create([
            'activity_id' => $this->activity->id,
            'type' => 'quiz',
        ]);

        $this->actingAs($this->father)
            ->post(route('mini-activities.progress', $mini), ['score' => 60]);
        $this->actingAs($this->father)
            ->post(route('mini-activities.progress', $mini), ['score' => 90]);

        expect(StudentProgress::where([
            'user_id' => $this->father->id,
            'mini_activity_id' => $mini->id,
        ])->count())->toBe(1);

        expect(StudentProgress::where([
            'user_id' => $this->father->id,
            'mini_activity_id' => $mini->id,
        ])->first()->score)->toBe(90);
    });

    it('score must be between 0 and 100', function () {
        $mini = MiniActivity::factory()->create([
            'activity_id' => $this->activity->id,
            'type' => 'quiz',
        ]);

        $this->actingAs($this->father)
            ->post(route('mini-activities.progress', $mini), ['score' => 150])
            ->assertSessionHasErrors('score');
    });
});
