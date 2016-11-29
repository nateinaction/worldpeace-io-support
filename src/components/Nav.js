import React, { Component } from 'react';
import '../styles/Nav.css';
import logo from '../images/logo.svg';
import Auth from '../components/Auth';

function DisplayLogo(props) {
	return <img className='logo' alt='worldpeace.io logo' src={logo} />
}

function Nav(props) {
	return (
		<div className='nav'>
			<DisplayLogo />
			<Auth />
		</div>
	);
}

export default Nav;