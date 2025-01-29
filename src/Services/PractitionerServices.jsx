export const getAllPractitioners = async () => {
    return await fetch("http://localhost:8088/practitioners").then((res) => res.json())
}

export const getProfileByPractitionerId = async (practitionerId) => {
    return await fetch(`http://localhost:8088/profiles?practitionerId=${practitionerId}&_expand=practitioner`).then((res) => res.json())
}

export const getPractitionerByUserId = async (userId) => {
    return await fetch(`http://localhost:8088/practitioners?userId=${userId}`).then(
      (res) => res.json()
    );
  };
  export const getPractitionerById = async (practitionerId) => {
    return await fetch(`http://localhost:8088/practitioners?id=${practitionerId}`).then(
      (res) => res.json()
    );
  };