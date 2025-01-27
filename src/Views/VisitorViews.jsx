import { Outlet, Route, Routes } from "react-router-dom";
import { VisitorNavigationBar } from "../Components/NavigationBars/VisitorNavigationBar/VisitorNavigationBar";
import { CreateAnAppointment } from "../Components/Appointments/CreateAnAppointment";

export const VisitorViews = ({currentUser}) => {
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
      <Route path="create" element={<CreateAnAppointment currentUser={currentUser}/>} />
    </Routes>
  );
};
