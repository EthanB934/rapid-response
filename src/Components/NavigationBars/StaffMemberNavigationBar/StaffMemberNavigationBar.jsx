import { Link } from "react-router-dom";

export const StaffMemberNavigationBar = ({ profile }) => {
  return (
    <>
      <Link to="/">Home</Link>
      {profile?.practitioner ? (
        <Link to={`/meetthestaff/${profile.practitionerId}`}>My Profile</Link>
      ) : (
        <Link to="profile">My Profile</Link>
      )}
      <Link to="appointments">My Appointments</Link>
      <Link to="meetthestaff">Meet the Staff</Link>
    </>
  );
};
