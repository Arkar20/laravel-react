import React, { useState, useCallback, useEffect } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import PrimaryButton from "@/Components/PrimaryButton";
import FormContainer from "@/Components/FormContainer";
import Table from "@/Components/Table";
import { debounce } from "lodash";
import { router } from "@inertiajs/react";

export default function User({ auth, users, roles, departments, query }) {
    const [queryString, setQueryString] = useState({
        name: query.name ? query.name : "",
        email: query.email ? query.email : "",
        role: query.role ? query.role : "",
        department: query.department ? query.department : "",
    });

    function removeEmptyValues(obj) {
        for (let key in obj) {
            if (obj.hasOwnProperty(key) && obj[key] === "") {
                delete obj[key];
            }
        }

        return obj;
    }

    const setData = (key, value) => {
        queryString[key] = value;

        setQueryString(() => ({ ...queryString }));

        search(removeEmptyValues(queryString));
    };

    const search = useCallback(
        debounce((search) => {
            router.visit(route("user"), {
                only: ["users"],
                data: search,
                preserveScroll: true,
                preserveState: true,
            });
        }, 100),
        []
    );

    const tBody = () =>
        users.data.map((user) => (
            <tr key={user.id}>
                <td className="py-4">{user.name} </td>
                <td>{user.email}</td>
                <td>
                    {user.roles.length
                        ? user.roles.map((role) => role.name)
                        : "-"}
                </td>
                <td>{user.department?.name}</td>
            </tr>
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
                                        value={queryString.name}
                                        onChange={(e) => {
                                            setData("name", e.target.value);
                                        }}
                                    />
                                </th>
                                <th className="px-2 py-0 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider ">
                                    <span>Email</span>
                                    <br />
                                    <input
                                        type="text"
                                        placeholder="Search By Email"
                                        value={queryString.email}
                                        onChange={(e) => {
                                            setData("email", e.target.value);
                                        }}
                                    />
                                </th>
                                <th className="px-2 py-0 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider ">
                                    <span>Role</span>
                                    <br />
                                    <select
                                        id="role"
                                        onChange={(e) => {
                                            setData("role", e.target.value);
                                        }}
                                    >
                                        <option value="">-</option>
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
                                    <select
                                        id="role"
                                        onChange={(e) => {
                                            setData(
                                                "department",
                                                e.target.value
                                            );
                                        }}
                                    >
                                        <option value="">-</option>

                                        {departments
                                            ? departments.map((department) => (
                                                  <option
                                                      value={department.id}
                                                      key={department.id}
                                                  >
                                                      {department.name}
                                                  </option>
                                              ))
                                            : ""}
                                    </select>
                                </th>
                                <th className="px-2 py-0 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider ">
                                    <span>Actions</span>
                                </th>
                            </>
                        );
                    }}
                    renderTbody={tBody}
                />

                {/* pagination  */}
                <ul className="inline-flex mt-8 border">
                    {users &&
                        users.links.map((link, index) => (
                            <li
                                key={index}
                                className={
                                    link.active
                                        ? "bg-gray-300 px-3 py-1"
                                        : " px-3 py-1"
                                }
                            >
                                <Link
                                    href={link.url}
                                    className={`${
                                        !link.url
                                            ? "cursor-not-allowed text-gray-400"
                                            : ""
                                    }`}
                                    disabled={true}
                                    dangerouslySetInnerHTML={{
                                        __html: link.label,
                                    }}
                                ></Link>
                            </li>
                        ))}
                </ul>
            </FormContainer>
        </AuthenticatedLayout>
    );
}
