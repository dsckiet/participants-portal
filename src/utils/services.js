import axios from "axios";
import {
	GET_EVENTS,
	GET_EVENT,
	REGISTER_PARTICIPANT,
	LOGIN_PARTICIPANT,
	FORGOTPASS,
	RESETPASS
} from "./routes";

const BASE_URL = "https://api.dsckiet.com/dev";

axios.defaults.baseURL = BASE_URL;

function setUserToken(token) {
	let AUTH_TOKEN = localStorage.getItem("token");
	if (AUTH_TOKEN) axios.defaults.headers.common["x-auth-token"] = AUTH_TOKEN;
}

/******************AUTH SERVICES********************/
export async function registerService(data) {
	try {
		const response = await axios.post(REGISTER_PARTICIPANT, data);
		if (response.status === 200 && response.data.error === false) {
			return {
				res: response.data,
				token: response.headers["x-auth-token"]
			};
		} else return response.data;
	} catch (err) {
		return err.response.data;
	}
}

export async function loginService(data) {
	try {
		const response = await axios.post(LOGIN_PARTICIPANT, data);
		if (response.status === 200 && response.data.error === false) {
			return {
				res: response.data,
				token: response.headers["x-auth-token"]
			};
		} else return response.data;
	} catch (err) {
		return err.response.data;
	}
}

export const forgotPassService = async data => {
	try {
		const response = await axios.post(FORGOTPASS, data);
		return response.data;
	} catch (err) {
		if (err.response) throw err.response.data;
		else throw err.message;
	}
};

export const resetPassService = async data => {
	try {
		const response = await axios.post(RESETPASS, data);
		return response.data;
	} catch (err) {
		if (err.response) throw err.response.data;
		else throw err.message;
	}
};

/******************EVENT SERVICES********************/
export async function getEventsService() {
	try {
		const response = await axios.get(GET_EVENTS);
		if (response.status === 200 && response.data.error === false) {
			return response.data;
		} else return response.data;
	} catch (err) {
		return err.response.data;
	}
}

export async function getEventService(id) {
	try {
		const params = { id };
		const response = await axios.get(GET_EVENT, { params });
		if (response.status === 200 && response.data.error === false) {
			return response.data;
		} else return response.data;
	} catch (err) {
		return err.response.data;
	}
}
