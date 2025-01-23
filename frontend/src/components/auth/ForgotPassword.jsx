import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3001/forgot-password", { email }, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      if (res.data.Status === "Success") {
        toast.success(t("passwordResetEmailSent"));
        navigate("/login");
      }
    } catch (error) {
      console.error(error);
      toast.error(t("errorOccurred"));
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-secondary">
      <div className="bg-white p-6 rounded-md shadow-md w-1/3">
        <h4 className="text-xl font-bold mb-4">{t("forgotPasswordTitle")}</h4>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <Label htmlFor="email">{t("email")}</Label>
            <Input
              type="email"
              placeholder={t("enterEmail")}
              autoComplete="off"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <Button type="submit" className="w-full">
            {t("send")}
          </Button>
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;
