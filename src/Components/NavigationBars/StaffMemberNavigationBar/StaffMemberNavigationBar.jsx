import { Link } from "react-router-dom";
import "../NavigationBars.css";
export const StaffMemberNavigationBar = ({ profile }) => {
  return (
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      {profile?.practitioner ? (
        <li>
          <Link to={`/meetthestaff/${profile.practitionerId}`}>My Profile</Link>
        </li>
      ) : (
        <li>
          <Link to="profile">My Profile</Link>
        </li>
      )}
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
