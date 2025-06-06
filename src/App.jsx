import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./Components/Sidebar";
import Students from "./Pages/Students";
import StudentDetails from "./Pages/StudentDetails";

function App() {
  return (
    <div className="d-flex">
      <Sidebar />
      <div className="p-4 w-100">
        <Routes>
          <Route path="/" element={<Students />} />
          <Route path="/student-details/:studentId" element={<StudentDetails />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
