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

    }

    handleCreateAccount = () => {

        let myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${localStorage.getItem('token')}`);
    
        let requestOptions = {
          method: 'POST',
          headers: myHeaders,
          redirect: 'follow'
        };
        fetch(`https://localhost:44381/api/account/create`, requestOptions)
            .then(response => response.text())
            .catch(error => console.log('error', error));
        this.checkToken()
        this.props.getAllUsers()
    }

    handleRefillAccount = (event) => {
        event.preventDefault();

        let amount = String(event.target.querySelector('input').value);
        let account = String(document.querySelector('.accounts-list').value);

            var myHeaders = new Headers();
            myHeaders.append("Authorization", `Bearer ${localStorage.getItem('token')}`);

            var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
            };

            fetch(`https://localhost:44381/api/account/refill?accnum=${account}&amount=${amount}`, requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));

            window.location.reload();
        }

    handleMoneyTransfer = (event) => {
        event.preventDefault();

        let amount = event.target.querySelector('[name="amount"]').value
        let accountA = String(document.querySelector('.accounts-list').value);
        let accountB = event.target.querySelector('[name="account"]').value

        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${localStorage.getItem('token')}`);

        var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
        };

        fetch(`https://localhost:44381/api/account/transfer?accnuma=${accountA}&accnumb=${accountB}&amount=${amount}`, requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));

        window.location.reload();
    }

    componentDidMount () {
        this.checkToken();
        this.props.getAllUsers()
    }

    render () { 
        
        return (
            <div className="container ">
                <header className="pt-4">
                    <div className="row">
                        <div className="col-5">
                            <h4>Общий баланс: {this.totalSum()}</h4>
                        </div>
                        <div className="col-5">
                            <h4>
                                Пользователь: 
                                {this.props.users.map((user) => {
                                    return ( <span key={user.username}>{user.username}</span> )
                                })}
                            </h4>
                        </div>
                        <div className="col-2 text-right">
                            <button className="btn btn-danger" onClick={ this.props.logout }>Выйти</button>
                        </div>
                    </div>
                    <hr></hr>
                </header>
                
                <div>
                    <div className="row">
                        <div className="col-9">
                            <div className="row">
                                <div className="col-6"><h3 className="account">Счет не выбран</h3> </div>
                                <div className="col-6"><h4 className="balance"> </h4></div>
                            </div>
                            
                            
                            <hr></hr>
                            <div className="row">
                                <div className="col-6 bg-secondary p-3">
                                    <h5>Пополнить баланс:</h5>
                                <form onSubmit={this.handleRefillAccount}>
                                    <input type="number" className="form-control my-3" placeholder="Сумма пополнения"></input>
                                    
                                        <button className="btn btn-success w-100" type="submit">Пополнить</button>
                                    
                                </form>
                                </div>
                                <div className="col-6 bg-primary p-3">
                                    <h5>Перевести:</h5>

                                    <form onSubmit={this.handleMoneyTransfer}>
                                    <input type="number" name="amount" className="form-control my-3" placeholder="Сумма перевода"></input>

                                    <input type="number" name="account" className="form-control my-3" placeholder="Счет зачисления"></input>

                                    <button className="btn btn-success w-100" type="submit">Перевести</button>
                                    </form>
                                </div>
                                
                            </div>
                            
                            <hr></hr>
                        </div>
                        <div className="col-3 text-right">
                            <select className="form-control accounts-list" onChange={this.handleChangeAccount}>
                            <option selected disabled>Выберите счет</option>
                                {
                                    this.accountsList()
                                }
                            </select>
                            <button 
                                className="btn btn-info mt-3"
                                onClick={this.handleCreateAccount}
                            >Создать счет</button>
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
        select: state.select
    }
  }
  
  function mapDispatchToProps (dispatch) {
    return {
      getAllUsers: bindActionCreators(getAllUsers, dispatch),
      select: bindActionCreators(select, dispatch)
    }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(Home);