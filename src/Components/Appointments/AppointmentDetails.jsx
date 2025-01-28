import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getAppointmentsByAppointmentId,
  removeAppointment,
} from "../../Services/AppointmentServices";
import { getVisitorByUserId } from "../../Services/UserServices";

export const AppointmentDetails = ({ currentUser }) => {
  const [appointment, setAppointment] = useState({});
  const [visitor, setVisitor] = useState({});
  const { appointmentId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getAppointmentsByAppointmentId(appointmentId).then((appointmentArray) => {
      const thisAppointment = appointmentArray[0];
      setAppointment(thisAppointment);
    });
  }, [appointmentId]);

  useEffect(() => {
    getVisitorByUserId(currentUser.id).then((responseArray) => {
      const visitorObject = responseArray[0];
      setVisitor(visitorObject);
    });
  }, [currentUser]);

  const handleRemoveAppointment = (event) => {
    event.preventDefault();
    const appointmentIdAsInteger = parseInt(appointmentId);
    removeAppointment(appointmentIdAsInteger).then(navigate("/appointments"));
  };
  return (
    <>
      {appointment.practitioner ? (
        <>
          <h1>Appointment Details for Appointment #{appointment.id}</h1>
          <p>
            Your have scheduled this appointment for the following reason:{" "}
            {appointment.reason}. You will be meeting with our trusted clinical
            expert {appointment.practitioner.fullName}. Doctor{" "}
            {appointment.practitioner.fullName} practices{" "}
            {appointment.practitioner.practice.map((practice) => {
              return <>{practice}</>;
            })}
            . He has {appointment.practitioner.experience} years of experience
            as a doctor.
          </p>
          <label>
            You have scheduled this appointment for {appointment.scheduledDate}
          </label>{" "}
          {appointment.completed ? (
            <>
              <span>
                This appointment has been completed. We hope the visit went
                well!
              </span>
              <button value={appointmentId} onClick={handleRemoveAppointment}>
                Remove
              </button>
            </>
          ) : (
            <span>
              This appointment is still pending. We hope to see you soon!
            </span>
          )}
        </>
      ) : (
        "Waiting for practitioner"
      )}
    </>
  );
};
