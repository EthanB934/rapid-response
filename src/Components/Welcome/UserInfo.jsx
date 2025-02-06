import { useEffect, useState } from "react";
import "../Appointments/AppointmentDetails.css";
import { createNewGender, getAllGenders } from "../../Services/ProfileServices";
import {
  createNewPractitioner,
  getAllPractices,
} from "../../Services/PractitionerServices";
import { useNavigate } from "react-router-dom";
import { createNewVisitor } from "../../Services/VisitorServices";
import "./Welcome.css";
export const UserInfoForm = ({ currentUser, practitioner, visitor }) => {
  const [name, setName] = useState("");
  const [practitionerAge, setPractitionerAge] = useState("");
  const [visitorDateOfBirth, setVisitorDateOfBirth] = useState("");
  const [genderId, setGenderId] = useState(-1);
  const [genderEntry, setGenderEntry] = useState("");
  const [practitionerExperience, setPractitionerExperience] = useState(0);
  const [practices, setPractices] = useState(0);
  const [practitionerPractice, setPractitionerPractice] = useState(-1);
  const [genders, setGenders] = useState([]);
  const navigate = useNavigate();
  const handleGetAndSetAllGenders = () => {
    getAllGenders().then((gendersArray) => setGenders(gendersArray));
  };
  useEffect(() => {
    handleGetAndSetAllGenders();
  }, []);
  useEffect(() => {
    getAllPractices().then((practicesArray) => setPractices(practicesArray));
  }, []);
  const handleName = (event) => {
    setName(event.target.value);
  };
  const handlePractitionerAge = (event) => {
    setPractitionerAge(event.target.value);
  };
  const handleVisitorDateOfBirth = (event) => {
    setVisitorDateOfBirth(event.target.value);
  };
  const handleGenderId = (event) => {
    setGenderId(event.target.value);
  };
  const handleGenderEntry = (event) => {
    setGenderEntry(event.target.value);
  };
  const handlePractitionerExperience = (event) => {
    setPractitionerExperience(event.target.value);
  };
  const handlePracticeSelect = (event) => {
    setPractitionerPractice(event.target.value);
  };
  const handleCreatePractitionerInfo = (event) => {
    event.preventDefault();
    if (
      name !== "" &&
      practitionerAge !== 0 &&
      genderId !== -1 &&
      practitionerPractice >= 0 &&
      practitionerExperience !== 0
    ) {
      const userInfoForm = {
        fullName: name,
        age: practitionerAge,
        genderId: genderId,
        practiceId: practitionerPractice,
        experience: practitionerExperience,
        userId: currentUser.id,
      };
      // console.log(userInfoForm)
      createNewPractitioner(userInfoForm).then(navigate("/"));
    } else {
      window.alert(`Please, ensure that all required fields are filled out.`);
    }
  };
  const handleCreateVisitorInfo = (event) => {
    event.preventDefault();
    if (name !== "" && visitorDateOfBirth !== "" && genderId !== -1) {
      const userInfoForm = {
        fullName: name,
        dateOfBirth: visitorDateOfBirth,
        genderId: genderId,
        userId: currentUser.id,
      };
      // console.log(userInfoForm)
      createNewVisitor(userInfoForm).then(navigate("/"));
    } else {
      window.alert(`Please, ensure that all required fields are filled out.`);
    }
  };
  const handleCreateNewGender = (event) => {
    event.preventDefault();
    console.log("Current Gender Entry: ", genderEntry);
    // Returns boolean array
    const isGenderCreated = genders.find(
      (gender) => gender.gender.toLowerCase() === genderEntry.toLowerCase()
    );
    console.log("Is Gender Created?: ", isGenderCreated )
    if(isGenderCreated === undefined) {
      const genderForm = {
        gender: genderEntry
      }
      createNewGender(genderForm).then(handleGetAndSetAllGenders)
     window.alert("Your preference has been created and added to selections.")
    }
    else {
      window.alert("This preferences has already been added to our selections")
    }
  };

  return (
    <form>
      {currentUser.isStaff ? (
        <>
          {practitioner ? (
            " "
          ) : (
            <div className="form">
              <fieldset className="practitionerInfo">
                <p>
                  Hello, new practitioner. Please, fill out this form. This
                  information will be used when creating your profile. It will
                  be viewed by our visitors, and other staff members.
                </p>
                <label>Name:</label>{" "}
                <input
                  type="text"
                  placeholder="Your Full Name Here"
                  value={name}
                  onChange={handleName}
                />
                <label>Age: </label>{" "}
                <input
                  type="number"
                  value={practitionerAge}
                  min="0"
                  onChange={handlePractitionerAge}
                />
                <label>Gender: </label>{" "}
                <select value={genderId} onChange={handleGenderId}>
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
                <button onClick={handleCreatePractitionerInfo}>
                  Save Data
                </button>
              </div>
            </div>
          )}
        </>
      ) : (
        ""
      )}
      {!currentUser.isStaff ? (
        <>
          {visitor ? (
            // navigate("/")
            " "
          ) : (
            <div className="form">
              <fieldset className="practitionerInfo">
                <p>
                  Hello, new visitor. Please, fill out this form. This
                  information will be used when creating an appointment. It will
                  be viewed by our practitioners, but will not be visible to our
                  other visitors.
                </p>
                <label>Name:</label>{" "}
                <input
                  type="text"
                  placeholder="Your Full Name Here"
                  value={name}
                  onChange={handleName}
                />
                <label>Date of Birth: </label>{" "}
                <input
                  type="month"
                  value={visitorDateOfBirth}
                  min="0"
                  onChange={handleVisitorDateOfBirth}
                />
                <label>Gender: </label>{" "}
                <select value={genderId} onChange={handleGenderId}>
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
                        onChange={handleGenderEntry}
                      ></input>
                      <button
                        className="submission"
                        onClick={handleCreateNewGender}
                      >
                        Submit Preference
                      </button>
                    </>
                  ) : (
                    " "
                  )}
                </fieldset>
              </fieldset>
              <div className="formButtons">
                <button onClick={handleCreateVisitorInfo}>Save Data</button>
              </div>
            </div>
          )}
        </>
      ) : (
        ""
      )}
    </form>
  );
};
