<?php

namespace App\Filament\Resources\ProductResource\Pages;

use App\Filament\Resources\ProductResource;
use Filament\Actions;
use Filament\Resources\Pages\CreateRecord;
use Illuminate\Support\Facades\Storage;

class CreateProduct extends CreateRecord
{
    protected static string $resource = ProductResource::class;

    protected function afterCreate(): void
    {
        $record = $this->record;

        if ($record->images && is_array($record->images)) {
            $newPaths = [];

            foreach ($record->images as $path) {
                if (Storage::disk('public')->exists($path)) {
                    // Move file from temp directory to product's directory if needed
                    if (str_contains($path, 'products/tmp')) {
                        $filename = basename($path);
                        $newPath = "products/{$record->id}/{$filename}";
                        
                        if (Storage::disk('public')->move($path, $newPath)) {
                            $newPaths[] = $newPath;
                        }
                    } else {
                        $newPaths[] = $path;
                    }
                }
            }

            // Update the record with the new paths
            $record->update(['images' => $newPaths]);

            // Debug log
            \Log::info('Product images after create:', [
                'product_id' => $record->id,
                'images' => $newPaths
            ]);
        }
    }
}
