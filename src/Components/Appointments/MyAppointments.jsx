import { useEffect, useState } from "react";
import {
  getAppointmentsByPractitionerId,
  getAppointmentsByVisitorId,
  removeAppointment,
  updateAppointmentDetails,
} from "../../Services/AppointmentServices";
import { Link } from "react-router-dom";
import { getVisitorByUserId } from "../../Services/UserServices";
import { getPractitionerByUserId } from "../../Services/PractitionerServices";
import "./MyAppointments.css";
export const MyAppointments = ({ currentUser }) => {
  const [appointments, setAppointments] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [visitor, setVisitor] = useState({});
  const [date, setDate] = useState("");
  // Visitors and Practitioners require this component. Filters appointments for specific user and their role.
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
  // UseEffect sets state variable, visitor; a generic variable that can represent either a visitor or a practitioner

  useEffect(() => {
    getAndSetAppointments();
  }, [visitor]);
  // useEffect observes visitor state variable. Runs when state changes.

  // Get and Set function definition that sets state variable
  const getAndSetAppointments = () => {
    // Depends on boolean value
    // Depends on useEffect setting visitor state variable
    if (!currentUser.isStaff) {
      getAppointmentsByVisitorId(visitor?.id).then((responseArray) => {
        setAppointments(responseArray);
      });
    }
    if (currentUser.isStaff) {
      getAppointmentsByPractitionerId(visitor?.id).then((responseArray) => {
        setAppointments(responseArray);
      });
    }
  };
  const findDate = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const formattedDate = `${year.toString()}-0${month.toString()}`;
    setDate(formattedDate);
  };

  useEffect(() => {
    findDate();
  }, []);

  useEffect(() => {
    const appointmentDates = appointments.filter((appointment) => {
      const searchTerms = date;
      const indexOf = appointment.scheduledDate.indexOf(searchTerms);
      if (indexOf === 0) {
        return appointment;
      }
    });
    setFilteredAppointments(appointmentDates);
  }, [appointments, date]);

  const handleDateChange = (event) => {
    setDate(event.target.value);
  };

  // Visible only to visitors
  // When an appointment's status is complete, this function is associated with the rendered button.
  const handleRemoveAppointment = (event) => {
    const appointmentId = parseInt(event.target.value);
    removeAppointment(appointmentId).then(getAndSetAppointments);
    // If the button is clicked, the associated appointment is removed. Then the list is re-fetched for the updated list.
  };

  // Visible only to practitioners
  // Associated function that allows a practitioner to update an appointment's status from false to true.
  const handleAppointmentCompletion = (event) => {
    const appointmentId = parseInt(event.target.value);
    const chosenAppointmentToComplete = appointments.filter(
      (appointment) => appointment.id === appointmentId
    );
    // JSON body to be sent via "PUT" request
    const appointmentFormForStatusUpdate = {
      id: appointmentId,
      reason: chosenAppointmentToComplete[0].reason,
      scheduledDate: chosenAppointmentToComplete[0].scheduledDate,
      visitorId: chosenAppointmentToComplete[0].visitorId,
      practitionerId: visitor.id,
      completed: true,
    };
    // Invokes "PUT" request function.
    updateAppointmentDetails(appointmentFormForStatusUpdate).then(
      getAndSetAppointments
    );
    // After "PUT" request is successful, Get and Set runs to reflect updated appointment status; button is no longer visible.
  };

  return (
    <section className="list">
      <input type="month" value={date} onChange={handleDateChange} />
      <div className="list list2">
        {/* Waits for associated appointments relevant to current user to load. */}
        {filteredAppointments.length > 0 ? (
          <>
            {filteredAppointments.map((appointment) => {
              return (
                <div className="listCard">
                  {/* Link associated with each appointment reason. Redirects user to that appointment's details. */}
                  <Link className="link" to={`/appointments/${appointment.id}`}>
                    {appointment.reason}
                  </Link>{" "}
                  {appointment.scheduledDate}{" "}
                  {/* Begins conditional rendering depending on two booleans */}
                  {!currentUser.isStaff && appointment.completed === true ? (
                    <>
                      <div>
                        <i className="fa-solid fa-check"></i>{" "}
                        {"This appointment has been marked as completed"}
                      </div>
                      <button
                        className="fa-solid fa-trash"
                        value={appointment.id}
                        onClick={handleRemoveAppointment}
                      ></button>
                    </>
                  ) : (
                    " "
                  )}
                  {!currentUser.isStaff && appointment.completed === false ? (
                    <>
                      <i className="fa-solid fa-x"></i>{" "}
                      {"This appointment has not been marked as completed"}
                    </>
                  ) : (
                    " "
                  )}
                  {currentUser.isStaff && appointment.completed === true ? (
                    <>
                      {"This appointment has been marked as completed"}
                      <div className="appointmentStatus"></div>
                    </>
                  ) : (
                    " "
                  )}
                  {currentUser.isStaff && appointment.completed === false ? (
                    <>
                      {"This appointment has not been marked as completed"}
                      <div className="appointmentStatus"></div>
                      <button
                        value={appointment.id}
                        onClick={handleAppointmentCompletion}
                      >
                        Complete
                      </button>
                    </>
                  ) : (
                    " "
                  )}
                </div>
              );
            })}
          </>
        ) : (
          // Fallback if appointments has not yet loaded, virtually unseen.
          <div className="listCard">There are no appointments at this time</div>
        )}
      </div>
    </section>
  );
};
