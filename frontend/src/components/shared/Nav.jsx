import { useTranslation } from "react-i18next";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { MdLanguage } from "react-icons/md";

const Nav = () => {
  const { i18n } = useTranslation(); // Access translation functions

  // Function to change the language
  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
  };

  return (
    <div className="bg-white">
      <div className="flex items-center justify-between mx-auto max-w-7xl h-16">
        {/* Logo Section */}
        <div className="flex items-center">
          <img
            src="/logo-01.png"
            alt="Sarathi Logo"
            className="w-28 h-10 object-contain"
          />
        </div>

        {/* Language Dropdown */}
        <div className="flex items-center">
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
                  onClick={() => changeLanguage("en")}
                >
                  English
                </li>
                <li
                  className="cursor-pointer py-2 px-4 rounded hover:bg-gray-100 transition duration-200"
                  onClick={() => changeLanguage("ne")}
                >
                  नेपाली
                </li>
                <li
                  className="cursor-pointer py-2 px-4 rounded hover:bg-gray-100 transition duration-200"
                  onClick={() => changeLanguage("hi")}
                >
                  हिन्दी
                </li>
              </ul>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  );
};

export default Nav;
