import React from "react";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Role({ auth }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Role
                </h2>
            }
        >
            <div>Role page</div>

        </AuthenticatedLayout>
    );
}
