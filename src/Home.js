import React from "react";
import { getAllUsers } from './actions/users.actions' 
import { select } from './actions/selected.actions'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

class Home extends React.Component {
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
            //this.userName(result.username)
            this.userAccounts(result.accounts)
          })
          .catch(error => console.log('error', error));
    }

    totalSum = () => {
        let res = 0;
        this.props.users.map((user) => {
            return user.accounts.forEach((acc) => {res += acc.balance})
        })
        return res
    }

    accountsList = () => {
        return this.props.users.map((user) => {
            return user.accounts.map((acc) => {
                return <option key={acc.number} >{acc.number}</option>
            })
            
            // user.accounts.map(acc => {
            //     console.log(acc.number)
            //     return <li>{acc.number}</li>
            // })
        })
        
    }

    handleChangeAccount = (event) => {
        let accField = document.querySelector('.account');
        let balanceField = document.querySelector('.balance');
        let selectedBalance

        this.props.users.map((user) => {
            
            let result = user.accounts.filter((acc) => {
                return acc.number === +event.target.value
            })
            selectedBalance = result;

            return result
        })

        accField.innerHTML = `Счет: ${event.target.value}`;
        balanceField.innerHTML = `Баланс: ${selectedBalance[0].balance}`;

        
        return <h2>Hello</h2>
    }


    componentDidMount () {
        this.checkToken();
        this.props.getAllUsers()
    }

    render () { 
        return (
            <div className="container">
                <header className="pt-4">
                    <div className="row">
                        <div className="col-5">
                            <h4>Общий баланс: {this.totalSum()}</h4>
                        </div>
                        <div className="col-5">
                            <h4>
                                Пользователь: 
                                {this.props.users.map((user) => {
                                    return ( <span>{user.username}</span> )
                                })}
                            </h4>
                        </div>
                        <div className="col-2 text-right">
                            <button className="btn btn-danger" onClick={ this.props.logout }>Выйти</button>
                            <button onClick={ this.checkToken }>Get login</button>
                        </div>
                    </div>
                    <hr></hr>
                </header>
                
                <div>
                    <div className="row">
                        <div className="col-9">
                            <h3 className="account">Счет не выбран</h3> 
                            <h4 className="balance"></h4>
                            <button className="btn btn-success" data-toggle="modal" data-target="#exampleModal">Пополнить</button>
                        </div>
                        <div className="col-3 text-right">
                            <select className="form-control" onChange={this.handleChangeAccount}>
                            <option selected disabled>Выберите счет</option>
                                {
                                    this.accountsList()
                                }
                            </select>
                        </div>
                    </div>
                </div>
                
                
                

            <p></p>
            </div>

            


        )
    }
}


function mapStateToProps(state) {
    return {
        users: state.users,
        activeAcc: state.activeAcc
    }
  }
  
  function mapDispatchToProps (dispatch) {
    return {
      getAllUsers: bindActionCreators(getAllUsers, dispatch)
    }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(Home);