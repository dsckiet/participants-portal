import React, { useState } from "react";
import PageTitle from "./../Layout/PageTitle";
import styled from "styled-components";
import QrReader from "react-qr-reader";
import { Card, Form, Button, Input, message } from "antd";
import { markAttendanceService } from "../../utils/services";
import { _notification } from "./../../utils/_helpers";

const Container = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`;

const Heading = styled.p`
	text-align: center;
	font-weight: 700;
	font-size: 18px;
`;

const QrrReader = styled(QrReader)`
	width: 300px;
	@media (max-width: 480px) {
		width: 220px;
	}
`;

const MarkAttendance = props => {
	const [isLoading, setIsLoading] = useState(false);
	const { getFieldDecorator } = props.form;

	const handleScan = data => {
		if (data) {
			message.success("Scan successfully");
			props.form.setFieldsValue({
				code: data
			});
		}
	};

	const handleError = err => {
		message.error(err);
	};

	const handleSubmit = e => {
		e.preventDefault();
		setIsLoading(true);

		props.form.validateFields(async (err, values) => {
			if (!err) {
				try {
					const res = await markAttendanceService(values);
					console.log(res);
					if (res.error) {
						_notification("error", "Error", res.message);
						props.form.setFieldsValue({
							code: ""
						});
					} else if (res.message === "success") {
						_notification(
							"success",
							"Success",
							"Attendance Marked"
						);
						props.form.setFieldsValue({
							code: ""
						});
					}
					setIsLoading(false);
				} catch (err) {
					props.form.setFieldsValue({
						code: ""
					});
					_notification("error", "Error", err.message);
					setIsLoading(false);
				}
			} else {
				setIsLoading(false);
			}
		});
	};

	return (
		<div className="all-Containers">

			<PageTitle title="Attendance" />

			<Card
				bordered={false}
				style={{
					backgroundColor: "#4285f4",
					borderRadius: "4px"
				}}
			>
				<Container>
					<div>
						<Card bordered={false} style={{ borderRadius: "4px" }}>
							<Heading>Scan QR code</Heading>
							<QrrReader
								delay={300}
								onError={handleError}
								onScan={handleScan}
							/>
						</Card>
						<br />
						<Card bordered={false} style={{ borderRadius: "4px" }}>
							<Form
								onSubmit={handleSubmit}
								className="login-form"
							>
								<Form.Item>
									{getFieldDecorator("code", {
										rules: [
											{
												required: true,
												message: "Please enter code!"
											}
										]
									})(
										<Input
											type="text"
											placeholder="Event Code"
										/>
									)}
								</Form.Item>
								<Form.Item>
									<Button
										type="primary"
										htmlType="submit"
										className="login-form-button"
										loading={isLoading}
									>
										Mark Attendance
									</Button>
								</Form.Item>
							</Form>
						</Card>
					</div>
				</Container>
			</Card>
		</div>
	);
};

const MarkAttendanceForm = Form.create({ name: "attendance_form" })(
	MarkAttendance
);

export default MarkAttendanceForm;
