import React, { useState } from "react";
import { Layout, Menu, Icon } from "antd";
import routes from "../../utils/_routes";
import { Route, Switch, Link } from "react-router-dom";
import logo from "../../utils/assets/images/logo-white.svg";
import MyEventDetails from "./../Events/MyEvents/MyEventDetails";
<<<<<<< HEAD
=======

import styled from "styled-components";
>>>>>>> 0a007f2d7428c83372831f72f76cdc1baec5a78a

const { Content, Sider } = Layout;

const MenuLogo = styled.div`
	padding: 20px 24px;
`;

const EditSider = styled(Sider)`
	@media (max-width: 992px) {
		display: none;
	}
`;

const Navigator = props => {
<<<<<<< HEAD
	const [isCollapsed] = useState(true);
	// const [show, setShow] = useState(true);
	const routeKey = localStorage.getItem("routeKey");

	// const handleMenu = () => {
	// 	setIsCollapsed(!isCollapsed);
	// 	setShow(!show);
	// };
=======
	const [isCollapsed] = useState(false);
>>>>>>> 0a007f2d7428c83372831f72f76cdc1baec5a78a

	return (
		<>
			<Layout>
				{/* {show ? ( */}
				<EditSider
					theme="dark"
					trigger={null}
					collapsible
					collapsed={isCollapsed}
				>
					<MenuLogo>
						<img
							src={logo}
							hidden={isCollapsed}
							width="150"
							alt="logo"
						/>
					</MenuLogo>
					<Menu
						theme="dark"
						height="100%"
						mode="inline"
						defaultSelectedKeys={"dashboard"}
					>
						{routes.map((route, idx) => (
							<Menu.Item
								key={route.key}
								onClick={() => {
									localStorage.setItem("routeKey", route.key);
								}}
							>
								<Icon type={route.icon} />
								<span>{route.name}</span>
								<Link to={route.path} />
							</Menu.Item>
						))}
						<Menu.Item
							key={"signout"}
							onClick={() => {
								localStorage.clear();
								props.history.push("/login");
							}}
						>
<<<<<<< HEAD
							{/* <Icon
								className="trigger"
								type={isCollapsed ? "menu-unfold" : "menu-fold"}
								onClick={handleMenu}
							/> */}
							<Switch>
								{routes.map((route, idx) => {
									return route.component ? (
										<Route
											key={idx}
											path={route.path}
											exact={route.exact}
											render={props => (
												<route.component {...props} />
											)}
										/>
									) : null;
								})}
								<Redirect from="/dashboard" to="/" />
								<Route
									exact
									path="/myEvents/:id"
									component={MyEventDetails}
								/>
							</Switch>
						</Content>
					</Layout>
=======
							<Icon type="lock" />
							<span>Sign Out</span>
						</Menu.Item>
					</Menu>
				</EditSider>
				{/* ) : null} */}

				<Layout>
					<Content
						style={{
							margin: 12,
							padding: 20,
							background: "#f9f9f9",
							minHeight: "280"
						}}
					>
						<Switch>
							{routes.map((route, idx) => {
								return route.component ? (
									<Route
										key={idx}
										path={route.path}
										exact={route.exact}
										render={props => (
											<route.component {...props} />
										)}
									/>
								) : null;
							})}
							<Route
								exact
								path="/myEvents/:id"
								component={MyEventDetails}
							/>
						</Switch>
					</Content>
>>>>>>> 0a007f2d7428c83372831f72f76cdc1baec5a78a
				</Layout>
			</Layout>
		</>
	);
};

export default Navigator;
