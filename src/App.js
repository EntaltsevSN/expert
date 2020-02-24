import React, { Fragment } from 'react';
import * as firebase from 'firebase';

var firebaseConfig = {
  apiKey: "AIzaSyAwWe8_MCe9TSZ40mCGK4SEPFnEcKXqQuQ",
  authDomain: "expert-e3a1c.firebaseapp.com",
  databaseURL: "https://expert-e3a1c.firebaseio.com",
  projectId: "expert-e3a1c",
  storageBucket: "expert-e3a1c.appspot.com",
  messagingSenderId: "198620453854",
  appId: "1:198620453854:web:b08ae07a9977c4f58a9b4f",
  measurementId: "G-THPPQSRN6P"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

const auth = firebase.auth();

console.log(auth);

class App extends React.Component {
  constructor() {
    super();

    this.signIn = this.signIn.bind(this);
    this.signUp = this.signUp.bind(this);
    this.signOut = this.signOut.bind(this);
    this.authListener = this.authListener.bind(this);

    this.state = {
      'email': '',
      'password': '',
      'user': null
    }
  }

  authListener = () => {
    firebase.auth().onAuthStateChanged(user => {
      this.setState({ 'user': (user) ? user : null })
    })
  }

  signIn = (e) => {
    e.preventDefault()

    firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(user => console.log("You're logged in!"))
      .catch(error => console.log(`Error: ${error.message}`))
  }
  signUp = (e) => {
    e.preventDefault()

    firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(user => console.log("You're logged in!"))
      .catch(error => console.log(`Error: ${error.message}`)) 
  }
  signOut = (e) => {
    e.preventDefault();

    firebase.auth().signOut()
      .then(user => console.log("You're logged out!"))
      .catch(error => console.log(`Error: ${error.message}`))
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
      </Fragment>
    );
  }
}

export default App;
