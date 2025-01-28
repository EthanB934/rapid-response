import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProfileByPractitionerId } from "../../Services/PractitionerServices";

export const StaffDetails = () => {
  const [practitioner, setPractitioner] = useState({});
  const { practitionerId } = useParams();

  useEffect(() => {
    getProfileByPractitionerId(practitionerId).then((practitionerObject) =>
      setPractitioner(practitionerObject)
    );
  }, [practitionerId]);

  return <>Here are the staff details</>;
};
