import { Outlet, Route, Routes } from "react-router-dom";
import { StaffMemberNavigationBar } from "../Components/NavigationBars/StaffMemberNavigationBar/StaffMemberNavigationBar";
import { MyAppointments } from "../Components/Appointments/MyAppointments";
import { AppointmentDetails } from "../Components/Appointments/AppointmentDetails";
import { MeetTheStaff } from "../Components/Meet the Staff/MeetTheStaff";
import { StaffDetails } from "../Components/Meet the Staff/StaffDetails";

export const StaffMemberViews = ({currentUser}) => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <StaffMemberNavigationBar />
            <Outlet />
          </>
        }
      >
        <Route path="/" element={<>welcome</>} />
        <Route
              path="create"
              element={<>Profile</>}
            />
        <Route path="appointments">
          <Route index element={<MyAppointments currentUser={currentUser} />} />
          <Route path=":appointmentId">
            <Route
              index
              element={<AppointmentDetails currentUser={currentUser} />}
            />
            <Route
              path="edit"
              element={<>Profile</>}
            />
          </Route>
        </Route>
        <Route path="meetthestaff">
          <Route index element={<MeetTheStaff />} />
          <Route
            path=":practitionerId"
            element={<StaffDetails currentUser={currentUser} />}
          />
        </Route>
      </Route>
    </Routes>
  );
};
