import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import PrimaryButton from "@/Components/PrimaryButton";

export default function User({ auth }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        Users
                    </h2>
                    <Link href={route('user.create')}>
                        <PrimaryButton>Create New User</PrimaryButton>
                    </Link>
                </div>
            }
        >
            <Head title="Users" />
        </AuthenticatedLayout>
    );
}
