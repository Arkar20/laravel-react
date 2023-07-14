import FormContainer from "@/Components/FormContainer";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router } from "@inertiajs/react";
import { useState } from "react";

export default function Dashboard({
    auth,
    total_sale,
    total_purchase,
    date,
    fb_data,
}) {

    const [token, setToken] = useState(
        "EAAD6QxWUiPUBAGg0Nf5KZC5o1dfJdXszZASZAaO7OYzrjknZAsZBmv8TeizZBB2VZBtjNqrBmuUiWtv8HoyzVi21GxzpnZCOHFsbC8N0cSbqIz5VHTg4RCPLctqCUZCXYRKqBgmcSLjucxRZCRlZBZBnExBfw1zuBzxviUiP10FcPXj0UeIHllPnuRgWMejBlErkFXwZD"
    );
    const result = total_sale - total_purchase;

    const handleSubmit = (e) => {
        e.preventDefault();
        router.get(route("dashboard"), {
            token,
        });
    };
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
                                    {result < 0 ? (
                                        <p className="text-red-600">
                                            You are losing
                                        </p>
                                    ) : (
                                        <p className="text-green-600">
                                            Congrats You make profits
                                        </p>
                                    )}
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <FormContainer>
                <h1 className="text-2xl font-semibold">
                    This is the connection with the Facebook Marketing Api
                </h1>
                <p>
                    You need to provide your facebook app access token of the
                    acc/page and we will provide you the information{" "}
                </p>
                <form onSubmit={handleSubmit} className="mt-4">
                    <input
                        type="text"
                        className="w-full"
                        value={token}
                        onChange={(e) => setToken(e.target.value)}
                    />

                    <button className="px-4 py-1 bg-gray-900 rounded-lg text-white mt-6">
                        Submit
                    </button>
                </form>

                <h3 className="font-semibold text-2xl mt-8">Results</h3>
                <ul>
                    {fb_data && fb_data.error && <p className="text-red-800">{fb_data.error.message}</p> }
                    {fb_data && !fb_data.error && fb_data.adaccounts &&
                        fb_data.adaccounts.data.map((data, index) => {
                            return <li key={index}>{data.name}</li>;
                        })}
                </ul>
            </FormContainer>
        </AuthenticatedLayout>
    );
}
