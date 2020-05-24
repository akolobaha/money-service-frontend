export const FETCH_USERS = 'FETCH_USERS'
export const ADD_USER = 'ADD_USER'

export const getAllUsers = () => {
  return (dispatch) => {
    fetch(`https://jsonplaceholder.typicode.com/users`)
      .then(res => res.json())
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