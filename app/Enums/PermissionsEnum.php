<?php

namespace App\Enums;

enum PermissionsEnum: string {

case CAN_CREATE_USER = 'can_create_user';
case CAN_VIEW_USER = 'can_view_user';
case CAN_DELETE_USER = 'can_delete_user';
case CAN_UPDATE_USER = 'can_update_user';

    public function label()
    {
        return match ($this) {
            static::CAN_CREATE_USER => 'Can Create User',
            static::CAN_VIEW_USER => 'Can View Users',
            static::CAN_DELETE_USER => 'Can Delete User',
            static::CAN_UPDATE_USER => 'Can Update User',
        };

    }

    public static function choices()
    {
        return collect(static::cases())->map(function ($case) {
            return [$case->name => $case->label()];
        });
    }
}
