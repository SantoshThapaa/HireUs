import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import { USER_API_END_POINT } from "@/utils/constant";
import Nav from "../shared/Nav";

function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { id, token } = useParams(); // Extracts id and token from URL params

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error(t("passwordsDoNotMatch"));
      return;
    }

    try {
      const res = await axios.post(
        `${USER_API_END_POINT}/reset-password/${id}/${token}`,
        { password }
      );

      if (res.data.success) {
        toast.success(t("passwordResetSuccess"));
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
          <h4 className="text-xl font-bold mb-4">{t("resetPasswordTitle")}</h4>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <Label htmlFor="password">{t("newPassword")}</Label>
              <Input
                type="password"
                placeholder={t("enterNewPassword")}
                autoComplete="off"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="confirmPassword">{t("confirmPassword")}</Label>
              <Input
                type="password"
                placeholder={t("confirmNewPassword")}
                autoComplete="off"
                name="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full">
              {t("updatePassword")}
            </Button>
          </form>
        </div>
      </div>
    </div>

  );
}

export default ResetPassword;
