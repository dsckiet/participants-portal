import axios from "axios";
import jwt from "jwt-decode";
import {
	GET_EVENTS,
	GET_EVENT,
	REGISTER_PARTICIPANT,
	LOGIN_PARTICIPANT,
	FORGOTPASS,
	RESETPASS,
	VIEW_PROFILE,
	UPDATE_PROFILE,
	REGISTER_FOR_EVENT,
	MARK_ATTENDANCE,
	GET_CERTI,
	ADD_FEEDBACK,
	GET_ATTENDANCE_REPORT,
	REGISTER_BOTH
} from "./routes";

//const BASE_URL = "https://api.dsckiet.com/dev";
const BASE_URL = "https://b994-122-161-68-113.ngrok.io/api/v1";

axios.defaults.baseURL = BASE_URL;

function setUserToken() {
	let AUTH_TOKEN = JSON.parse(localStorage.getItem("token"));
	if (AUTH_TOKEN.token !== "") {
		if (AUTH_TOKEN.token.includes("Logout")) {
			localStorage.clear();
			window.location.push("/login");
		}
		axios.defaults.headers.common["x-auth-token"] = AUTH_TOKEN.token;
	}
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

export async function registerBothService(data) {
	try {
		const response = await axios.post(REGISTER_BOTH, data);
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
		const params = { eid: id };
		const response = await axios.get(GET_EVENT, { params });
		if (response.status === 200 && response.data.error === false) {
			return response.data;
		} else return response.data;
	} catch (err) {
		return err.response.data;
	}
}

export const registerEventService = async data => {
	setUserToken();
	try {
		const response = await axios.post(REGISTER_FOR_EVENT, data);
		return response.data;
	} catch (err) {
		if (err.response) throw err.response.data;
		else throw err.message;
	}
};

export const markAttendanceService = async data => {
	setUserToken();
	try {
		const response = await axios.post(MARK_ATTENDANCE, data);
		return response.data;
	} catch (err) {
		if (err.response) throw err.response.data;
		else throw err.message;
	}
};

export const generateCertificateService = async id => {
	setUserToken();
	try {
		const response = await axios.get(`${GET_CERTI}/${id}`);
		return response.data;
	} catch (err) {
		if (err.response) throw err.response.data;
		else throw err.message;
	}
};

export const submitFeedbackService = async data => {
	setUserToken();
	try {
		const response = await axios.post(ADD_FEEDBACK, data);
		return response.data;
	} catch (err) {
		if (err.response) throw err.response.data;
		else throw err.message;
	}
};

/******************PARTICIPANTS SERVICES********************/
export const getParticipantService = async params => {
	setUserToken();
	try {
		const response = await axios.get(VIEW_PROFILE, { params });
		return response.data;
	} catch (err) {
		if (err.response) throw err.response.data;
		else throw err.message;
	}
};

export const updateParticipantService = async data => {
	setUserToken();
	try {
		const response = await axios.put(UPDATE_PROFILE, data);
		return response.data;
	} catch (err) {
		if (err.response) throw err.response.data;
		else throw err.message;
	}
};

export const attendanceReportService = async params => {
	setUserToken();
	try {
		const response = await axios.get(GET_ATTENDANCE_REPORT, { params });
		return response.data;
	} catch (err) {
		if (err.response) throw err.response.data;
		else throw err.message;
	}
};

/******************Helper SERVICES********************/
export const getRole = () => {
	let AUTH_TOKEN = JSON.parse(localStorage.getItem("token"));
	let decode = jwt(AUTH_TOKEN.token);
	return decode;
};
