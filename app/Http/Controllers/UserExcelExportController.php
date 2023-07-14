<?php

namespace App\Http\Controllers;

use App\Exports\ExportUsers;
use Maatwebsite\Excel\Facades\Excel;

class UserExcelExportController extends Controller
{
    public function export()
    {

        $export = new ExportUsers();
        $filename = 'users' . now() . '.csv';

        $filePath = $filename;

       return Excel::download(new ExportUsers(), $filePath);


    }
}
