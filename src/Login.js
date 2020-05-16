import React from "react";
import { Redirect } from "react-router";



class Login extends React.Component {
    
   
    getToken = function () {
        fetch('https://localhost:44381/api/user/login?username=user5@mail.ru&password=pas', 
            {
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json'
                }
            } )
            .then(response => response.json())
            .then(json => console.log(json))
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
                {/* <button type="button" onClick={this.props.login}>Войти</button> */}
                <button type="button" onClick={this.getToken}>Войти</button>
            </div>
        );
    }
};

export { Login };