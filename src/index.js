import ReactDOM from 'react-dom';
import './styles/index.css';
import * as firebase from 'firebase';
import routes from './config/routes'


var config = {
	apiKey: "AIzaSyAHKT3QsEASIQqE53J6cGSlCj0btTrJ0YA",
	authDomain: "worldpeace-io-support.firebaseapp.com",
	databaseURL: "https://worldpeace-io-support.firebaseio.com",
	storageBucket: "worldpeace-io-support.appspot.com",
};

firebase.initializeApp(config);

ReactDOM.render(
	routes,
	document.getElementById('root')
);