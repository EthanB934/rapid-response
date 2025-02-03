import { useEffect, useState } from "react";
import "../Appointments/AppointmentDetails.css";
import { getAllGenders } from "../../Services/ProfileServices";
import { createNewPractitioner } from "../../Services/PractitionerServices";
import { useNavigate } from "react-router-dom";
import { createNewVisitor } from "../../Services/VisitorServices";
export const UserInfoForm = ({ currentUser, practitioner, visitor }) => {
  const [name, setName] = useState("");
  const [practitionerAge, setPractitionerAge] = useState("");
  const [visitorDateOfBirth, setVisitorDateOfBirth] = useState("");
  const [genderId, setGenderId] = useState(0);
  const [practitionerExperience, setPractitionerExperience] = useState(0);
  const [practitionerPractice, setPractitionerPractice] = useState("");
  const [genders, setGenders] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    getAllGenders().then((gendersArray) => setGenders(gendersArray));
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
  const handlePractitionerExperience = (event) => {
    setPractitionerExperience(event.target.value);
  };
  const handlePractitionerPractices = (event) => {
    setPractitionerPractice(event.target.value);
  };
  const handleCreatePractitionerInfo = (event) => {
    event.preventDefault();
    if (
      (name !== "",
      practitionerAge !== 0,
      genderId !== -1,
      practitionerPractice.length !== 0,
      practitionerExperience !== 0)
    ) {
      const userInfoForm = {
        fullName: name,
        age: practitionerAge,
        genderId: genderId,
        practice: [practitionerPractice],
        experience: practitionerExperience,
        userId: currentUser.id,
      };
      // console.log(userInfoForm)
      createNewPractitioner(userInfoForm).then(navigate("/"));
    }
    else {
      window.alert(`Please, ensure that all required fields are filled out.`)
    }
  };
  const handleCreateVisitorInfo = (event) => {
    event.preventDefault();
    if ((name !== "" && visitorDateOfBirth !== "" && genderId !== -1)) {
      const userInfoForm = {
        fullName: name,
        dateOfBirth: visitorDateOfBirth,
        genderId: genderId,
        userId: currentUser.id,
      };
      // console.log(userInfoForm)
      createNewVisitor(userInfoForm).then(navigate("/"));
    }
    else {
      window.alert(`Please, ensure that all required fields are filled out.`)
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
