import { useEffect } from "react";
import { useState } from "react";
import { getAllPractitioners } from "../../Services/PractitionerServices";
import { Link } from "react-router-dom";
// import"../Appointments.css"
export const MeetTheStaff = () => {
  const [practitioners, setPractitioners] = useState([]);

  useEffect(() => {
    getAllPractitioners().then((practitionersArray) =>
      setPractitioners(practitionersArray)
    );
  }, []);

  return (
    <>
      {practitioners.map((practitioner) => {
        return (
          <>
            <Link to={`/meetthestaff/${practitioner.id}`} key={practitioner.id}>
              {practitioner.fullName}
            </Link>
            {practitioner.practice.map((practice) => {
                return <>{practice}</>
            })}
            {practitioner.experience}
          </>
        );
      })}
    </>
  );
};
