<?php

namespace Database\Factories;

use App\Models\Subject;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class ActivityFactory extends Factory
{
    public function definition(): array
    {
        return [
            'subject_id' => Subject::factory(),
            'title' => $this->faker->sentence(3),
            'description' => $this->faker->sentence(),
            'order' => $this->faker->numberBetween(0, 10),
            'is_published' => $this->faker->boolean(),
            'created_by' => User::factory()->state(['user_type' => 'docente']),
        ];
    }
}
