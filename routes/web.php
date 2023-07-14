<?php

use App\Enums\PermissionsEnum;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Models\User;
use App\Http\Controllers\UserController;
use App\Http\Controllers\UserExcelExportController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
 */

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/permissions', function () {

    $roles= Role::all();

    $permissions = PermissionsEnum::choices();

    return inertia('Permission', ['permissions' => $permissions,'roles'=>$roles]);

})->name('permission');

Route::post('/permissions/create', function (Request $request) {

    $role=Role::findOrFail($request->role_id);

    if(!$permission=Permission::where('name',$request->permission)->first()) 
    {
        $permission = Permission::create(['name' => $request->permission]);
    }

    $role->givePermissionTo($permission);

    return back();

})->name('permission.create');

Route::get('/roles', function () {
    return inertia('Role');
})->name('role');

Route::post('/roles/create', function (Request $request) {
    $user = auth()->user();

    Role::create(['name'=>$request->role]);

    return back();
    
})->name('role.create');

Route::get('/users',[UserController::class,'index'])->name('user');

Route::get('/users/create', [RegisteredUserController::class, 'create'])
->name('user.create');

Route::post('/users/create',[RegisteredUserController::class, 'store'])
->name('user.store');

Route::get('/users/export',[UserExcelExportController::class,'export'])->name('user.export');


Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
