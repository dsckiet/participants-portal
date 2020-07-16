/** PARTICIPANTS MODULE **/
export const REGISTER_PARTICIPANT = "/events/participants"; // POST NEW
export const LOGIN_PARTICIPANT = "/events/participants/login"; // POST NEW
export const FORGOTPASS = "/events/participants/forgot-pwd"; // POST NEW
export const RESETPASS = "/events/participants/reset-pwd"; // POST NEW
// @queryParams pid
export const VIEW_PROFILE = "/events/participants/profile"; // GET NEW
export const UPDATE_PROFILE = "/events/participants"; // POST NEW

/** EVENTS MODULE : PARTICIPANTS **/
export const REGISTER_FOR_EVENT = "/events/register"; // POST NEW

/** EVENTS MODULE : EVENTS **/
export const GET_EVENTS = "/events"; // GET
export const GET_EVENT = "/events/get_events/"; // GET
export const ADD_EVENT = "/events/add_event"; // POST
export const CHANGE_EVENT_CODE = "/events/change_event_code"; // POST
export const TOGGLE_REGISTRATION = "/events/event_regist_open"; // POST
export const UPDATE_EVENT = "/events/update_event"; // PUT
export const DELETE_EVENT = "/events/delete_event"; // DELETE

/** ATTENDANCE MODULE **/
export const MARK_ATTENDANCE = "/events/mark_attend"; // POST
export const GET_ATTENDANCE_REPORT =
	"/events/get_attend_report?query=ritik&sortBy[0]=branch&sortBy[1]=year&event=5e6dfb7caad4441a9ceb5b2e"; // GET
export const EVENT_ATTENDANCE_STATS =
	"/events/get_attend_stats?event=5e6dfb7caad4441a9ceb5b2e"; // GET
export const PARTICIPANT_EVENT_ATTENDANCE =
	"/events/get_user_attend?event=5e6df19c16ea1e3a9c5a508b&attendance=5e6df287aa68b63e48201e11"; // GET
