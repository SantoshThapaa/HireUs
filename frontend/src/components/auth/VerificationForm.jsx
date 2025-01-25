import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { USER_API_END_POINT } from "@/utils/constant";

const VerificationForm = () => {
  const [code, setCode] = useState("");
  const navigate = useNavigate();

  const handleVerification = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${USER_API_END_POINT}/verifyemail`, { code });
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/"); // Redirect to home or dashboard after successful verification
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error("Error during verification:", error);
      toast.error(error.response?.data?.message || "Verification failed");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <form
        onSubmit={handleVerification}
        className="border rounded p-5 w-1/3 bg-white shadow-md"
      >
        <h1 className="text-xl font-bold mb-4">Verify Your Email</h1>
        <label className="block mb-2">Enter Verification Code</label>
        <input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value.trim())} // Trim whitespace
          className="w-full border rounded p-2 mb-4"
          placeholder="Enter code"
        />
        <button type="submit" className="w-full bg-[#45cfc1] text-white p-2 rounded">
          Verify
        </button>
      </form>
    </div>
  );
};

export default VerificationForm;
