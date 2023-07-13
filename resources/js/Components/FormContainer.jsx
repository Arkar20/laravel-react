import React from "react";

export default function ({children}) {
    return (
        <div className="py-12">
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                    <section>
                        {children}
                    </section>
                </div>
            </div>
        </div>
    );
}
