import { Outlet, Route, Routes } from "react-router-dom";
import { VisitorNavigationBar } from "../Components/NavigationBars/VisitorNavigationBar/VisitorNavigationBar";
import { CreateAnAppointment } from "../Components/Appointments/CreateAnAppointment";
import { MyAppointments } from "../Components/Appointments/MyAppointments";
import { AppointmentDetails } from "../Components/Appointments/AppointmentDetails";
import { MeetTheStaff } from "../Components/Meet the Staff/MeetTheStaff";
import { StaffDetails } from "../Components/Meet the Staff/StaffDetails";

export const VisitorViews = ({ currentUser }) => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <VisitorNavigationBar />
            <Outlet />
          </>
        }
      >
        <Route path="/" element={<>welcome</>} />
        <Route
          path="create"
          element={<CreateAnAppointment currentUser={currentUser} />}
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
              element={<CreateAnAppointment currentUser={currentUser} />}
            />
          </Route>
        </Route>
        <Route path="meetthestaff">
          <Route index element={<MeetTheStaff />} />
          <Route path=":practitionerId" element={<StaffDetails currentUser={currentUser} />} />
        </Route>
      </Route>
    </Routes>
  );
};
