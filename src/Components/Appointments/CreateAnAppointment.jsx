import { useEffect, useState } from "react";
import { getAllPractitioners } from "../../Services/PractitionerServices";
import {
  scheduleAppointment,
  updateAppointmentDetails,
} from "../../Services/AppointmentServices";
import { useLocation, useNavigate } from "react-router-dom";
import "./AppointmentDetails.css";
export const CreateAnAppointment = ({ visitor, genders }) => {
  const [reason, setReason] = useState("");
  const [gender, setGender] = useState("");
  const [scheduleDate, setScheduleDate] = useState("");
  const [practitioners, setAllPractitioners] = useState([]);
  const [chosenPractitioner, setChosenPractitioner] = useState(-1);
  const location = useLocation();
  const navigate = useNavigate();

  // UseEffect is necessary. If a visitor wishes to update their appointment details, they may. This useEffect relies on the location() hook. With
  // location is initializes state variables with data that was created during the appointment creation process.
  // Only the reinitialized data may be changed. All other data is dependant upon the visitor resource.
  useEffect(() => {
    if (location.state?.type === "edit") {
      console.log(location.state.appointment);
      setReason(location.state.appointment.reason);
      setScheduleDate(location.state.appointment.scheduledDate);
      setChosenPractitioner(
        parseInt(location.state.appointment.practitionerId)
      );
    }
    // This else statement is necessary. It is possible that a visitor may schedule an appointment from the staff member details. This is from where
    //  the state.type === "create" originates.
    else if (location.state?.type === "create") {
      setChosenPractitioner(parseInt(location.state.practitionerId));
    }
  }, [location]);

  // UseEffect is needed for generating options in a drop down menu from which the visitor
  // may select the practitioner with whom they would like to schedule
  useEffect(() => {
    getAllPractitioners().then((practitionersArray) =>
      setAllPractitioners(practitionersArray)
    );
  }, []);

  // UseEffect that triggers when either the state variables, visitor and allGenders has been observed changing.
  useEffect(() => {
    if (visitor) {
      const visitorGender = genders.find(
        // Compares all genders' ids with visitors' genderId
        (gender) => gender.id === parseInt(visitor.genderId)
      );
      // When the relevant gender has been found by id. The state variable, gender is set with the gender property, as a string.
      setGender(visitorGender?.gender);
    }
  }, [visitor, genders]);

  // Sets state variable, reason, a string.
  const handleReasonChange = (event) => {
    setReason(event.target.value);
  };

  // Sets state variable, scheduleDate, a string.
  const handleScheduleDate = (event) => {
    setScheduleDate(event.target.value);
  };

  // Sets state variable, practitionerSelection, an integer. Represents visitor selection from practitioner drop down box.
  const handlePractitionerSelection = (event) => {
    setChosenPractitioner(parseInt(event.target.value));
  };

  // Function definition. Responsible for creating a new appointment resource in the database.
  const handleScheduling = (event) => {
    event.preventDefault();
    // Conditions to be met before submission may happen
    if (reason !== "" && scheduleDate !== "" && chosenPractitioner > -1) {
      // Object representative of appointment resource. Tracks necessary data for rendering details later.
      const appointmentForm = {
        reason: reason,
        scheduledDate: scheduleDate,
        visitorId: visitor.id,
        practitionerId: chosenPractitioner,
        completed: false,
      };
      // Creates a new appointment resource in the database. Navigates visitor user back to the appointments list.
      scheduleAppointment(appointmentForm).then(navigate("/appointments"));
    } else {
      window.alert(`Please ensure that all form fields have been filled out.`);
    }
  };

  // Function Definition. Responsible for storing any data that may have been changed after useLocation()'s useEffect initialization.
  const handleUpdateAppointmentDetails = (event) => {
    event.preventDefault();
    const updatedAppointmentForm = {
      id: location.state.appointment.id,
      reason: reason,
      scheduledDate: scheduleDate,
      visitorId: visitor.id,
      practitionerId: chosenPractitioner,
      completed: false,
    };
    // Makes a "PUT" request to update resource in the database. Includes all relevant data that may be modified, and data that may not be.
    // After request is made, visitor user is navigated back to their appointment list.
    updateAppointmentDetails(updatedAppointmentForm).then(
      navigate("/appointments")
    );
  };
  return (
    <form>
      {visitor ? (
        <>
          {location.state?.type === "edit" ? (
            <h1 className="createAppointmentH1">Edit An Appointment</h1>
          ) : (
            <h1 className="createAppointmentH1">Create An Appointment</h1>
          )}
          <div className="form">
            <fieldset className="visitorInfo">
              <label>Your Name</label>
              <input type="text" value={visitor.fullName} readOnly="readonly" />
              <label>Your Date of Birth</label>
              <input
                type="text"
                value={visitor.dateOfBirth}
                readOnly="readonly"
              />
              <label>Your Gender</label>
              <input type="text" defaultValue={gender} readOnly="readonly" />
            </fieldset>
          </div>
        </>
      ) : (
        "Loading..."
      )}
      <div className="form">
        <fieldset className="appointmentInfo">
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
          <label>For when would you like to schedule the appointment?</label>
          <input
            defaultValue={scheduleDate}
            type="datetime-local"
            onChange={handleScheduleDate}
          />
        </fieldset>
      </div>
      {location.state?.type === "edit" ? (
        <div className="formButtons">
          <button onClick={handleUpdateAppointmentDetails}>
            Update Appointment Details
          </button>
        </div>
      ) : (
        <div className="formButtons">
          <button onClick={handleScheduling}>Schedule Appointment</button>
        </div>
      )}
    </form>
  );
};
