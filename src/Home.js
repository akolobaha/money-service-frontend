import React from "react";
import { PrivateHeader } from './components/PrivateHeader'

class Home extends React.Component {
    state = {
        userName: '',
        userAccounts: {},
        totalMoney: 0,
    }

    

    userName (name) {
        this.setState({ userName: name }) 
    } 
    
    userAccounts(accounts) {
        this.setState({ userAccounts: accounts })
    }

    totalMoneySet(money) {
        
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
            console.log(val)
            sum += val
        })
        return sum
    }

 

    render () { 
        return (
            <div>
                
                <PrivateHeader totalMoney={this.totalMoney()} userName={this.state.userName} />
                {
                    Object.keys(this.state.userAccounts).map(balance => (
                        <div key={balance}>
                            {this.state.userAccounts[balance]}
                        </div>
                    ))
                    
                }

                {
                    Object.keys(this.state.userAccounts).map(account => (
                            <div key="account">
                                {account}
                            </div>
                    ))
                    
                }
                
                
                
                
                <button onClick={ this.props.logout }>Выйти</button>
                <button onClick={ this.checkToken }>Get login</button>
            </div>
        )
    }
}

export { Home };