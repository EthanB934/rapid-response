import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getProfileByPractitionerId } from "../../Services/PractitionerServices";

export const StaffDetails = ({ currentUser }) => {
  const [profile, setProfile] = useState({});
  const { practitionerId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getProfileByPractitionerId(practitionerId).then((responseArray) => {
      const practitionerProfile = responseArray[0];
      setProfile(practitionerProfile);
    });
  }, [practitionerId]);

  const handleScheduleAppointment = (event) => {
    event.preventDefault()
    navigate("/create", {state: {type: "create", practitionerId: practitionerId}})
  }

  return (
    <>
      {profile.practitioner ? (
        <article>
          <section>
            <p>
              My name is {profile.practitioner.fullName}, I am{" "}
              {profile.practitioner.age} years young. I have been working in my
              dedicated field(s),{" "}
              {profile.practitioner.practice.map((practice) => {
                return <>{practice}</>;
              })}
              {", "}
              for {profile.practitioner.experience} years. Here is a little bit
              about me, outside of work. {profile.bio}
            </p>
          </section>
        </article>
      ) : (
        <>{"Waiting for details..."}</>
      )}
      {currentUser.isStaff ? (
        " "
      ) : (
        <button onClick={handleScheduleAppointment}>
          Schedule Appointment
        </button>
      )}
    </>
  );
};
