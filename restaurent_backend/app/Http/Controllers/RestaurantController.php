<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Restaurant;

class RestaurantController extends Controller
{
    // Get all restaurants
    public function index(Request $request)
    {
        $query = Restaurant::query();

        if ($search = $request->query('search')) {
            $query->where('name', 'like', "%{$search}%")
            ->orderBy('name', 'asc');
        }

        if ($location = $request->query('location')) {
            $query->where('location', 'like', "%{$location}%");
        }

        if ($cuisine= $request->query('cuisine')) {
            $query->where('cuisine', 'like', "%{$cuisine}%");
        }

        if ($sort = $request->query('sort')) {
            $direction = $request->query('direction', 'asc');
            $query->orderBy($sort, $direction);
        } else {
            $query->orderBy('name', 'asc');
        }

        $restaurants = $query->paginate($request->query('per_page', 10));
        return response()->json($restaurants);
    }

    // Get a specific restaurant
    public function show($id)
    {
        $restaurant = Restaurant::findOrFail($id); // ✅ Correct casing
        return response()->json($restaurant);
    }
}
