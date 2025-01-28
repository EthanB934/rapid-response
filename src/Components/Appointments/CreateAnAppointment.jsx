import { useEffect, useState } from "react";
import { getVisitorByUserId } from "../../Services/UserServices";
import { getAllPractitioners } from "../../Services/PractitionerServices";
import { scheduleAppointment } from "../../Services/AppointmentServices";

export const CreateAnAppointment = ({ currentUser }) => {
  const [visitor, setVisitor] = useState({});
  const [reason, setReason] = useState("");
  const [scheduleDate, setScheduleDate] = useState("");
  const [practitioners, setAllPractitioners] = useState([]);
  const [chosenPractitioner, setChosenPractitioner] = useState(0);
  const [appointmentCompleted, setAppointmentCompleted] = useState(false);
  useEffect(() => {
    getVisitorByUserId(currentUser.id).then((responseArray) => {
      const visitorObject = responseArray[0];
      setVisitor(visitorObject);
    });
  }, [currentUser]);
  useEffect(() => {
    getAllPractitioners().then((practitionersArray) =>
      setAllPractitioners(practitionersArray)
    );
  }, []);
  //   console.log(visitor);
  const handleReasonChange = (event) => {
    setReason(event.target.value);
  };
  const handleScheduleDate = (event) => {
    setScheduleDate(event.target.value);
  };
  const handlePractitionerSelection = (event) => {
    setChosenPractitioner(parseInt(event.target.value));
  };

  const handleScheduling = (event) => {
    event.preventDefault();
    if (reason !== "" && scheduleDate !== "") {
      const appointmentForm = {
        reason: reason,
        scheduledDate: scheduleDate,
        visitorId: visitor.id,
        practitionerId: chosenPractitioner,
        completed: appointmentCompleted,
      };
      scheduleAppointment(appointmentForm);
    } else {
      window.alert(`Please ensure that all form fields have been filled out.`);
    }
  };
  return (
    <form>
      {visitor ? (
        <>
          <h1>Create An Appointment</h1>
          <fieldset>
            <label>Your Name</label>
            <input type="text" value={visitor.fullName} />
            <label>Your Date of Birth</label>
            <input type="text" value={visitor.dateOfBirth} />
            <label>Your Gender</label>
            <input type="text" value={visitor.genderId} />
          </fieldset>
        </>
      ) : (
        "Loading..."
      )}
      <fieldset>
        <label>Your appointment will be with: </label>
        <select onChange={handlePractitionerSelection}>
          <option value="0">Choose a practitioner...</option>
          {practitioners.map((practitioner) => {
            return (
              <option key={practitioner.id} value={practitioner.id}>
                {practitioner.fullName}
              </option>
            );
          })}
        </select>
        <label>Reason for Appointment</label>
        <textarea
          type="text"
          value={reason}
          onChange={(event) => handleReasonChange(event)}
        ></textarea>
      </fieldset>
      <fieldset>
        <label>For when would you like to schedule the appointment?</label>
        <input type="datetime-local" onChange={handleScheduleDate} />
      </fieldset>
      <button onClick={handleScheduling}>Schedule Appointment</button>
    </form>
  );
};
