// USER AUTHENTICATION
import React from 'react';
import { firebaseAuth } from '../firebase';

const AuthContext = React.createContext()

// provider
class AuthProvider extends React.Component {
  state = {
    user: {
      name: 'Chris'
    }
  }

  signUp = async (email, password, e) => {
    try {
      e.preventDefault()
      await firebaseAuth.createUserWithEmailAndPassword(
        email,
        password
      )
    } catch(error) {
      // will add error handling soon...
    }
  }

  render() {
    return (
      // allows to subscribe to any data changes
      <AuthContext.Provider
        value={{ 
          user: this.state.user,
          signUp: this.signUp
        }}
      >
        {this.props.children}
      </AuthContext.Provider>
    )
  }

}

// Consumer
const AuthConsumer = AuthContext.Consumer

export { AuthProvider, AuthConsumer }
