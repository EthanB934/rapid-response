import { Link } from "react-router-dom";
import "../NavigationBars.css";

export const VisitorNavigationBar = () => {
  return (
    <ul className="nav">
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="create">Create an Appointment</Link>
      </li>
      <li>
        <Link to="appointments">My Appointments</Link>
      </li>
      <li>
        <Link to="meetthestaff">Meet the Staff</Link>
      </li>
      <li>
        <Link
          to=""
          onClick={() => {
            localStorage.removeItem("rapidResponse_user");
            navigate("/", { replace: true });
          }}
        >
          Logout
        </Link>
      </li>
    </ul>
  );
};
