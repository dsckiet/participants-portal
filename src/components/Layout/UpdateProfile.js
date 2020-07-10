import React, { useState, useEffect } from "react";
import {
	Form,
	Button,
	Input,
	DatePicker,
	Row,
	Col,
	Skeleton,
	message,
	Upload,
	Icon,
	Divider,
	Select
} from "antd";
import styled from "styled-components";
import "./style.css";
import {
	getUserService,
	updateUserService,
	updateParticipantService
} from "../../utils/services";
import { _notification, GET_BRANCHES, GET_YEARS } from "./../../utils/_helpers";
import moment from "moment";

const UploadContainer = styled.div`
	align-content: center !important;
`;

const { Option } = Select;

const UpdateProfile = props => {
	const [user, setUser] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const [image, setImage] = useState(null);
	const [showSkeleton, setShowSkeleton] = useState(false);
	const [fileList, setFileList] = useState(null);
	const { getFieldDecorator } = props.form;
	// const uploadprops = {
	// 	name: "avatar",
	// 	listType: "picture-card",
	// 	action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
	// 	headers: {
	// 		authorization: "authorization-text"
	// 	},
	// 	beforeUpload(file) {
	// 		const isJpgOrPng =
	// 			file.type === "image/jpeg" || file.type === "image/png";
	// 		if (!isJpgOrPng) {
	// 			message.error("You can only upload JPG/PNG file!");
	// 		}
	// 		console.log(file);
	// 		const isLt2M = file.size / 1024 / 1024 < 5;
	// 		if (!isLt2M) {
	// 			message.error("Image must smaller than 2MB!");
	// 		}
	// 		return isJpgOrPng && isLt2M;
	// 	},
	// 	onChange(info) {
	// 		if (info.file.status === "uploading") {
	// 		}
	// 		if (info.file.status === "done") {
	// 			message.success(`${info.file.name} file uploaded successfully`);
	// 			getBase64(info.file.originFileObj, imageUrl => {
	// 				setImage(imageUrl);
	// 			});
	// 		} else if (info.file.status === "error") {
	// 			message.error(`${info.file.name} file upload failed.`);
	// 		}
	// 		setFileList(info.fileList);
	// 	}
	// };

	useEffect(() => {
		setShowSkeleton(true);
		if (props.user) {
			let { name, email, phone, year, branch } = props.user;

			props.form.setFieldsValue({
				name,
				email,
				phone,
				year,
				branch
			});
			setShowSkeleton(false);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	// const getBase64 = (img, callback) => {
	// 	const reader = new FileReader();
	// 	reader.addEventListener("load", () => callback(reader.result));
	// 	reader.readAsDataURL(img);
	// };

	const handleSubmit = e => {
		e.preventDefault();
		setIsLoading(true);

		props.form.validateFields(async (err, values) => {
			if (!err) {
				try {
					const formData = new FormData();
					formData.append("name", values.name);
					formData.append("email", values.email);
					formData.append("year", values.year);
					formData.append("branch", values.branch);
					formData.append("phone", values.phone);
					if (values.password)
						formData.append("password", values.password);

					const res = await updateParticipantService(formData);
					if (res.message === "success") {
						_notification("success", "Success", "Profile Updated");
						props.onUpdateUser();
					} else {
						_notification("error", "Error", res.message);
					}
					setIsLoading(false);
				} catch (err) {
					_notification("error", "Error", err.message);
					setIsLoading(false);
				}
			} else {
				setIsLoading(false);
			}
		});
	};
	return (
		<Skeleton loading={showSkeleton} active>
			<Form onSubmit={handleSubmit} layout="vertical">
				<Row gutter={16}>
					<Col span={12}>
						<Form.Item label="Name" required>
							{getFieldDecorator("name", {
								rules: [
									{
										required: true,
										message: "Please enter your name!"
									}
								]
							})(<Input type="text" placeholder="Name" />)}
						</Form.Item>
					</Col>
					<Col span={12}>
						<Form.Item label="Email" required>
							{getFieldDecorator("email", {
								rules: [
									{
										required: true,
										message: "Please input email!"
									}
								]
							})(<Input type="text" placeholder="Email" />)}
						</Form.Item>
					</Col>
				</Row>

				<Form.Item label="Password" required>
					{getFieldDecorator(
						"password",
						{}
					)(<Input.Password placeholder="Password" />)}
				</Form.Item>

				<Row gutter={16}>
					<Col span={12}>
						<Form.Item label="Branch" required>
							{getFieldDecorator("branch", {
								rules: [
									{
										required: true,
										message: "Please select the branch"
									}
								]
							})(
								<Select placeholder="Branch">
									<Option value="" disabled>
										Select Branch
									</Option>
									{GET_BRANCHES().map(branch => (
										<Option key={branch} value={branch}>
											{branch}
										</Option>
									))}
								</Select>
							)}
						</Form.Item>
					</Col>
					<Col span={12}>
						<Form.Item label="Year" required>
							{getFieldDecorator("year", {
								rules: [
									{
										required: true,
										message: "Please select the year"
									}
								]
							})(
								<Select placeholder="Year">
									<Option value="" disabled>
										Select Year
									</Option>
									{GET_YEARS().map(year => (
										<Option key={year} value={year}>
											{year}
										</Option>
									))}
								</Select>
							)}
						</Form.Item>
					</Col>
				</Row>

				<Form.Item label="Contact No.">
					{getFieldDecorator("phone", {
						rules: [
							{
								required: true,
								message: "Please input Contact No."
							}
						]
					})(<Input type="text" placeholder="Contact" />)}
				</Form.Item>

				<Form.Item>
					<Button
						type="primary"
						htmlType="submit"
						className="login-form-button"
						loading={isLoading}
					>
						Update Details
					</Button>
				</Form.Item>
			</Form>
		</Skeleton>
	);
};

const UpdateProfileForm = Form.create({ name: "profile_form" })(UpdateProfile);

export default UpdateProfileForm;
