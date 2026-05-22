<?php

namespace Database\Factories;

use App\Models\Grade;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class SubjectFactory extends Factory
{
    public function definition(): array
    {
        return [
            'name' => $this->faker->randomElement([
                'Matemáticas', 'Lenguaje', 'Ciencias Naturales',
                'Sociales', 'Arte', 'Música', 'Inglés',
            ]),
            'description' => $this->faker->sentence(),
            'color' => $this->faker->randomElement([
                '#3B9EFF', '#06D6A0', '#FF4D6D', '#FFCC00', '#8B5CF6', '#FF8C00',
            ]),
            'icon' => 'BookOpen',
            'grade_id' => Grade::factory(),
            'teacher_id' => User::factory()->state(['user_type' => 'docente']),
        ];
    }
}
