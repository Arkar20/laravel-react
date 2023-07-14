<?php

namespace App\Exports;

use App\Models\User;
use Maatwebsite\Excel\Concerns\FromCollection;
use Illuminate\Contracts\Support\Responsable;
use Maatwebsite\Excel\Concerns\Exportable;
use Maatwebsite\Excel\Concerns\FromQuery;
use Illuminate\Http\Request;
use Maatwebsite\Excel\Concerns\WithHeadings;

class ExportUsers implements FromCollection,Responsable,WithHeadings
{
    use Exportable;
    public $request;
    public function __construct(Request $request)
    {
        $this->request=$request;
    }

    private $headers = [
        'Content-Type' => 'text/csv',
    ];
    /**
    * @return \Illuminate\Support\Collection
    */
    public function collection()
    {
        return   $users = User::with('roles', 'department')
        ->when($this->request->name, fn($query) => $query->where('name',"LIKE",'%'.$this->request->name.'%'))
        ->when($this->request->email, fn($query) => $query->where('email',"LIKE",'%'.$this->request->email.'%'))
        ->when($this->request->role, fn($query) => $query->whereHas('roles',fn($query1)=>$query1->where('id',$this->request->role)),)
        ->when($this->request->department, fn($query) => $query->where('department_id',$this->request->department))
        ->latest()->get()->map(fn($user)=>[
            'id'=>$user->id,
            'name'=>$user->name,
            'email'=>$user->email,
            'role'=>$user->roles->pluck('name')->implode(','),
            'department'=>$user->department?->name,
        ]);
        
    }
    public function headings(): array
    {
        return [
            '#',
            'Name',
            'Email',
            'Role',
            'Department',
        ];
    }
}
