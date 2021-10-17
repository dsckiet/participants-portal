import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";

const Landing = () => {
	const history = useHistory();

	useEffect(() => {
		const token = JSON.parse(localStorage.getItem("token"));
		if (token) {
			if (token.token !== "") {
				history.push("/dashboard");
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	return (
		<div
			style={{
				height: "100vh",
				width: "100vw",
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				flexDirection: "column"
			}}
		>
			<div style={{ fontSize: "48px" }}>Web Developement</div>
			<div style={{ fontSize: "24px" }}>Bootcamp</div>
			<button
				style={{
					cursor: "pointer",
					backgroundColor: "transparent",
					border: "solid #e4e4e4 2px ",
					borderRadius: "4px",
					fontSize: "16px",
					padding: "4px 24px",
					margin: "12px"
				}}
				onClick={() => {
					history.push("/register/event");
				}}
			>
				Register
			</button>
		</div>
	);
};

export default Landing;
