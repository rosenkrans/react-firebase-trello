// USER AUTHENTICATION
import React from 'react';

const AuthContext = React.createContext()

// provider
class AuthProvider extends React.Component {
  state = {
    user: {
      name: 'Chris'
    }
  }


  render() {
    return (
      // allows to subscribe to any data changes
      <AuthContext.Provider
        value={{ user: this.state.user}}
      >
        {this.props.children}
      </AuthContext.Provider>
    )
  }

}

// Consumer
const AuthConsumer = AuthContext.Consumer

export { AuthProvider, AuthConsumer }
