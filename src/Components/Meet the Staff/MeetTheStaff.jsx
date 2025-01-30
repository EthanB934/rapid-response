import { useEffect } from "react";
import { useState } from "react";
import { getAllPractitioners } from "../../Services/PractitionerServices";
import { Link } from "react-router-dom";
import "../Appointments/MyAppointments.css";
export const MeetTheStaff = () => {
  const [practitioners, setPractitioners] = useState([]);

  useEffect(() => {
    getAllPractitioners().then((practitionersArray) =>
      setPractitioners(practitionersArray)
    );
  }, []);

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
            {practitioner.practice.map((practice) => {
              return <>Practices {practice}</>;
            })}{" "}
             and has {practitioner.experience} years of experience
          </div>
        );
      })}
    </div>
  );
};
