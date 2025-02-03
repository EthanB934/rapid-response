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
    <section className="list">
      <div className="list list2">
        {appointments ? (
          <>
            {appointments.map((appointment) => {
              return (
                <div className="listCard">
                  <Link className="ink" to={`/appointments/${appointment.id}`}>
                    {appointment.reason}
                  </Link>{" "}
                  {appointment.scheduledDate}{" "}
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
                    <>
                    <i className="fa-solid fa-x"></i>{" "}
                    {"This appointment has not been marked as completed"}
                    </>
                  )}
                  {currentUser.isStaff && appointment.completed === false ? (
                    <>
                      {"This appointment has not been marked as completed"}
                      <div className="appointmentStatus">
                        <button
                          value={appointment.id}
                          onClick={handleAppointmentCompletion}
                        >
                          Complete
                        </button>
                      </div>
                    </>
                  ) : (
                    " "
                  )}
                </div>
              );
            })}
          </>
        ) : (
          <>Loading...</>
        )}
      </div>
    </section>
  );
};
