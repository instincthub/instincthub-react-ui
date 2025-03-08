/*
This function createSubscription attempts to create a user subscription in the database using provided channel, token, and subscription details, while handling potential errors by logging them and throwing a toast notification.

Reference:
createSubscription(channel, token, objects)
*/

import { API_HOST_URL, getCookie, reqOptions } from "./helpFunction";
import { openToast } from "./modals";

const createSubscription = async (channel, token, objects) => {
	try {
		// Crate user subscription in the db
		const endpoint = `${API_HOST_URL}payments/${channel}/user-subscription-create/`;
		const email = getCookie("email");
		const newObjects = { ...objects, email };
		// console.log(newObjects);
		const raw = JSON.stringify(newObjects);
		const options = reqOptions("POST", raw, token, "json");
		const req = await fetch(endpoint, options);
		const res = await req.json();
		if (req.status === 400) {
			openToast(JSON.stringify(res), 400);
			return req.status
		}
		return res;
	} catch (e) {
		console.log(e);
		openToast("Couldn't createSubscription", 400);
		return 500;
	}
};

export default createSubscription;
