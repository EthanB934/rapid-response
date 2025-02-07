import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createNewVisitor } from "../../Services/VisitorServices";
export const VisitorUserForm = ({
  currentUser,
  nameHandler,
  name,
  genders,
  genderId,
  handleGenderSelect,
  genderSetter,
  genderGenerator,
  visitor,
}) => {
  const [visitorDateOfBirth, setVisitorDateOfBirth] = useState("");
  const navigate = useNavigate();

// Data relevant to the visitor only. The practitioner's current age is tracked, but not their date of birth. 
// Sets state variable, visitorDateOfBirth, a string
  const handleVisitorDateOfBirth = (event) => {
    setVisitorDateOfBirth(event.target.value);
  };

// Function definition. Responsible for creating a new visitor resource in the database. 
  const handleCreateVisitorInfo = (event) => {
    event.preventDefault();
    // Conditions to be met before submission may happen.
    if (name !== "" && visitorDateOfBirth !== "" && genderId !== -1) {
        // Object representative of visitor resource in database. 
      const userInfoForm = {
        fullName: name,
        dateOfBirth: visitorDateOfBirth,
        genderId: genderId,
        userId: currentUser.id,
      };
    // Creates visitor resource in database and navigates user from userInfo component to the home component. 
      createNewVisitor(userInfoForm).then(navigate("/"));
    } else {
      window.alert(`Please, ensure that all required fields are filled out.`);
    }
  };

  return (
    <>
    {/* It is possible that a visitor may not have a resource created in the database. If they do not, they receive a user data form to submit.
    Otherwise, if the resource is found, they will be navigated directly to the home component, the landing page.  */}
      {visitor ? (
        " "
      ) : (
        <div className="form">
          <fieldset className="practitionerInfo">
            <p>
              Hello, new visitor. Please, fill out this form. This information
              will be used when creating an appointment. It will be viewed by
              our practitioners, but will not be visible to our other visitors.
            </p>
            <label>Name:</label>{" "}
            <input
              type="text"
              placeholder="Your Full Name Here"
              value={name}
              onChange={nameHandler}
            />
            <label>Date of Birth: </label>{" "}
            <input
              type="month"
              value={visitorDateOfBirth}
              min="0"
              onChange={handleVisitorDateOfBirth}
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
          </fieldset>
          <div className="formButtons">
            <button onClick={handleCreateVisitorInfo}>Save Data</button>
          </div>
        </div>
      )}
    </>
  );
};
