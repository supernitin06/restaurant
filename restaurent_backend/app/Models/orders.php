<?php

namespace App\Models;


use Illuminate\Database\Eloquent\Model;

class Orders extends Model
{
         public function restaurants()
    {
        return $this->belongsTo(Restaurant::class);
    }
}
