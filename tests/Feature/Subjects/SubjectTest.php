<?php

use App\Models\Grade;
use App\Models\Student;
use App\Models\Subject;
use App\Models\User;

beforeEach(function () {
    $this->admin = User::factory()->create(['user_type' => 'admin']);
    $this->teacher = User::factory()->create(['user_type' => 'docente']);
    $this->father = User::factory()->create(['user_type' => 'padre']);
    $this->grade = Grade::factory()->create(['created_by' => $this->admin->id]);
});

describe('subject index', function () {
    it('teacher sees their own subjects', function () {
        Subject::factory()->create([
            'teacher_id' => $this->teacher->id,
            'grade_id' => $this->grade->id,
        ]);
        Subject::factory()->create([
            'teacher_id' => User::factory()->create(['user_type' => 'docente'])->id,
            'grade_id' => $this->grade->id,
        ]);

        $this->actingAs($this->teacher)
            ->getJson(route('subjects.index'), ['X-Inertia' => 'true'])
            ->assertOk()
            ->assertJsonPath('component', 'subjects/index')
            ->assertJsonCount(1, 'props.subjects');
    });

    it('father sees subjects of their children', function () {
        $subject = Subject::factory()->create([
            'teacher_id' => $this->teacher->id,
            'grade_id' => $this->grade->id,
        ]);
        $student = Student::factory()->create([
            'grade_id' => $this->grade->id,
            'parent_id' => $this->father->id,
            'created_by' => $this->teacher->id,
        ]);
        $subject->students()->attach($student->id);

        Subject::factory()->create([
            'teacher_id' => $this->teacher->id,
            'grade_id' => $this->grade->id,
        ]);

        $this->actingAs($this->father)
            ->getJson(route('subjects.index'), ['X-Inertia' => 'true'])
            ->assertOk()
            ->assertJsonCount(1, 'props.subjects');
    });

    it('redirects guests', function () {
        $this->get(route('subjects.index'))->assertRedirect(route('login'));
    });
});

describe('subject store', function () {
    it('admin can create subject', function () {
        $this->actingAs($this->admin)
            ->post(route('subjects.store'), [
                'name' => 'Matemáticas',
                'description' => 'Números y operaciones',
                'color' => '#3B9EFF',
                'icon' => 'BookOpen',
                'grade_id' => $this->grade->id,
                'teacher_id' => $this->teacher->id,
            ])
            ->assertRedirect();

        $this->assertDatabaseHas('subjects', [
            'name' => 'Matemáticas',
            'grade_id' => $this->grade->id,
            'teacher_id' => $this->teacher->id,
        ]);
    });

    it('teacher cannot create subject', function () {
        $this->actingAs($this->teacher)
            ->post(route('subjects.store'), [
                'name' => 'Matemáticas',
                'color' => '#000',
                'icon' => 'x',
                'grade_id' => $this->grade->id,
                'teacher_id' => $this->teacher->id,
            ])
            ->assertForbidden();
    });

    it('requires name', function () {
        $this->actingAs($this->admin)
            ->post(route('subjects.store'), [
                'name' => '',
                'color' => '#000',
                'icon' => 'x',
                'grade_id' => $this->grade->id,
                'teacher_id' => $this->teacher->id,
            ])
            ->assertSessionHasErrors('name');
    });
});

describe('subject show', function () {
    it('teacher can view their subject', function () {
        $subject = Subject::factory()->create([
            'teacher_id' => $this->teacher->id,
            'grade_id' => $this->grade->id,
        ]);

        $this->actingAs($this->teacher)
            ->getJson(route('subjects.show', $subject), ['X-Inertia' => 'true'])
            ->assertOk()
            ->assertJsonPath('component', 'subjects/show');
    });
});

describe('subject update', function () {
    it('admin can update subject', function () {
        $subject = Subject::factory()->create([
            'teacher_id' => $this->teacher->id,
            'grade_id' => $this->grade->id,
        ]);

        $this->actingAs($this->admin)
            ->put(route('subjects.update', $subject), [
                'name' => 'Ciencias',
                'color' => '#06D6A0',
                'icon' => 'Beaker',
                'grade_id' => $this->grade->id,
                'teacher_id' => $this->teacher->id,
            ])
            ->assertRedirect();

        $this->assertDatabaseHas('subjects', ['id' => $subject->id, 'name' => 'Ciencias']);
    });
});

describe('subject destroy', function () {
    it('admin can delete subject', function () {
        $subject = Subject::factory()->create([
            'teacher_id' => $this->teacher->id,
            'grade_id' => $this->grade->id,
        ]);

        $this->actingAs($this->admin)
            ->delete(route('subjects.destroy', $subject))
            ->assertRedirect(route('subjects.index'));

        $this->assertDatabaseMissing('subjects', ['id' => $subject->id]);
    });
});

describe('assign students', function () {
    it('teacher can assign students to subject', function () {
        $subject = Subject::factory()->create([
            'teacher_id' => $this->teacher->id,
            'grade_id' => $this->grade->id,
        ]);
        $s1 = Student::factory()->create([
            'grade_id' => $this->grade->id,
            'parent_id' => $this->father->id,
            'created_by' => $this->teacher->id,
        ]);
        $s2 = Student::factory()->create([
            'grade_id' => $this->grade->id,
            'parent_id' => $this->father->id,
            'created_by' => $this->teacher->id,
        ]);

        $this->actingAs($this->teacher)
            ->post(route('subjects.students.sync', $subject), [
                'student_ids' => [$s1->id, $s2->id],
            ])
            ->assertRedirect();

        expect($subject->fresh()->students)->toHaveCount(2);
    });

    it('teacher can remove all students from subject', function () {
        $subject = Subject::factory()->create([
            'teacher_id' => $this->teacher->id,
            'grade_id' => $this->grade->id,
        ]);
        $student = Student::factory()->create([
            'grade_id' => $this->grade->id,
            'parent_id' => $this->father->id,
            'created_by' => $this->teacher->id,
        ]);
        $subject->students()->attach($student->id);

        $this->actingAs($this->teacher)
            ->post(route('subjects.students.sync', $subject), ['student_ids' => []])
            ->assertRedirect();

        expect($subject->fresh()->students)->toHaveCount(0);
    });
});
