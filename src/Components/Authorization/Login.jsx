import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { getUserByEmail } from "../../Services/UserServices";
import { getUserRoleByUserId } from "../../Services/UserServices";

export const Login = () => {
  const [email, set] = useState("");
  const [user, setUser] = useState({});
  const [determinedRoleUser, setDeterminedRoleUser] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      getUserRoleByUserId(user.id).then((responseArray) => {
        setDeterminedRoleUser(responseArray);
      });
    }
  }, [user]);

  const handleLogin = (e) => {
    e.preventDefault();
    getUserByEmail(email).then((foundUsers) => {
      if (foundUsers.length === 1) {
        const user = foundUsers[0];
        setUser(user);
        localStorage.setItem(
          "rapidResponse_user",
          JSON.stringify({
            id: user.id,
            isStaff: user.isStaff,
          })
        );
      }
    });
    if (
      determinedRoleUser.visitors?.length === 1 ||
      determinedRoleUser.practitioners?.length === 1
    ) {
      navigate("/");
    } else if (
      determinedRoleUser.visitors?.length === 0 ||
      !determinedRoleUser.practitioners?.length === 0
    ) {
      navigate("/userinfo");
    } 
    // else {
    //   window.alert("Invalid login");
    // }
  };

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
