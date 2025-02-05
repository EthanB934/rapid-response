import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getAppointmentsByAppointmentId,
  removeAppointment,
} from "../../Services/AppointmentServices";
import { getVisitorByUserId } from "../../Services/UserServices";
import { getAllPractices, getPractitionerByUserId } from "../../Services/PractitionerServices";
import "../Meet the Staff/MeetTheStaff.css";
export const AppointmentDetails = ({ currentUser }) => {
  const [appointment, setAppointment] = useState({});
  const [allPractices, setAllPractices] = useState([]);
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
    getAllPractices().then((practicesArray) => setAllPractices(practicesArray))
  }, [appointment])
  useEffect(() => {
    if (!currentUser.isStaff) {
      getVisitorByUserId(currentUser.id).then((responseArray) => {
        const visitorObject = responseArray[0];
        setVisitor(visitorObject);
      });
    }
    if (currentUser.isStaff) {
      getPractitionerByUserId(currentUser.id).then((responseArray) => {
        const visitorObject = responseArray[0];
        setVisitor(visitorObject);
      });
    }
  }, [currentUser]);

  const handleRemoveAppointment = (event) => {
    event.preventDefault();
    const appointmentIdAsInteger = parseInt(appointmentId);
    removeAppointment(appointmentIdAsInteger).then(navigate("/appointments"));
  };

  const handleUpdateAppointment = (event) => {
    event.preventDefault();
    navigate(`/appointments/${appointmentId}/edit`, {
      state: { type: "edit", appointment: appointment },
    });
  };

  return (
    <article>
      {appointment.practitioner ? (
        <>
          <h1>Appointment Details for Appointment #{appointment.id}</h1>
          <section className="appointmentDetails">
            <p className="details">
              Your have scheduled this appointment for the following reason:{" "}
              {appointment.reason}. You will be meeting with our trusted
              clinical expert {appointment.practitioner.fullName}. Doctor{" "}
              {appointment.practitioner.fullName} practices{" "}
              {allPractices.map((practice) => {
                if(practice.id === parseInt(appointment.practitioner.practiceId))
                return <>{practice.practice}</>;
              })}
              . He has {appointment.practitioner.experience} years of experience
              as a doctor.
            </p>
            {!currentUser.isStaff && appointment.completed === true ? (
              <div className="detailsButtons">
                <label>
                  This appointment was marked as completed on{" "}
                  {appointment.scheduledDate}{" "}
                </label>
                <span>
                  This appointment has been completed. We hope the visit went
                  well!
                </span>
                <button
                  className="detailsButtons"
                  onClick={handleRemoveAppointment}
                >
                  Remove
                </button>
              </div>
            ) : (
              " "
            )}
            {!currentUser.isStaff && appointment.completed === false ? (
              <>
                <label>
                  This appointment is scheduled for {appointment.scheduledDate}
                </label>
                <span>
                  This appointment is still pending. We hope to see you soon!
                </span>
                <div className="detailsButtons">
                  <button onClick={handleRemoveAppointment}>Cancel</button>
                  <button onClick={handleUpdateAppointment}>Update</button>
                </div>
              </>
            ) : (
              " "
            )}
            {currentUser.isStaff && appointment.completed === true ? (
              <>
                <label>
                  This appointment was marked as completed on{" "}
                  {appointment.scheduledDate}{" "}
                </label>
                <span>
                  This appointment has been completed. We hope the visit went
                  well!
                </span>
              </>
            ) : (
              " "
            )}
            {currentUser.isStaff && appointment.completed === false ? (
              <>
                <label>
                  This appointment is scheduled for {appointment.scheduledDate}
                </label>{" "}
                <span>
                  This appointment is still pending. We hope to see you soon!
                </span>
              </>
            ) : (
              " "
            )}
          </section>
        </>
      ) : (
        "Waiting for practitioner"
      )}
    </article>
  );
};
