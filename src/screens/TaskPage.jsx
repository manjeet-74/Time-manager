import { useState, useEffect } from "react";
import { db } from "../services/firebaseConfig";
import {
  collection,
  addDoc,
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";
import { Link } from "react-router-dom";

const TaskPage = () => {
  // State for controlling the visibility of the sidebar
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [tasks, setTasks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [task, setTask] = useState("");
  const [dataIdToBeUpdated, setDataIdToBeUpdated] = useState("");
  const [updatedTask, setUpdatedTask] = useState("");
  const [searchTerm, setSearchTerm] = useState(""); // For search functionality
  const [currentPage, setCurrentPage] = useState(1); // Pagination: current page
  const [isLoading, setIsLoading] = useState(false);
  const tasksPerPage = 5; // Number of tasks per page


  // Filter tasks based on search input
  const filteredTasks = tasks.filter((task) =>
    task.task.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate pagination
  const totalTasks = filteredTasks.length;
  const totalPages = Math.ceil(totalTasks / tasksPerPage);
  const startIndex = (currentPage - 1) * tasksPerPage;
  const currentTasks = filteredTasks.slice(
    startIndex,
    startIndex + tasksPerPage
  );

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to page 1 on new search
  };

  // Handle pagination click
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  // Toggle Sidebar
  const toggleSidebar = () => {
    setIsSidebarOpen((prevState) => !prevState);
  };

  // Handle checkbox toggle (strike-through)
  const toggleCompleted = (list, setList, id) => {
    setList((prevList) =>
      prevList.map((item) =>
        item.id === id ? { ...item, isChecked: !item.isChecked } : item
      )
    );
  };

  //Handle task submit
  const handleTaskSubmit = async () => {
    setIsLoading(true);
    try {
      //Add task data to firebase
      const newTask = await addDoc(collection(db, "tasks"), {
        task: task,
        isChecked: false,
        createdAt: serverTimestamp(),
      });
      if (newTask) {
        setIsLoading(false);
      }
      setTask("");
      setShowModal(false); // Close the modal
    } catch (error) {
      console.log("You got an erro!", error);

      alert("Please enter a task!");
    }
  };

  // update task
  const handleUpdateTask = async (e) => {
    e.preventDefault();
    try {
      if (!updatedTask) {
        alert("task field is required!");
        return;
      }

      const docRef = doc(db, "tasks", dataIdToBeUpdated);
      await updateDoc(docRef, {
        task: updatedTask,
      });

      setUpdatedTask("");
      setDataIdToBeUpdated("");
      console.log("Task updated");
      setShowModal(false);
    } catch (error) {
      console.error("Error updating task: ", error);
      alert("Error updating data. Please try again.");
    }
  };

  //Delete Task
  const deleteTask = async (id) => {
    try {
      const docref = doc(db, "tasks", id);
      await deleteDoc(docref);
    } catch (error) {
      console.log("Error in delete task: ", error);
      alert("Task not deleted!");
    }
  };

  // Fetch tasks from Firestore
  useEffect(() => {
    setIsLoading(true);
    const tasksQuery = query(
      collection(db, "tasks"),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(tasksQuery, (snapshot) => {
      setTasks(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          task: doc.data().task,
          isChecked: doc.data().isChecked || false,
          createdAt: doc.data().createdAt,
        }))
      );
    });
    setIsLoading(false);
    return () => unsubscribe();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="min-h-screen flex bg-gray-100 text-gray-800">
      {/* Sidebar */}
      <aside
        className={`fixed md:static top-0 left-0 z-40 h-screen w-64 bg-black text-white p-5 space-y-6 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 transition-transform duration-300`}
      >
        <h1 className="text-3xl font-bold flex justify-between items-center">
          TASK<span className="text-yellow-400">Y.</span>
          <button
            className="md:hidden text-white text-2xl"
            onClick={toggleSidebar}
          >
            ✕
          </button>
        </h1>
        <nav className="space-y-4">
          <a
            href="/"
            className="flex items-center text-lg font-medium space-x-3"
          >
            <span className="material-icons">dashboard</span>{" "}
            <span>Dashboard</span>
          </a>
          <a
            href="#"
            className="flex items-center text-lg font-medium space-x-3"
          >
            <span className="material-icons">analytics</span>{" "}
            <span>Analytics</span>
          </a>
          <a
            href="#"
            className="flex items-center text-lg font-medium space-x-3"
          >
            <span className="material-icons">check_circle</span>{" "}
            <span>Timesheets</span>
          </a>
          <a
            href="#"
            className="flex items-center text-lg font-medium space-x-3"
          >
            <span className="material-icons">task_alt</span> <span>Todo</span>
          </a>
          <a
            href="#"
            className="flex items-center text-lg font-medium space-x-3"
          >
            <span className="material-icons">report</span> <span>Report</span>
          </a>
          <a
            href="#"
            className="flex items-center text-lg font-medium space-x-3"
          >
            <span className="material-icons">settings</span>{" "}
            <span>Settings</span>
          </a>
          <Link
            to="/signup"
            className="flex items-center text-lg font-medium space-x-3"
          >
            Signup
          </Link>
          <Link
            to="/login"
            className="flex items-center text-lg font-medium space-x-3"
          >
            Login
          </Link>
        </nav>
      </aside>
      {/* Overlay for Sidebar */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
      {/* Main Content */}
      <main className="flex-1 p-4 md:p-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <h2 className="text-2xl md:text-3xl font-bold flex items-center space-x-4">
            <button
              className="md:hidden text-2xl text-gray-800"
              onClick={toggleSidebar}
            >
              ☰
            </button>
            <span>Today</span>
          </h2>

          {/* Search Bar */}
          <div className="flex justify-between items-center mb-6">
            <input
              type="text"
              placeholder="Search tasks..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* To Do */}
        <div>
          <h3 className="text-lg font-bold mb-4">To Do</h3>
          <ul className="space-y-4">
            {currentTasks.length === 0 ? (
              <p className="text-gray-500 text-center">No tasks found.</p>
            ) : (
              currentTasks.map(({ id, task, isChecked }) => (
                <li
                  key={id}
                  className="flex justify-between items-center bg-white shadow-md p-4 rounded-lg"
                >
                  <div
                    className={`flex items-center space-x-4 ${
                      isChecked ? "line-through text-gray-500" : ""
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => toggleCompleted(tasks, setTasks, id)}
                    />
                    <span>{task}</span>
                  </div>
                  <button
                    className="text-red-500"
                    onClick={() => deleteTask(id)}
                  >
                    Delete
                  </button>
                  <button
                    className="text-blue-600"
                    onClick={() => {
                      setDataIdToBeUpdated(id);
                      setShowModal(true);
                      setUpdatedTask(task);
                    }}
                  >
                    Update
                  </button>
                </li>
              ))
            )}
          </ul>

          {/* Pagination */}
          {totalTasks > tasksPerPage && (
            <div className="flex justify-center items-center mt-6 space-x-2">
              <button
                className={`px-4 py-2 rounded-md ${
                  currentPage === 1 ? "bg-gray-300" : "bg-blue-500 text-white"
                }`}
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Prev
              </button>
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index}
                  className={`px-4 py-2 rounded-md ${
                    currentPage === index + 1
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200"
                  }`}
                  onClick={() => handlePageChange(index + 1)}
                >
                  {index + 1}
                </button>
              ))}
              <button
                className={`px-4 py-2 rounded-md ${
                  currentPage === totalPages
                    ? "bg-gray-300"
                    : "bg-blue-500 text-white"
                }`}
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          )}

          <button
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg"
            onClick={() => setShowModal(true)}
          >
            Add Task
          </button>
        </div>
      </main>
      {/* Show Model */}
      {showModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full relative">
            <h2
              id="modal-title"
              className="text-xl font-semibold mb-4 text-center"
            >
              {dataIdToBeUpdated ? "Update Task" : "Add Task"}
            </h2>
            <input
              type="text"
              placeholder="Enter your task"
              value={dataIdToBeUpdated ? updatedTask : task}
              onChange={(e) => {
                dataIdToBeUpdated
                  ? setUpdatedTask(e.target.value)
                  : setTask(e.target.value);
              }}
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
                onClick={
                  dataIdToBeUpdated ? handleUpdateTask : handleTaskSubmit
                }
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                {dataIdToBeUpdated ? "Update" : "Add"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskPage;
