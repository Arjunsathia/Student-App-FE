import { Link } from "react-router-dom";
export default function Sidebar() {
  return (
    <div className="bg-dark text-white p-3 vh-100" style={{ width: "220px" }}>
      {/* <h5 className="mb-4">Student</h5> */}
      <ul className="nav flex-column">
        {/* <li className="nav-item"><Link className="nav-link text-white" to="/">Dashboard</Link></li> */}
        <li className="nav-item text-center"><Link className="nav-link text-white" to="/">Students</Link></li>
      </ul>
    </div>
  );
}
