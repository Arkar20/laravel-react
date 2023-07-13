import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import { useForm } from "@inertiajs/react";
export default function Permission({ auth ,permissions,roles}) {
    console.log("🚀 ~ file: Permission.jsx:8 ~ Permission ~ permissions:", permissions)
    const { data, setData, post, errors, processing, recentlySuccessful } = useForm();

    const submit = (e) => {
        e.preventDefault();

        post(route('permission.create'));
    };
    
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Assign Permissions
                </h2>
            }
        >
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        <section className="max-w-xl">
                            <header>
                                <h2 className="text-lg font-medium text-gray-900">
                                    Assign Permission
                                </h2>

                                <p className="mt-1 text-sm text-gray-600">
                                    Please Assign Permission to the Role
                                </p>
                            </header>
                            <form className="mt-6 space-y-6" onSubmit={submit}>
                                <div>
                                    <InputLabel
                                        htmlFor="role"
                                        value="Select Role"
                                    />

                                    <select className="w-full" id="role" value={data.role_id} onChange={(e)=>setData('role_id',e.target.value)}>
                                        {
                                            roles ? roles.map(role=> <option value={role.id} key={role.id}>{role.name}</option>) : ""
                                        }
                                    </select>

                                    <InputError className="mt-2" />
                                </div>
                                <div>
                                    <InputLabel htmlFor="permission" value="Name" />

                                    <select className="w-full" id="permission" value={data.permission} onChange={(e)=>setData('permission',e.target.value)}>
                                        {
                                            permissions ? permissions.map((permission,index)=> <option value={permission.value} key={index}>{permission.label}</option>) : ""
                                        }
                                    </select>

                                    <InputError className="mt-2" />
                                </div>
                                <PrimaryButton disabled={processing}>
                                    Save
                                </PrimaryButton>
                            </form>
                        </section>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
