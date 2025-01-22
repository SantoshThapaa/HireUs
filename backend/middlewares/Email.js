import { transporter } from "./Email.config.js";
import { Verification_Email_Template, Welcome_Email_Template } from "./EmailTemplate.js";

export const sendVerificationCode = async (email, verificationCode) => {
  try {
    const response = await transporter.sendMail({
      from: '"Sarathi 👻" <' + process.env.EMAIL_USER + ">",
      to: email, // Dynamic recipient
      subject: "Verify Your Email",
      text: "Verify your email",
      html: Verification_Email_Template.replace("{verificationCode}", verificationCode),
    });
    console.log("Verification email sent successfully:", response);
  } catch (error) {
    console.error("Error sending verification email:", error);
    throw new Error("Failed to send verification email.");
  }
};

export const WelcomeEmail = async (email, fullname) => {
  try {
    const response = await transporter.sendMail({
      from: '"Sarathi 👻" <' + process.env.EMAIL_USER + ">",
      to: email, // Dynamic recipient
      subject: "Welcome to Our Community",
      text: "Welcome to our community!",
      html: Welcome_Email_Template.replace("{fullname}", fullname),
    });
    console.log("Welcome email sent successfully:", response);
  } catch (error) {
    console.error("Error sending welcome email:", error);
    throw new Error("Failed to send welcome email.");
  }
};
