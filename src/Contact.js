import React from 'react'
import './Contact.css'
import mail from './assests/mail.png'
import git from "./assests/gitpic/GitHub-Mark-32px.png"
import linkedin from "./assests/LinkedIn-Logos/LI-In-Bug.png"
import fb from "./assests/f-Logos-2019-1/f_Logo_Online_04_2019/black/PNG/f_logo_RGB-Black_58.png"
import insta from "./assests/insta/glyph-logo_May2016.png"
import spotify from "./assests/spotblack.png"
import {Jumbotron as Jumbo, Container} from 'react-bootstrap';
import styled from 'styled-components';
import berk from './assests/blue.jpg';
import { Layout } from './components/Layout';
import {FooterPage} from './components/Copyright'


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

export const Contact = () => (
    <div>
      <Styles>
        <Jumbo fluid className = "jumbo">
            <div className="overlay"></div>
            <Container>
                <h1>Contact</h1>
            </Container>
        </Jumbo>
    </Styles>

    <Layout>
    <div id="allCont">
        <div class='pic'>
          <a href="mailto:anikaitsharma@yahoo.com">
            <img src={mail} alt="mail" width="30px" height="30px" id='mail_pic'/>
          </a>
        </div>
        
        <div class='pic'>
          <a href="https://github.com/anikait627">
            <img src={git} alt="Github"  id='git_pic'/>
          </a>
        </div>

        <div class='pic'>
          <a href="http://linkedin.com/in/anikait">
            <img src={linkedin} alt="Linkedin" width="35px" height="30px" id='linked_pic'/>
          </a>
        </div>

        <div class='pic'> 
          <a href="https://www.facebook.com/anikait627">
            <img src={fb} alt="Facebook" width="30px" height="30px" id='fb_pic'/>
          </a>
        </div>
        
        <div class='pic'>
          <a href="https://www.instagram.com/anikait627/">
            <img src={insta} alt="Instagram" width="30px" height="30px" id='insta_pic'/>
          </a>
        </div>

        <div class='pic'>
          <a href="https://open.spotify.com/user/anikait627?si=D8bditPARhim9N6o0xebEQ" id='spoitfy_pic'>
            <img src={spotify} alt="spotify" width="30px" height="30px"/>
          </a>
        </div>
      </div>

      <div id ="doc">
        <iframe src="https://docs.google.com/forms/d/e/1FAIpQLScz0GcYK8NMQV3sLuBWb_putvtIAnFAFjJdxXCQnqmIRLU2XQ/viewform?embedded=true" width="640" height="930" frameborder="0" marginheight="0" marginwidth="0">Loading…</iframe>
      </div>
      
    </Layout>
    <FooterPage/>
    
    </div>
)