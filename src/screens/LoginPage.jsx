import { useState } from "react";
import { Link } from "react-router-dom";

const LoginPage = () => {
  const [customerName, setCustomerName] = useState("");
  const [customerPassword, setCustomerPassword] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    try {
      if (!customerName || !customerPassword) {
        alert("Both fields are required!");
        return;
      }

      // You would likely add logic to check if the user exists in the database here.

      // Clear the form after successful submission
      setCustomerName("");
      setCustomerPassword("");
      alert("Customer data added successfully!");
    } catch (error) {
      console.error("Error processing data: ", error);
      alert("Error saving data. Please try again.");
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gray-50">
      {/* Form Section */}
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-8 m-4">
        <h1 className="text-3xl font-bold mb-6 text-center">Get Started Now</h1>
        <form className="space-y-4" onSubmit={submit}>
          {/* Name Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              placeholder="Enter your name"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
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
              value={customerPassword}
              onChange={(e) => setCustomerPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-green-700 text-white py-2 rounded-md font-medium hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Login
          </button>
        </form>

        {/* Sign In Link */}
        <p className="mt-4 text-center text-sm text-gray-500">
          Don&apos;t have an account?{" "}
          <Link to="/signup" className="text-blue-600 hover:underline">
            Signup
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
