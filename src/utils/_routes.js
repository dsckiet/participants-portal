import EventsList from "../components/Events/EventsList";
import Dashboard from "../components/Layout/Dashboard";
import MarkAttendance from "./../components/Attendance/MarkAttendance";
import MyEvents from "../components/Events/MyEvents/MyEvents";

let routes = [
	{
		path: "/dashboard",
		exact: true,
		name: "Dashboard",
		component: Dashboard,
		key: "dashboard",
		icon: "appstore",
		description: "List of all the events",
		color: "#F4B400"
	},
	{
		path: "/dashboard/events",
		exact: true,
		component: EventsList,
		name: "Events",
		key: "events",
		icon: "calendar",
		description: "List of all the events",
		color: "#DB4437"
	},
	{
		path: "/dashboard/myEvents",
		exact: true,
		component: MyEvents,
		name: "MyEvents",
		key: "myevent",
		icon: "folder",

		description: "List of my events",

		color: "#DB4437"
	},
	{
		path: "/dashboard/attendance",
		exact: true,
		component: MarkAttendance,
		name: "Attendance",
		key: "attendance",
		icon: "check",
		description: "Mark your attendance",
		color: "#DB4437"
	}
];

export default routes;
