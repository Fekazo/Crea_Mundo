<?php

use App\Models\Activity;
use App\Models\MiniActivity;
use App\Models\Subject;
use App\Models\User;

beforeEach(function () {
    $this->teacher = User::factory()->create(['user_type' => 'docente']);
    $this->father = User::factory()->create(['user_type' => 'padre']);
    $this->subject = Subject::factory()->create(['teacher_id' => $this->teacher->id]);
});

describe('activity store', function () {
    it('teacher can create activity without minis', function () {
        $this->actingAs($this->teacher)
            ->post(route('subjects.activities.store', $this->subject), [
                'title' => 'Conteo del 1 al 10',
                'is_published' => true,
            ])
            ->assertRedirect();

        $this->assertDatabaseHas('activities', [
            'title' => 'Conteo del 1 al 10',
            'subject_id' => $this->subject->id,
            'created_by' => $this->teacher->id,
        ]);
    });

    it('teacher can create activity with quiz mini', function () {
        $this->actingAs($this->teacher)
            ->post(route('subjects.activities.store', $this->subject), [
                'title' => 'Quiz de Matemáticas',
                'is_published' => true,
                'minis' => [
                    [
                        'title' => 'Suma básica',
                        'type' => 'quiz',
                        'content' => json_encode([
                            'questions' => [
                                ['text' => '2+2=?', 'options' => ['3', '4', '5', '6'], 'correct' => 1],
                            ],
                        ]),
                    ],
                ],
            ])
            ->assertRedirect();

        $activity = Activity::where('title', 'Quiz de Matemáticas')->first();
        expect($activity->miniActivities)->toHaveCount(1);
        expect($activity->miniActivities->first()->type)->toBe('quiz');
    });

    it('teacher can create activity with flashcard mini', function () {
        $this->actingAs($this->teacher)
            ->post(route('subjects.activities.store', $this->subject), [
                'title' => 'Vocabulario',
                'is_published' => true,
                'minis' => [
                    [
                        'title' => 'Animales',
                        'type' => 'flashcard',
                        'content' => json_encode([
                            'cards' => [
                                ['front' => 'Perro', 'back' => 'Dog'],
                                ['front' => 'Gato', 'back' => 'Cat'],
                            ],
                        ]),
                    ],
                ],
            ])
            ->assertRedirect();

        $activity = Activity::where('title', 'Vocabulario')->first();
        expect($activity->miniActivities->first()->content['cards'])->toHaveCount(2);
    });

    it('teacher can create activity with video mini', function () {
        $this->actingAs($this->teacher)
            ->post(route('subjects.activities.store', $this->subject), [
                'title' => 'Video Educativo',
                'minis' => [
                    [
                        'title' => 'Aprende contando',
                        'type' => 'video',
                        'content' => ['url' => 'https://www.youtube.com/watch?v=test'],
                    ],
                ],
            ])
            ->assertRedirect();

        $activity = Activity::where('title', 'Video Educativo')->first();
        expect($activity->miniActivities->first()->content['url'])->toBe('https://www.youtube.com/watch?v=test');
    });

    it('requires title', function () {
        $this->actingAs($this->teacher)
            ->post(route('subjects.activities.store', $this->subject), ['title' => ''])
            ->assertSessionHasErrors('title');
    });
});

describe('activity show', function () {
    it('teacher can view activity', function () {
        $activity = Activity::factory()->create([
            'subject_id' => $this->subject->id,
            'created_by' => $this->teacher->id,
            'is_published' => true,
        ]);

        $this->actingAs($this->teacher)
            ->getJson(route('activities.show', $activity), ['X-Inertia' => 'true'])
            ->assertOk()
            ->assertJsonPath('component', 'activities/show');
    });

    it('includes progress map for logged-in user', function () {
        $activity = Activity::factory()->create([
            'subject_id'   => $this->subject->id,
            'created_by'   => $this->teacher->id,
            'is_published' => true,
        ]);
        $mini = MiniActivity::factory()->video()->create([
            'activity_id' => $activity->id,
        ]);
        $this->father->progress()->create([
            'mini_activity_id' => $mini->id,
            'score' => 100,
            'completed_at' => now(),
        ]);

        $response = $this->actingAs($this->father)
            ->getJson(route('activities.show', $activity), ['X-Inertia' => 'true'])
            ->assertOk();

        expect($response->json("props.progressMap.{$mini->id}"))->toBe(100);
    });
});

describe('activity update', function () {
    it('teacher can toggle published status', function () {
        $activity = Activity::factory()->create([
            'subject_id' => $this->subject->id,
            'created_by' => $this->teacher->id,
            'is_published' => false,
        ]);

        $this->actingAs($this->teacher)
            ->patch(route('activities.update', $activity), [
                'title' => $activity->title,
                'is_published' => true,
            ])
            ->assertRedirect();

        expect($activity->fresh()->is_published)->toBeTrue();
    });
});

describe('activity destroy', function () {
    it('teacher can delete activity', function () {
        $activity = Activity::factory()->create([
            'subject_id' => $this->subject->id,
            'created_by' => $this->teacher->id,
        ]);

        $this->actingAs($this->teacher)
            ->delete(route('activities.destroy', $activity))
            ->assertRedirect();

        $this->assertDatabaseMissing('activities', ['id' => $activity->id]);
    });
});
