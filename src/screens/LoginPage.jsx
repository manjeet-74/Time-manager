import React, { useEffect, useState } from "react";
import {
  collection,
  addDoc,
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import db from "../services/firebaseConfig.js";

const LoginPage = () => {
  const [customerName, setCustomerName] = useState("");
  const [customerPassword, setCustomerPassword] = useState("");
  const [customerData, setCustomerData] = useState([]);
  const [updatedCustomerName, setUpdatedCustomerName] = useState("");
  const [updatedCustomerPassword, setUpdatedCustomerPassword] = useState("");
  const [dataIdToBeUpdated, setDataIdToBeUpdated] = useState("");

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "customerData"),
      (snapshot) => {
        setCustomerData(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        );
      }
    );

    // Cleanup the subscription
    return () => unsubscribe();
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    try {
      if (!customerName || !customerPassword) {
        alert("Both fields are required!");
        return;
      }
      // Add the customer data to Firestore
      await addDoc(collection(db, "customerData"), {
        name: customerName,
        password: customerPassword,
      });
      // Clear the form after successful submission
      setCustomerName("");
      setCustomerPassword("");
      alert("Customer data added successfully!");
    } catch (error) {
      console.error("Error adding customer data: ", error);
      alert("Error saving data. Please try again.");
    }
  };

  //update data
  const updateData = async (e) => {
    e.preventDefault();
    try {
      if (!updatedCustomerName || !updatedCustomerPassword) {
        alert("Both fields are required!");
        return;
      }

      const docRef = doc(db, "customerData", dataIdToBeUpdated);
      await updateDoc(docRef, {
        name: updatedCustomerName,
        password: updatedCustomerPassword,
      });

      setUpdatedCustomerName("");
      setUpdatedCustomerPassword("");
      setDataIdToBeUpdated("");
      alert("Customer data updated successfully!");
    } catch (error) {
      console.error("Error updating data: ", error);
      alert("Error updating data. Please try again.");
    }
  };

  //Delete data
  const deleteData = async (id) => {
    try {
      const docRef = doc(db, "customerData", id); // Specify the collection and document ID
      await deleteDoc(docRef); // Delete the document
      alert("Customer data deleted successfully!");
    } catch (error) {
      console.error("Error deleting data: ", error);
      alert("Error deleting data. Please try again.");
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gray-50">
      {/* Form Section */}
      {dataIdToBeUpdated ? (
        <div className="w-full max-w-md bg-white shadow-md rounded-lg p-8 m-4">
          <h2 className="text-2xl font-semibold mb-4">Update Customer Data</h2>
          <form className="space-y-4" onSubmit={updateData}>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                placeholder="Update name"
                value={updatedCustomerName}
                onChange={(e) => setUpdatedCustomerName(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-4 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                placeholder="Update password"
                value={updatedCustomerPassword}
                onChange={(e) => setUpdatedCustomerPassword(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-4 py-2"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-green-700 text-white py-2 rounded-md font-medium hover:bg-green-800"
            >
              Update
            </button>
          </form>
        </div>
      ) : (
        <div className="w-full max-w-md bg-white shadow-md rounded-lg p-8 m-4">
          <h1 className="text-3xl font-bold mb-6 text-center">
            Get Started Now
          </h1>
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
            Don't have an account?{" "}
            <a href="#" className="text-blue-600 hover:underline">
              Signup
            </a>
          </p>
        </div>
      )}

      {/* Customer Data Display */}
      <div className="mt-8 w-full max-w-4xl overflow-x-auto">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          Customer Data
        </h2>
        <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">
                Name
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">
                Password
              </th>
            </tr>
          </thead>
          <tbody>
            {customerData.map(({ id, data }) => (
              <tr key={id} className="border-t">
                <td className="px-4 py-2 text-sm text-gray-800">{data.name}</td>
                <td className="px-4 py-2 text-sm text-gray-800">
                  {data.password}
                </td>
                <td className="px-4 py-2">
                  <button
                    className="text-blue-600"
                    onClick={() => {
                      setDataIdToBeUpdated(id);
                      setUpdatedCustomerName(data.name);
                      setUpdatedCustomerPassword(data.password);
                    }}
                  >
                    Update
                  </button>
                </td>
                <td className="px-4 py-2">
                  <button
                    className="text-blue-600"
                    onClick={() => {
                      deleteData(id);
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LoginPage;
