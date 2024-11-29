import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { LogOut, User2 } from "lucide-react";
import { MdLanguage } from "react-icons/md";
import { FiMenu } from "react-icons/fi"; // Importing hamburger icon
import { useSelector } from 'react-redux';

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const {user} = useSelector(store=> store.auth); 

  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for managing menu visibility

  // Function to toggle language between English, Nepali, and Hindi
  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang); // Change the language based on selected option
  };

  // Toggle menu visibility
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="bg-white">
      <div className="flex items-center justify-between mx-auto max-w-7xl h-16">
        {/* Logo design */}
        <div>
          <h1 className="text-2xl font-bold"><span className="text-[#6da9e5] text-4xl">S</span>arathi</h1>
        </div>

        {/* Hamburger Icon for Mobile */}
        <div className="lg:hidden flex items-center">
          <button onClick={toggleMenu}>
            <FiMenu className="text-2xl text-gray-800" />
          </button>
        </div>

        {/* Navigation Links for Desktop and Mobile */}
        <div className={`lg:flex items-center gap-12 ${isMenuOpen ? "flex" : "hidden"} lg:flex`}>
          <ul className="flex font-medium items-center gap-5">
            <li>
              <Link to="/" className="hover:text-[#45cfc1]">
                {t('home')}
              </Link>
            </li>
            <li>
              <Link to="/jobs" className="hover:text-[#45cfc1]">
                {t('jobs')}
              </Link>
            </li>
            <li>
              <Link to="/browse" className="hover:text-[#45cfc1]">
                {t('browse')}
              </Link>
            </li>
          </ul>

          {
            !user ? (
              <div className="flex items-center gap-2">
                <Link to="/login"><Button variant="outline">{t('login')}</Button></Link>
                <Link to="/signup"><Button className="bg-[#45cfc1] hover:bg-[#32b4a7]">{t('signup')}</Button></Link>
              </div>
            ) : (
              <Popover>
                <PopoverTrigger asChild>
                  <Avatar className="cursor-pointer">
                    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                  </Avatar>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                  <div className="flex gap-4 space-y-2">
                    <Avatar>
                      <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                    </Avatar>
                    <div>
                      <h4 className="font-medium">Santosh Thapa</h4>
                      <p className="text-sm text-muted-foreground">Lorem ipsum dolor sit amet.</p>
                    </div>
                  </div>
                  <div className="flex flex-col my-2 text-gray-600">
                    <div className="flex w-fit items-center gap-2 cursor-pointer">
                      <User2 />
                      <Button variant="link"><Link to="/profile">{t('viewProfile')}</Link></Button>
                    </div>
                    <div className="flex w-fit items-center gap-2 cursor-pointer">
                      <LogOut />
                      <Button variant="link">{t('logout')}</Button>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            )
          }

          {/* Language Dropdown with Icon Only */}
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="ml-4 flex items-center">
                <MdLanguage className="text-lg" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-40 bg-white border border-gray-300 rounded-lg shadow-lg">
              <ul className="flex flex-col p-2">
                <li
                  className="cursor-pointer py-2 px-4 rounded hover:bg-gray-100 transition duration-200"
                  onClick={() => changeLanguage('en')}
                >
                  English
                </li>
                <li
                  className="cursor-pointer py-2 px-4 rounded hover:bg-gray-100 transition duration-200"
                  onClick={() => changeLanguage('ne')}
                >
                  नेपाली
                </li>
                <li
                  className="cursor-pointer py-2 px-4 rounded hover:bg-gray-100 transition duration-200"
                  onClick={() => changeLanguage('hi')}
                >
                  हिन्दी
                </li>
              </ul>
            </PopoverContent>
          </Popover>

        </div>
      </div>

      {/* Mobile Menu (Hidden by default, shown when menu is open) */}
      <div
        className={`fixed inset-0 bg-white z-50 ${isMenuOpen ? "block" : "hidden"}`}
        onClick={toggleMenu}
      >
        <div className="flex justify-between items-center p-4">
          <h1 className="text-2xl font-bold"><span className="text-[#6da9e5] text-4xl">S</span>arathi</h1>
          <button onClick={toggleMenu}>
            <FiMenu className="text-2xl text-gray-800" />
          </button>
        </div>
        <ul className="flex flex-col p-6 space-y-4">
          <li>
            <Link to="#home" className="text-gray-800" onClick={toggleMenu}>
              {t('home')}
            </Link>
          </li>
          <li>
            <Link to="#jobs" className="text-gray-800" onClick={toggleMenu}>
              {t('jobs')}
            </Link>
          </li>
          <li>
            <Link to="#browse" className="text-gray-800" onClick={toggleMenu}>
              {t('browse')}
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
