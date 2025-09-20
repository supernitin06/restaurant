<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Restaurant;
use App\Models\Orders;
use Illuminate\Support\Facades\DB;

class OrdersController extends Controller
{


    public function allorders($id)
    {
        $orders = Orders::where('restaurant_id', $id)->get();
        return response()->json($orders);
    }





public function getorders($id, Request $request)
{
    $request->validate([
        'start_date' => 'nullable|date',
        'end_date' => 'nullable|date|after_or_equal:start_date',
    ]);

    // Get restaurant
    $restaurant = Restaurant::findOrFail($id);

    // Get orders ordered by order_time descending
    $orders = Orders::where('restaurant_id', $restaurant->id)
                    ->orderBy('order_time', 'asc')
                    ->get();

    // Filter by start_date
    if ($request->filled('start_date')) {
        $orders = $orders->filter(fn($order) => $order->order_time >= $request->start_date);
    }

    // Filter by end_date
    if ($request->filled('end_date')) {
        $orders = $orders->filter(fn($order) => $order->order_time <= $request->end_date);
    }

return response()->json([
    'restaurant_id' => $restaurant->id,
    'restaurant_name' => $restaurant->name,
    'orders_count' => $orders->count(),
    'orders' => $orders->values(), // ensure array format
]);
}



    public function orderscount($id, Request $request)
    {
        

        $restaurant = Restaurant::findOrFail($id);

        // Prefer DB aggregation for efficiency. Fallback to collection if model/column names differ.
        // Assumes orders table has restaurant_id and order_time (datetime/date) columns.


        if ($request->filled('count')) {

            $query = DB::table('orders')
                ->selectRaw('DATE(order_time) as order_date, COUNT(*) as Total_orders')
                ->where('restaurant_id', $restaurant->id)
                ->groupBy(DB::raw('DATE(order_time)'))
                ->orderBy('order_date', 'asc');
        }

        if ($request->filled('revenue')) {
            $query = Db::table('orders')->
                selectRaw('DATE(order_time) as order_date, SUM(order_amount) as Total_collection in Rs')
                ->where('restaurant_id', $restaurant->id)
                ->groupBy(DB::raw('DATE(order_time)'))
                ->orderBy('order_date', 'asc');
        }
        if ($request->filled('avg')) {
            $query = Db::table('orders')->
                selectRaw(' AVG(order_amount) as total_revenur in Rs')
                ->where('restaurant_id', $restaurant->id);
        }
        if ($request->filled('peakhours')) {
            $query = DB::table('orders')
                ->selectRaw(' TIME(order_time) as order_hour, COUNT(*) as total_orders')
                ->where('restaurant_id', $restaurant->id)
                ->groupBy(DB::raw(' TIME(order_time)'))
                ->orderBy('total_orders', 'desc')
                ->limit(1);

        }


        $grouped = $query->get();

        return response()->json([
            'restaurant_id' => $restaurant->id,
            'restaurant_name' => $restaurant->name,
            'groups' => $grouped,
        ]);
    }




    public function toprevenue(Request $request){



        $restaurentrevenue = DB::table('orders')
            ->selectRaw('restaurant_id, SUM(order_amount) as total_revenue')
            ->groupBy('restaurant_id')
            ->orderBy('total_revenue', 'desc')
            ->limit(3);

      
        $query = DB::table('restaurants')
         ->joinsub($restaurentrevenue, 'r', 'restaurants.id', '=', 'r.restaurant_id')
         ->select('restaurants.id', 'restaurants.name', 'r.total_revenue');



            $res = $query->get();
            return response()->json(
                $res
            );
    }





}
