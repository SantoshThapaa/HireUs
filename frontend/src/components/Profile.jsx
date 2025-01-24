import { useState } from 'react';
import { useContext } from 'react';
import { Contact, Mail, Pen, Briefcase, User } from "lucide-react";
import Navbar from "./shared/Navbar";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
import AppliedJobTable from "./AppliedJobTable";
import UpdateProfileDialog from "./UpdateProfileDialog";
import { useSelector } from 'react-redux';
import axios from 'axios';
// import { UserContext } from '@/context/UserContext';
import { USER_API_END_POINT } from '@/utils/constant';
import { UserContext } from '@/context/UserContext';


const isResume = true;

const Profile = () => {
  // Access userId from context
  const { userId } = useContext(UserContext);  // Use context to get userId
  const [open, setOpen] = useState(false);
  const { user } = useSelector(store => store.auth);

  const generateCVHandler = async () => {
    try {
      if (!userId || userId === 'your-user-id') {
        alert("User ID is missing or incorrect.");
        return;
      }

      const response = await axios.get(`${USER_API_END_POINT}/generate-cv/${userId}`);
      if (response.data.success) {
        const cvPath = response.data.cvPath;
        const downloadUrl = `/api/static${cvPath}`;
        alert("CV generated successfully! You can download it.");
        window.open(downloadUrl, "_blank");
      }
    } catch (error) {
      console.error("Error generating CV", error);
      alert("Something went wrong.");
    }
  };



  if (!user) return <div>Loading...</div>;

  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8">
        <div className="flex justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="h-24 w-24">
              <AvatarImage src={user?.profile?.profilePhoto || user?.picture} alt="profile" />
            </Avatar>
            <div>
              <h1 className="font-medium text-xl">{user?.fullname}</h1>
              <p>{user?.profile?.bio || "No bio available"}</p>
            </div>
          </div>
          <Button onClick={() => setOpen(true)} className="text-right" variant="outline">
            <Pen />
          </Button>
        </div>

        <div className="my-5">
          {/* Age Section */}
          <div className="flex items-center gap-3 my-2">
            <User />
            <span>{user?.profile?.age || "Age not specified"} yrs</span>
          </div>
          <div className="flex items-center gap-3 my-2">
            <Mail />
            <span>{user?.email}</span>
          </div>
          <div className="flex items-center gap-3 my-2">
            <Contact />
            <span>{user?.phoneNumber}</span>
          </div>
          <div className="flex items-center gap-3 my-2">
            <Briefcase />
            <span>{user?.profile?.experience || "0"} years of experience</span>
          </div>
        </div>

        <div className="my-5">
          <h1>Skills</h1>
          <div className="flex items-center gap-1">
            {user?.profile?.skills?.length
              ? user.profile.skills.map((item, index) => <Badge key={index}>{item}</Badge>)
              : <span>NA</span>}
          </div>
        </div>
        <Button onClick={generateCVHandler}>Generate CV</Button>

        <div className='grid w-full max-w-sm items-center gap-1.5'>
          <Label className="text-md font-bold">Resume</Label>
          {isResume && user?.profile?.resume
            ? <a target='blank' href={user?.profile?.resume} className='text-blue-500 w-full hover:underline cursor-pointer'>
              {user?.profile?.resumeOriginalName || "Resume"}
            </a>
            : <span>NA</span>}
        </div>
      </div>

      <div className="max-w-4xl mx-auto bg-white rounded-2xl">
        <h1 className='font-bold text-lg my-5'>Applied Jobs</h1>
        <AppliedJobTable />
      </div>

      <UpdateProfileDialog open={open} setOpen={setOpen} />
    </div>
  );
}

export default Profile;
