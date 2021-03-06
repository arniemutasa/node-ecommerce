import React, { Fragment } from "react";
import { Route, Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";

import { logout } from "../../actions/userActions";

import "../../App.css";
import Search from "./Search";

const Header = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);

  const logoutHandler = () => {
    dispatch(logout());

    alert.success("Logged Out Successfully");
  };
  return (
    <Fragment>
      <nav className="navbar row">
        <div className="col-12 col-md-3">
          <div className="navbar-brand">
            <Link to="/">
              <img src="/images/logo.png" alt="Mzansimall" />
            </Link>
          </div>
        </div>

        <div className="col-12 col-md-6 mt-2 mt-md-0">
          <Route render={({ history }) => <Search history={history} />} />
        </div>

        <div className="col-12 col-md-3 mt-4 mt-md-0 text-center">
          <Link to="/cart" style={{ textDecoration: "none" }}>
            <span id="cart" className="ml-3">
              Cart
            </span>
            <span className="ml-1" id="cart_count">
              {cartItems.length}
            </span>
          </Link>
          {user ? (
            <div className="ml-4 dropdown d-inline">
              <Link
                to="#"
                className="btn dropdown-toggle text-white mr-4"
                type="button"
                id="dropDownMenuButton"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <figure className="avatar avatar-nav">
                  <img
                    src={user.avatar && user.avatar.url}
                    alt={user.name}
                    className="rounded-circle"
                  />
                </figure>
                <span>{user.name}</span>
              </Link>
              <div
                className="dropdown-menu"
                aria-labelledby="dropDownMenuButton"
              >
                {user && user.role === "admin" && (
                  <Link className="dropdown-item" to="/dashboard">
                    Dashboard
                  </Link>
                )}
                <Link className="dropdown-item" to="/profile">
                  Profile
                </Link>
                <Link className="dropdown-item" to="/orders/me">
                  Orders
                </Link>
                <Link
                  className="dropdown-item text-danger"
                  to="/logout"
                  onClick={logoutHandler}
                >
                  Logout
                </Link>
              </div>
            </div>
          ) : (
            !loading && (
              <Fragment>
                <Link to="/login" className="btn authbtn" id="login_btn">
                  Login
                </Link>
                <Link to="/register" className="btn authbtn" id="login_btn">
                  Register
                </Link>
              </Fragment>
            )
          )}
        </div>
      </nav>
    </Fragment>
  );
};

export default Header;
