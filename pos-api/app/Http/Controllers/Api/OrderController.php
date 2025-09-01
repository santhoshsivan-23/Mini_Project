<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\OrderItem;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    // Place new order
    public function store(Request $request)
    {
        $request->validate([
            'table_id' => 'required|integer',
            'items'    => 'required|array',
            'items.*.product_id' => 'required|exists:products,id',
            'items.*.quantity'   => 'required|integer|min:1',
        ]);

        $order = Order::create([
            'table_id' => $request->table_id,
            'status'   => 'pending',
        ]);

        foreach ($request->items as $item) {
            OrderItem::create([
                'order_id'   => $order->id,
                'product_id' => $item['product_id'],
                'quantity'   => $item['quantity'],
            ]);
        }

        return response()->json([
            'message' => 'Order placed successfully!',
            'order'   => $order->load('items.product')
        ], 201);
    }

    // Get orders by table
    public function index(Request $request)
    {
        $tableId = $request->query('table_id');

        $orders = Order::with('items.product')
            ->when($tableId, function ($q) use ($tableId) {
                $q->where('table_id', $tableId);
            })
            ->orderBy('id', 'desc')
            ->get();

        return response()->json($orders);
    }

    // Update order status
public function updateStatus(Request $request, $id)
{
    $request->validate([
        'status' => 'required|string|in:pending,preparing,cancelled,served'
    ]);

    $order = Order::findOrFail($id);
    $order->status = $request->status;
    $order->save();

    return response()->json([
        'message' => 'Order status updated successfully!',
        'order'   => $order->load('items.product')
    ]);
}

}
