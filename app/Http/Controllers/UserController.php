<?php

namespace App\Http\Controllers;

use App\Models\User;
use Spatie\Permission\Models\Role;
use App\Models\Department;

class UserController extends Controller
{
    public function index()
    {
        $users = User::with('roles','department')->paginate(10);

        $roles = Role::all();

        $departments = Department::all();

        return inertia('User/Index', ['users' => $users, 'roles' => $roles, 'departments' => $departments]);
    }
}
