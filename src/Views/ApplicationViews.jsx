import { useEffect, useState } from "react";
import { StaffMemberViews } from "./StaffMemberViews";
import { VisitorViews } from "./VisitorViews";
export const ApplicationViews = () => {
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    const localUser = localStorage.getItem("rapidResponse_user");
    const localRapidResponseUser = JSON.parse(localUser);
    setCurrentUser(localRapidResponseUser);
  }, []);

  return (
    <>
      {currentUser.isStaff ? (
        <StaffMemberViews currentUser={currentUser} />
      ) : (
        <VisitorViews currentUser={currentUser} />
      )}
    </>
  );
};
