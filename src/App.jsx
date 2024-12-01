import { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom"; // Import necessary routing components
import TaskPage from "./screens/TaskPage.jsx";
import LoginPage from "./screens/LoginPage.jsx";
import SignupPage from "./screens/SignUpPage.jsx";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <Router>
      <div className="App">
        {/* Define Routes */}
        <Routes>
          {/* Corrected the Route definition */}
          <Route path="/" element={<TaskPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
