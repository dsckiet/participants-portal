import React, { useEffect, useState } from "react";
import PageTitle from "../../Layout/PageTitle";
import { Card, Row, Col, Result, Tag } from "antd";
import { getRole, getParticipantService } from "./../../../utils/services";
import { _notification } from "./../../../utils/_helpers";
import { Link } from "react-router-dom";

<<<<<<< HEAD
=======
import styled from "styled-components";

const Time = styled.p`
	float: right;
	@media (max-width: 400px) {
		margin-top: -10px;
	}
`;

>>>>>>> 0a007f2d7428c83372831f72f76cdc1baec5a78a
const MyEvents = () => {
	const [myEvent, setMyEvent] = useState([]);
	const [userData] = useState(getRole());
	useEffect(() => {
		(async () => {
			try {
				const params = { pid: userData.id };
				const res = await getParticipantService(params);
				setMyEvent(res.data.events);
			} catch (err) {
				_notification("warning", "Error", err.message);
			}
		})();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	return (
<<<<<<< HEAD
		<>
=======
		<div className="all-Containers">
>>>>>>> 0a007f2d7428c83372831f72f76cdc1baec5a78a
			<PageTitle title="My Events" />
			<Row gutter={[16, 16]}>
				{myEvent.length !== 0 ? (
					myEvent.map((event, id) => (
						<Col xl={8} lg={12} md={12} sm={24} xs={24} key={id}>
							<Link to={`/myEvents/${event.eid}`}>
								<Card className="event-card">
<<<<<<< HEAD
									<h3>{event.details.title}</h3>

									<p>
										{event.details.venue}{" "}
										<span style={{ float: "right" }}>
											{event.details.time}
										</span>
									</p>

									<p>
										{event.details.description.slice(0, 60)}{" "}
										...
									</p>
									<p>
										{new Date(
											event.details.startDate
										).toDateString()}{" "}
										to{" "}
										{new Date(
											event.details.endDate
										).toDateString()}
										<Tag
											style={{
												float: "right",
												right: 0,
												marginRight: 0
											}}
											color="#0f9d58"
										>
											{event.status.toUpperCase()}
										</Tag>
									</p>
=======
									<h2>{event.details.title}</h2>
									<Row>
										<Col
											xl={12}
											lg={12}
											md={12}
											sm={12}
											xs={24}
										>
											<p>{event.details.venue}</p>
										</Col>
										<Col
											xl={12}
											lg={12}
											md={12}
											sm={12}
											xs={24}
										>
											<Time>{event.details.time}</Time>
										</Col>
									</Row>
									<p>
										{event.details.description.slice(0, 50)}{" "}
										...
									</p>
									<Row>
										<Col
											xl={12}
											lg={12}
											md={12}
											sm={12}
											xs={24}
										>
											<p>
												{new Date(
													event.details.startDate
												).toDateString()}{" "}
												to{" "}
												{new Date(
													event.details.endDate
												).toDateString()}
											</p>
										</Col>
										<Col
											xl={12}
											lg={12}
											md={12}
											sm={12}
											xs={24}
										>
											<Tag
												style={{
													float: "right",
													marginBottom: 8
												}}
												color="#0f9d58"
											>
												{event.status.toUpperCase()}
											</Tag>
										</Col>
									</Row>

>>>>>>> 0a007f2d7428c83372831f72f76cdc1baec5a78a
									<div
										style={{
											borderRadius: 4,
											height: 80,
											backgroundImage: `url(${event.details.image})`,
											backgroundSize: "cover",
											marginBottom: 8
										}}
									></div>
								</Card>
							</Link>
						</Col>
					))
				) : (
					<Result status="warning" title="No events" />
				)}
			</Row>
<<<<<<< HEAD
		</>
=======
		</div>
>>>>>>> 0a007f2d7428c83372831f72f76cdc1baec5a78a
	);
};

export default MyEvents;
