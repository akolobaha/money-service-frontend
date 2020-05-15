import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { Home } from "./Home";
import { Login } from "./Login";
import { SignUp } from "./SignUp";
import { PrivateRoute } from "./PrivateRoute";

import './App.css';

export class App extends React.Component {
  state = {
    authorized: false,
    tokken: "",
  }

  login = () => {
    this.setState ({
      authorized: true,
    })
  }

  logout = () => {
    this.setState({
      authorized: false,
    })
  }

  render () {
    const { authorized } = this.state;

    return (
      <BrowserRouter>
        <div>
          <Switch>
            <PrivateRoute exact path="/private" authorized={authorized}>
              <Home logout={this.logout} />
            </PrivateRoute>

            <Route exact path="/login">
              <Login login={this.login} authorized={authorized}></Login>
            </Route>

            <Route exact path="/signup">
              <SignUp login={this.login} authorized={authorized}></SignUp>
            </Route>

            {
              this.state.authorized ? 
                <Redirect to="/private" /> :
                <Redirect to="/login" />
            }
          </Switch>
        </div>
      </BrowserRouter>
    )

  }
}



export default App;
