<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Spatie\Permission\Exceptions\RoleAlreadyExists;
use Spatie\Permission\Models\Role;

class RoleController extends Controller
{

    public function index()
    {
        $roles = Role::all();

        return inertia('Role', [
            'roles' => $roles,
        ]);
    }
    public function store(Request $request)
    {
        try {
            Role::create(['name' => $request->role]);

            return back();

        } catch (RoleAlreadyExists $e) {

            return back()->withErrors(['msg' => 'Role already exists']);
        }

    }
    public function destroy(Request $request, $id)
    {
        $role = Role::findOrFail($request->id);
        $role->delete();
        return back();
    }
}
