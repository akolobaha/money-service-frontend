import React from 'react'

class PrivateHeader extends React.Component {
  

  render () {
    return (
      <div className="container">
          <div className="row">
              <div className="col-4">
                  <h4>Общий баланс: {this.props.totalMoney}</h4>
              </div>
              <div className="col-6">
                  <h4>Имя пользователя: { this.props.userName }</h4>
              </div>
          </div>
          <div className="col-4">
              
          </div>
      </div>
    )
  }
}

export { PrivateHeader };