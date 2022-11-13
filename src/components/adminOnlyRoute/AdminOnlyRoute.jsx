import React from "react";
import { Link } from "react-router-dom";
import { useStateValue } from "../../context/StateProvider";

const AdminOnlyRoute = ({ children }) => {
  
const [{user}] = useStateValue()
 
  if (user.email === "kofiamoodarko@gmail.com") {
    return children;
  }
  return (
    <section style={{ height: "80vh" }}>
      <div className="container">
        <h2>Permission Denied.</h2>
        <p>This page can only be view by an Admin user.</p>
        <br />
        <Link to="/">
          <button className="--btn">&larr; Back To Home</button>
        </Link>
      </div>
    </section>
  );
};

export const AdminOnlyLink = ({ children }) => {
    const [{user}] = useStateValue()

  if (user.email === "kofiamoodarko@gmail.com") {
    return children;
  }
  return null;
};

export default AdminOnlyRoute;