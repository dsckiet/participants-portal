import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Button } from "antd";
import demo from "../utils/assets/images/demo.png";

const Landing = () => {
	const history = useHistory();

	useEffect(() => {
		const token = JSON.parse(localStorage.getItem("token"));
		if (token) {
			if (token.token !== "") {
				history.push("/");
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	return (
		<>
			<section className="cntnr">
				<div style={{ padding: "40px 20px 20px 20px" }}>
					<img
						src={demo}
						alt=""
						width="100%"
						style={{
							borderRadius: "6px",
							boxShadow: "rgb(0 0 0 / 10%) 0px 0px 10px"
						}}
					/>
				</div>
			</section>

			<section className="cntnr det-ctr">
				<div className="detail-section">
					<div
						style={{
							boxShadow: "rgb(0 0 0 / 10%) 0px 0px 10px",
							borderRadius: "6px",
							padding: "40px"
						}}
					>
						<div style={{ fontSize: "28px", fontWeight: "600" }}>
							Bootcamp Details
						</div>
						<div style={{ fontSize: "18px", paddingTop: "16px" }}>
							<p>
								- It is going to be a 5-day full-stack web
								development boot camp.
							</p>
							<p>
								- It will be an offline event inside the college
								campus.
							</p>
							<p>
								- The event is exclusive for KIET Group Of
								Institutions students.
							</p>
							<div style={{ display: "flex" }}>
								<div style={{ paddingRight: "4px" }}>-</div>
								<p>
									The participants who have attended all the
									sessions will get awarded certification.
								</p>
							</div>
							<div style={{ display: "flex" }}>
								<div style={{ paddingRight: "4px" }}>-</div>
								<div>
									The top participants will get awarded
									appreciation certificates, swags, and the
									opportunity to join our team.
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="left" style={{ padding: "20px" }}>
					<div
						style={{
							padding: "40px",
							boxShadow: "rgb(0 0 0 / 10%) 0px 0px 10px"
						}}
					>
						<div
							style={{
								fontSize: "28px",
								fontWeight: "600"
							}}
						>
							Web Development Bootcamp
						</div>
						<div
							style={{
								fontSize: "20px",
								padding: "16px 0px 24px 0px"
							}}
						>
							October 21 - October 26, 2021
						</div>

						<Button
							style={{
								width: "100%",
								fontSize: "16px",
								marginBottom: "16px"
							}}
							size="large"
							type="primary"
							onClick={() => {
								history.push("/register/web-bootcamp");
							}}
						>
							Register
						</Button>
					</div>
				</div>
			</section>
		</>
	);
};

export default Landing;
