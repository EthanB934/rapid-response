import { useEffect, useState } from "react";
import { createNewGender, getAllGenders } from "../../Services/ProfileServices";
import { PractitionerUserForm } from "./PractitionerUserForm";
import "./Welcome.css";
import "../Appointments/AppointmentDetails.css";
import { VisitorUserForm } from "./VisitorUserForm";

export const UserInfoForm = ({ currentUser, practitioner, visitor }) => {
  const [name, setName] = useState("");
  const [genderEntry, setGenderEntry] = useState("");
  const [genders, setGenders] = useState([]);
  const [genderId, setGenderId] = useState(-1);
  // Function defined in parent, invoked in children components. Sets state variable, name
  const handleName = (event) => {
    setName(event.target.value);
  };

  // Function defined here. Necessary for invocation in gender creation function.
  const handleGetAndSetAllGenders = () => {
    getAllGenders().then((gendersArray) => setGenders(gendersArray));
  };

  // UseEffect to return array of all created gender options. Will be updated when gender creation function executes.
  useEffect(() => {
    handleGetAndSetAllGenders();
  }, []);

  // Function defined in parent, invoked in children components. Sets state variable, genderEntry (text input for specification)
  const handleGenderEntry = (event) => {
    setGenderEntry(event.target.value);
  };

  // Function defined in parent, invoked in children components. Sets state variable, genderId (id of gender drop down selections)

  const handleGenderId = (event) => {
    setGenderId(event.target.value);
  };

  // Function defined in parent, invoked in children as genderGenerator.
  const handleCreateNewGender = (event) => {
    event.preventDefault();
    // Iterates through all created genders with new user specification (genderEntry)
    const isGenderCreated = genders.find(
      (gender) => gender.gender.toLowerCase() === genderEntry.toLowerCase()
    );
    // If the user specification does not match a created gender option
    if (isGenderCreated === undefined) {
      const genderForm = {
        gender: genderEntry,
      };
      // Then create a new gender resource, and refetch and set genders array with new listing.
      createNewGender(genderForm).then(handleGetAndSetAllGenders);
      window.alert("Your preference has been created and added to selections.");
    } else {
      // Otherwise, notify the user that their specification is a part of the available options.
      window.alert("This preferences has already been added to our selections");
    }
  };

  return (
    <form>
      {currentUser.isStaff ? (
        <PractitionerUserForm
          currentUser={currentUser}
          nameHandler={handleName}
          name={name}
          genders={genders}
          genderId={genderId}
          handleGenderSelect={handleGenderId}
          genderSetter={handleGenderEntry}
          genderGenerator={handleCreateNewGender}
          practitioner={practitioner}
        />
      ) : (
        <VisitorUserForm
          currentUser={currentUser}
          nameHandler={handleName}
          name={name}
          genders={genders}
          genderId={genderId}
          handleGenderSelect={handleGenderId}
          genderSetter={handleGenderEntry}
          genderGenerator={handleCreateNewGender}
          visitor={visitor}
        />
      )}
    </form>
  );
};
