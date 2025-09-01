<?php

// namespace App\Http\Controllers\Api;

// use App\Http\Controllers\Controller;
// use App\Models\Product;
// use Illuminate\Http\Request;
// use Illuminate\Support\Facades\Storage;

// class ProductController extends Controller
// {
//     // Fetch all products
//     public function index()
//     {
//         return response()->json(Product::all());
//     }

//     // Store new product
//     public function store(Request $request)
//     {
//         $request->validate([
//             'name'  => 'required|string|max:255',
//             'price' => 'required|numeric',
//             'image' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
//         ]);

//         $imagePath = null;

//         if ($request->hasFile('image')) {
//             $imagePath = $request->file('image')->store('products', 'public');
//         }

//         $product = Product::create([
//             'name'  => $request->name,
//             'price' => $request->price,
//             'image' => $imagePath,
//         ]);

//         return response()->json([
//             'message' => 'Product added successfully!',
//             'product' => $product
//         ], 201);
//     }

//     // Update product
//     public function update(Request $request, $id)
//     {
//         $product = Product::findOrFail($id);

//         $request->validate([
//             'name'  => 'required|string|max:255',
//             'price' => 'required|numeric',
//             'image' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
//         ]);

//         if ($request->hasFile('image')) {
//             // Delete old image if exists
//             if ($product->image && Storage::disk('public')->exists($product->image)) {
//                 Storage::disk('public')->delete($product->image);
//             }
//             $product->image = $request->file('image')->store('products', 'public');
//         }

//         $product->name = $request->name;
//         $product->price = $request->price;
//         $product->save();

//         return response()->json([
//             'message' => 'Product updated successfully!',
//             'product' => $product
//         ]);
//     }

//     // Delete product
//     public function destroy($id)
//     {
//         $product = Product::findOrFail($id);

//         // Delete image if exists
//         if ($product->image && Storage::disk('public')->exists($product->image)) {
//             Storage::disk('public')->delete($product->image);
//         }

//         $product->delete();

//         return response()->json([
//             'message' => 'Product deleted successfully!'
//         ]);
//     }
// }





// namespace App\Http\Controllers\Api;

// use App\Http\Controllers\Controller;
// use App\Models\Product;
// use Illuminate\Http\Request;
// use Illuminate\Support\Facades\Storage;

// class ProductController extends Controller
// {
//     // Fetch all products
//     public function index()
//     {
//         $products = Product::all()->map(function ($product) {
//             $product->image_url = $product->image 
//                 ? asset('storage/' . $product->image)   // ✅ full URL returned
//                 : null;
//             return $product;
//         });

//         return response()->json($products);
//     }

//     // Store new product
//     public function store(Request $request)
//     {
//         $request->validate([
//             'name'  => 'required|string|max:255',
//             'price' => 'required|numeric',
//             'image' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
//         ]);

//         $imagePath = null;

//         if ($request->hasFile('image')) {
//             $imagePath = $request->file('image')->store('products', 'public');
//         }

//         $product = Product::create([
//             'name'  => $request->name,
//             'price' => $request->price,
//             'image' => $imagePath,
//         ]);

//         // attach full URL for API response
//         $product->image_url = $imagePath ? asset('storage/' . $imagePath) : null;

//         return response()->json([
//             'message' => 'Product added successfully!',
//             'product' => $product
//         ], 201);
//     }

//     // Update product
//     public function update(Request $request, $id)
//     {
//         $product = Product::findOrFail($id);

//         $request->validate([
//             'name'  => 'required|string|max:255',
//             'price' => 'required|numeric',
//             'image' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
//         ]);

//         if ($request->hasFile('image')) {
//             // Delete old image if exists
//             if ($product->image && Storage::disk('public')->exists($product->image)) {
//                 Storage::disk('public')->delete($product->image);
//             }
//             $product->image = $request->file('image')->store('products', 'public');
//         }

//         $product->name = $request->name;
//         $product->price = $request->price;
//         $product->save();

//         // include image_url in response
//         $product->image_url = $product->image ? asset('storage/' . $product->image) : null;

//         return response()->json([
//             'message' => 'Product updated successfully!',
//             'product' => $product
//         ]);
//     }

//     // Delete product
//     public function destroy($id)
//     {
//         $product = Product::findOrFail($id);

//         // Delete image if exists
//         if ($product->image && Storage::disk('public')->exists($product->image)) {
//             Storage::disk('public')->delete($product->image);
//         }

//         $product->delete();

//         return response()->json([
//             'message' => 'Product deleted successfully!'
//         ]);
//     }
// }




namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ProductController extends Controller
{
    // Fetch all products
public function index()
{
    return response()->json(Product::all());
}


    // Store new product
    public function store(Request $request)
    {
        $request->validate([
            'name'  => 'required|string|max:255',
            'price' => 'required|numeric',
            'image' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
        ]);

        $imagePath = null;

        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('products', 'public');
        }

        $product = Product::create([
            'name'  => $request->name,
            'price' => $request->price,
            'image' => $imagePath,
        ]);

        $product->image_url = $product->image 
            ? asset('storage/' . $product->image) 
            : null;

        return response()->json([
            'message' => 'Product added successfully!',
            'product' => $product
        ], 201);
    }

    // Update product
    public function update(Request $request, $id)
    {
        $product = Product::findOrFail($id);

        $request->validate([
            'name'  => 'required|string|max:255',
            'price' => 'required|numeric',
            'image' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
        ]);

        if ($request->hasFile('image')) {
            // Delete old image if exists
            if ($product->image && Storage::disk('public')->exists($product->image)) {
                Storage::disk('public')->delete($product->image);
            }
            $product->image = $request->file('image')->store('products', 'public');
        }

        $product->name = $request->name;
        $product->price = $request->price;
        $product->save();

        $product->image_url = $product->image 
            ? asset('storage/' . $product->image) 
            : null;

        return response()->json([
            'message' => 'Product updated successfully!',
            'product' => $product
        ]);
    }

    // Delete product
    public function destroy($id)
    {
        $product = Product::findOrFail($id);

        if ($product->image && Storage::disk('public')->exists($product->image)) {
            Storage::disk('public')->delete($product->image);
        }

        $product->delete();

        return response()->json([
            'message' => 'Product deleted successfully!'
        ]);
    }
}
