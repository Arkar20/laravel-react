<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $user=\App\Models\User::factory(1)->create([
            'email'=>'admin@gmail.com',
            'password'=> Hash::make('password')
        ]);

        $role=Role::create(['name'=>'superadmin']);

        $user->assignRole($role);


        \App\Models\User::factory(100)->create();
    }
}
