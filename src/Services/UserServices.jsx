export const getUserByEmail = async (email) => {
  return await fetch(`http://localhost:8088/users?email=${email}`).then((res) =>
    res.json()
  );
};

export const createUser = async (user) => {
  return await fetch("http://localhost:8088/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  }).then((res) => res.json());
};

export const getVisitorByUserId = async (userId) => {
  return await fetch(`http://localhost:8088/visitors?userId=${userId}`).then(
    (res) => res.json()
  );
};
