<?php

namespace App\Http\Controllers;

use App\Exports\ExportUsers;
use Maatwebsite\Excel\Facades\Excel;
use Illuminate\Http\Request;

class UserExcelExportController extends Controller
{
    public function export(Request $request)
    {


        $filename = 'users' . now() . '.csv';

        $filePath = $filename;

       return Excel::download(new ExportUsers($request), $filePath);

    }
}
