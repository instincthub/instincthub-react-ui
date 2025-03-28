import { getSession } from "next-auth/react";

export const headerUsernamePermission = async (req) => {
	const session = await getSession({ req });
	const customHeader = await req.headers["x-instincthub-next-header"];
	const headerUsername = await req.headers["username"];

	if (
		!session?.user?.name?.username === headerUsername ||
		customHeader !== process.env.NEXT_PUBLIC_X_INSTINCTHUB_NEXT_HEADER
	) {
		return false;
	} else return true;
};

export const headerKeyPermission = async (req) => {
	const customHeader = await req.headers["x-instincthub-next-header"];

	if (customHeader !== process.env.NEXT_PUBLIC_X_INSTINCTHUB_NEXT_HEADER) {
		return false;
	} else return true;
};
