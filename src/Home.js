import React from 'react'
import './Home.css'
import { Layout } from './components/Layout';
import {Hello} from './components/hello'
import {FooterPage} from './components/Copyright'




export const Home = () => (
  <div>
    <div id="hero">
      <div id="hero-overlay">
          <Layout>
            <div id="words" class='bio'>
              <h1> <Hello/> <span id="name">Anikait Sharma</span></h1>
              <h5>I'm a second year Computer Science + Applied Mathematics major @ <span id="school">TAMU</span></h5>
              <p>come poke your nose into my life</p>
            </div>
          </Layout>
        </div>
    </div>
    <FooterPage fixed="bottom"/>
  </div>
)
