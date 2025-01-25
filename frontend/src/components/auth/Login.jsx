import { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
// import Navbar from "../shared/Navbar";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { RadioGroup } from "../ui/radio-group";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "@/redux/authSlice";
import { Loader2 } from "lucide-react";
import { useTranslation } from 'react-i18next';
import Nav from '../shared/Nav';
// import { useGoogleLogin } from '@react-oauth/google';
// import { googleAuth } from '@/api';

const Login = () => {
    const { t } = useTranslation();
    const [input, setInput] = useState({
        email: "",
        password: "",
        role: "",
        file: ""
    });
    const { loading, user } = useSelector(store => store.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            dispatch(setLoading(true));
            const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true,
            });
            if (res.data.success) {
                dispatch(setUser(res.data.user));
                navigate("/home");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        } finally {
            dispatch(setLoading(false));
        }
    }
    useEffect(() => {
        if (user) {
            navigate("/");
        }
    }, [])
    // const responseGoogle = async (authResult) => {
    //     try {
    //         if(authResult['code']){
    //             const result = await googleAuth(authResult['code']);
    //             const { email, name, picture } = result.data.user;
    //             const token = result.data.token;
    //             const obj = { email, name, picture, token };
    
    //             // Update user data in Redux store
    //             dispatch(setUser({ ...user, email, name, picture }));
    
    //             // Optionally, store data in localStorage if needed
    //             localStorage.setItem('user-info', JSON.stringify(obj));
    
    //             navigate('/');
    //         }
    //     } catch (err) {
    //         console.error('Error while requesting the google code :', err);
    //     }
    // }
    
    
    // const googleLogin = useGoogleLogin({
    //     onSuccess: responseGoogle,
    //     onError: responseGoogle,
    //     flow: 'auth-code'
    // })

    return (
        <div>
            <Nav/>
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
                    <div className="items-center flex justify-between">
                        <RadioGroup className="flex items-center gap-4 my-5">
                            <div className="flex items-center space-x-2">
                                <Input type="radio" name="role" checked={input.role === 'worker'}
                                    onChange={changeEventHandler} value="worker" className="cursor-pointer" />
                                <Label htmlFor="r1">{t('worker')}</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Input type="radio" name="role" checked={input.role === 'recruiter'}
                                    onChange={changeEventHandler} value="recruiter" className="cursor-pointer" />
                                <Label htmlFor="r2">{t('recruiter')}</Label>
                            </div>
                        </RadioGroup>
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
                    <Link to="/forgot-password" className="text-blue-600">Forgot Password</Link>
                    <div className='flex flex-col items-center justify-center mt-5 sm:ml-0 lg:ml-18'>
                        {/* <button
                            onClick={googleLogin}
                            className="flex items-center justify-center border-black border border-solid bg-white text-black font-semibold py-2 px-6 sm:px-8 lg:px-10 rounded-2xl shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
                        >
                            Login with Google
                        </button> */}
                        <br />
                        <span className="text-sm">
                        {t('signupPrompt')} <Link to="/signup" className="text-blue-600">{t('signup')}</Link>
                    </span>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;
