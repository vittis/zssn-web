import React from 'react';
import { Navbar as MainNav, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
/* import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFutbol } from '@fortawesome/free-solid-svg-icons'; */

const Navbar: React.FC = () => (
  <MainNav className="d-flex justify-content-between border-bottom mb-4" color="transparent">
    <NavbarBrand className="d-flex align-items-center font-italic font-weight-bold" href="/">
      <h3>ZSSN</h3>
      {/* <FontAwesomeIcon icon={faFutbol} size="lg" className="ml-2" /> */}
    </NavbarBrand>
    <Nav pills className="d-none d-md-flex">
      <NavItem>
        <NavLink href="#" active>
          Home
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink href="#">About</NavLink>
      </NavItem>
    </Nav>
  </MainNav>
);

export default Navbar;
