import React from "react";

class Home extends React.Component {

    render () {

        console.log(localStorage.getItem('token'));
        
        return (
            <div>
                <h1>Личный кабинет</h1>
                <button onClick={this.props.logout}>Выйти</button>
                <p>token:  </p>
            </div>
        )
    }
}

export { Home };