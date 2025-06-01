<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class ProductResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $images = $this->images ?? [];
        $imageUrls = collect($images)->map(function ($image) {
            if (empty($image)) return null;
            // Ensure we have a proper URL
            if (str_starts_with($image, 'http')) {
                return $image;
            }
            return asset('storage/' . $image);
        })->filter()->values()->toArray();

        return [
            'id'          => $this->id,
            'title'       => $this->title,
            'description' => $this->description,
            'price'       => number_format($this->price, 2),
            'quantity'    => $this->quantity,
            'images'      => $imageUrls,
            'image'       => !empty($imageUrls) ? $imageUrls[0] : null,
        ];
    }
}
