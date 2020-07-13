import React, { useEffect, useState } from "react";
import PageTitle from "../Layout/PageTitle";
import { Row, Select } from "antd";
import "./style.css";
import { getEventsService } from "../../utils/services";
import { _notification } from "../../utils/_helpers";
import Event from "./Event";
const { Option } = Select;

const EventsList = props => {
	const [events, setEvents] = useState([]);
	// const [editDrawer, setEditDrawer] = useState(false);
	const [eventType, setEventType] = useState(null);
	// const [refresh, toggleRefresh] = useState(false);
	// const [isLoading, setIsLoading] = useState(false);
	const [allEvents, setAllEvents] = useState([]);

	const handleChange = val => {
		setEventType(val);
		if (val === "past") {
			setEvents(allEvents.previousEvents);
		} else if (val === "upcoming") {
			setEvents(allEvents.upcomingEvents);
		} else if (val === "running") {
			setEvents(allEvents.runningEvents);
		}
	};
	useEffect(() => {
		(async () => {
			// setIsLoading(true);
			try {
				const { data } = await getEventsService();
				setEvents(data.upcomingEvents);
				setEventType("upcoming");
				setAllEvents(data);
				// setIsLoading(false);
			} catch (err) {
				_notification("warning", "Error", err.message);
			}
		})();
	}, []);

	return (
		<>
			<PageTitle title="Events" />
			<Select
				style={{ minWidth: 180 }}
				defaultValue="Upcoming Events"
				onChange={handleChange}
			>
				<Option value="upcoming">Upcoming Events</Option>
				<Option value="past">Past Events</Option>
				<Option value="running">Running Events</Option>
			</Select>
			<br />
			<div className="events-wrapper">
				<Row gutter={[16, 16]}>
					{events
						? events.map((event, id) => (
								<Event
									key={id}
									event={event}
									eventType={eventType}
								/>
						  ))
						: "Loading"}
				</Row>
			</div>
		</>
	);
};

export default EventsList;
