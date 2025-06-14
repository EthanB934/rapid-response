import { useEffect, useState } from "react";
import {
  createProfile,
  getAllGenders,
  updateProfile,
} from "../../Services/ProfileServices";
import { getPractitionerByUserId } from "../../Services/PractitionerServices";
import { useLocation, useNavigate } from "react-router-dom";
import "../Appointments/AppointmentDetails.css";
export const CreateProfile = ({ currentUser }) => {
  const [genders, setGenders] = useState([]);
  const [practitioner, setPractitioner] = useState({});
  const [practitionerBio, setPractitionerBio] = useState("");
  const [profile, setProfile] = useState({});
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state?.type === "edit") {
      setPractitionerBio(location.state.profile.bio);
      setProfile(location.state.profile);
    }
  }, [location]);

  useEffect(() => {
    getAllGenders().then((responseArray) => setGenders(responseArray));
  }, []);

  useEffect(() => {
    getPractitionerByUserId(currentUser.id).then((responseArray) => {
      const practitionerObject = responseArray[0];
      setPractitioner(practitionerObject);
    });
  }, [currentUser]);
  const profileBio = (event) => {
    setPractitionerBio(event.target.value);
  };
  const handleCreateProfile = () => {
    const profileForm = {
      practitionerId: practitioner.id,
      bio: practitionerBio,
    };
    createProfile(profileForm).then(
      navigate(`/meetthestaff/${practitioner.id}`)
    );
  };
  const handleUpdateProfile = (event) => {
    event.preventDefault();
    const profileForm = {
      id: location.state?.profile.id,
      practitionerId: practitioner.id,
      bio: practitionerBio,
    };
    console.log(profileForm);
    updateProfile(profileForm).then(
      navigate(`/meetthestaff/${practitioner.id}`)
    );
  };
  return (
    <form>
      <div className="form">
        <fieldset className="practitionerInfo">
          <label>Name:</label>{" "}
          <input
            type="text"
            placeholder="Your Name Here"
            value={practitioner.fullName}
          />
          <label>Age: </label> <input type="number" value={practitioner.age} />
          <label>Gender: </label>{" "}
          <select value={practitioner.genderId}>
            <option value="-1">Choose a gender...</option>
            {genders.map((gender) => {
              return (
                <option key={gender.id} value={gender.id}>
                  {gender.gender}
                </option>
              );
            })}
          </select>
          <label>Experience: </label>{" "}
          <input type="number" value={practitioner.experience} />
        </fieldset>
        <fieldset className="bio">
          <label>Tell Your Clients About Yourself!</label>{" "}
          <textarea value={practitionerBio} onChange={profileBio}></textarea>
        </fieldset>
      </div>
      {location.state?.type === "edit" ? (
        <div className="formButtons">
          <button onClick={handleUpdateProfile}>Save Changes to Profile</button>
        </div>
      ) : (
        <div className="formButtons">
          <button onClick={handleCreateProfile}>Create Profile</button>
        </div>
      )}
    </form>
  );
};
