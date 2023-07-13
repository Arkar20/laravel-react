import React from "react";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Permission({ auth }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Permission
                </h2>
            }
        >
            <div>Permission page</div>

        </AuthenticatedLayout>
    );
}
