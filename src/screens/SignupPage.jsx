import { useState } from "react";
import { Link } from "react-router-dom";
import { auth, db } from "../services/firebaseConfig";
import { addDoc, collection } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";

const SignupPage = () => {
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerPassword, setCustomerPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const registerUser = async (e) => {
    e.preventDefault();
    if (!customerName || !customerPassword || !customerEmail) {
      alert("All the fields are required!");
      return;
    }
    setIsLoading(true);

    try {
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        customerEmail,
        customerPassword
      );

      const user = userCredentials.user;

      // Add the customer data to Firestore
      const customersRef = collection(db, "customerData");
      await addDoc(customersRef, {
        name: customerName,
        email: customerEmail,
        uid: user.uid,
      });
      // Clear the form after successful submission
      setCustomerName("");
      setCustomerPassword("");
      setCustomerEmail("");
      alert("Account created successfully!");
    } catch (error) {
      console.error("Error adding customer data: ", error);
      alert("Error saving data. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center lg:justify-between bg-gray-50 lg:border-x-white">
      {/* Form Section */}
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-8 m-4 lg:m-16">
        <h1 className="text-3xl font-bold mb-6 text-center">Get Started Now</h1>
        <form className="space-y-4" onSubmit={registerUser}>
          {/* Name Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
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
              value={customerEmail}
              onChange={(e) => setCustomerEmail(e.target.value)}
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
              value={customerPassword}
              onChange={(e) => setCustomerPassword(e.target.value)}
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
            disabled={isLoading}
          >
            {isLoading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>

        {/* Sign In Link */}
        <p className="mt-4 text-center text-sm text-gray-500">
          Have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
