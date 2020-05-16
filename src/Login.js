import React from "react";
import { Redirect } from "react-router";



class Login extends React.Component {
    
    state = {
        login: '',
        password: '',
        responseStatus: '',

    } 

    componentDidMount() {
        this.checkToken();
    }

    handleLoginChange = (event) => {
       this.setState({login: event.target.value})
    }

    handlePasswordChange = (event) => {
        this.setState({password: event.target.value})
    }

    handleResponseStatus = (rSts) => {
        this.setState({ responseStatus: rSts })
    }

    getToken = () => {
        fetch(`https://localhost:44381/api/user/login?username=${this.state.login}&password=${this.state.password}`)
            .then(response => {
                this.handleResponseStatus(response.status)
                return response.json()
            })
            .then(json =>  localStorage.setItem('token', json.token))
    }

    checkToken = () => {
        let myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${localStorage.getItem('token')}`);
    
        let requestOptions = {
          method: 'GET',
          headers: myHeaders,
          redirect: 'follow'
        };
    
        fetch("https://localhost:44381/api/account", requestOptions)
          .then(response => this.handleResponseStatus(response.status))
          //.then(response => response.text())
          //.then(result => response = result)
          .catch(error => console.log('error', error));
    }

    render () {
        if(this.state.responseStatus === 200){
            this.props.login();
        }

        if (this.props.authorized) {
            return <Redirect to="/private" />;
        }

        return (
            <div>
                <h1>Авторизация</h1>
                <input type="text" name="login" placeholder="Login" value={this.state.handleLoginChange} onChange={this.handleLoginChange}></input>
                <input type="text" name="password" placeholder="Password" value={this.state.password} onChange={this.handlePasswordChange}></input>
                {/* <button type="button" onClick={this.props.login}>Войти</button> */}
                <p> {localStorage.getItem('token')} </p>


                <button type="button" onClick={() => this.getToken()}>Войти</button>

                <button onClick={() => { this.getToken()}}>Tkn from child</button><br></br>


                <button  onClick={() => this.props.login()}>Just login</button><br></br>
                <p>{ this.props.tkn }</p>
            </div>
        );
    }
};

export { Login };