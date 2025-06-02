<?php

namespace App\Filament\Resources;

use App\Filament\Resources\ProductResource\Pages;
use App\Models\Product;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Support\Facades\Storage;

class ProductResource extends Resource
{
    protected static ?string $model = Product::class;

    protected static ?string $navigationIcon = 'heroicon-o-rectangle-stack';
    protected static ?string $navigationLabel = 'Products';
    protected static ?string $pluralModelLabel = 'Products';
    protected static ?string $modelLabel = 'Product';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Grid::make(2)->schema([
                    Forms\Components\TextInput::make('title')
                        ->required()
                        ->maxLength(255),

                    Forms\Components\TextInput::make('price')
                        ->required()
                        ->numeric()
                        ->prefix('֏'),
                ]),
                Forms\Components\Grid::make(2)->schema([
                    Forms\Components\TextInput::make('quantity')
                        ->required()
                        ->numeric(),

                    Forms\Components\FileUpload::make('images')
                        ->multiple()
                        ->image()
                        ->directory('products/tmp')
                        ->imagePreviewHeight('250')
                        ->openable()
                        ->downloadable()
                        ->preserveFilenames()
                        ->disk('public')
                        ->visibility('public')
                        ->imageResizeMode('contain')
                        ->imageResizeTargetWidth('1920')
                        ->imageResizeTargetHeight('1080')
                        ->panelLayout('grid')
                        ->reorderable()
                        ->deleteUploadedFileUsing(function ($file) {
                            Storage::disk('public')->delete($file);
                        })
                        ->acceptedFileTypes(['image/jpeg', 'image/png', 'image/webp', 'image/gif'])
                        ->maxFiles(5)
                        ->columnSpanFull()
                        ->default(function ($record) {
                            if (!$record || empty($record->images)) {
                                return [];
                            }
                            return $record->images;
                        })
                        ->afterStateUpdated(function ($state, $record) {
                            if ($record && is_array($state)) {
                                $newPaths = collect($state)->map(function ($path) use ($record) {
                                    if (str_contains($path, 'products/tmp')) {
                                        $filename = basename($path);
                                        $newPath = "products/{$record->id}/{$filename}";
                                        if (Storage::disk('public')->move($path, $newPath)) {
                                            return $newPath;
                                        }
                                    }
                                    return $path;
                                })->filter()->values()->toArray();
                                
                                // Update the record with the new paths while preserving order
                                $record->update(['images' => $newPaths]);
                            }
                        })
                        ->dehydrateStateUsing(function ($state) {
                            if (empty($state)) return [];
                            
                            // Preserve the order of images as they appear in the state
                            return collect($state)->map(function ($path) {
                                // Ensure we store relative paths, not full URLs
                                if (str_starts_with($path, Storage::disk('public')->url(''))) {
                                    $relativePath = str_replace(Storage::disk('public')->url(''), '', $path);
                                    return $relativePath;
                                }
                                return $path;
                            })->filter()->values()->toArray();
                        })
                        ->validationMessages([
                            'acceptedFileTypes' => 'The file must be an image (JPEG, PNG, WebP, or GIF).',
                        ])
                ]),
                Forms\Components\Textarea::make('description')
                    ->rows(4)
                    ->maxLength(1000),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\ImageColumn::make('images')
                    ->circular()
                    ->stacked()
                    ->limit(3)
                    ->getStateUsing(function ($record) {
                        return collect($record->images)->map(function ($image) {
                            if (empty($image)) return null;
                            // Convert the storage path to a public URL
                            return url('storage/' . $image);
                        })->filter()->values()->toArray();
                    })
                    ->tooltip('First image is primary'),
                Tables\Columns\TextColumn::make('title')
                    ->sortable()
                    ->searchable()
                    ->wrap()
                    ->limit(50),
                Tables\Columns\TextColumn::make('price')
                    ->money('amd')
                    ->sortable()
                    ->alignRight(),
                Tables\Columns\TextColumn::make('quantity')
                    ->sortable()
                    ->alignRight(),
                Tables\Columns\TextColumn::make('created_at')
                    ->dateTime()
                    ->sortable()
                    ->alignRight(),
            ])
            ->contentGrid([
                'default' => 1,
                'sm' => 2,
                'md' => 3,
                'lg' => 4,
            ])
            ->filters([])
            ->actions([
                Tables\Actions\ViewAction::make()
                    ->form([
                        Forms\Components\Section::make('Product Details')
                            ->schema([
                                Forms\Components\TextInput::make('title')
                                    ->required()
                                    ->maxLength(255),
                                Forms\Components\TextInput::make('price')
                                    ->required()
                                    ->numeric()
                                    ->prefix('֏'),
                                Forms\Components\TextInput::make('quantity')
                                    ->required()
                                    ->numeric(),
                                Forms\Components\Textarea::make('description')
                                    ->rows(4)
                                    ->maxLength(1000),
                                Forms\Components\Grid::make()
                                    ->schema([
                                        Forms\Components\Placeholder::make('images')
                                            ->content(function ($record) {
                                                $images = collect($record->images)->map(function ($image) {
                                                    return url('storage/' . $image);
                                                })->filter()->values()->toArray();
                                                
                                                $html = '<div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">';
                                                foreach ($images as $index => $image) {
                                                    $isPrimary = $index === 0;
                                                    $html .= '<div class="relative aspect-square rounded-lg overflow-hidden bg-gray-100 ' . ($isPrimary ? 'ring-2 ring-primary-500' : '') . '">';
                                                    $html .= '<img src="' . $image . '" alt="Product image" class="w-full h-full object-cover" />';
                                                    if ($isPrimary) {
                                                        $html .= '<div class="absolute top-2 left-2 bg-primary-500 text-white px-2 py-1 rounded text-xs">Primary</div>';
                                                    }
                                                    $html .= '</div>';
                                                }
                                                $html .= '</div>';
                                                
                                                return new \Illuminate\Support\HtmlString($html);
                                            }),
                                    ]),
                            ]),
                    ]),
                Tables\Actions\EditAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\DeleteBulkAction::make(),
            ]);
    }

    public static function getRelations(): array
    {
        return [];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListProducts::route('/'),
            'create' => Pages\CreateProduct::route('/create'),
            'edit' => Pages\EditProduct::route('/{record}/edit'),
        ];
    }
}
