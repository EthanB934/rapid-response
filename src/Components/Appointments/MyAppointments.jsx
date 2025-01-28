import { useEffect, useState } from "react";
import {
  getAppointmentsByPractitionerId,
  getAppointmentsByVisitorId,
  removeAppointment,
} from "../../Services/AppointmentServices";
import { Link } from "react-router-dom";
import { getVisitorByUserId } from "../../Services/UserServices";
import { getPractitionerByUserId } from "../../Services/PractitionerServices";

export const MyAppointments = ({ currentUser }) => {
  const [appointments, setAppointments] = useState([]);
  const [visitor, setVisitor] = useState({});

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
  return (
    <>
      {appointments ? (
        <>
          {appointments.map((appointment) => {
            return (
              <div key={appointment.id}>
                <Link to={`/appointments/${appointment.id}`}>
                  {appointment.reason}
                </Link>
                {appointment.scheduledDate}
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
                  <i className="fa-solid fa-x"></i>
                )}
              </div>
            );
          })}
        </>
      ) : (
        "Loading..."
      )}
    </>
  );
};
