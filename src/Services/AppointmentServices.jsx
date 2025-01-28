export const scheduleAppointment = async (appointmentForm) => {
  return await fetch("http://localhost:8088/appointments", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(appointmentForm)
  })
}

export const getAppointmentsByVisitorId = async (visitorId) => {
  return await fetch(`http://localhost:8088/appointments?visitorId=${visitorId}`).then((res) => res.json())
}

export const removeAppointment = async (appointmentId) => {
  return await fetch(`http://localhost:8088/appointments/${appointmentId}`, {
    method: "DELETE"
  })
}