<?php

namespace App\Http\Controllers;

use App\Models\Department;
use App\Models\User;
use Illuminate\Http\Request;
use Spatie\Permission\Models\Role;

class UserController extends Controller
{
    public function index(Request $request)
    {

        $users = User::with('roles', 'department')
            ->when($request->name, fn($query) => $query->where('name',"LIKE",'%'.$request->name.'%'))
            ->when($request->email, fn($query) => $query->where('email',"LIKE",'%'.$request->email.'%'))
            ->when($request->role, fn($query) => $query->whereHas('roles',fn($query1)=>$query1->where('id',$request->role)),)
            ->when($request->department, fn($query) => $query->where('department_id',$request->department))
            ->latest()
            ->paginate(10);

        $roles = Role::all();

        $departments = Department::all();

        return inertia('User/Index', ['users' => $users,
            'roles' => $roles,
            'departments' => $departments,
            'query' => [
                'name'=>$request->name ,
                "email"=>$request->email,
                "role"=>$request->role,
                "department"=>$request->department,
            ]]);
    }
}
