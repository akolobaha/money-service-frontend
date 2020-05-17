import React from "react";

class Home extends React.Component {
    state = {
        userData: {},
    }

    

    userDataChange (data) {
        this.setState({ userData: data }) 
    }  

    checkToken = () => {
        let myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${localStorage.getItem('token')}`);
    
        let requestOptions = {
          method: 'GET',
          headers: myHeaders,
          redirect: 'follow'
        };
    
        fetch("https://localhost:44381/api/account/", requestOptions)
        //fetch("https://jsonplaceholder.typicode.com/todos/1", requestOptions)
          .then(response => response.text())
          .then(text => JSON.parse(text))
          .then(result => this.userDataChange(result))
          .catch(error => console.log('error', error));
    }

    componentDidMount () {
        this.checkToken();
    }

    getAccountsList() {
        // for(let key in this.state.userData.accounts){

        // }
    }


    render () {

        
        return (
            <div>
                <h1>Личный кабинет</h1>
                <h2>{ this.state.userData.username }</h2>

                <p>
                    {
                        
                    }

                </p>

                <button onClick={ this.props.logout }>Выйти</button>
                <button onClick={ this.checkToken }>Get login</button>
            </div>
        )
    }
}

export { Home };