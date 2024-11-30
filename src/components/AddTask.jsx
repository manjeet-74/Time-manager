import React, { useState } from "react";

const AddTask = () => {
  const [showModal, setShowModal] = useState(false);
  const [task, setTask] = useState("");

  const handleTaskSubmit = () => {
    if (task.trim()) {
      alert(`Task added: ${task}`);
      setTask("");
      setShowModal(false); // Close the modal
    } else {
      alert("Please enter a task!");
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-gray-100">
      {/* Main Page */}
      <button
        onClick={() => setShowModal(true)}
        className="px-6 py-2 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700"
      >
        Add Task
      </button>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full relative">
            <h2 className="text-xl font-semibold mb-4 text-center">Add Task</h2>
            <input
              type="text"
              placeholder="Enter your task"
              value={task}
              onChange={(e) => setTask(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
            />
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleTaskSubmit}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddTask;
