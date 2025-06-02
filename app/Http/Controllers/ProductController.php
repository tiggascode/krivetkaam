<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Http\Resources\ProductResource;

class ProductController extends Controller
{
    public function show($id)
    {
        $value = Product::findOrFail($id);


        $product = [
            'id'          => $value->id,
            'title'       => $value->title,
            'description' => $value->description,
            'price'       => number_format($value->price, 0),
            'quantity'    => $value->quantity,
            'images'      => $value->images,
        ];

        return Inertia::render('ProductPage', [
            'product' =>$product
        ]);
    }
} 