<?php

namespace App\Providers;

use App\Models\User;
use Carbon\CarbonImmutable;
use Illuminate\Support\Facades\Date;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\ServiceProvider;
use Illuminate\Validation\Rules\Password;

class AppServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        //
    }

    public function boot(): void
    {
        $this->configureDefaults();
        $this->ensureDefaultUsers();
    }

    protected function ensureDefaultUsers(): void
    {
        if (app()->runningUnitTests()) {
            return;
        }

        User::firstOrCreate(
            ['email' => 'admin@admin.com'],
            ['name' => 'Administrador', 'password' => Hash::make('admin'), 'user_type' => 'admin', 'email_verified_at' => now()],
        );

        User::firstOrCreate(
            ['email' => 'teacher@teacher.com'],
            ['name' => 'Docente Demo', 'password' => Hash::make('teacher'), 'user_type' => 'docente', 'email_verified_at' => now()],
        );

        User::firstOrCreate(
            ['email' => 'father@father.com'],
            ['name' => 'Padre Demo', 'password' => Hash::make('father'), 'user_type' => 'padre', 'email_verified_at' => now()],
        );
    }

    /**
     * Configure default behaviors for production-ready applications.
     */
    protected function configureDefaults(): void
    {
        Date::use(CarbonImmutable::class);

        DB::prohibitDestructiveCommands(
            app()->isProduction(),
        );

        Password::defaults(fn (): ?Password => app()->isProduction()
            ? Password::min(12)
                ->mixedCase()
                ->letters()
                ->numbers()
                ->symbols()
                ->uncompromised()
            : null,
        );
    }
}
