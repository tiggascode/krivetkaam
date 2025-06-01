<?php

namespace App\Filament\Resources\ProductResource\Pages;

use App\Filament\Resources\ProductResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;
use Illuminate\Support\Facades\Storage;

class EditProduct extends EditRecord
{
    protected static string $resource = ProductResource::class;

    protected function getHeaderActions(): array
    {

        return [
            Actions\DeleteAction::make()
                ->before(function () {
                    // Delete all images and the product's directory when deleting the product
                    if ($this->record->images) {
                        foreach ($this->record->images as $image) {
                            Storage::disk('public')->delete($image);
                        }
                    }
                    // Delete the entire product's directory
                    Storage::disk('public')->deleteDirectory("products/{$this->record->id}");
                }),
        ];
    }

    protected function afterSave(): void
    {
        $record = $this->record;
        if ($record->images && is_array($record->images)) {
            // Preserve the order of images as they appear in the form
            $newPaths = collect($record->images)->filter(function ($path) {
                return Storage::disk('public')->exists($path);
            })->values()->toArray();

            // Update the record with the new paths while preserving order
            $record->update(['images' => $newPaths]);

            // Debug log
            \Log::info('Product images after edit:', [
                'product_id' => $record->id,
                'images' => $newPaths
            ]);
        }
    }
}
