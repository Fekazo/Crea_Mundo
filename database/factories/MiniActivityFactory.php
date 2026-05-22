<?php

namespace Database\Factories;

use App\Models\Activity;
use Illuminate\Database\Eloquent\Factories\Factory;

class MiniActivityFactory extends Factory
{
    public function definition(): array
    {
        $type = $this->faker->randomElement(['video', 'image', 'quiz', 'flashcard', 'text']);

        $content = match ($type) {
            'video'     => ['url' => 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'],
            'image'     => ['url' => 'https://picsum.photos/800/400', 'caption' => $this->faker->sentence()],
            'quiz'      => [
                'questions' => [
                    [
                        'text'    => '¿Cuánto es 2 + 2?',
                        'options' => ['3', '4', '5', '6'],
                        'correct' => 1,
                    ],
                ],
            ],
            'flashcard' => [
                'cards' => [
                    ['front' => 'Perro', 'back' => 'Dog'],
                    ['front' => 'Gato', 'back' => 'Cat'],
                ],
            ],
            'text' => ['html' => '<p>' . $this->faker->paragraph() . '</p>'],
        };

        return [
            'activity_id' => Activity::factory(),
            'title'       => $this->faker->sentence(2),
            'type'        => $type,
            'content'     => $content,
            'order'       => $this->faker->numberBetween(0, 10),
        ];
    }

    public function video(): static
    {
        return $this->state(['type' => 'video', 'content' => ['url' => 'https://www.youtube.com/watch?v=dQw4w9WgXcQ']]);
    }

    public function quiz(): static
    {
        return $this->state([
            'type'    => 'quiz',
            'content' => [
                'questions' => [
                    ['text' => '¿Cuánto es 1+1?', 'options' => ['1', '2', '3', '4'], 'correct' => 1],
                ],
            ],
        ]);
    }

    public function flashcard(): static
    {
        return $this->state([
            'type'    => 'flashcard',
            'content' => ['cards' => [['front' => 'Hola', 'back' => 'Hello']]],
        ]);
    }

    public function text(): static
    {
        return $this->state([
            'type'    => 'text',
            'content' => ['html' => '<p>Contenido de ejemplo con <strong>texto en negrita</strong> y <em>cursiva</em>.</p>'],
        ]);
    }
}
