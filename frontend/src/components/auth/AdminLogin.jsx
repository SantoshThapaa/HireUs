import { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../shared/Navbar";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import { setLoading} from "@/redux/authSlice";
import { Loader2 } from "lucide-react";
import { useTranslation } from 'react-i18next';

const AdminLogin = () => {
    const { t } = useTranslation();
    const [input, setInput] = useState({
        email: "",
        password: ""
    });
    const { loading, user } = useSelector(store => store.auth);
    const navigate = useNavigate();
    // const dispatch = useDispatch();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const res = await axios.post(`${USER_API_END_POINT}/adminlogin`, input, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true,
            });
            if (res.data.success) {
                // Store user data in Redux or local storage
                toast.success(res.data.message);
                navigate("/dashboard/adminDashboard"); // Redirect to dashboard or appropriate page after login
            }
        } catch (error) {
            console.error("Error during login:", error);
            const message = error.response?.data?.message ||
                            (error.request ? "No response from server" : "Error in request setup");
            toast.error(message);
        } finally {
            setLoading(false);
        }
    };
      
    useEffect(()=>{
        if(user){
            navigate("/");
        }
    },[])

    return (
        <div>
            <Navbar />
            <div className="flex items-center justify-center max-w-7xl mx-auto">
                <form onSubmit={submitHandler} className="w-1/2 border border-gray-200 rounded-md p-4 my-10">
                    <h1 className="font-bold text-xl mb-5">{t('loginTitle')}</h1>
                    <div className="my-2">
                        <Label>{t('email')}</Label>
                        <Input type="email" value={input.email} name="email" onChange={changeEventHandler} placeholder="example@gmail.com" />
                    </div>
                    <div className="my-2">
                        <Label>{t('password')}</Label>
                        <Input type="password" value={input.password} name="password" onChange={changeEventHandler} placeholder="******" />
                    </div>
                    {
                        loading ? 
                            <Button className="w-full my-4">
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />{t('pleaseWait')}
                            </Button>
                        : (
                            <Button type="submit" className="w-full my-4 bg-[#45cfc1] hover:bg-[#32b4a7]">
                                {t('login')}
                            </Button>
                        )
                    }
                    <span className="text-sm">
                        {t('signupPrompt')} <Link to="/adminsignup" className="text-blue-600">{t('signup')}</Link>
                    </span>
                </form>
            </div>
        </div>
    );
}

export default AdminLogin;
