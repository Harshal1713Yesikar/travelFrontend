import { UserX2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import useScrollAnimation from "../useScrollAnimation";
import toast from "react-hot-toast";

const Admin = () => {


    useScrollAnimation()

    const [data, setData] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    const handleRemove = async (userId) => {

        try {
            const res = await fetch(`${process.env.REACT_APP_Backend_URL}/delete/${userId}`, { method: "DELETE" });

            const result = await res.json()
            console.log("user Deleted", result)

            if (res.ok) {
                toast.success("User removed successfully", { position: "bottom-right" });
                fetchData();
                setShowPopup(false);
            }
            else {
                toast.error(result.msg || "Failed to delete user", { position: "bottom-right" });
            }
        } catch (error) {

            console.error("Delete error:", error);
            toast.error("Something went wrong!");

        }
    };

    const fetchData = async () => {
        try {
            const res = await fetch(`${process.env.REACT_APP_Backend_URL}/getData`);
            const result = await res.json();
            setData(result.data || result);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="p-3 mt-10 flex justify-center">
            <div className="overflow-x-auto max-h-[457px]">
                <table className="min-w-96 border  border-gray-300 rounded-lg shadow-md bg-white text-sm md:text-base">
                    <thead className="bg-gradient-to-r from-yellow-200 to-yellow-100 text-gray-800 sticky top-0">
                        <tr>


                            <th className="py-3 px-4 border-b text-left">No.</th>
                            <th className="py-3 px-4 border-b text-left">Name</th>
                            <th className="py-3 px-4 border-b text-left">Email</th>
                            <th className="py-3 px-4 border-b text-left">Delete</th>
                        </tr>
                    </thead>

                    <tbody>
                        {data?.length > 0 ? (
                            data.map((item, index) => (
                                <tr
                                    key={item._id || index}
                                    className={`${index % 2 === 0 ? "bg-white" : "bg-yellow-50"
                                        } hover:bg-yellow-100 transition`}
                                >
                                    <td className="py-3 px-4 border-b">{index + 1}</td>
                                    <td className="py-3 px-4 border-b">{item.name}</td>
                                    <td className="py-3 px-4 border-b">{item.email}</td>
                                    <td className="py-3 px-4 border-b">
                                        <button
                                            onClick={() => {
                                                setSelectedUser(item);
                                                setShowPopup(true);
                                            }}
                                            className="flex items-center gap-2 px-4 py-1 bg-red-100 text-red-600 border border-red-300 rounded hover:bg-red-200"
                                        >
                                            <UserX2 size={18} />
                                            Remove
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="text-center py-6 text-gray-500">
                                    No users found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {showPopup && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
                    <div className="bg-white rounded-lg p-6 w-full max-w-sm shadow-lg">
                        <h2 className="text-lg font-semibold mb-4 text-gray-800">
                            You can remove user{" "}
                            <span className="text-red-500">{selectedUser?.name}</span>
                        </h2>
                        <div className="flex justify-end gap-4">
                            <button
                                onClick={() => setShowPopup(false)}
                                className="px-4 py-2 border rounded hover:bg-gray-100"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => {
                                    handleRemove(selectedUser._id);
                                    setShowPopup(false);
                                }}
                                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                            >
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Admin;
