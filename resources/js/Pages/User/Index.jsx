import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import PrimaryButton from "@/Components/PrimaryButton";
import FormContainer from "@/Components/FormContainer";
import Table from "@/Components/Table";

export default function User({ auth }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        Users
                    </h2>
                    <Link href={route("user.create")}>
                        <PrimaryButton>Create New User</PrimaryButton>
                    </Link>
                </div>
            }
        >
            <Head title="Users" />

            <FormContainer>
                <div className="flex mb-8">
                    <PrimaryButton>Export To CSV</PrimaryButton>
                </div>
               <Table headers={['id','name','email']} renderTbody={()=><tr>
                <td>Hello </td>
                <td>Hello </td>
                <td>Hello </td>
               </tr>}/>
            </FormContainer>
        </AuthenticatedLayout>
    );
}
