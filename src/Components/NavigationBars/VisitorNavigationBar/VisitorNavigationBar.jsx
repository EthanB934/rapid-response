import { Link } from "react-router-dom";

export const VisitorNavigationBar = () => {
  return (
    <>
    <Link to="/">Home</Link>
    <Link to="create">Create an Appointment</Link>
    <Link to="appointments">My Appointments</Link>
    <Link to="meetthestaff">Meet the Staff</Link>
    </>
  );
};
