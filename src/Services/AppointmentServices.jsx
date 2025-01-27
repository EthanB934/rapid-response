export const scheduleAppointment = async (appointmentForm) => {
  return await fetch("http://localhost:8088/appointments", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(appointmentForm)
  })
}


