<?php

use App\Http\Controllers\ActivityController;
use App\Http\Controllers\Admin\UserController as AdminUserController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\GradeController;
use App\Http\Controllers\MiniActivityController;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\SubjectController;
use Illuminate\Support\Facades\Route;
use Laravel\Fortify\Features;

Route::inertia('/', 'welcome', [
    'canRegister' => Features::enabled(Features::registration()),
])->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', DashboardController::class)->name('dashboard');

    // Grades (admin only — enforced in controller)
    Route::resource('grades', GradeController::class);

    // Students (teacher/admin — enforced in controller)
    Route::resource('students', StudentController::class);

    // Admin: manage docentes and admins
    Route::prefix('admin')->name('admin.')->group(function () {
        Route::resource('users', AdminUserController::class)->except(['show', 'edit', 'update']);
    });

    // Subjects (materias)
    Route::resource('subjects', SubjectController::class);
    Route::post('subjects/{subject}/students', [SubjectController::class, 'assignStudents'])
        ->name('subjects.students.sync');

    // Activities
    Route::get('subjects/{subject}/activities/create', [ActivityController::class, 'create'])
        ->name('subjects.activities.create');
    Route::post('subjects/{subject}/activities', [ActivityController::class, 'store'])
        ->name('subjects.activities.store');
    Route::get('activities/{activity}', [ActivityController::class, 'show'])
        ->name('activities.show');
    Route::get('activities/{activity}/edit', [ActivityController::class, 'edit'])
        ->name('activities.edit');
    Route::patch('activities/{activity}', [ActivityController::class, 'update'])
        ->name('activities.update');
    Route::delete('activities/{activity}', [ActivityController::class, 'destroy'])
        ->name('activities.destroy');

    // Mini Activities
    Route::post('activities/{activity}/mini-activities', [MiniActivityController::class, 'store'])
        ->name('mini-activities.store');
    Route::post('activities/{activity}/mini-activities/reorder', [MiniActivityController::class, 'reorder'])
        ->name('mini-activities.reorder');
    Route::patch('mini-activities/{miniActivity}', [MiniActivityController::class, 'update'])
        ->name('mini-activities.update');
    Route::delete('mini-activities/{miniActivity}', [MiniActivityController::class, 'destroy'])
        ->name('mini-activities.destroy');
    Route::post('mini-activities/{miniActivity}/progress', [MiniActivityController::class, 'saveProgress'])
        ->name('mini-activities.progress');
});

require __DIR__.'/settings.php';
