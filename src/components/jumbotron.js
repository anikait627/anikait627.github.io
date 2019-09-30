import React from 'react';
import {Jumbotron as Jumbo, Container} from 'react-bootstrap';
import styled from 'styled-components';
import berk from '../assests/clouds.jpg';


const Styles = styled.div`

    .jumbotron {
    background: url(${berk}) no-repeat fixed bottom;
    background-size: cover;
    color: #efefef;
    height: 200px;
    position: relative;
    z-index: -2;
  }
  .overlay {
    background-color: #000;
    opacity: 0.6;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: -1;
  }
`;

export const Jumbotron = () => (
    <Styles>
        <Jumbo fluid className = "jumbo">
            <div className="overlay"></div>
            <Container>
                <h1> One sec - watch this:</h1>
                <p> system.println.out("Yo what's up dawg?")</p>
            </Container>
        </Jumbo>
    </Styles>
)