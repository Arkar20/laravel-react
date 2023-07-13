<?php

namespace App\Http\Controllers;

use App\Models\User;
use Spatie\Permission\Models\Role;

class UserController extends Controller
{
    public function index()
    {
        $users = User::with('roles')->get();

        $roles= Role::all();

        return inertia('User/Index', ['users' => $users,'roles'=>$roles]);
    }
}
