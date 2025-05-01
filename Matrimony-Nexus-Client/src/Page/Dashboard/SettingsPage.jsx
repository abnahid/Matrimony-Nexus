import { Button } from "@/Components/ui/button";
import { AuthContext } from "@/context/AuthProvider";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";

const SettingsPage = () => {
    const { user } = useContext(AuthContext);

    const axiosPublic = useAxiosPublic();

    const [userData, setUserData] = useState({
        name: "",
        email: "",
        photoUrl: "", // Align field name
        phoneNumber: "",
        address: "",
    });
    const [isLoading, setIsLoading] = useState(false);

    // Fetch user details
    useEffect(() => {
        const fetchUserData = async () => {
            if (!user?.email) return;

            setIsLoading(true); // Show loading while fetching

            try {
                const response = await axiosPublic.get(`/users/${user.email}`);
                const userInfo = response.data;

                if (userInfo) {
                    setUserData({
                        name: userInfo.name || "",
                        email: userInfo.email || user.email,
                        photoUrl: userInfo.photoUrl || "", // Align field name
                        phoneNumber: userInfo.phoneNumber || "",
                        address: userInfo.address || "",
                    });
                } else {
                    // No user info in DB, but fallback to default email
                    setUserData(prev => ({
                        ...prev,
                        email: user.email,
                    }));
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
            } finally {
                setIsLoading(false); // Stop loading
            }
        };

        fetchUserData();
    }, [user?.email, axiosPublic]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await axiosPublic.patch(`/users/${user.email}`, userData);

            if (response.data) {
                Swal.fire("Success!", "Your profile has been updated.", "success");
            } else {
                Swal.fire("Error!", response.data.message || "Failed to update profile.", "error");
            }
        } catch (error) {
            console.error("Error updating user data:", error);
            Swal.fire("Error!", "Something went wrong. Please try again.", "error");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="container mx-auto p-10 py-24">
            <h2 className="text-3xl font-bold mb-6">Settings</h2>
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg space-y-6">
                {/* Display Name */}
                <div>
                    <label className="block text-sm font-medium">Display Name</label>
                    <input
                        type="text"
                        name="displayName"
                        value={userData.name}
                        onChange={handleChange}
                        className="w-full p-2 border rounded bg-white"
                        required
                    />
                </div>

                {/* Email */}
                <div>
                    <label className="block text-sm font-medium">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={userData.email}
                        onChange={handleChange}
                        className="w-full p-2 border rounded bg-white"
                        disabled
                    />
                </div>

                {/* Photo URL */}
                <div>
                    <label className="block text-sm font-medium">Photo URL</label>
                    <input
                        type="text"
                        name="photoUrl" // Align field name
                        value={userData.photoUrl} // Align field name
                        onChange={handleChange}
                        placeholder="Enter a photo URL"
                        className="w-full p-2 border rounded bg-white"
                    />
                    {userData.photoUrl && (
                        <div className="mt-4">
                            <img
                                src={userData.photoUrl} // Align field name
                                alt="Profile"
                                className="w-32 h-32 object-cover rounded-full border"
                            />
                        </div>
                    )}
                </div>

                {/* Phone Number */}
                <div>
                    <label className="block text-sm font-medium">Phone Number</label>
                    <input
                        type="tel"
                        name="phoneNumber"
                        value={userData.phoneNumber}
                        onChange={handleChange}
                        placeholder="Enter your phone number"
                        className="w-full p-2 border rounded bg-white"
                    />
                </div>

                {/* Address */}
                <div>
                    <label className="block text-sm font-medium">Address</label>
                    <textarea
                        name="address"
                        value={userData.address}
                        onChange={handleChange}
                        placeholder="Enter your address"
                        className="w-full p-2 border rounded bg-white"
                    ></textarea>
                </div>

                {/* Submit Button */}
                <Button
                    type="submit"
                    className="w-full py-2 bg-BgPrimary text-white rounded shadow-md hover:bg-red-700"
                    disabled={isLoading}
                >
                    {isLoading ? "Updating..." : "Save Changes"}
                </Button>
            </form>
        </div>
    );
};

export default SettingsPage;
