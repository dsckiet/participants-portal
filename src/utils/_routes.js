import EventsList from "../components/Events/EventsList";
import Dashboard from "../components/Layout/Dashboard";

let routes = [
	{
		path: "/",
		exact: true,
		name: "Dashboard",
		component: Dashboard,
		key: "dashboard",
		icon: "appstore",
		description: "List of all the events",
		color: "#F4B400"
	},
	{
		path: "/events",
		exact: true,
		component: EventsList,
		name: "Events",
		key: "events",
		icon: "calendar",
		description: "List of all the events",
		color: "#DB4437"
	}
];

export default routes;
