import { useEffect, useState } from "react";
import {
  getAppointmentsByVisitorId,
  removeAppointment,
} from "../../Services/AppointmentServices";
import { Link } from "react-router-dom";
import { getVisitorByUserId } from "../../Services/UserServices";

export const MyAppointments = ({ currentUser }) => {
  const [appointments, setAppointments] = useState([]);
  const [visitor, setVisitor] = useState({});

  useEffect(() => {
    getVisitorByUserId(currentUser.id).then((responseArray) => {
      const visitorObject = responseArray[0];
      setVisitor(visitorObject);
    });
  }, [currentUser]);

  const getAndSetAppointments = () => {
    if (visitor) {
      getAppointmentsByVisitorId(visitor?.id).then((responseArray) => {
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
                {appointment.completed === true ? (
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
