import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
// import AddTask from "./components/AddTask";
// import LoginPage from "./screens/LoginPage";
import TaskPage from "./screens/TaskPage.jsx"

// import SignupPage from './screens/SignUpPage.jsx'

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <TaskPage />
      {/* <AddTask /> */}
      {/* <SignupPage /> */}
      {/* <LoginPage /> */}
    </>
  );
}

export default App;
