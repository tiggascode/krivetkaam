<?php

namespace App\Http\Controllers;

use App\Http\Resources\ProductResource;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index()
    {
        $products = Product::all();
        return Inertia::render('Dashboard',[
            'products' => ProductResource::collection($products),
        ]);
    }
}
