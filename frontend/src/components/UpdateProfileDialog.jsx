import { useState } from 'react';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Loader2 } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/constant';
import { setUser } from '@/redux/authSlice';
import { toast } from 'sonner';
import PropTypes from 'prop-types';

const UpdateProfileDialog = ({ open, setOpen }) => {
    const [loading, setLoading] = useState(false);
    const { user } = useSelector(store => store.auth);

    // State for form inputs
    const [input, setInput] = useState({
        fullname: user?.fullname || "",
        age: user?.profile?.age || "", 
        email: user?.email || "",
        phoneNumber: user?.phoneNumber || "",
        bio: user?.profile?.bio || "",
        skills: user?.profile?.skills?.join(", ") || "",
        experience: user?.profile?.experience || "",
        file: null // Set initial file as null
    });

    const dispatch = useDispatch();

    // Event handlers
    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const fileChangeHandler = (e) => {
        const file = e.target.files?.[0];
        setInput({ ...input, file });
    };

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
    
        // Only append the file if it exists
        if (input.file) {
            formData.append("file", input.file);
        }
    
        try {
            setLoading(true);
            const res = await axios.post(`${USER_API_END_POINT}/profile/update`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
                withCredentials: true
            });
    
            if (res.data.success) {
                dispatch(setUser(res.data.user));
                toast.success(res.data.message);
                setOpen(false);
            } else {
                toast.error(res.data.message || "Something went wrong!");
            }
        } catch (error) {
            console.error('API Error:', error.response || error);
            const message = error.response?.data?.message || "Something went wrong!";
            toast.error(message);
        } finally {
            setLoading(false);
        }
    };
    

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-[425px]" onInteractOutside={() => setOpen(false)}>
                <DialogHeader>
                    <DialogTitle>Update Profile</DialogTitle>
                    <DialogDescription>
                        Update your profile details such as name, email, phone number, bio, and resume.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={submitHandler}>
                    <div className='grid gap-4 py-4'>
                        {/* Full Name */}
                        <div className='grid grid-cols-4 items-center gap-4'>
                            <Label htmlFor="fullname" className="text-right">Name</Label>
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
                        <div className='grid grid-cols-4 items-center gap-4'>
                            <Label htmlFor="age" className="text-right">Age</Label>
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
                        <div className='grid grid-cols-4 items-center gap-4'>
                            <Label htmlFor="email" className="text-right">Email</Label>
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
                        <div className='grid grid-cols-4 items-center gap-4'>
                            <Label htmlFor="phoneNumber" className="text-right">Phone Number</Label>
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
                        <div className='grid grid-cols-4 items-center gap-4'>
                            <Label htmlFor="bio" className="text-right">Bio</Label>
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
                        <div className='grid grid-cols-4 items-center gap-4'>
                            <Label htmlFor="experience" className="text-right">Experience (Years)</Label>
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

                        {/* Skills */}
                        <div className='grid grid-cols-4 items-center gap-4'>
                            <Label htmlFor="skills" className="text-right">Skills</Label>
                            <Input
                                id="skills"
                                name="skills"
                                type="text"
                                value={input.skills}
                                onChange={changeEventHandler}
                                className="col-span-3"
                                placeholder="e.g., JavaScript, React"
                            />
                        </div>
                        {/* File Upload */}
                        <div className='grid grid-cols-4 items-center gap-4'>
                            <Label htmlFor="file" className="text-right">Resume</Label>
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
                                <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait
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

// PropTypes for component validation
UpdateProfileDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    setOpen: PropTypes.func.isRequired,
};

export default UpdateProfileDialog;
