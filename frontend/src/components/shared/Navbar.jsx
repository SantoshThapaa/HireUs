// import React from 'react'

import { Avatar, AvatarImage } from "../ui/avatar";
// import { Button } from "../ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

const Navbar = () => {
    return (
        <div className="bg-white">
            <div className="flex items-center justify-between mx-auto max-w-7xl h-16">
                {/* Logo design */}
                <div>
                    <h1 className="text-2xl font-bold"><span className="text-[#6da9e5] text-4xl">S</span>arathi</h1>
                </div>
                <div className="flex items-center gap-12">
                    <ul className="flex font-medium items-center gap-5">
                        <li>Home</li>
                        <li>Jobs</li>
                        <li>Browse</li>
                    </ul>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Avatar className="cursor-pointer">
                                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                            </Avatar>
                        </PopoverTrigger>
                        <PopoverContent className="w-80">
                            <div className="flex gap-4 space-y-2">
                                <Avatar className="cursor-pointer">
                                    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                                </Avatar>
                                <h4 className="font-medium">Santosh Thapa</h4>
                                <p className="text-sm text-muted-foreground">Lorem ipsum dolor sit amet.</p>
                            </div>
                        </PopoverContent>
                    </Popover>
                </div>
            </div>
        </div>
    )
}

export default Navbar