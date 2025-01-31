import { useEffect, useState } from "react";
import "../Appointments/AppointmentDetails.css";
import { getAllGenders } from "../../Services/ProfileServices";
import { createNewPractitioner } from "../../Services/PractitionerServices";
import { useNavigate } from "react-router-dom";
export const UserInfoForm = ({ currentUser }) => {
  const [practitionerName, setPractitionerName] = useState("");
  const [practitionerAge, setPractitionerAge] = useState("");
  const [practitionerGenderId, setPractitionerGenderId] = useState(0);
  const [practitionerExperience, setPractitionerExperience] = useState(0);
  const [practitionerPractice, setPractitionerPractice] = useState("");
  const [genders, setGenders] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    getAllGenders().then((gendersArray) => setGenders(gendersArray));
  }, []);
  const handlePractitionerName = (event) => {
    setPractitionerName(event.target.value);
  };
  const handlePractitionerAge = (event) => {
    setPractitionerAge(event.target.value);
  };
  const handlePractitionerGenderId = (event) => {
    setPractitionerGenderId(event.target.value);
  };
  const handlePractitionerExperience = (event) => {
    setPractitionerExperience(event.target.value);
  };
  const handlePractitionerPractices = (event) => {
    setPractitionerPractice(event.target.value);
  };
  const handleCreateUserInfo = (event) => {
    event.preventDefault();
    const userInfoForm = {
      fullName: practitionerName,
      age: practitionerAge,
      genderId: practitionerGenderId,
      practice: [practitionerPractice],
      experience: practitionerExperience,
      userId: currentUser.id,
    };
    createNewPractitioner(userInfoForm).then(navigate("/"));
  };
  return (
    <form>
      <div className="form">
        <fieldset className="practitionerInfo">
          <label>Name:</label>{" "}
          <input
            type="text"
            placeholder="Your Full Name Here"
            value={practitionerName}
            onChange={handlePractitionerName}
          />
          <label>Age: </label>{" "}
          <input
            type="number"
            value={practitionerAge}
            min="0"
            onChange={handlePractitionerAge}
          />
          <label>Gender: </label>{" "}
          <select
            value={practitionerGenderId}
            onChange={handlePractitionerGenderId}
          >
            <option value="-1">Choose a gender...</option>
            {genders.map((gender) => {
              return (
                <option key={gender.id} value={gender.id}>
                  {gender.gender}
                </option>
              );
            })}
          </select>
          <label>Practice(s):</label>{" "}
          <input
            type="text"
            placeholder="The Name of the Practice(s)"
            value={practitionerPractice}
            onChange={handlePractitionerPractices}
          />
          <label>Experience: </label>{" "}
          <input
            type="number"
            value={practitionerExperience}
            min="0"
            onChange={handlePractitionerExperience}
          />
        </fieldset>
        <div className="formButtons">
          <button onClick={handleCreateUserInfo}>Save Data</button>
        </div>
      </div>
    </form>
  );
};
