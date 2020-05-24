export const FETCH_USERS = 'FETCH_USERS'
export const ADD_USER = 'ADD_USER'

export const getAllUsers = () => {
  return (dispatch) => {
    let myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${localStorage.getItem('token')}`);
    
    let requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch(`https://localhost:44381/api/account/`, requestOptions)
      .then(response => response.text())
      .then(text => JSON.parse(text))
      .then(users => {
        dispatch({
          type: FETCH_USERS,
          payload: users
        })
      })
  }
}

export const addUser = (newUser) => {
  return (dispatch) => {
    dispatch({
      type: ADD_USER,
      payload: newUser
    })
  }
}


// let myHeaders = new Headers();
    
//         fetch("https://localhost:44381/api/account/", requestOptions)
//           .then(response => response.text())
//           .then(text => JSON.parse(text))
//           .then(result => {
//             //this.userName(result.username)
//             this.userAccounts(result.accounts)
//           })
//           .catch(error => console.log('error', error));