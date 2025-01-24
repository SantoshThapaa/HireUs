import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { setUser } from "@/redux/authSlice";
import { toast } from "sonner";
import PropTypes from "prop-types";

const UpdateProfileDialog = ({ open, setOpen }) => {
    const [loading, setLoading] = useState(false);
    const { user } = useSelector((store) => store.auth);

    // State for form inputs
    const [input, setInput] = useState({
        fullname: user?.fullname || "",
        age: user?.profile?.age || "",
        email: user?.email || "",
        phoneNumber: user?.phoneNumber || "",
        bio: user?.profile?.bio || "",
        skills: user?.profile?.skills?.join(", ") || "",
        experience: user?.profile?.experience || "",
        latitude: user?.profile?.location?.latitude || "",
        longitude: user?.profile?.location?.longitude || "",
        file: null,
    });

    const dispatch = useDispatch();

    // Event handler for input changes
    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    // Event handler for file input
    const fileChangeHandler = (e) => {
        const file = e.target.files?.[0];
        setInput({ ...input, file });
    };

    // Fetch user's location
    const fetchLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setInput((prev) => ({
                        ...prev,
                        latitude: position.coords.latitude.toFixed(6),
                        longitude: position.coords.longitude.toFixed(6),
                    }));
                    toast.success("Location fetched successfully!");
                },
                (error) => {
                    console.error("Error fetching location:", error);
                    toast.error("Unable to fetch location. Please enter manually.");
                }
            );
        } else {
            toast.error("Geolocation is not supported by your browser.");
        }
    };

    // Form submission handler
    const submitHandler = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("fullname", input.fullname);
        formData.append("age", input.age);
        formData.append("email", input.email);
        formData.append("phoneNumber", input.phoneNumber);
        formData.append("bio", input.bio);
        formData.append("experience", input.experience);
        formData.append("skills", input.skills);
        formData.append("latitude", input.latitude);
        formData.append("longitude", input.longitude);

        if (input.file) {
            formData.append("file", input.file);
        }

        try {
            setLoading(true);
            const res = await axios.post(`${USER_API_END_POINT}/profile/update`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
                withCredentials: true,
            });

            if (res.data.success) {
                dispatch(setUser(res.data.user)); // Update Redux store
                toast.success(res.data.message);
                setOpen(false); // Close the dialog
            } else {
                toast.error(res.data.message || "Something went wrong!");
            }
        } catch (error) {
            console.error("API Error:", error.response || error);
            const message = error.response?.data?.message || "Something went wrong!";
            toast.error(message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent
                className="sm:max-w-[425px]"
                onInteractOutside={() => setOpen(false)}
            >
                <DialogHeader>
                    <DialogTitle>Update Profile</DialogTitle>
                    <DialogDescription>
                        Update your profile details such as name, email, phone number, bio, and
                        location.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={submitHandler}>
                    <div className="grid gap-4 py-4">
                        {/* Full Name */}
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="fullname" className="text-right">
                                Name
                            </Label>
                            <Input
                                id="fullname"
                                name="fullname"
                                type="text"
                                value={input.fullname}
                                onChange={changeEventHandler}
                                className="col-span-3"
                            />
                        </div>
                        {/* Age */}
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="age" className="text-right">
                                Age
                            </Label>
                            <Input
                                id="age"
                                name="age"
                                type="number"
                                value={input.age}
                                onChange={changeEventHandler}
                                className="col-span-3"
                                placeholder="e.g., 25"
                            />
                        </div>
                        {/* Email */}
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="email" className="text-right">
                                Email
                            </Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                value={input.email}
                                onChange={changeEventHandler}
                                className="col-span-3"
                            />
                        </div>
                        {/* Phone Number */}
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="phoneNumber" className="text-right">
                                Phone Number
                            </Label>
                            <Input
                                id="phoneNumber"
                                name="phoneNumber"
                                type="text"
                                value={input.phoneNumber}
                                onChange={changeEventHandler}
                                className="col-span-3"
                            />
                        </div>
                        {/* Bio */}
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="bio" className="text-right">
                                Bio
                            </Label>
                            <Input
                                id="bio"
                                name="bio"
                                type="text"
                                value={input.bio}
                                onChange={changeEventHandler}
                                className="col-span-3"
                            />
                        </div>
                        {/* Experience */}
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="experience" className="text-right">
                                Experience (Years)
                            </Label>
                            <Input
                                id="experience"
                                name="experience"
                                type="number"
                                min="0"
                                value={input.experience}
                                onChange={changeEventHandler}
                                className="col-span-3"
                                placeholder="e.g., 2"
                            />
                        </div>
                        {/* Latitude */}
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="latitude" className="text-right">
                                Latitude
                            </Label>
                            <Input
                                id="latitude"
                                name="latitude"
                                type="number"
                                value={input.latitude}
                                onChange={changeEventHandler}
                                className="col-span-3"
                                placeholder="e.g., 27.7172"
                            />
                        </div>
                        {/* Longitude */}
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="longitude" className="text-right">
                                Longitude
                            </Label>
                            <Input
                                id="longitude"
                                name="longitude"
                                type="number"
                                value={input.longitude}
                                onChange={changeEventHandler}
                                className="col-span-3"
                                placeholder="e.g., 85.3240"
                            />
                        </div>
                        {/* Fetch Location Button */}
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Button type="button" onClick={fetchLocation}>
                                Fetch Location
                            </Button>
                        </div>
                        {/* File Upload */}
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="file" className="text-right">
                                Resume
                            </Label>
                            <Input
                                id="file"
                                name="file"
                                type="file"
                                accept="application/pdf"
                                onChange={fileChangeHandler}
                                className="col-span-3"
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        {loading ? (
                            <Button className="w-full my-4">
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
                            </Button>
                        ) : (
                            <Button type="submit" className="w-full my-4 bg-[#45cfc1]">
                                Update
                            </Button>
                        )}
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

UpdateProfileDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    setOpen: PropTypes.func.isRequired,
};

export default UpdateProfileDialog;
