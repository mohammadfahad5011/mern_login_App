import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Navbar, Nav, NavDropdown } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import { logout } from "../actions/userAction";

const Header = () => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <>
      <header>
        <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
          <Container>
            <Link to="/">
              <Navbar.Brand>ProShop</Navbar.Brand>
            </Link>

            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ms-auto">
                {userInfo ? (
                  <NavDropdown title={userInfo.name} id="username">
                    <Link to="/profile">
                      <NavDropdown.Item>Profile</NavDropdown.Item>
                    </Link>
                    <NavDropdown.Item onClick={logoutHandler}>
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                ) : (
                  <Nav.Link>
                    <NavLink to="/login">
                      <i className="fa fa-user me-1" aria-hidden="true"></i>Sign
                      In
                    </NavLink>
                  </Nav.Link>
                )}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>
    </>
  );
};

export default Header;
