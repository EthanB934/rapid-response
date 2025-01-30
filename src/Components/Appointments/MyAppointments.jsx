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
  const [visitor, setVisitor] = useState({});
  const [appointmentStatus, setAppointmentStatus] = useState(false);

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

  const getAndSetAppointments = () => {
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
  useEffect(() => {
    getAndSetAppointments();
  }, [visitor]);

  const handleRemoveAppointment = (event) => {
    const appointmentId = parseInt(event.target.value);
    removeAppointment(appointmentId).then(getAndSetAppointments);
  };

  const handleAppointmentCompletion = (event) => {
    const appointmentId = parseInt(event.target.value);
    // debugger
    const chosenAppointmentToComplete = appointments.filter(
      (appointment) => appointment.id === appointmentId
    );

    const appointmentFormForStatusUpdate = {
      id: appointmentId,
      reason: chosenAppointmentToComplete[0].reason,
      scheduledDate: chosenAppointmentToComplete[0].scheduledDate,
      visitorId: chosenAppointmentToComplete[0].visitorId,
      practitionerId: visitor.id,
      completed: true,
    };
    updateAppointmentDetails(appointmentFormForStatusUpdate).then(
      getAndSetAppointments
    );
    // completeAppointment(appointmentId)
  };

  return (
    <div className="list">
      {appointments ? (
        <>
          {appointments.map((appointment) => {
            return (
              <div className="listCard">
                <Link
                  className="ink"
                  to={`/appointments/${appointment.id}`}
                >
                  {appointment.reason}
                </Link>{" "}
                {appointment.scheduledDate}{" "}
                {!currentUser.isStaff && appointment.completed === true ? (
                  <>
                    <button
                      value={appointment.id}
                      onClick={handleRemoveAppointment}
                    >
                      Remove
                    </button>
                    <i className="fa-solid fa-check"></i>
                  </>
                ) : (
                  " "
                )}
                {!currentUser.isStaff && appointment.completed === false ? (
                  <i className="fa-solid fa-x"></i>
                ) : (
                  " "
                )}
                {currentUser.isStaff && appointment.completed === false ? (
                  <div>
                    <button
                      value={appointment.id}
                      onClick={handleAppointmentCompletion}
                    >
                      Complete
                    </button>
                  </div>
                ) : (
                  "This appointment has not been completed"
                )}
              </div>
            );
          })}
        </>
      ) : (
        <>Loading...</>
      )}
    </div>
  );
};
