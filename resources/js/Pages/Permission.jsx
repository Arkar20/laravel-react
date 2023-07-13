import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";

export default function Permission({ auth ,permissions}) {
console.log("🚀 ~ file: Permission.jsx:9 ~ Permission ~ permissions:", permissions)

    
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
                            <form className="mt-6 space-y-6">
                                <div>
                                    <InputLabel
                                        htmlFor="role"
                                        value="Select Role"
                                    />

                                    <select className="w-full" id="role">
                                        <option value="">Admin</option>
                                        <option value="">User</option>
                                        <option value="">Employee</option>
                                    </select>

                                    <InputError className="mt-2" />
                                </div>
                                <div>
                                    <InputLabel htmlFor="name" value="Name" />

                                    <TextInput
                                        id="name"
                                        className="mt-1 block w-full"
                                        required
                                        isFocused
                                        autoComplete="name"
                                    />

                                    <InputError className="mt-2" />
                                </div>
                                <PrimaryButton disabled={false}>
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
