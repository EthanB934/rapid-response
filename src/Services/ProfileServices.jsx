export const getAllGenders = async () => {
  return await fetch("http://localhost:8088/genders").then((res) => res.json());
};

export const createProfile = async (profileForm) => {
    return await fetch("http://localhost:8088/profiles", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(profileForm)
    })
}