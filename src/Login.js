import React from "react";
import { Redirect } from "react-router";



class Login extends React.Component {
    
    state = {
        login: '',
        password: '',
        responseStatus: ''
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
        fetch(``)
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