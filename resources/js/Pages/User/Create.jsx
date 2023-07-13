import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import Register from "../Auth/Register";

export default function Create({ auth }) {
    return (
      <Register />
    );
}
