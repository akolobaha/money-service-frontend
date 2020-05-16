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
    token: "token from parent",
  }

  login = () => {
    this.setState ({
      authorized: true,
    })
  }

  UpdateToken = (value) => {
    this.setState ({
      token: value
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
              {/* <Login login={this.login} token={this.token} authorized={authorized}></Login> */}
              <Login login={this.login} tkn={this.state.token} updateTkn={this.UpdateToken}></Login>
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
