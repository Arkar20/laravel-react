<?php

use App\Enums\PermissionsEnum;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\UserExcelExportController;
use App\Models\User;
use Illuminate\Foundation\Application;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use App\Models\Order;
use App\Http\Controllers\RoleController;

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
    $date = \Carbon\Carbon::today()->subDays(30);

    $purchases=Order::where('type','purchase')->where('created_at','>=',$date);

    $sales=Order::where('type','sale')->where('created_at','>=',$date);

    $total_purchase=$purchases->sum('total_cost');

    $total_sale=$sales->sum('total_cost');

    return Inertia::render('Dashboard',[
        'total_purchase'=> $total_purchase,
        'total_sale'=>$total_sale,
        'date'=> 30
    ]);

})->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/permissions', function () {

    $roles = Role::all();

    $permissions = PermissionsEnum::choices();

    return inertia('Permission', ['permissions' => $permissions, 'roles' => $roles]);

})->name('permission');

Route::post('/permissions/create', function (Request $request) {

    $role = Role::findOrFail($request->role_id);

    if (!$permission = Permission::where('name', $request->permission)->first()) {
        $permission = Permission::create(['name' => $request->permission]);
    }

    $role->givePermissionTo($permission);

    return back();

})->name('permission.create');

Route::get('/roles', [RoleController::class,'index'])->name('role');

Route::post('/roles/create',[RoleController::class,'store'])->name('role.create');

Route::delete('/roles/{id}', [RoleController::class,'destroy'])->name('role.delete');

Route::get('/users', [UserController::class, 'index'])->name('user');

Route::
    middleware('permission:' . PermissionsEnum::CAN_CREATE_USER->value)
    ->get('/users/create', [RegisteredUserController::class, 'create'])
    ->name('user.create');

Route::middleware('permission:' . PermissionsEnum::CAN_CREATE_USER->value)
    ->post('/users/create', [RegisteredUserController::class, 'store'])
    ->name('user.store');

Route::middleware('permission:' . PermissionsEnum::CAN_EXPORT_USER->value)
    ->get('/users/export', [UserExcelExportController::class, 'export'])
    ->name('user.export');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
