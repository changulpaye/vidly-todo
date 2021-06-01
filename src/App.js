import React, { Component } from "react";
import { Redirect, Route, Switch } from "react-router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import ProtectedRoute from "./components/common/protectedRoute";
import Customers from "./components/customers";
import LoginForm from "./components/loginForm";
import Logout from "./components/logout";
import MovieForm from "./components/movieForm";
import Movies from "./components/movies";
import NavBar from "./components/navbar";
import NotFound from "./components/notFound";
import Profile from "./components/profile";
import RegisterForm from "./components/registerForm";
import Rentals from "./components/rentals";
import auth from "./services/authService";
class App extends Component {
  state = {};

  componentDidMount() {
    const user = auth.getCurrentUser();
    this.setState({ user });
  }
  render() {
    const { user } = this.state;
    return (
      <React.Fragment>
        <ToastContainer></ToastContainer>
        <NavBar user={user}></NavBar>
        <main className="container-fluid p-3">
          <Switch>
            <Route path="/login" component={LoginForm}></Route>
            <Route path="/logout" component={Logout}></Route>
            <Route path="/profile" component={Profile}></Route>
            <Route path="/register" component={RegisterForm}></Route>
            <ProtectedRoute path="/movies/:id" component={MovieForm} />
            <Route path="/movies" component={Movies} />
            <Route path="/rentals" component={Rentals}></Route>
            <Route path="/customers" component={Customers} />
            <Route path="/not-found" component={NotFound}></Route>
            <Redirect from="/" to="/movies" exact component={Movies}></Redirect>
            <Redirect to="/not-found"></Redirect>
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
