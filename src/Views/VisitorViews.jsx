import { Outlet, Route, Routes } from "react-router-dom";
import { VisitorNavigationBar } from "../Components/NavigationBars/VisitorNavigationBar/VisitorNavigationBar";
import { CreateAnAppointment } from "../Components/Appointments/CreateAnAppointment";
import { MyAppointments } from "../Components/Appointments/MyAppointments";
import { AppointmentDetails } from "../Components/Appointments/AppointmentDetails";
import { MeetTheStaff } from "../Components/Meet the Staff/MeetTheStaff";
import { StaffDetails } from "../Components/Meet the Staff/StaffDetails";
import { Welcome } from "../Components/Welcome/Welcome";
import { UserInfoForm } from "../Components/Welcome/UserInfo";
import { useEffect, useState } from "react";
import { getVisitorByUserId } from "../Services/UserServices";
import { getAllGenders } from "../Services/ProfileServices";

export const VisitorViews = ({ currentUser }) => {
  const [visitor, setVisitor] = useState({});
  const [genders, setGenders] = useState([]);

  useEffect(() => {
    getVisitorByUserId(currentUser.id).then((responseArray) => {
      const visitorObject = responseArray[0];
      setVisitor(visitorObject);
    });
  }, [currentUser]);

  // Function defined here. Necessary for invocation in gender creation function.
  const handleGetAndSetAllGenders = () => {
    getAllGenders().then((gendersArray) => setGenders(gendersArray));
  };
  // UseEffect to return array of all created gender options. Will be updated when gender creation function executes.
  useEffect(() => {
    handleGetAndSetAllGenders();
  }, []);

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
        <Route path="/" element={<Welcome />} />
        <Route
          path="userinfo"
          element={
            <>
              <Welcome />
              <UserInfoForm genders={genders} visitor={visitor} currentUser={currentUser} />
            </>
          }
        />
        <Route
          path="create"
          element={<CreateAnAppointment genders={genders} visitor={visitor} currentUser={currentUser} />}
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
          <Route
            path=":practitionerId"
            element={<StaffDetails currentUser={currentUser} />}
          />
        </Route>
      </Route>
    </Routes>
  );
};
