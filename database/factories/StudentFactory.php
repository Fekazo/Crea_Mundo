<?php

namespace Database\Factories;

use App\Models\Grade;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class StudentFactory extends Factory
{
    public function definition(): array
    {
        return [
            'first_name' => $this->faker->firstName(),
            'last_name' => $this->faker->lastName(),
            'age' => $this->faker->numberBetween(5, 12),
            'grade_id' => Grade::factory(),
            'parent_id' => User::factory()->state(['user_type' => 'padre']),
            'created_by' => User::factory()->state(['user_type' => 'docente']),
        ];
    }
}
