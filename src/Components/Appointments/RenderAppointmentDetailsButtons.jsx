import "../Meet the Staff/MeetTheStaff.css";
export const RenderAppointmentDetailsButtons = ({appointment, currentUser, remover, updater}) => {
  return (
    <>
      {" "}
      {!currentUser.isStaff && appointment.completed === true ? (
        <section className="appointmentDetails">
          <label>
            This appointment was marked as completed on{" "}
            {appointment.scheduledDate}{" "}
          </label>
          <span>
            This appointment has been completed. We hope the visit went well!
          </span>
          <button className="detailsButtons" onClick={remover}>
            Remove
          </button>
        </section>
      ) : (
        " "
      )}
      {!currentUser.isStaff && appointment.completed === false ? (
        <section className="appointmentDetails">
          <label>
            This appointment is scheduled for {appointment.scheduledDate}
          </label>
          <span>
            This appointment is still pending. We hope to see you soon!
          </span>
          <div className="detailsButtons">
            <button onClick={remover}>Cancel</button>
            <button onClick={updater}>Update</button>
          </div>
        </section>
      ) : (
        " "
      )}
    </>
  );
};
