import React from "react";
import { getAllUsers } from './actions/users.actions' 
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

    componentDidMount () {
        this.checkToken();
        this.props.getAllUsers()
    }

    render () { 
        return (
            <div>
                 
                <button onClick={ this.props.logout }>Выйти</button>
                <button onClick={ this.checkToken }>Get login</button>
            </div>
        )
    }
}


function mapStateToProps(state) {
    return {
      todos: state.todos,
      users: state.users
    }
  }
  
  function mapDispatchToProps (dispatch) {
    return {
      getAllUsers: bindActionCreators(getAllUsers, dispatch)
    }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(Home);