import React from "react";

export default function Table({ headers, renderTbody, renderTHeader }) {
    return (
        <div className="mx-auto overflow-x-scroll w-full ">
            <table className="w-full text-center leading-normal border border-1 ">
                <thead>
                    <tr>
                        {!renderTHeader &&
                            headers.map((header) => (
                                <th
                                    key={header}
                                    className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider"
                                >
                                    {header}
                                </th>
                            ))}

                        {renderTHeader && renderTHeader()}
                        {!renderTHeader && (
                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                actions
                            </th>
                        )}
                    </tr>
                </thead>
                <tbody>{renderTbody()}</tbody>
            </table>
        </div>
    );
}
