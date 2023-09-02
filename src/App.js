import "./App.css";
import { Route, Routes } from "react-router-dom";
import Login from "./Login/Login";
import HomePage from "./HomePage/HomePage";
function App() {
  

  return (
    <>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/HomePage/:userId" element={<HomePage/>} />
      </Routes>
    </>
  );
}

export default App;
