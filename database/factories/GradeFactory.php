<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class GradeFactory extends Factory
{
    public function definition(): array
    {
        static $n = 0;
        $names = ['1er Grado', '2do Grado', '3er Grado', '4to Grado', '5to Grado', '6to Grado'];

        return [
            'name' => $names[$n++ % count($names)],
            'description' => $this->faker->sentence(),
            'created_by' => User::factory()->state(['user_type' => 'admin']),
        ];
    }
}
