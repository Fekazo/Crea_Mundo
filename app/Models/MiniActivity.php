<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

#[Fillable(['activity_id', 'title', 'type', 'content', 'order'])]
class MiniActivity extends Model
{
    use HasFactory;

    protected function casts(): array
    {
        return ['content' => 'array'];
    }

    public function activity(): BelongsTo
    {
        return $this->belongsTo(Activity::class);
    }

    public function progress(): HasMany
    {
        return $this->hasMany(StudentProgress::class);
    }
}
