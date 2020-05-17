import React from "react";

class Home extends React.Component {
    state = {
        userName: '',
        userAccounts: {},
    }

    

    userName (name) {
        this.setState({ userName: name }) 
    } 
    
    userAccounts(accounts) {
        this.setState({ userAccounts: accounts })
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
          .then(response => response.text())
          .then(text => JSON.parse(text))
          .then(result => {
            this.userName(result.username)
            this.userAccounts(result.accounts)
          })
          .catch(error => console.log('error', error));
    }

    componentDidMount () {
        this.checkToken();
    }

    totalMoney () {
        let accountsSum = Object.values(this.state.userAccounts);
        let sum = 0;
        accountsSum.forEach((val) => {
            sum += val
        })
        return sum;
    }

    
        
    


    render () {
     
       
        
        return (
            <div>
                <h1>Личный кабинет</h1>
                <h2>{ this.state.userName }</h2>
                <h4>Общая сумма: {this.totalMoney()}</h4>
                <p>

                </p>

                <button onClick={ this.props.logout }>Выйти</button>
                <button onClick={ this.checkToken }>Get login</button>
            </div>
        )
    }
}

export { Home };