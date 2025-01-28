import { useEffect, useState } from "react";
import { getVisitorByUserId } from "../../Services/UserServices";
import { getAllPractitioners } from "../../Services/PractitionerServices";
import { scheduleAppointment, updateAppointmentDetails } from "../../Services/AppointmentServices";
import { useLocation, useNavigate } from "react-router-dom";

export const CreateAnAppointment = ({ currentUser }) => {
  const [visitor, setVisitor] = useState({});
  const [reason, setReason] = useState("");
  const [scheduleDate, setScheduleDate] = useState("");
  const [practitioners, setAllPractitioners] = useState([]);
  const [chosenPractitioner, setChosenPractitioner] = useState(-1);
  const [appointmentCompleted, setAppointmentCompleted] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state) {
      console.log(location.state.appointment);
      setReason(location.state.appointment.reason);
      setScheduleDate(location.state.appointment.scheduledDate);
      setChosenPractitioner(
        parseInt(location.state.appointment.practitionerId)
      );
    }
  }, [location]);

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
      scheduleAppointment(appointmentForm).then(navigate("/appointments"));
    } else {
      window.alert(`Please ensure that all form fields have been filled out.`);
    }
  };

  const handleUpdateAppointmentDetails = (event) => {
    event.preventDefault()
    const updatedAppointmentForm = {
      id: location.state.appointment.id,
      reason: reason,
      scheduledDate: scheduleDate,
      visitorId: visitor.id,
      practitionerId: chosenPractitioner,
      completed: appointmentCompleted,
    };
    updateAppointmentDetails(updatedAppointmentForm)
    .then(navigate("/appointments"))
  }
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
        <select
          value={chosenPractitioner}
          onChange={handlePractitionerSelection}
        >
          <option value="-1">Choose a practitioner...</option>
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
        <input
          defaultValue={scheduleDate}
          type="datetime-local"
          onChange={handleScheduleDate}
        />
      </fieldset>
      {location.state.type === "edit" ? (
        <button onClick={handleUpdateAppointmentDetails}>Update Appointment Details</button>
      ) : (
        <button onClick={handleScheduling}>Schedule Appointment</button>
      )}
    </form>
  );
};
