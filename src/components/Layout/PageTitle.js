import React, { useState, useEffect } from "react";
import { PageHeader, Avatar, Popover, Icon, Tag, Skeleton } from "antd";
import "./style.css";
import styled from "styled-components";
import { getRole, getParticipantService } from "./../../utils/services";
import { _notification } from "./../../utils/_helpers";

const Heading = styled.h4`
	font-weight: bold;
	font-size: 18px;
`;

const Wrapper = styled.div`
	display: flex;
	flex-wrap: wrap;
	font-size: 16px;
`;

const PageTitle = props => {
	const userData = useState(getRole());
	const [user, setUser] = useState(null);
	const [showSkeleton, setShowSkeleton] = useState(false);

	useEffect(() => {
		(async () => {
			setShowSkeleton(true);
			try {
				const params = { pid: userData[0].id };
				const res = await getParticipantService(params);
				if (res.message === "success") {
					setUser(res.data["profileData"]);
					setShowSkeleton(false);
				} else {
					_notification("warning", "Error", res.message);
				}
			} catch (err) {
				_notification("error", "Error", err.message);
			}
		})();
	}, []);

	const content = (
		<Skeleton loading={showSkeleton} active>
			{user ? (
				<div style={{ width: "100%" }}>
					<Heading>{user.name}</Heading>
					<Tag color="green">{user.year}nd year</Tag>
					<br />
					<br />
					<Wrapper>
						<div style={{ marginRight: "4px" }}>
							<Icon type="branches" />
						</div>
						<h4>{user.branch}</h4>
					</Wrapper>
					<Wrapper>
						<div style={{ marginRight: "4px" }}>
							<Icon type="phone" />
						</div>
						<h4>{user.phone}</h4>
					</Wrapper>
					<Wrapper>
						<div style={{ marginTop: "2px", marginRight: "4px" }}>
							<Icon type="mail" />
						</div>
						<h4>{user.email}</h4>
					</Wrapper>
				</div>
			) : null}
		</Skeleton>
	);

	return (
		<PageHeader
			style={{
				padding: "8px 16px",
				background: "#0F9D58",
				color: "#fff!important",
				marginBottom: 16,
				borderRadius: 4,
				borderBottom: "1px solid rgb(235, 237, 240)"
			}}
			title={props.title}
			extra={[
				<Popover key="1" content={content} placement="bottomRight">
					<Avatar
						style={{
							cursor: "normal"
						}}
					>
						U
					</Avatar>
				</Popover>
			]}
		></PageHeader>
	);
};

export default PageTitle;
