import React, { useContext } from "react";
import {
	BrowserRouter as Router,
	Route,
	Switch,
	Redirect
} from "react-router-dom";

import Login from "./components/Authentication/Login";
import Register from "./components/Authentication/Register";
import Navigator from "./components/Layout/Navigator";

import "./App.css";
import "./custom-antd.css";
import { AuthContext } from "./contexts/userContext";
import ForgotPassword from "./components/Authentication/ForgotPassword";

function App() {
	return (
		<Router>
			<Switch>
				<Route exact path="/login" component={Login} />
				<Route exact path="/register" component={Register} />
				<Route exact path="/forgot" component={ForgotPassword} />
				<PrivateRoute path="/" component={Navigator} />
			</Switch>
		</Router>
	);
}

const PrivateRoute = ({ component: Component, ...rest }) => {
	const Data = useContext(AuthContext);
	return (
		<Route
			{...rest}
			render={props =>
				Data.token !== "" ? (
					<Component {...props} />
				) : (
					<Redirect to="/login" />
				)
			}
		/>
	);
};

export default App;
