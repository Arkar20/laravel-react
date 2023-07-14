import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import { router, useForm } from "@inertiajs/react";
import FormContainer from "@/Components/FormContainer";
import Table from "@/Components/Table";

export default function Role({ auth, roles }) {
    const { data, setData, post, errors, processing, recentlySuccessful } =
        useForm();

    const submit = (e) => {
        e.preventDefault();

        post(route("role.create"));
    };

    const handleDelete=(roleId)=>{
        router.delete(route('role.delete',{id: roleId}));
    }
    const tBody = () =>
        roles.map((role) => (
            <tr key={role.id}>
                <td className="py-3">{role.id}</td>
                <td>{role.name}</td>
                <td>
                    <button onClick={()=>handleDelete(role.id)}>
                        Delete
                    </button>
                </td>
            </tr>
        ));
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Roles
                </h2>
            }
        >
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        <section className="max-w-xl">
                            <header>
                                <h2 className="text-lg font-medium text-gray-900">
                                    Role
                                </h2>

                                <p className="mt-1 text-sm text-gray-600">
                                    You Can Create New Role.
                                </p>
                            </header>
                            <form className="mt-6 space-y-6" onSubmit={submit}>
                                {errors.msg && (
                                    <p className="text-xl text-red-500">
                                        {errors.msg}
                                    </p>
                                )}
                                <div>
                                    <InputLabel htmlFor="name" value="Name" />

                                    <TextInput
                                        id="name"
                                        className="mt-1 block w-full"
                                        value={data.role}
                                        onChange={(e) =>
                                            setData("role", e.target.value)
                                        }
                                        required
                                        isFocused
                                        autoComplete="name"
                                    />

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

            <FormContainer>
                <Table headers={["id", "role name"]} renderTbody={tBody} />
            </FormContainer>
        </AuthenticatedLayout>
    );
}
