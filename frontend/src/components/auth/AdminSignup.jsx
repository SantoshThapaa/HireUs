import { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../shared/Navbar";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { ADMIN_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import axios from "axios";
import { Loader2 } from "lucide-react";
import {  useSelector } from "react-redux";
// import { setLoading } from "@/redux/authSlice";
import { useTranslation } from 'react-i18next'; // Import useTranslation

const AdminSignup = () => {
    const { t } = useTranslation();
    const [input, setInput] = useState({ fullname: "", email: "", password: "" });
    const [loading, setLoading] = useState(false); // Local loading state
    const { user } = useSelector((store) => store.auth);
    const navigate = useNavigate();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const res = await axios.post(`${ADMIN_API_END_POINT}/adminregister`, input, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true,
            });
            if (res.data.success) {
                navigate("/login");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.error("Error during signup:", error);
            const message = error.response?.data?.message || 
                            (error.request ? "No response from server" : "Error in request setup");
            toast.error(message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user) {
            navigate("/adminLogin");
        }
    }, [user]);

    return (
        <div>
            <Navbar />
            <div className="flex items-center justify-center max-w-7xl mx-auto">
                <form onSubmit={submitHandler} className="w-1/2 border border-gray-200 rounded-md p-4 my-10">
                    <h1 className="font-bold text-xl mb-5">{t('signupTitle', 'Sign Up')}</h1>
                    <div className="my-2">
                        <Label>{t('fullname', 'Full Name')}</Label>
                        <Input type="text" value={input.fullname} name="fullname" onChange={changeEventHandler} placeholder={t('fullnamePlaceholder', 'Enter your full name')} />
                    </div>
                    <div className="my-2">
                        <Label>{t('email', 'Email')}</Label>
                        <Input type="email" value={input.email} name="email" onChange={changeEventHandler} placeholder={t('emailPlaceholder', 'Enter your email')} />
                    </div>
                    <div className="my-2">
                        <Label>{t('password', 'Password')}</Label>
                        <Input type="password" value={input.password} name="password" onChange={changeEventHandler} placeholder={t('passwordPlaceholder', 'Enter your password')} />
                    </div>

                    {loading ? (
                        <Button className="w-full my-4">
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            {t('pleaseWait', 'Please wait...')}
                        </Button>
                    ) : (
                        <Button type="submit" className="w-full my-4 bg-[#45cfc1] hover:bg-[#32b4a7]">
                            {t('adminsignup', 'Sign Up')}
                        </Button>
                    )}
                    <span className="text-sm">
                        {t('alreadyHaveAccount', 'Already have an account?')}{" "}
                        <Link to="/adminlogin" className="text-blue-600">{t('adminlogin', 'Log In')}</Link>
                    </span>
                </form>
            </div>
        </div>
    );
};

export default AdminSignup;

