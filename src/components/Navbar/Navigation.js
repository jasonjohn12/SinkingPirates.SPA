import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
function Navigation(props) {
  const history = useHistory();
  const handleLogout = () => {
    props.setUser(null);
    history.push("/");
  };

  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand as={Link} to="/">
        Pirates
      </Navbar.Brand>
      <Nav className="ml-auto pr-md-5 navbar-nav">
        {/* <Nav.Link as={Link} to="/">
          Home
        </Nav.Link> */}
        {props.user?.username && true ? (
          <>
            <Nav.Link as={Link} to="/dashboard">
              Dashboard
            </Nav.Link>
            <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
          </>
        ) : (
          <>
            <Nav.Link as={Link} to="/login">
              Login
            </Nav.Link>
            <Nav.Link as={Link} to="/register">
              {" "}
              Register
            </Nav.Link>
          </>
        )}
      </Nav>
      {/* <Form inline>
        <FormControl type="text" placeholder="Search" className="mr-sm-2" />
        <Button variant="outline-info">Search</Button>
      </Form> */}
    </Navbar>
  );
}

export default Navigation;
