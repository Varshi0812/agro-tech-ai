import { useState } from "react";
import axios from "axios";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { useAuth } from "../context/AuthContext";
import loginImage from "../assets/LoginImage.png";
import eyeIcon from "../assets/icons/eye.svg";
import eyeSlashIcon from "../assets/icons/eye-slash.svg";
import googleIcon from "../assets/icons/icons8-google.svg"; // Google icon for the button

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const { isLoggedIn, login } = useAuth();
  const ApiUrl = import.meta.env.MODE === 'production'
    ? 'https://agro-tech-ai-backend-teal.vercel.app'
    : 'http://localhost:8080';

  const navigate = useNavigate()
  // Handle standard email/password login
  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${ApiUrl}/auth/signin`,
        {
          email,
          password,
          rememberMe,
        }
      );
      console.log(response.data)
      // Check if user is verified
      if (response.status === 403) {
        // Redirect to verification page with email as a query parameter
        navigate(`/verification?email=${email}`);
      } else {
        // If the user is verified, log them in and display success message
        // Create user object from response data
        const userData = {
          id: response.data.user_id,
          email: email,
          // Add other user fields as needed
        };
        login(response.data.token, userData);
        toast.success("Login successful");
      }
  
    } catch (error) {

    if (error.response) {
      if (error.response.status === 401) {
        toast.error(error.response?.data?.message || "Invalid credentials");
      } else if (error.response.status === 403) {
        navigate(`/verification?email=${email}`);
      } else {
        toast.error("Login failed");
      }
    } else {
      toast.error("Network error or unexpected failure.");
    }
  }
  };
  

  // Google Login handler
  const handleGoogleSignIn = () => {
    window.location.href = `${ApiUrl}/auth/google`;
  };

  if (isLoggedIn) {
    return <Navigate to="/" />;
  }

  return (
    <div className="flex items-center justify-center min-h-screen mt-10 bg-gradient-to-r from-green-400 to-blue-500">
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        toastClassName="custom-toast"
        bodyClassName="custom-toast-body"
        className="mt-16"
      />
      <div className="grid w-full max-w-5xl grid-cols-1 overflow-hidden transition duration-500 ease-in-out transform bg-white rounded-lg shadow-lg md:grid-cols-2 hover:scale-105">
        <div className="hidden md:block">
          <img
            src={loginImage}
            alt="Login Illustration"
            className="object-cover w-full h-full"
          />
        </div>

        <div className="flex flex-col justify-center p-10">
          <h2 className="mb-4 text-4xl font-bold text-center text-green-600 animate-fadeInDown">
            Welcome Back!
          </h2>
          <p className="mb-8 text-center text-gray-600 animate-fadeInDown">
            Log in to continue to your account
          </p>
          <form className="space-y-4" onSubmit={handleSignIn}>
            <div className="animate-slideInLeft">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-green-600"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="john@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 mt-1 text-green-800 bg-green-100 rounded-md focus:ring focus:ring-green-400"
                required
              />
            </div>
            <div className="animate-slideInRight">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-green-600"
              >
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  placeholder="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 mt-1 text-green-800 bg-green-100 rounded-md focus:ring focus:ring-green-400"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute text-green-800 right-3 top-3"
                >
                  <img
                    src={showPassword ? eyeSlashIcon : eyeIcon}
                    alt="Show/Hide"
                    className="w-5 h-6"
                  />
                </button>
              </div>
            </div>

            <div className="flex items-center animate-fadeInUp">
              <input
                type="checkbox"
                id="rememberMe"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="mr-2 text-green-600 focus:ring-green-500"
              />
              <label htmlFor="rememberMe" className="text-sm text-green-600">
                Remember Me
              </label>
            </div>

            <button
              type="submit"
              className="w-full py-2 font-bold text-white transition duration-300 transform rounded-md bg-gradient-to-r from-green-500 to-blue-500 hover:from-blue-500 hover:to-green-500 hover:scale-105"
            >
              Sign In
            </button>
          </form>

          {/* Google Login Button */}
          <button
            onClick={handleGoogleSignIn}
            className="flex items-center justify-center w-full py-2 mt-4 font-bold text-gray-700 transition duration-300 transform bg-white border border-gray-300 rounded-md hover:scale-105"
          >
            <img src={googleIcon} alt="Google" className="w-6 h-6 mr-2" />
            Sign in with Google
          </button>

          <p className="mt-4 text-sm text-center">
            Don’t have an account?{" "}
            <Link to="/signup" className="text-green-500 hover:underline">Sign Up</Link>
          </p>
          <p className="mt-2 text-sm text-center">
            <Link to="/forgot-password" className="text-green-500 hover:underline">Forgot Password?</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
