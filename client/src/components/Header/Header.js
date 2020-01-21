import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { navbarImg, navbarBrand, navLink } from './headerStyle'


const Header = (props) => {
    let links = null;
    if(!props.authenticated)
        links = (
            <Nav className="ml-auto">
                <Nav.Item><Nav.Link style={navLink} href="#login">LOG IN</Nav.Link></Nav.Item>
                <Nav.Item><Nav.Link style={navLink} href="#signUp">SIGN UP</Nav.Link></Nav.Item>
            </Nav>
        );
    else
        links = (
            <Nav className="ml-auto">
                <Nav.Item><Nav.Link style={navLink} href="#dashboard">DASHBOARD</Nav.Link></Nav.Item>
                <Nav.Item><Nav.Link style={navLink} href="#settings">SETTINGS</Nav.Link></Nav.Item>
                <Nav.Item><Nav.Link style={navLink} href="#logout">LOG OUT</Nav.Link></Nav.Item>
            </Nav>
        );


    return (
        <div style={ navbarImg }>
            <Navbar variant="dark" expand="lg">
                <Navbar.Brand style={navbarBrand} href="#home">
                     bbs_url
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse>
                    { links }
                </Navbar.Collapse>
            </Navbar>
        </div>


    );
}

export default Header;













