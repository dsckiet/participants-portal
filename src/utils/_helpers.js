import { notification } from "antd";

export const _notification = (type, title, description) => {
	return notification[type]({
		message: title,
		description
	});
};

export const GET_BRANCHES = () => {
	return [
		"CSE",
		"IT",
        "CS",
		"CSAI",
		"CSAI&ML",
		"CSIT",
		"ME",
		"ECE",
		"Civil",
		"EN",
		"MCA",
	];
};

export const GET_YEARS = () => {
	return [1, 2, 3, 4];
};
