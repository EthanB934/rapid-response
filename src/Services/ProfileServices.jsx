export const getAllGenders = async () => {
  return await fetch("http://localhost:8088/genders").then((res) => res.json());
};
export const createNewGender = async (genderForm) => {
  return await fetch("http://localhost:8088/genders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(genderForm),
  });
};
export const createProfile = async (profileForm) => {
  return await fetch("http://localhost:8088/profiles", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(profileForm),
  });
};
export const updateProfile = async (profileForm) => {
  return await fetch(`http://localhost:8088/profiles/${profileForm.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(profileForm),
  });
};
