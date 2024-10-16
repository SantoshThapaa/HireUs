// import React from 'react'

import { Link } from "react-router-dom";
import Navbar from "../shared/Navbar";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { RadioGroup } from "../ui/radio-group";
import { useState } from "react";

const Login = () => {
    const [input, setInput] = useState({
        email:"",
        password:"",
        role:"",
        file:""
    });

    const changeEventHandler = (e) => {
        setInput({...input, [e.target.name]:e.target.value});
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        console.log(input);
    }

    return (
        <div>
            <Navbar />
            <div className="flex items-center justify-center max-w-7xl mx-auto">
                <form onSubmit={submitHandler} className="w-1/2 border border-gray-200 rounded-md p-4 my-10">
                    <h1 className="font-bold text-xl mb-5">Login</h1>
                    <div className="my-2">
                        <Label>Email</Label>
                        <Input type="email" value={input.email} name="email" onChange={changeEventHandler} placeholder="example@gmail.com" />
                    </div>
                    <div className="my-2">
                        <Label>Password</Label>
                        <Input type="password" value={input.password} name="password" onChange={changeEventHandler} placeholder="******" />
                    </div>
                    <div className="items-center flex justify-between">
                        <RadioGroup className="flex items-center gap-4 my-5">
                            <div className="flex items-center space-x-2">
                                <Input type="radio" name="role" checked={input.role === 'worker'}
                                onChange={changeEventHandler} value="worker" className="cursor-pointer" />
                                <Label htmlFor="r1">Worker</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Input type="radio" name="role" checked={input.role === 'recruiter'}
                                onChange={changeEventHandler} value="recruiter" className="cursor-pointer" />
                                <Label htmlFor="r2">Recruiter</Label>
                            </div>
                        </RadioGroup>
                    </div>
                    <Button type="submit" className="w-full my-4 bg-[#45cfc1] hover:bg-[#32b4a7]">Login</Button>
                    <span className="text-sm">Don't have an account? <Link to="/login" className="text-blue-600">Signup</Link></span>
                </form>
            </div>
        </div>
    )
}

export default Login;