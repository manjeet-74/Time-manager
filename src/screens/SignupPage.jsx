import React from "react";

const SignupPage = () => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center lg:justify-between bg-gray-50 lg:border-x-white">
      {/* Form Section */}
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-8 m-4 lg:m-16">
        <h1 className="text-3xl font-bold mb-6 text-center">Get Started Now</h1>
        <form className="space-y-4">
          {/* Name Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              placeholder="Enter your name"
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Email Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email address
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Terms and Conditions */}
          {/* <div className="flex items-start">
            <input
              type="checkbox"
              id="terms"
              className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
            />
            <label
              htmlFor="terms"
              className="ml-2 block text-sm text-gray-700"
            >
              I agree to the terms & policy
            </label>
          </div> */}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-green-700 text-white py-2 rounded-md font-medium hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Signup
          </button>
        </form>

        
        {/* Sign In Link */}
        <p className="mt-4 text-center text-sm text-gray-500">
          Have an account?{" "}
          <a href="#" className="text-blue-600 hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
