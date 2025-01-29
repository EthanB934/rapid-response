import { Outlet, Route, Routes } from "react-router-dom";
import { StaffMemberNavigationBar } from "../Components/NavigationBars/StaffMemberNavigationBar/StaffMemberNavigationBar";
import { MyAppointments } from "../Components/Appointments/MyAppointments";
import { AppointmentDetails } from "../Components/Appointments/AppointmentDetails";
import { MeetTheStaff } from "../Components/Meet the Staff/MeetTheStaff";
import { StaffDetails } from "../Components/Meet the Staff/StaffDetails";
import { CreateProfile } from "../Components/Meet the Staff/CreateProfile";
import { useEffect, useState } from "react";
import {
  getPractitionerByUserId,
  getProfileByPractitionerId,
} from "../Services/PractitionerServices";

export const StaffMemberViews = ({ currentUser }) => {
  const [profile, setProfile] = useState({});
  useEffect(() => {
    getPractitionerByUserId(currentUser.id).then((responseArray) => {
      const practitionerObject = responseArray[0];
      getProfileByPractitionerId(practitionerObject.id).then(
        (responseArray) => {
          const profileObject = responseArray[0];
          setProfile(profileObject);
        }
      );
    });
  }, [currentUser]);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
              <StaffMemberNavigationBar profile={profile} />
            <Outlet />
          </>
        }
      >
        <Route path="/" element={<>welcome</>} />
        <Route
          path="profile"
          element={<CreateProfile currentUser={currentUser} />}
        />
        <Route path="appointments">
          <Route index element={<MyAppointments currentUser={currentUser} />} />
          <Route path=":appointmentId">
            <Route
              index
              element={<AppointmentDetails currentUser={currentUser} />}
            />
            <Route path="edit" element={<>Profile</>} />
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
