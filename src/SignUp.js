import React from "react";
import { Redirect } from "react-router";

class SignUp extends React.Component {
    handleRegister = (event) => {
        event.preventDefault();

        let login = event.target.querySelector('[name="login"]').value
        let password = event.target.querySelector('[name="password"]').value

        let requestOptions = {
            method: 'GET',
            redirect: 'follow'
          };
          
          fetch(`https://localhost:44381/api/user/registration?username=${login}&password=${password}`, requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
    }

    render () {
        if (this.props.authorized) {
            return <Redirect to="/private" />;
        }

        return (
            <div>
                <div className="row">
                    <div className="col-4 offset-4">
                    <h1 className="text-center mt-5 mb-3">Регистрация</h1>
                    <form onSubmit={this.handleRegister}>
                        <input className="form-control mb-2" type="text" name="login" placeholder="Email" ></input>
                        <input className="form-control"  type="password" name="password" placeholder="Password"  ></input>
                        <button className="btn btn-warning mt-2 w-100 text-light" type="button" 
                            type="submit">Зарегистрироваться</button>
                    </form>
                    <div className="text-center mt-2">
                        <a  href="/login">Авторизация</a>
                    </div>
                    
                    </div>
                </div>
            </div>

        );
    }
};

export { SignUp };