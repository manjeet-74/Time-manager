import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Import necessary routing components
import TaskPage from "./screens/TaskPage.jsx";
import LoginPage from "./screens/LoginPage.jsx";
// const SignupPage = React.lazy(() => import("./screens/SignupPage"));
import SignupPage from "./screens/SignupPage.jsx";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        {/* Define Routes */}
        <Routes>
          <Route path={"/"} element={<TaskPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
