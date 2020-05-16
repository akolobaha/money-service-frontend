import React from "react";
import { Redirect } from "react-router";



class Login extends React.Component {
    
    
   

    getToken = function () {
        let token = 'token test';
        fetch('https://localhost:44381/api/user/login?username=user5@mail.ru&password=pas')
            .then(response => response.json())
            .then(json => console.log(json.token))
    }

        

    render () {
        if (this.props.authorized) {
            return <Redirect to="/private" />;
        }

        return (
            <div>
                <h1>Авторизация</h1>
                <input type="text"></input>
                <input type="text"></input>
                <button type="button" onClick={this.props.login}>Войти</button>
                <button type="button" onClick={this.getToken}>Войти</button>

                <button onClick={() => { this.props.updateTkn('token from child') }} />
                <p>{ this.props.tkn }</p>
            </div>
        );
    }
};

export { Login };