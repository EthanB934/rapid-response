import { Link } from "react-router-dom"

export const StaffMemberNavigationBar = () => {
    return <>
    <>
    <Link to="/">Home</Link>
    <Link to="profile">My Profile</Link>
    <Link to="appointments">My Appointments</Link>
    <Link to="meetthestaff">Meet the Staff</Link>
    </>
    </>
}