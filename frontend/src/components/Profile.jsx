import { useState, useContext } from "react";
import { Contact, Mail, Pen, Briefcase, User, MapPin } from "lucide-react";
import Navbar from "./shared/Navbar";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
import AppliedJobTable from "./AppliedJobTable";
import UpdateProfileDialog from "./UpdateProfileDialog";
import { useSelector } from "react-redux";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { UserContext } from "@/context/UserContext";

const Profile = () => {
  const { userId } = useContext(UserContext); // Use context to get userId
  const [open, setOpen] = useState(false);
  const { user } = useSelector((store) => store.auth);

  // Generate CV Handler
  const generateCVHandler = async () => {
    try {
      if (!userId || userId === 'your-user-id') {
        alert('User ID is missing or incorrect.');
        return;
      }
  
      const response = await axios.get(`${USER_API_END_POINT}/generate-cv/${user._id}`, { responseType: 'blob' });
  
      // Check if the response is successful
      if (response.status === 200) {
        // Create a link element to download the PDF
        const blob = new Blob([response.data], { type: 'application/pdf' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'generatedCV.pdf';
        link.click(); // Simulate click to trigger download
      } else {
        alert('Error generating CV');
      }
    } catch (error) {
      console.error('Error generating CV', error);
      alert('Something went wrong.');
    }
  };
  

  // Check if user data is not available
  if (!user) return <div>Loading...</div>;

  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8">
        {/* Profile Header */}
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

        {/* User Details */}
        <div className="my-5">
          {/* Age */}
          <div className="flex items-center gap-3 my-2">
            <User />
            <span>{user?.profile?.age || "Age not specified"} yrs</span>
          </div>
          {/* Email */}
          <div className="flex items-center gap-3 my-2">
            <Mail />
            <span>{user?.email}</span>
          </div>
          {/* Phone Number */}
          <div className="flex items-center gap-3 my-2">
            <Contact />
            <span>{user?.phoneNumber}</span>
          </div>
          {/* Experience */}
          <div className="flex items-center gap-3 my-2">
            <Briefcase />
            <span>{user?.profile?.experience || "0"} years of experience</span>
          </div>
          {/* Location */}
          <div className="flex items-center gap-3 my-2">
            <MapPin />
            <span>
              Latitude: {user?.profile?.location?.latitude || "NA"}, Longitude:{" "}
              {user?.profile?.location?.longitude || "NA"}
            </span>
          </div>
        </div>

        {/* Skills */}
        <div className="my-5">
          <h1>Skills</h1>
          <div className="flex items-center gap-1">
            {user?.profile?.skills?.length
              ? user.profile.skills.map((item, index) => <Badge key={index}>{item}</Badge>)
              : <span>NA</span>}
          </div>
        </div>

        {/* Generate CV */}
        <Button onClick={generateCVHandler}>Generate CV</Button>

        {/* Resume Section */}
        <div className="grid w-full max-w-sm items-center gap-1.5 my-5">
          <Label className="text-md font-bold">Resume</Label>
          {user?.profile?.resume ? (
            <a
              target="_blank"
              href={user?.profile?.resume}
              className="text-blue-500 w-full hover:underline cursor-pointer"
            >
              {user?.profile?.resumeOriginalName || "Resume"}
            </a>
          ) : (
            <span>NA</span>
          )}
        </div>
      </div>

      {/* Applied Jobs */}
      <div className="max-w-4xl mx-auto bg-white rounded-2xl">
        <h1 className="font-bold text-lg my-5">Applied Jobs</h1>
        <AppliedJobTable />
      </div>

      {/* Update Profile Dialog */}
      <UpdateProfileDialog open={open} setOpen={setOpen} />
    </div>
  );
};

export default Profile;
