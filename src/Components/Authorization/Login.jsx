import React, { useEffect, useState } from "react";
import { Link, useResolvedPath } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { getUserByEmail } from "../../Services/UserServices";

export const Login = () => {
  const [email, set] = useState("");
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  // First process to execute when user logs into Rapid Response
  const handleLogin = (e) => {
    // Prevents rerendering HTML
    e.preventDefault();

    // Gets user by their email. Because they do not enter their unique id
    getUserByEmail(email).then((foundUsers) => {
      // Because we queried the database, we will receive an array of objects (users).
      if (foundUsers.length === 1) {
        // Emails are unique, so, there will be only one result in the array of objects.
        const user = foundUsers[0];

        // Sets user state
        setUser(user);

        // Sets the user's authentication token in the local storage. Values are extracted from user data
        localStorage.setItem(
          "rapidResponse_user",
          JSON.stringify({
            id: user.id,
            isStaff: user.isStaff,
          })
        );
      }
    });
  };

  useEffect(() => {
    // Keeps from invoking user until the first condition is met
    if ("id" in user) {
      // Sends the found user with their profile to the welcome component
      if (user?.practitioners.length === 1 || user?.visitors.length === 1) {
        navigate("/");
      } else {
        // If the user does not have either a practitioner or visitor profile, they are redirected to a form to create one first
        navigate("/userinfo");
      }
    }
  }, [user]);

  return (
    <main className="container-login">
      <section className="login">
        <form className="form-login" onSubmit={handleLogin}>
          <h1 className="loginH1">Rapid Response</h1>
          <h2>Please sign in</h2>
          <fieldset>
            <div className="form-group">
              <input
                type="email"
                value={email}
                onChange={(evt) => set(evt.target.value)}
                className="form-control"
                placeholder="Email address"
                required
                autoFocus
              />
            </div>
          </fieldset>
          <fieldset>
            <div className="form-group">
              <button className="login-btn btn-info" type="submit">
                Sign in
              </button>
            </div>
          </fieldset>
          <section>
            <Link to="/register">Not a member yet?</Link>
          </section>
        </form>
      </section>
    </main>
  );
};
