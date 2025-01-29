import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getPractitionerById,
  getProfileByPractitionerId,
} from "../../Services/PractitionerServices";

export const StaffDetails = ({ currentUser }) => {
  const [profile, setProfile] = useState({});
  const [author, setAuthor] = useState({});
  const { practitionerId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getProfileByPractitionerId(practitionerId).then((responseArray) => {
      const practitionerProfile = responseArray[0];
      setProfile(practitionerProfile);
    });
  }, [practitionerId]);

  useEffect(() => {
    getPractitionerById(practitionerId).then((practitionerArray) => {
      const practitionerObject = practitionerArray[0];
      setAuthor(practitionerObject);
    });
  }, [practitionerId]);

  const handleScheduleAppointment = (event) => {
    event.preventDefault();
    navigate("/create", {
      state: { type: "create", practitionerId: practitionerId },
    });
  };

  const handleEditProfile = (event) => {
    event.preventDefault();
    navigate("/profile", { state: { type: "edit", profile: profile } });
  };
  return (
    <>
      {profile?.practitioner ? (
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
      {currentUser.isStaff && currentUser.id === author.userId ? (
        <button onClick={handleEditProfile}>Edit Profile</button>
      ) : (
        " "
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
