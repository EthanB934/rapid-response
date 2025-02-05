import { useEffect } from "react";
import { useState } from "react";
import {
  getAllPractices,
  getAllPractitioners,
} from "../../Services/PractitionerServices";
import { Link } from "react-router-dom";
import "../Appointments/MyAppointments.css";
export const MeetTheStaff = () => {
  const [practitioners, setPractitioners] = useState([]);
  const [practices, setPractices] = useState([]);

  useEffect(() => {
    getAllPractitioners().then((practitionersArray) =>
      setPractitioners(practitionersArray)
    );
  }, []);

  useEffect(() => {
    getAllPractices().then((practicesArray) => setPractices(practicesArray));
  }, [practitioners]);

  return (
    <div className="list">
      {practitioners.map((practitioner) => {
        return (
          <div className="listCard">
            <Link
              className="link"
              to={`/meetthestaff/${practitioner.id}`}
              key={practitioner.id}
            >
              {practitioner.fullName}
            </Link>
            {practices.map((practice) => {
              if (practice.id === parseInt(practitioner.practiceId)) {
                return <>Practices {practice.practice}</>;
              }
            })}{" "}
            and has {practitioner.experience} years of experience
          </div>
        );
      })}
    </div>
  );
};
