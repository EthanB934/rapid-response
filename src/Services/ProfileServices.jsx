export const getAllGenders = async () => {
  return await fetch("http://localhost:8088/genders").then((res) => res.json());
};
