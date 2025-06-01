<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'price',
        'quantity',
        'images',
    ];

    protected $casts = [
        'price' => 'decimal:2',
        'images' => 'array',
    ];

    protected $appends = ['image_urls', 'primary_image'];

    public function getImageUrlsAttribute()
    {
        if (!$this->images) return [];
        
        return collect($this->images)->map(function ($image) {
            if (empty($image)) return null;
            return Storage::disk('public')->url($image);
        })->filter()->values()->toArray();
    }

    public function getPrimaryImageAttribute()
    {
        if (!$this->images || empty($this->images)) {
            return null;
        }
        
        // Get the first image as primary
        $firstImage = $this->images[0];
        return Storage::disk('public')->url($firstImage);
    }

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($product) {
            // Create product directory if it doesn't exist
            if (!Storage::disk('public')->exists("products/{$product->id}")) {
                Storage::disk('public')->makeDirectory("products/{$product->id}");
            }
        });

        static::deleting(function ($product) {
            // Delete associated images when product is deleted
            if ($product->images) {
                collect($product->images)->each(function ($image) {
                    Storage::disk('public')->delete($image);
                });
            }
            // Delete the product directory
            Storage::disk('public')->deleteDirectory("products/{$product->id}");
        });
    }
}
