import { Link } from "react-router-dom";

export const VisitorNavigationBar = () => {
  return (
    <>
    <Link to="create">Create an Appointment</Link>
    <Link to="appointments">My Appointments</Link>
    </>
  );
};
