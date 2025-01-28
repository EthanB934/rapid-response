import { Outlet, Route, Routes } from "react-router-dom";
import { VisitorNavigationBar } from "../Components/NavigationBars/VisitorNavigationBar/VisitorNavigationBar";
import { CreateAnAppointment } from "../Components/Appointments/CreateAnAppointment";
import { MyAppointments } from "../Components/Appointments/MyAppointments";
import { AppointmentDetails } from "../Components/Appointments/AppointmentDetails";

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
      />
      <Route
        path="create"
        element={<CreateAnAppointment currentUser={currentUser} />}
      />
      <Route path="appointments">
        <Route index element={<MyAppointments currentUser={currentUser} />} />
        <Route path=":appointmentId" element={<AppointmentDetails currentUser={currentUser}/>} />
      </Route> 
    </Routes>
  );
};
