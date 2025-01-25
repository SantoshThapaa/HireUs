import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import { USER_API_END_POINT } from "@/utils/constant";
import Nav from "../shared/Nav";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${USER_API_END_POINT}/forgot-password`, { email });
      if (res.data.success) {
        toast.success(t("passwordResetEmailSent"));
        navigate("/");
      } else {
        toast.error(t(res.data.message || "errorOccurred"));
      }
    } catch (error) {
      console.error(error);
      toast.error(t("errorOccurred"));
    }
  };

  return (
    <div>
      <Nav />
      <div className="flex items-center justify-center min-h-screen bg-secondary">
        <div className="bg-white p-6 rounded-md shadow-md w-1/3">
          <h4 className="text-xl font-bold mb-4">{t("forgotPasswordTitle")}</h4>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <Label htmlFor="email">{t("email")}</Label>
              <Input
                type="email"
                placeholder={t("Enter your Email")}
                autoComplete="off"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <Button type="submit" className="w-full bg-[#45cfc1]">
              {t("send")}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
