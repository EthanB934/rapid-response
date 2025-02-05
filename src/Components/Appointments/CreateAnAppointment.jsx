import { useEffect, useState } from "react";
import { getVisitorByUserId } from "../../Services/UserServices";
import { getAllPractitioners } from "../../Services/PractitionerServices";
import {
  scheduleAppointment,
  updateAppointmentDetails,
} from "../../Services/AppointmentServices";
import { useFetcher, useLocation, useNavigate } from "react-router-dom";
import "./AppointmentDetails.css";
import { getAllGenders } from "../../Services/ProfileServices";
export const CreateAnAppointment = ({ currentUser }) => {
  const [visitor, setVisitor] = useState({});
  const [reason, setReason] = useState("");
  const [allGenders, setAllGenders] = useState([]);
  const [gender, setGender] = useState("");
  const [scheduleDate, setScheduleDate] = useState("");
  const [practitioners, setAllPractitioners] = useState([]);
  const [chosenPractitioner, setChosenPractitioner] = useState(-1);
  const [appointmentCompleted, setAppointmentCompleted] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state?.type === "edit") {
      console.log(location.state.appointment);
      setReason(location.state.appointment.reason);
      setScheduleDate(location.state.appointment.scheduledDate);
      setChosenPractitioner(
        parseInt(location.state.appointment.practitionerId)
      );
    } else if (location.state?.type === "create") {
      setChosenPractitioner(parseInt(location.state.practitionerId));
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
  useEffect(() => {
    getAllGenders().then((responseArray) => setAllGenders(responseArray));
  }, []);
  useEffect(() => {
    if (visitor) {
      const visitorGender = allGenders.find(
        (gender) => gender.id === visitor.genderId
      );
      setGender(visitorGender?.gender);
    }
  }, [visitor, allGenders]);
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
    if (reason !== "" && scheduleDate !== "" && chosenPractitioner > -1) {
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
    event.preventDefault();
    const updatedAppointmentForm = {
      id: location.state.appointment.id,
      reason: reason,
      scheduledDate: scheduleDate,
      visitorId: visitor.id,
      practitionerId: chosenPractitioner,
      completed: appointmentCompleted,
    };
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
              <input type="text" value={visitor.fullName} />
              <label>Your Date of Birth</label>
              <input type="text" value={visitor.dateOfBirth} />
              <label>Your Gender</label>
              <input type="text" value={gender} />
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
