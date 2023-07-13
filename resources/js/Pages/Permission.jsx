import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import { useForm } from "@inertiajs/react";
import FormContainer from "@/Components/FormContainer";
export default function Permission({ auth, permissions, roles }) {
    const { data, setData, post, errors, processing, recentlySuccessful } =
        useForm({
            role_id: roles.length ? roles[0].id : null,
            permission: permissions.length ? permissions[0].value : null,
        });

    const submit = (e) => {
        e.preventDefault();

        post(route("permission.create"));
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
            <FormContainer>
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
                        <InputLabel htmlFor="role" value="Select Role" />

                        <select
                            className="w-full"
                            id="role"
                            value={data.role_id}
                            onChange={(e) => setData("role_id", e.target.value)}
                        >
                            {roles
                                ? roles.map((role) => (
                                      <option value={role.id} key={role.id}>
                                          {role.name}
                                      </option>
                                  ))
                                : ""}
                        </select>

                        <InputError className="mt-2" />
                    </div>
                    <div>
                        <InputLabel htmlFor="permission" value="Name" />

                        <select
                            className="w-full"
                            id="permission"
                            value={data.permission}
                            onChange={(e) =>
                                setData("permission", e.target.value)
                            }
                        >
                            {permissions
                                ? permissions.map((permission, index) => (
                                      <option
                                          value={permission.value}
                                          key={index}
                                      >
                                          {permission.label}
                                      </option>
                                  ))
                                : ""}
                        </select>

                        <InputError className="mt-2" />
                    </div>
                    <PrimaryButton disabled={processing}>Save</PrimaryButton>
                </form>
            </FormContainer>
        </AuthenticatedLayout>
    );
}
