import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { createUser, getUserByEmail } from "../../Services/UserServices";

export const Register = (props) => {
  const [user, setUser] = useState({
    email: "",
    fullName: "",
    isStaff: false,
  });
  let navigate = useNavigate();

  const registerNewUser = () => {
    createUser(user).then((createdUser) => {
      if (createdUser.hasOwnProperty("id")) {
        localStorage.setItem(
          "rapidResponse_user",
          JSON.stringify({
            id: createdUser.id,
            staff: createdUser.isStaff,
          })
        );

        navigate("/login");
      }
    });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    getUserByEmail(user.email).then((response) => {
      if (response.length > 0) {
        // Duplicate email. No good.
        window.alert("Account with that email address already exists");
      } else {
        // Good email, create user.
        registerNewUser();
      }
    });
  };

  const updateUser = (evt) => {
    const copy = { ...user };
    copy[evt.target.id] = evt.target.value;
    setUser(copy);
  };

  return (
    <main style={{ textAlign: "center" }}>
      <section className="login">
        <form className="form-login" onSubmit={handleRegister}>
          <h1>Rapid Response</h1>
          <h2>Please Register</h2>
          <fieldset>
            <div className="form-group">
              <input
                onChange={updateUser}
                type="text"
                id="fullName"
                className="form-control"
                placeholder="Enter your name"
                required
                autoFocus
              />
            </div>
          </fieldset>
          <fieldset>
            <div className="form-group">
              <input
                onChange={updateUser}
                type="email"
                id="email"
                className="form-control"
                placeholder="Email address"
                required
              />
            </div>
          </fieldset>
          <fieldset>
            <div className="form-group">
              <label>
                <input
                  onChange={(evt) => {
                    const copy = { ...user };
                    copy.isStaff = evt.target.checked;
                    setUser(copy);
                  }}
                  type="checkbox"
                  id="isStaff"
                />
                I am an employee{" "}
              </label>
            </div>
          </fieldset>
          <fieldset>
            <div className="form-group">
              <button className="login-btn btn-info" type="submit">
                Register
              </button>
            </div>
          </fieldset>
        </form>
      </section>
    </main>
  );
};
