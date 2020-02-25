import React, { Fragment } from 'react';
import { auth, users } from './config/firebase';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      'email': '',
      'password': '',
      'user': null,
      'userData': null
    }
  }

  setUserDataToState = (user) => {
    users.get().then(snap => snap.forEach(doc => {
      (user && user.email === doc.data().email) &&
        this.setState({ 
          'user': user,
          'userData': doc.data()
        })
    }));
  }

  authListener = () => {
    auth.onAuthStateChanged(user => this.setUserDataToState(user))
  }

  signIn = (e) => {
    e.preventDefault()

    auth.signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(user => this.setUserDataToState(user))
      .catch(error => console.log(`Error: ${error.message}`))
  }

  signUp = (e) => {
    e.preventDefault()

    auth.createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(user => {
        users.add({
          id: user.user.uid,
          email: user.user.email
        })
          .then(ref => {
            this.setState({
              userData: {              
                id: user.user.uid,
                email: user.user.email
              }
            })
          })
          .catch(error => console.log(error.message))
        console.log("You're logged in!");
      })
      .catch(error => console.log(`Error: ${error.message}`)) 
  }

  signOut = (e) => {
    e.preventDefault();

    auth.signOut()
      .then(user => {
        console.log("You're logged out!")
        this.setState({
          ...this.state,
          user: null,
          userData: null
        })
      })
      .catch(error => console.log(`Error: ${error.message}`))
  }

  updateUserData = (e) => {
    e.preventDefault();
        
    users.get().then(snap => snap.forEach(doc => {
      (this.state.userData.email === doc.data().email) &&
      users.doc(doc.id).update({
        ...this.state.userData
      }).then(user => console.log('The data was updated'));
    }));
  }

  updateUserStateData = e => {
    this.setState({ 
      userData: {
        ...this.state.userData,
        [e.target.name]: e.target.value
      }
    })
  }

  componentDidMount() {
    this.authListener();
  }

  render() {
    console.log(this.state);
    return (
      <Fragment>
        <form>
          <label>E-mail</label>
          <br />
          <input 
            type="text" 
            name="email" 
            onChange={e => this.setState({ 'email': e.target.value })}
            value={this.state.email} />
          <br /><br />
          <label>Password</label>
          <br />
          <input 
            type="password" 
            name="password" 
            onChange={e => this.setState({ 'password': e.target.value })}
            value={this.state.password} />
          <br /><br />
          <button onClick={this.signIn}>Sign in</button>
          <br /><br />
          <button onClick={this.signUp}>Sign up</button>
          <br /><br />
          <button onClick={this.signOut}>Sign out</button>
        </form>
        <br />
        <section>
          {
            (this.state.user ? `You're logged in as ${this.state.user.email}` : `You're not logged in`)
          }
        </section>
        {(this.state.userData !== null && this.state.userData !== false) &&
          <form>
            <h2>User settings </h2>
            <p>
              <label>E-mail</label>
              <input type="text" name="email" disabled value={this.state.userData.email} />
            </p>
            <p>
              <label>Age</label>
              <input 
                type="text" 
                name="age" 
                onChange={this.updateUserStateData} 
                value={(this.state.userData.age) ? this.state.userData.age : ''} />
            </p>
            <p>
              <label>Grade</label>
              <input 
                type="text" 
                name="grade" 
                onChange={this.updateUserStateData} 
                value={(this.state.userData.grade) ? this.state.userData.grade : ''} />
            </p>
            <button onClick={this.updateUserData}>Update</button>
          </form>
        }
      </Fragment>
    );
  }
}

export default App;
