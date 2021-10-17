import React, { useEffect, useState } from "react";
import PageTitle from "./../../Layout/PageTitle";
import { Card, Row, Col, Button, Tag, Drawer, Table } from "antd";
import { getEventService } from "../../../utils/services";
import { _notification } from "./../../../utils/_helpers";
import styled from "styled-components";
import { MdLocationOn, MdDateRange } from "react-icons/md";
import { IoIosTime } from "react-icons/io";
import {
	generateCertificateService,
	attendanceReportService
} from "./../../../utils/services";
import FeedbackForm from "./Feedback";
import moment from "moment";

const Heading = styled.h4`
	font-weight: bold;
	font-size: 28px;
`;

const DescriptionContainer = styled.div`
	margin-top: 0px;
`;

const DescHeading = styled.h4`
	font-size: 18px;
	font-weight: 600;
`;

const Wrapper = styled.div`
	display: flex;
	flex-wrap: wrap;
	font-size: 16px;
`;

const MyEventDetails = props => {
	const [event, setEvent] = useState(null);
	//eslint-disable-next-line
	const [loading, setLoading] = useState(false);
	const [viewDrawer, setViewDrawer] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [data, setData] = useState([]);

	useEffect(() => {
		setIsLoading(true);
		(async () => {
			try {
				const res = await getEventService(props.match.params.id);
				setEvent(res.data);
				let params = { eid: props.match.params.id };
				const response = await attendanceReportService(params);
				let date = [];
				date = response.data.attendance.map(d => {
					return d.split("T")[0];
				});
				setData(dataCalc(res.data, date));
				setIsLoading(false);
			} catch (err) {
				_notification("warning", "Error", err.message);
			}
		})();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	//eslint-disable-next-line
	const generateCerti = async () => {
		setLoading(true);
		try {
			let id = props.match.params.id;
			const res = await generateCertificateService(id);
			if (res.message === "success") {
				_notification("success", "Success", "Download success");
			} else {
				_notification("error", "Error", res.message);
			}
			setLoading(false);
		} catch (err) {
			_notification("warning", "Error", err.message);
			setLoading(false);
		}
	};

	const feedbackSubmit = () => {
		setViewDrawer(false);
	};

	const columns = [
		{
			title: "#",
			dataIndex: "index",
			key: "index"
		},
		{
			title: "Date",
			dataIndex: "date",
			key: "date"
		},
		{
			title: "Status",
			dataIndex: "status",
			key: "status",
			render: text => (
				<>
					{text === "Present" ? (
						<Tag color="green">Present</Tag>
					) : null}
					{text === "Absent" ? <Tag color="red">Absent</Tag> : null}
					{text === "Pending" ? (
						<Tag color="orange">Pending</Tag>
					) : null}
				</>
			)
		}
	];

	const dataCalc = (event, attendance) => {
		let data = [];
		if (event) {
			var start = new Date(event.startDate);
			var end = new Date(event.endDate);
			let status;
			for (var d = start; d <= end; d.setDate(d.getDate() + 1)) {
				if (
					attendance.includes(
						moment(new Date(d)).format("YYYY-MM-DD")
					)
				) {
					status = "Present";
				} else if (
					!attendance.includes(
						moment(new Date(d)).format("YYYY-MM-DD")
					) &&
					moment(new Date(d)).format("YYYY-MM-DD") <
						moment(Date.now()).format("YYYY-MM-DD")
				) {
					status = "Absent";
				} else if (
					!attendance.includes(
						moment(new Date(d)).format("YYYY-MM-DD")
					)
				) {
					status = "Pending";
				}
				data.push({
					status,
					date: moment(new Date(d)).format("YYYY-MM-DD")
				});
			}
		}
		return data;
	};

	const tableData = data.map((d, id) => {
		const { status, date } = d;
		return { index: ++id, key: ++id, status, date };
	});

	return (
		<div className="all-Containers">
			<PageTitle title="My Events" />
			{event ? (
				<Card bordered={false}>
					<Row gutter={[16, 16]}>
						<Col xl={4} lg={8} md={8} sm={24} xs={24}>
							<img src={event.image} alt="pic" width="100%" />
						</Col>
						<Col xl={10} lg={8} md={8} sm={24} xs={24}>
							<Heading>{event.title}</Heading>
							<Wrapper>
								<div
									style={{
										marginRight: "4px",
										fontSize: "24px"
									}}
								>
									<MdLocationOn />
								</div>
								<p>{event.venue}</p>
							</Wrapper>
							<Wrapper>
								<div
									style={{
										marginRight: "4px",
										fontSize: "22px",
										marginTop: "-1px"
									}}
								>
									<IoIosTime />
								</div>
								<p>{event.time}</p>
							</Wrapper>
							<Wrapper>
								<div
									style={{
										marginRight: "4px",
										fontSize: "22px",
										marginTop: "-1px"
									}}
								>
									<MdDateRange />
								</div>
								<p>
									{new Date(event.startDate).toDateString()}{" "}
									to {new Date(event.endDate).toDateString()}
								</p>
							</Wrapper>
						</Col>
						<Col xl={10} lg={8} md={8} sm={24} xs={24}>
							<DescriptionContainer>
								<DescHeading>Description</DescHeading>
								<p>{event.description}</p>
								<div>
									<Button
										type="dashed"
										onClick={() => setViewDrawer(true)}
									>
										Feedback
									</Button>
									<br />
									{/* <Button
										type="primary"
										style={{ marginTop: "8px" }}
										onClick={generateCerti}
										loading={loading}
									>
										Generate Certificate
									</Button> */}
								</div>
							</DescriptionContainer>
						</Col>
					</Row>
				</Card>
			) : null}

			<div className="table-wrapper-card">
				<Card style={{ padding: 0, overflowX: "auto" }}>
					<DescHeading>Attendance log</DescHeading>
					<Table
						loading={isLoading}
						columns={columns}
						dataSource={tableData}
					/>
				</Card>
			</div>

			<Drawer
				title="Feedback Form"
				placement="right"
				closable={true}
				destroyOnClose={true}
				onClose={() => setViewDrawer(false)}
				visible={viewDrawer}
			>
				<FeedbackForm
					eid={props.match.params.id}
					onFeedbackSubmit={feedbackSubmit}
				/>
			</Drawer>
		</div>
	);
};

export default MyEventDetails;
