import React from 'react'
import './About.css'
import {Jumbotron as Jumbo, Container} from 'react-bootstrap';
import styled from 'styled-components';
import berk from './assests/shiny.jpg';
import { Layout } from './components/Layout';
import me from './assests/me.png'


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

export const About = () => (
  <div>
    <Styles>
        <Jumbo fluid className = "jumbo">
            <div className="overlay"></div>
            <Container>
                <h1>About Me</h1>
            </Container>
        </Jumbo>
    </Styles>
    <Layout>
      <div id="theText">
        <div id='MyPic'>
          <img src={me} alt='of me' width="200px" height="200px" />
        </div>
        <div>
          <p>Hello! My name is Anikait Sharma. I am currently a sophomore Computer Science and Applied Mathematics major at Texas A&M University - College Station. I am an avid learner who has passion for science and technology. </p>
          <p>On my free time, I love to rock climb, play tennis, and wander off to find a new adventure. If you don’t see me at home, you’ll probably find me concert hopping with my homies.  </p>
        </div>
      </div>
    </Layout>
  </div>
)