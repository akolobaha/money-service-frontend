import React from "react";
import { Redirect } from "react-router";

const style = {

}

class Login extends React.Component {

    getToken = function () {
        let token = fetch()
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
            </div>
        );
    }
};

export { Login };