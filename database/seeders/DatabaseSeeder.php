<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        User::firstOrCreate(
            ['email' => 'admin@admin.com'],
            [
                'name' => 'Administrador',
                'password' => Hash::make('admin'),
                'user_type' => 'admin',
                'email_verified_at' => now(),
            ]
        );

        User::firstOrCreate(
            ['email' => 'teacher@teacher.com'],
            [
                'name' => 'Docente Demo',
                'password' => Hash::make('teacher'),
                'user_type' => 'docente',
                'email_verified_at' => now(),
            ]
        );

        User::firstOrCreate(
            ['email' => 'father@father.com'],
            [
                'name' => 'Padre Demo',
                'password' => Hash::make('father'),
                'user_type' => 'padre',
                'email_verified_at' => now(),
            ]
        );
    }
}
