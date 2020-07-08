import React, { useState, useEffect, useContext } from "react";
import { Form, Icon, Input, Button, Card } from "antd";
import logo from "../../utils/assets/images/logo-black.svg";
import "./style.css";
import { _notification } from "../../utils/_helpers";
import { loginService } from "../../utils/services";
import { Link } from "react-router-dom";
import { DispatchContext } from "../../contexts/userContext";

const Login = props => {
	const Dispatch = useContext(DispatchContext);
	const [isLoading, setIsLoading] = useState(false);
	const { getFieldDecorator } = props.form;

	useEffect(() => {
		const token = JSON.parse(localStorage.getItem("token"));
		if (token) {
			if (token.token !== "") {
				props.history.push("/");
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const handleSubmit = e => {
		e.preventDefault();
		setIsLoading(true);

		props.form.validateFields(async (err, values) => {
			if (!err) {
				try {
					const res = await loginService(values);

					if (res.error) {
						_notification("error", "Error", res.message);
						props.form.setFieldsValue({
							password: ""
						});
					} else if (res.res.message === "success") {
						Dispatch({
							type: "IN",
							token: res.token
						});
						_notification("success", "Success", "Logged In");
						props.form.setFieldsValue({
							email: "",
							password: ""
						});
						setTimeout(() => {
							props.history.push("/");
						}, 200);
					}
					setIsLoading(false);
				} catch (err) {
					props.form.setFieldsValue({
						password: ""
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
		<div style={{ height: "100vh", overflow: "hidden" }}>
			<img src={logo} width={160} className="vidgyor-logo" alt="" />
			<Card title="Log in to your account" className="login-form-wrapper">
				<Form onSubmit={handleSubmit} className="login-form">
					<Form.Item>
						{getFieldDecorator("email", {
							rules: [
								{
									type: "email",
									required: true,
									message: "Please input your email!"
								}
							]
						})(
							<Input
								prefix={
									<Icon
										type="user"
										style={{ color: "rgba(0,0,0,.25)" }}
									/>
								}
								type="email"
								placeholder="Email"
							/>
						)}
					</Form.Item>
					<Form.Item>
						{getFieldDecorator("password", {
							rules: [
								{
									required: true,
									message: "Please input your Password!"
								}
							]
						})(
							<Input.Password
								prefix={
									<Icon
										type="lock"
										style={{ color: "rgba(0,0,0,.25)" }}
									/>
								}
								type="password"
								placeholder="Password"
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
							Log in
						</Button>
					</Form.Item>
				</Form>
			</Card>
			<p style={{ textAlign: "center", marginTop: 12 }}>
				Don't have an account? <Link to="/register">Register here</Link>
			</p>
		</div>
	);
};

const LoginForm = Form.create({ name: "login_form" })(Login);

export default LoginForm;
