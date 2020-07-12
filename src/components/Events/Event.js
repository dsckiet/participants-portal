import React, { useEffect, useState } from "react";
import { Table, Divider, Tag, Card, Icon, Button, Popconfirm, Col } from "antd";
import "./style.css";
import { _notification } from "../../utils/_helpers";
import { Link } from "react-router-dom";
import EventDetails from "./EventDetails";

const Events = props => {
	const [event] = useState(props.event);
	const [showModal, setShowModal] = useState(false);

	const {
		title,
		description,
		time,
		image,
		startDate,
		endDate,
		venue
	} = event;

	const handleModal = value => {
		setShowModal(value);
	};

	return (
		<>
			<Col xl={8} lg={12} md={12} sm={24} xs={24}>
				<Card className="event-card" onClick={() => handleModal(true)}>
					<h3>{title}</h3>

					<p>
						{venue} <span style={{ float: "right" }}>{time}</span>
					</p>

					<p>{description.slice(0, 105)} ...</p>
					<p>
						{new Date(startDate).toDateString()} to{" "}
						{new Date(endDate).toDateString()}
						<Tag
							style={{ float: "right", right: 0, marginRight: 0 }}
							color="#0f9d58"
						>
							{props.eventType &&
								props.eventType.charAt(0).toUpperCase() +
									props.eventType.slice(1)}
						</Tag>
					</p>
					<div
						style={{
							borderRadius: 4,
							height: 80,
							backgroundImage: `url(${image})`,
							backgroundSize: "cover",
							marginBottom: 8
						}}
					></div>
					{/* {isRegistrationOpened && isRegistrationRequired ? (
						<Button block>Register</Button>
					) : (
						<p
							style={{
								color: "#DB4437",
								textAlign: "center",
								marginTop: 19,
								marginBottom: 0
							}}
						>
							Registrations will start soon
						</p>
					)} */}
				</Card>
			</Col>
			<EventDetails
				visible={showModal}
				handleModal={handleModal}
				event={event}
				eventType={props.eventType}
			/>
		</>
	);
};

export default Events;
