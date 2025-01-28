import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAppointmentsByAppointmentId } from "../../Services/AppointmentServices";
import { getVisitorByUserId } from "../../Services/UserServices";

export const AppointmentDetails = ({currentUser}) => {
  const [appointment, setAppointment] = useState({});
  const [visitor, setVisitor] = useState({})
  const { appointmentId } = useParams();

  useEffect(() => {
    getAppointmentsByAppointmentId(appointmentId).then((appointmentArray) => {
      const thisAppointment = appointmentArray[0];
      setAppointment(thisAppointment);
    });
  }, [appointmentId]);

  useEffect(() => {
    getVisitorByUserId(currentUser.id).then((responseArray) => {
      const visitorObject = responseArray[0];
      setVisitor(visitorObject);
    });
  }, [currentUser]);

  return <>{appointment.id} {}</>;
};
