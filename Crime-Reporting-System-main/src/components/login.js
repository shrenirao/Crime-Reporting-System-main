import React, { Component } from 'react';
import { signIn } from '../store/action/auth';
import { connect } from 'react-redux';
import { DBfirebase } from '../database/DBfirebase';

import { Link } from 'react-router';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import AppBar from 'material-ui/AppBar';

const styles = {
  container: {
    height: '100vh',
    background: 'linear-gradient(to right, #f5f7fa, #c3cfe2)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  formWrapper: {
    padding: 30,
    backgroundColor: '#ffffffcc',
    borderRadius: '12px',
    boxShadow: '0 10px 20px rgba(0,0,0,0.1)',
    width: '90%',
    maxWidth: 400,
  },
  heading: {
    color: '#3f51b5',
    marginBottom: 20,
  },
  button: {
    marginTop: 20,
  },
  linkButton: {
    marginTop: 15,
    color: '#3f51b5',
    textDecoration: 'none',
    display: 'inline-block'
  }
};

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
    };
    this.signin = this.signin.bind(this);
    this.inputHandler = this.inputHandler.bind(this);
  }

  inputHandler(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  signin(e) {
    e.preventDefault();
    DBfirebase.customLogin(this.state)
      .then((user) => {
        this.props.signInUser(user);
        localStorage.setItem('currentUser', user.uid);
        this.context.router.push({
          pathname: '/home/missingpeopleparent',
        });
      })
      .catch((error) => alert(error.message));
  }

  render() {
    return (
      <div style={styles.container}>
        <SigninComponent
          _inputHandler={this.inputHandler}
          _submit={this.signin}
        />
      </div>
    );
  }
}

Login.contextTypes = {
  router: React.PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  authReducer: state,
});

const mapDispatchToProps = (dispatch) => ({
  signInUser: (data) => {
    dispatch(signIn(data));
  },
});

class SigninComponent extends React.Component {
  render() {
    return (
      <div style={styles.formWrapper}>
        <center>
          <h1 style={styles.heading}>Login</h1>
          <form onSubmit={this.props._submit}>
            <TextField
              type="email"
              hintText="Email"
              name="email"
              floatingLabelText="Email"
              onChange={this.props._inputHandler}
              fullWidth={true}
              required
            /><br />

            <TextField
              type="password"
              hintText="Password"
              name="password"
              floatingLabelText="Password"
              onChange={this.props._inputHandler}
              fullWidth={true}
              required
            /><br />

            <RaisedButton
              type="submit"
              label="Sign in"
              primary={true}
              fullWidth={true}
              style={styles.button}
            /><br />

            <p>OR</p>
            <Link to="/signup" style={styles.linkButton}>
              <RaisedButton label="Signup" fullWidth={true} />
            </Link>
          </form>
        </center>
      </div>
    );
  }
}

SigninComponent.PropTypes = {
  _inputHandler: React.PropTypes.func.isRequired,
  _submit: React.PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
