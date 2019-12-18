import React from 'react';
import { Navbar as MainNav, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import { Link, useLocation } from 'react-router-dom';
/* import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFutbol } from '@fortawesome/free-solid-svg-icons'; */

const Navbar: React.FC = () => {
  const { pathname } = useLocation();

  return (
    <MainNav className="d-flex justify-content-between border-bottom mb-4" color="transparent">
      <NavbarBrand className="d-flex align-items-center font-italic font-weight-bold" href="/">
        <h3>ZSSN</h3>
        {/* <FontAwesomeIcon icon={faFutbol} size="lg" className="ml-2" /> */}
      </NavbarBrand>
      <Nav pills className="d-none d-md-flex">
        <NavItem>
          <Link className="text-decoration-none" to="/">
            <div className={`nav-link ${pathname === '/' ? 'active' : ''}`}>Home</div>
          </Link>
        </NavItem>
        <NavItem>
          <Link className="text-decoration-none" to="/survivors">
            <div className={`nav-link ${pathname === '/survivors' ? 'active' : ''}`}>Survivors</div>
          </Link>
        </NavItem>
      </Nav>
    </MainNav>
  );
};

export default Navbar;
