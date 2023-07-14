import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function Dashboard({ auth, total_sale, total_purchase, date }) {
    console.log("🚀 ~ file: Dashboard.jsx:5 ~ Dashboard ~ date:", date);
    console.log(
        "🚀 ~ file: Dashboard.jsx:5 ~ Dashboard ~ total_purchase:",
        total_purchase
    );
    console.log(
        "🚀 ~ file: Dashboard.jsx:5 ~ Dashboard ~ total_sale:",
        total_sale
    );

    const result = total_sale - total_purchase;
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <h3 className="text-2xl font-semibold">
                                Sample Profit/Loss for last {date} days
                            </h3>

                            <ul className="mt-6">
                                <li>
                                    Total Purchase Amount :{" "}
                                    {Number(total_purchase).toLocaleString(
                                        "my"
                                    )}
                                    MMK
                                </li>
                                <li>
                                    Total Sale Amount :{" "}
                                    {Number(total_sale).toLocaleString("my")}MMK
                                </li>
                                <li>Left : {result}MMK</li>
                                <li>
                                    {result < 0 ?<p className="text-red-600">You are losing</p>:<p className="text-green-600">Congrats You make profits</p>}
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
