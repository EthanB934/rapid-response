export const scheduleAppointment = async (appointmentForm) => {
  return await fetch("http://localhost:8088/appointments", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(appointmentForm),
  });
};
export const getAppointmentsByVisitorId = async (visitorId) => {
  return await fetch(
    `http://localhost:8088/appointments?visitorId=${visitorId}`
  ).then((res) => res.json());
};
export const getAppointmentsByPractitionerId = async (practitionerId) => {
  return await fetch(
    `http://localhost:8088/appointments?practitionerId=${practitionerId}`
  ).then((res) => res.json());
};
export const getAppointmentsByAppointmentId = async (appointmentId) => {
  return await fetch(
    `http://localhost:8088/appointments?id=${appointmentId}&_expand=practitioner`
  ).then((res) => res.json());
};
export const removeAppointment = async (appointmentId) => {
  return await fetch(`http://localhost:8088/appointments/${appointmentId}`, {
    method: "DELETE",
  });
};

export const updateAppointmentDetails = async (updatedAppointmentForm) => {
  return await fetch(`http://localhost:8088/appointments/${updatedAppointmentForm.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedAppointmentForm),
  });
};