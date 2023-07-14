<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\Order;
use Spatie\Permission\Models\Role;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $user = \App\Models\User::factory()->create([
            'email' => 'admin@gmail.com',
            'password' => Hash::make('password'),
        ]);

        $role = Role::create(['name' => 'superadmin']);

        $user->assignRole($role);

        \App\Models\User::factory(100)->create();

        Order::factory(100)->create();
    }
}
