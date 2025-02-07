import { useEffect, useState } from "react";
import "../Meet the Staff/MeetTheStaff.css";
import { getAllPractices } from "../../Services/PractitionerServices";
export const RenderAppointmentDetails = ({ appointment, currentUser }) => {
  const [allPractices, setAllPractices] = useState([]);

  // The purpose of this useEffect is to fetch all practices and store that array in state.
  // The practices array will be used in later mapping to associate a practice with the associated practitioner scheduled in the appointment object.
  useEffect(() => {
    getAllPractices().then((practicesArray) => setAllPractices(practicesArray));
  }, []);

  return (
    <section className="appointmentDetails">
      {appointment.practitioner ? (
        <>
          <h1>Appointment Details for Appointment #{appointment.id}</h1>
          <p className="details">
            This appointment is scheduled for the following reason:{" "}
            {appointment.reason}. You will be meeting with our trusted clinical
            expert {appointment.practitioner.fullName}. Doctor{" "}
            {appointment.practitioner.fullName} practices{" "}
            {allPractices.map((practice) => {
              if (practice.id === parseInt(appointment.practitioner.practiceId))
                return <>{practice.practice}</>;
            })}
            . He has {appointment.practitioner.experience} years of experience
            as a doctor.
          </p>
          {currentUser.isStaff && appointment.completed === true ? (
            <section>
              <label>
                This appointment was marked as completed on{" "}
                {appointment.scheduledDate}{" "}
              </label>
              <span>
                This appointment has been completed. We hope the visit went
                well!
              </span>
            </section>
          ) : (
            " "
          )}
          {currentUser.isStaff && appointment.completed === false ? (
            <section>
              <label>
                This appointment is scheduled for {appointment.scheduledDate}
              </label>{" "}
              <span>This appointment is still pending.</span>
            </section>
          ) : (
            " "
          )}
        </>
      ) : (
        "Waiting for practitioner"
      )}
    </section>
  );
};
