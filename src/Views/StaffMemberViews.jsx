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
import { Welcome } from "../Components/Welcome/Welcome";
import { UserInfoForm } from "../Components/Welcome/UserInfo";

export const StaffMemberViews = ({ currentUser }) => {
  const [profile, setProfile] = useState({});
  const [practitioner, setPractitioner] = useState({});

  // This useEffect finds the practitioner that has logged in by a fetch call.
  // When currentUser.id === practitioner.userId
  // Then that response is converted to an object an stored in state. 
  // This useEffect is dependant on a user logging in/
  useEffect(() => {
    getPractitionerByUserId(currentUser.id).then((responseArray) => {
      // It is possible that a user may not have either a practitioner resource stored.
      // This result can lead to the user being navigated to a form that will generated that resource.
      const practitionerObject = responseArray[0];
      setPractitioner(practitionerObject);
    });
  }, [currentUser]);

  // This useEffect is dependant on the practitioner state. Once that state changes (i.e. a practitioner object has been found and stored)
  // Then this useEffect runs to see if that found practitioner has an associated profile or not
  // On the basis that a practitioner has a profile, or not, then the routing will be slightly different.
  useEffect(() => {
    getProfileByPractitionerId(practitioner?.id).then((responseArray) => {
      // It is possible that a practitioner may not have a profile associated with their practitioner data. 
      // Depending on this result will, the routing to My Profile will change
      // The routes associated with My Profile lead either to a creation form, or the created profile. 
      const profileObject = responseArray[0];
      setProfile(profileObject);
    });
  }, [practitioner]);

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
        <Route path="/" element={<Welcome />} />
        <Route
          path="userinfo"
          element={
            <>
              <Welcome />
              <UserInfoForm
                practitioner={practitioner}
                currentUser={currentUser}
              />
            </>
          }
        />
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
