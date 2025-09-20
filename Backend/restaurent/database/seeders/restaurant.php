<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class restaurant extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $path = database_path('seeders/data/restaurants.json');
        $json = file_get_contents($path);
        $data = json_decode($json, true);

        foreach ($data as $item) {
            \DB::table('restaurants')->insert([
                'id' => $item['id'],
                'name' => $item['name'],
                'location' => $item['location'],
                'cuisine' => $item['cuisine'],
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
