import { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
// import Navbar from "../shared/Navbar";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { RadioGroup } from "../ui/radio-group";
import { USER_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "@/redux/authSlice";
import { useTranslation } from 'react-i18next'; // Import useTranslation
import Nav from '../shared/Nav';

const Signup = () => {
    const { t } = useTranslation(); // Initialize translation hook

    const [input, setInput] = useState({
        fullname: "",
        email: "",
        phoneNumber: "",
        password: "",
        role: "",
        file: ""
    });

    const { loading, user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const changeFileHandler = (e) => {
        setInput({ ...input, file: e.target.files?.[0] });
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('fullname', input.fullname);
        formData.append('email', input.email);
        formData.append('phoneNumber', input.phoneNumber);
        formData.append("password", input.password);
        formData.append("role", input.role);
        if (input.file) {
            formData.append("file", input.file);
        }
        try {
            dispatch(setLoading(true));
            const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                },
                withCredentials: true,
            });
            if (res.data.success) {
                toast.success(res.data.message);
                navigate("/verify-email", { state: { email: input.email } }); 
              }
              
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Registration failed");
        } finally {
            dispatch(setLoading(false));
        }
    };
    

    useEffect(() => {
        if (user) {
            navigate("/");
        }
    }, [user]);  // Add user to dependency array

    return (
        <div>
            <Nav/>  
            <div className="flex items-center justify-center max-w-7xl mx-auto">
                <form onSubmit={submitHandler} className="w-1/2 border border-gray-200 rounded-md p-4 my-10">
                    <h1 className="font-bold text-xl mb-5">{t('signupTitle')}</h1>
                    <div className="my-2">
                        <Label>{t('fullname')}</Label>
                        <Input type="text" value={input.fullname} name="fullname" onChange={changeEventHandler} placeholder={t('fullnamePlaceholder')} />
                    </div>
                    <div className="my-2">
                        <Label>{t('email')}</Label>
                        <Input type="email" value={input.email} name="email" onChange={changeEventHandler} placeholder={t('emailPlaceholder')} />
                    </div>
                    <div className="my-2">
                        <Label>{t('phoneNumber')}</Label>
                        <Input type="text" value={input.phoneNumber} name="phoneNumber" onChange={changeEventHandler} placeholder={t('phonePlaceholder')} />
                    </div>
                    <div className="my-2">
                        <Label>{t('password')}</Label>
                        <Input type="password" value={input.password} name="password" onChange={changeEventHandler} placeholder={t('passwordPlaceholder')} />
                    </div>
                    <div className="items-center flex justify-between">
                        <RadioGroup className="flex items-center gap-4 my-5">
                            <div className="flex items-center space-x-2">
                                <Input type="radio" name="role" value="worker" id="r1" checked={input.role === 'worker'} onChange={changeEventHandler} />
                                <Label htmlFor="r1">{t('worker')}</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Input type="radio" name="role" value="recruiter" id="r2" checked={input.role === 'recruiter'} onChange={changeEventHandler} />
                                <Label htmlFor="r2">{t('recruiter')}</Label>
                            </div>
                        </RadioGroup>
                        <div className="flex items-center gap-2">
                            <Label>{t('profile')}</Label>
                            <Input accept="image/*" type="file" checked={input.role === 'worker'} onChange={changeFileHandler} />
                        </div>
                    </div>
                    {
                        loading ? <Button className="w-full my-4"><Loader2 className="mr-2 h-4 w-4 animate-spin" />{t('pleaseWait')}</Button>
                            : <Button type="submit" className="w-full my-4 bg-[#45cfc1] hover:bg-[#32b4a7]">{t('signup')}</Button>
                    }
                    <span className="text-sm">{t('alreadyHaveAccount')} <Link to="/" className="text-blue-600">{t('login')}</Link></span>
                </form>
            </div>
        </div>
    );
}

export default Signup;
