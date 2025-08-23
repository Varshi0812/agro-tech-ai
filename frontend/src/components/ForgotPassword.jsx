import { useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import loginImage from "../assets/LoginImage.png";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [step, setStep] = useState(1); 

  const handleSendOtp = async () => {
    try {
      await axios.post("https://agrotech-ai-11j3.onrender.com/auth/forgot-password", { email });
      toast.success("OTP sent to your email address");
      setStep(2); // Move to OTP verification step
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to send OTP");
    }
  };

  const handleVerifyOtp = async () => {
    try {
      await axios.post("https://agrotech-ai-11j3.onrender.com/auth/verify-otp", { email, otp });
      toast.success("OTP verified. Enter your new password.");
      setStep(3); // Move to password reset step
    } catch (error) {
      toast.error(error.response?.data?.message || "OTP verification failed");
    }
  };

  const handleResetPassword = async () => {
    try {
      await axios.post("https://agrotech-ai-11j3.onrender.com/auth/reset-password", { email, otp, newPassword });
      toast.success("Password reset successfully. Please log in.");
      setTimeout(() => {
        <Navigate to="/login" replace />;
      }, 2000);
    } catch (error) {
      toast.error(error.response?.data?.message || "Password reset failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen mt-10 bg-gradient-to-r from-green-400 to-blue-500">
      <ToastContainer position="top-center" autoClose={5000} hideProgressBar newestOnTop />
      <div className="grid w-full max-w-5xl grid-cols-1 overflow-hidden bg-white rounded-lg shadow-lg md:grid-cols-2">
        <div className="hidden md:block">
          <img src={loginImage} alt="Forgot Password Illustration" className="object-cover w-full h-full" />
        </div>

        <div className="flex flex-col justify-center p-10">
          <h2 className="mb-4 text-4xl font-bold text-center text-green-600">
            Forgot Password
          </h2>
          <p className="mb-8 text-center text-gray-600">
            {step === 1 && "Enter your email to receive an OTP"}
            {step === 2 && "Enter the OTP sent to your email"}
            {step === 3 && "Reset your password"}
          </p>

          {step === 1 && (
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-green-600">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 mt-1 text-green-800 bg-green-100 rounded-md focus:ring focus:ring-green-400"
                required
              />
              <button onClick={handleSendOtp} className="w-full py-2 mt-4 font-bold text-white rounded-md bg-gradient-to-r from-green-500 to-blue-500">
                Send OTP
              </button>
            </div>
          )}

          {step === 2 && (
            <div>
              <label htmlFor="otp" className="block text-sm font-medium text-green-600">OTP</label>
              <input
                type="text"
                id="otp"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full px-4 py-2 mt-1 text-green-800 bg-green-100 rounded-md focus:ring focus:ring-green-400"
                required
              />
              <button onClick={handleVerifyOtp} className="w-full py-2 mt-4 font-bold text-white rounded-md bg-gradient-to-r from-green-500 to-blue-500">
                Verify OTP
              </button>
            </div>
          )}

          {step === 3 && (
            <div>
              <label htmlFor="newPassword" className="block text-sm font-medium text-green-600">New Password</label>
              <input
                type="password"
                id="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-4 py-2 mt-1 text-green-800 bg-green-100 rounded-md focus:ring focus:ring-green-400"
                required
              />
              <button onClick={handleResetPassword} className="w-full py-2 mt-4 font-bold text-white rounded-md bg-gradient-to-r from-green-500 to-blue-500">
                Reset Password
              </button>
            </div>
          )}

          <p className="mt-4 text-sm text-center">
            <a href="/login" className="text-green-500 hover:underline">Back to Login</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
