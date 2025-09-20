<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class orders extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $path = database_path('seeders/data/orders.json');
        $content = file_get_contents($path);
        $data = json_decode($content, true);

        foreach ($data as $item) {
            DB::table('orders')->insert([
                'restaurant_id' => $item['restaurant_id'],
                'order_amount'  => $item['order_amount'],
                'order_time'    => $item['order_time'],
            ]);
        }
    }
}
