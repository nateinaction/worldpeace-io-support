import React, { Component } from 'react';
import * as firebase from 'firebase';

function UserAvatar(props) {
	const name = props.name;
	const photoUrl = props.photoUrl;
	return (
		<img alt={name + "'s profile picture"} src={photoUrl} />
	);
}

function UserGreeting(props) {
	const name = props.name;
	const photoUrl = props.photoUrl;
	return (
		<div className='user-meta'>
		<UserAvatar className='avatar' name={name} photoUrl={photoUrl} />
		<span>Hi {name}!</span>
		</div>
	);
}

function GuestGreeting(props) {
	return <span>You are not signed in.</span>;
}

function Greeting(props) {
	if (props.auth) {
		const auth = props.auth;
		return <UserGreeting name={auth.displayName} photoUrl={auth.photoURL} />;
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
		const userRef = firebase.database().ref('users/' + user.uid);
		userRef.update({
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
			<div className='auth'>
				<Greeting auth={auth} />
				{button}
			</div>
		);
	}
}

export default AuthControl;