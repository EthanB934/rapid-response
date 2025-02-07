import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getAppointmentsByAppointmentId,
  removeAppointment,
} from "../../Services/AppointmentServices";
import { getVisitorByUserId } from "../../Services/UserServices";
import { getPractitionerByUserId } from "../../Services/PractitionerServices";
import { RenderAppointmentDetails } from "./RenderAppointmentDetails";
import { RenderAppointmentDetailsButtons } from "./RenderAppointmentDetailsButtons";
import "../Meet the Staff/MeetTheStaff.css";

export const AppointmentDetails = ({ currentUser }) => {
  const [appointment, setAppointment] = useState({});

  // This component requires the useParams() hook because it is displaying an individual list item. The link for which is generated through the .map()
  // array method. The id of that appointment object is captured during iteration. It is also routed for these specific items.
  const { appointmentId } = useParams();

  // Navigation will be used when the visitor user wishes to update or cancel their appointment.
  const navigate = useNavigate();

  // This useEffect observes the appointmentId state.
  // Once it is received, it iterates through all appointments in order to find the matching appointment
  // When the match is found, that appointment object is then stored in state.
  useEffect(() => {
    getAppointmentsByAppointmentId(appointmentId).then((appointmentArray) => {
      const thisAppointment = appointmentArray[0];
      setAppointment(thisAppointment);
    });
  }, [appointmentId]);

  // Function to make a fetch call to delete object. Relies on appointmentId given by useParams
  // Will not delete any other appointment object except the one being viewed.
  const handleRemoveAppointment = (event) => {
    event.preventDefault();
    const appointmentIdAsInteger = parseInt(appointmentId);
    removeAppointment(appointmentIdAsInteger).then(navigate("/appointments"));
    // After deletion, user is navigated back to the list of appointments. No need to stare at a blank screen. 
    // Function definition passed to RenderAppointmentDetailsButtons for modularization, still effective. 
  };

  // Function meant simply to navigate user with the associated data with the current appointment being viewed. 
  const handleUpdateAppointment = (event) => {
    event.preventDefault();
    // User is navigated to this path
    // Edit component is relying on this additional state being passed as a second argument to the navigate function. 
    // Will require useLocation() hook
    navigate(`/appointments/${appointmentId}/edit`, {
      state: { type: "edit", appointment: appointment },
    });
  };

  return (
    <article>
      <section className="appointmentDetails">
        <RenderAppointmentDetails
          appointment={appointment}
          currentUser={currentUser}
        />
      </section>
      <section>
        <RenderAppointmentDetailsButtons
          appointment={appointment}
          currentUser={currentUser}
          remover={handleRemoveAppointment}
          updater={handleUpdateAppointment}
        />
      </section>
    </article>
  );
};
