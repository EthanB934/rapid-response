import { useEffect, useState } from "react";
import {
  createNewPractitioner,
  getAllPractices,
} from "../../Services/PractitionerServices";
import { useNavigate } from "react-router-dom";

export const PractitionerUserForm = ({
  currentUser,
  nameHandler,
  name,
  genderId,
  handleGenderSelect,
  genderSetter,
  genderGenerator,
  practitioner,
  genders,
}) => {
  const [practitionerAge, setPractitionerAge] = useState("");
  const [practices, setPractices] = useState([]);
  const [practitionerPractice, setPractitionerPractice] = useState(-1);
  const [practitionerExperience, setPractitionerExperience] = useState(0);
  const navigate = useNavigate();
// Function defined in child, specific to practitioners. Returns an array of all practice resources. 
  useEffect(() => {
    getAllPractices().then((practicesArray) => setPractices(practicesArray));
  }, []);

// Sets state variable, practitionerAge, an integer. 
  const handlePractitionerAge = (event) => {
    setPractitionerAge(event.target.value);
  };

// Sets state variable, practiceSelect, an integer. Represents user selection from practices drop down box. 
  const handlePracticeSelect = (event) => {
    setPractitionerPractice(event.target.value);
  };

// Sets state variable, practitionerExperience, an integer. 
  const handlePractitionerExperience = (event) => {
    setPractitionerExperience(event.target.value);
  };

// Function definition. Responsible for creating new practitioner resource in database. 
  const handleCreatePractitionerInfo = (event) => {
    event.preventDefault();
    // Conditions to be met before submission can happen. Reduces bad data input
    if (
      name !== "" &&
      practitionerAge !== 0 &&
      genderId !== -1 &&
      practitionerPractice >= 0 &&
      practitionerExperience !== 0
    ) {
    // Object representative of intended tracking data necessary for practitioners. 
      const userInfoForm = {
        fullName: name,
        age: practitionerAge,
        genderId: genderId,
        practiceId: practitionerPractice,
        experience: practitionerExperience,
        userId: currentUser.id,
      };
    // Creates new practitioner resource. Navigates user to home from userInfo component.
      createNewPractitioner(userInfoForm).then(navigate("/"));
    } else {
        // Alert to user if conditions for submission have not been met. 
      window.alert(`Please, ensure that all required fields are filled out.`);
    }
  };
  return (
    <>
    {/* It is possible that a user does not have yet a practitioner resource. If they do not, they receive the form. Otherwise, they will be directed
    to the home component, the landing page. */}
      {practitioner ? (
        " "
      ) : (
        <div className="form">
          <fieldset className="practitionerInfo">
            <p>
              Hello, new practitioner. Please, fill out this form. This
              information will be used when creating your profile. It will be
              viewed by our visitors, and other staff members.
            </p>
            <label>Name:</label>{" "}
            <input
              type="text"
              placeholder="Your Full Name Here"
              value={name}
              onChange={nameHandler}
            />
            <label>Age: </label>{" "}
            <input
              type="number"
              value={practitionerAge}
              min="0"
              onChange={handlePractitionerAge}
            />
            <label>Gender: </label>{" "}
            <select value={genderId} onChange={handleGenderSelect}>
              <option value="-1">Choose a gender...</option>
              {genders.map((gender) => {
                return (
                  <option key={gender.id} value={gender.id}>
                    {gender.gender}
                  </option>
                );
              })}
            </select>
            <fieldset>
              {parseInt(genderId) === 10 ? (
                <>
                  <label>Would you like to specify? </label>
                  <input
                    type="text"
                    placeholder="Your preferred gender"
                    onChange={genderSetter}
                  ></input>
                  <button className="submission" onClick={genderGenerator}>
                    Submit Preference
                  </button>
                </>
              ) : (
                " "
              )}
            </fieldset>
            <label>Practice(s):</label>{" "}
            {practices ? (
              <select onChange={handlePracticeSelect}>
                <option value="-1">Select Your Practice</option>
                {practices.map((practice) => {
                  return (
                    <option key={practice.id} value={practice.id}>
                      {practice.practice}
                    </option>
                  );
                })}
              </select>
            ) : (
              "Waiting for the practices to load"
            )}
            <label>Experience: </label>{" "}
            <input
              type="number"
              value={practitionerExperience}
              min="0"
              onChange={handlePractitionerExperience}
            />
          </fieldset>
          <div className="formButtons">
            <button onClick={handleCreatePractitionerInfo}>Save Data</button>
          </div>
        </div>
      )}
    </>
  );
};
