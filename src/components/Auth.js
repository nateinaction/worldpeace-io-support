import React, { Component } from 'react';
import * as firebase from 'firebase';

function UserGreeting(props) {
	const name = props.name;
	return <h1>Welcome back {name}!</h1>;
}

function GuestGreeting(props) {
	return <h1>Please sign up.</h1>;
}

function Greeting(props) {
	const auth = props.auth;
	if (auth) {
		return <UserGreeting name={auth.displayName} />;
	}
	return <GuestGreeting />;
}

function SignInButton(props) {
	return (
		<button onClick={props.onClick}>
			Sign in
		</button>
	);
}

function SignOutButton(props) {
	return (
		<button onClick={props.onClick}>
			Sign out
		</button>
	);
}

class AuthControl extends Component {
	constructor(props) {
		super(props);
		this.handleSignInClick = this.handleSignInClick.bind(this);
		this.handleSignOutClick = this.handleSignOutClick.bind(this);
		this.state = {auth: false};
	}

	handleSignInClick() {
		const provider = new firebase.auth.GoogleAuthProvider();
		const auth = firebase.auth();
		auth.signInWithPopup(provider);
	}

	handleSignOutClick() {
		const auth = firebase.auth();
		auth.signOut();
	}

	componentDidMount() { // check to see if already signed in.
		const auth = firebase.auth();
		auth.onAuthStateChanged((user) => {
			if (user) {
				this.setState({auth: user});
				this.registerUser(user);
			} else {
				this.setState({auth: false});
			}
		});
	}

	registerUser(user) {
		const userDB = firebase.database().ref('users/' + user.uid);
		userDB.update({
			name: user.displayName,
			email: user.email,
			photoUrl: user.photoURL,
			lastConnectTime: new Date()
		});
	}

	render() {
		const auth = this.state.auth;

		let button = null;
		if (auth) {
			button = <SignOutButton onClick={this.handleSignOutClick} />;
		} else {
			button = <SignInButton onClick={this.handleSignInClick} />;
		}

		return (
			<div>
				<Greeting auth={auth} />
				{button}
			</div>
		);
	}
}

export default AuthControl;