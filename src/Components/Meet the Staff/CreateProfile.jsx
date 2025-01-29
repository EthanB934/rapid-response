import { useEffect, useState } from "react";
import { getAllGenders } from "../../Services/ProfileServices";
import { getPractitionerByUserId } from "../../Services/PractitionerServices";

export const CreateProfile = ({ currentUser }) => {
  const [genders, setGenders] = useState([]);
  const [practitioner, setPractitioner] = useState({});
  const [practitionerBio, setPractitionerBio] = useState("")

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
    setPractitionerBio(event.target.value)
  }
  return (
    <form>
      <fieldset>
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
      <fieldset>
        <label>Tell Your Clients About Yourself!</label>{" "}
        <textarea value={practitionerBio} onChange={profileBio}></textarea>
      </fieldset>
    </form>
  );
};
