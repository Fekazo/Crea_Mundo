<?php

use App\Models\User;
use Laravel\Fortify\Features;

beforeEach(function () {
    $this->skipUnlessFortifyHas(Features::registration());
});

test('registration screen can be rendered', function () {
    $response = $this->get(route('register'));

    $response->assertOk();
});

test('new users can register', function () {
    $response = $this->post(route('register.store'), [
        'name' => 'Test User',
        'email' => 'test@example.com',
        'password' => 'password',
        'password_confirmation' => 'password',
        'user_type' => 'padre',
        'terms' => 'on',
    ]);

    $this->assertAuthenticated();
    $response->assertRedirect(route('dashboard', absolute: false));
});

// RF-01 Tests: User Registration with user_type

test('public registration always creates padre regardless of user_type submitted', function () {
    $response = $this->post(route('register.store'), [
        'name' => 'Juan Docente',
        'email' => 'docente@ejemplo.com',
        'password' => 'password',
        'password_confirmation' => 'password',
        'user_type' => 'docente',
        'terms' => 'on',
    ]);

    expect(User::where('email', 'docente@ejemplo.com')->exists())->toBeTrue();

    $user = User::where('email', 'docente@ejemplo.com')->first();
    expect($user->user_type)->toBe('padre');

    $response->assertRedirect(route('dashboard', absolute: false));
});

test('user can register as padre', function () {
    $response = $this->post(route('register.store'), [
        'name' => 'María Padre',
        'email' => 'padre@ejemplo.com',
        'password' => 'password',
        'password_confirmation' => 'password',
        'user_type' => 'padre',
        'terms' => 'on',
    ]);

    $user = User::where('email', 'padre@ejemplo.com')->first();
    expect($user->user_type)->toBe('padre');
});

test('user cannot register with duplicate email', function () {
    User::factory()->create(['email' => 'duplicate@ejemplo.com']);

    $response = $this->post(route('register.store'), [
        'name' => 'Otro Usuario',
        'email' => 'duplicate@ejemplo.com',
        'password' => 'password',
        'password_confirmation' => 'password',
        'user_type' => 'padre',
        'terms' => 'on',
    ]);

    $response->assertSessionHasErrors('email');
});

test('user cannot register with weak password', function () {
    $response = $this->post(route('register.store'), [
        'name' => 'Usuario Débil',
        'email' => 'weak@ejemplo.com',
        'password' => 'short',
        'password_confirmation' => 'short',
        'user_type' => 'padre',
        'terms' => 'on',
    ]);

    $response->assertSessionHasErrors('password');
});

test('user cannot register without accepting terms', function () {
    $response = $this->post(route('register.store'), [
        'name' => 'Sin Términos',
        'email' => 'noterminos@ejemplo.com',
        'password' => 'password',
        'password_confirmation' => 'password',
        'user_type' => 'padre',
    ]);

    $response->assertSessionHasErrors('terms');
});

test('public registration ignores admin user_type and creates padre', function () {
    $response = $this->post(route('register.store'), [
        'name' => 'Usuario Inválido',
        'email' => 'invalido@ejemplo.com',
        'password' => 'password',
        'password_confirmation' => 'password',
        'user_type' => 'admin',
        'terms' => 'on',
    ]);

    $response->assertRedirect(route('dashboard', absolute: false));

    $user = User::where('email', 'invalido@ejemplo.com')->first();
    expect($user)->not->toBeNull();
    expect($user->user_type)->toBe('padre');
});

