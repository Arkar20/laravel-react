import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import PrimaryButton from "@/Components/PrimaryButton";
import FormContainer from "@/Components/FormContainer";
import Table from "@/Components/Table";

export default function User({ auth, users, roles }) {
 
    const tBody = () =>
        users.map((user) => (
            <>
                {" "}
                <tr>
                    <td class="py-4">{user.name} </td>
                    <td>{user.email}</td>
                    <td>
                        {user.roles.length
                            ? user.roles.map((role) => role.name)
                            : "-"}
                    </td>
                </tr>
            </>
        ));

        
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
                <Table
                    renderTHeader={() => {
                        return (
                            <>
                                <th className="px-2 py-0 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider ">
                                    <span>Name</span>
                                    <br />
                                    <input
                                        type="text"
                                        placeholder="Search By Name"
                                    />
                                </th>
                                <th className="px-2 py-0 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider ">
                                    <span>Email</span>
                                    <br />
                                    <input
                                        type="text"
                                        placeholder="Search By Name"
                                    />
                                </th>
                                <th className="px-2 py-0 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider ">
                                    <span>Role</span>
                                    <br />
                                    <select
                                        className="w-full"
                                        id="role"
                                    >
                                        {roles
                                            ? roles.map((role) => (
                                                  <option
                                                      value={role.id}
                                                      key={role.id}
                                                  >
                                                      {role.name}
                                                  </option>
                                              ))
                                            : ""}
                                    </select>
                                </th>
                                <th className="px-2 py-0 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider ">
                                    <span>Department</span>
                                    <br />
                                    <input
                                        type="text"
                                        placeholder="Search By Name"
                                    />
                                </th>
                                <th className="px-2 py-0 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider ">
                                    <span>Actions</span>
                                </th>
                            </>
                        );
                    }}
                    renderTbody={tBody}
                />
            </FormContainer>
        </AuthenticatedLayout>
    );
}
