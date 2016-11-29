import React, { Component } from 'react';
import * as firebase from 'firebase';

function UserPhoto(props) {
	const name = props.name;
	const photoUrl = props.photoUrl;
	return <img alt={name + "'s profile picture"} src={photoUrl} />;
}

function UserName(props) {
	const name = props.name;
	return <span>{name}</span>;
}

function UserListItem(props) {
	if (props.user) {
		const user = props.user;
		return (
			<li>
				<UserPhoto name={user.name} photoUrl={user.photoUrl} />
				<UserName name={user.name} />
			</li>
		)
	} else {
		return <li>Loading...</li>
	}
}

/*function UsersList(props) {
	const name = props.name;
	const photoUrl = props.photoUrl;
	return (
		<ul>
			<UserListItem name={name} photoUrl={photoUrl} />
		</ul>
	);
}*/

/*function UserLink(props) {

}*/

class Users extends Component {
	constructor(props) {
		super(props);
		this.state = {users: []};
	}

	componentDidMount() {
		const usersRef = firebase.database().ref('users');

		let usersList = [];
		usersRef.on('child_added', snap => {
			let user = {
						'name': snap.val().name,
						'email': snap.val().email,
						'photoUrl': snap.val().photoUrl
					}
			usersList.push(user)
			this.setState({users: usersList})
		});
	}

	render() {
		const users = this.state.users;
		return (
			<ul>
				{users.map(user => (
					<UserListItem user={user} />
				))}
			</ul>
		);
	}
}

export default Users;