import { useNavigate } from 'react-router-dom';
import { Button } from "../ui/button";
import { LogOut } from "lucide-react";
import { useDispatch } from 'react-redux';
import { ADMIN_API_END_POINT } from '@/utils/constant';
import { setUser } from '@/redux/authSlice';
import axios from 'axios';
import { toast } from 'sonner';
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

const AdminNav = () => {
  // const { admin } = useSelector(store => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${ADMIN_API_END_POINT}/adminlogout`, { withCredentials: true });
      if (res.data.success) {
        dispatch(setUser(null)); // Clear user state
        navigate('/home');
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || 'Logout failed');
    }
  };

  return (
    <div className="bg-white">
      <div className="flex items-center justify-between mx-auto max-w-7xl h-16">
        {/* Logo design */}
        <div className="flex items-center gap-4">
          <img
            src="/logo-01.png"
            alt="Sarathi Logo"
            className="w-28 h-30 object-contain"
          />
        </div>

        {/* Logout button visible only if user is authenticated */}
        {/* Temporarily remove the conditional rendering */}
        <Popover>
          <PopoverTrigger asChild>
            <div className="flex items-center gap-2 cursor-pointer">
              <LogOut className="text-lg" />
              <Button variant="link">Logout</Button>
            </div>
          </PopoverTrigger>
          <PopoverContent className="w-30 bg-[#b4e9e3]">
            <div className="flex flex-col my-2 text-gray-600">
              <div className="flex w-fit items-center gap-2 cursor-pointer">
                <LogOut />
                <Button onClick={logoutHandler} variant="link">Logout</Button>
              </div>
            </div>
          </PopoverContent>
        </Popover>

      </div>
    </div>
  );
};

export default AdminNav;
