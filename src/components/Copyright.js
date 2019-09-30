import React from 'react';
import {Nav, Navbar} from 'react-bootstrap';
import styled from 'styled-components';

const Styles = styled.div`

    .navbar{
        background-color: #222;
    }

    .navbar-brand, .navbar-nav .nav-link {
        color: #bbb;
        
        &:hover {
            color: white;
        }
    }
`;

export const FooterPage = () => (
    <Styles>
        <Navbar expand="true">
            <Navbar.Brand href='/me'>&copy; {new Date().getFullYear()} Anikait Sharma</Navbar.Brand>
        </Navbar>
    </Styles>
)