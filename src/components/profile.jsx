import React, { Component } from "react";
import auth from "../services/authService";
class Profile extends Component {
  state = {};
  render() {
    const user = auth.getCurrentUser();
    return (
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th>User ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>User Type</th>
            <th>Login Time</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{user._id}</td>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{user.isAdmin ? "Admin User" : "Normal User"}</td>
            <td>{Date(user.iat)}</td>
          </tr>
        </tbody>
      </table>
    );
  }
}

export default Profile;
