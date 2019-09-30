import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Home } from './Home';
import { About } from './About';
import { Portfolio } from './Portfolio';
import { Contact } from './Contact';
import { NoMatch } from './NoMatch';
import { NavigationBar } from './components/NavigationBar';
import {FooterPage} from './components/Copyright';


class App extends Component {
  render() {
    return (
      <React.Fragment>
        <NavigationBar/>
          <Router>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/about" component={About} />
              <Route path="/portfolio" component={Portfolio} />
              <Route path="/contact" component={Contact} />
              <Route component={NoMatch} />
            </Switch> 
          </Router>
      </React.Fragment>
    );
  }
}

export default App;
