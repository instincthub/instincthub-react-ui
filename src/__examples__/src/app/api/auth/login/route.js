import { NextResponse } from "next/server";

export async function POST(request) {
	const requestData = await request.json();

	const options = {
		method: "POST",
		body: JSON.stringify(requestData),
		headers: {
			"Content-Type": "application/json",
			"instincthub-sk-header": process.env.NEXT_PUBLIC_INSTINCTHUB_SK_HEADER,
			"instincthub-auth-sk-header": process.env.INSTINCTHUB_AUTH_SECRET,
		},
	};

	const req = await fetch(
		`${process.env.NEXT_PUBLIC_API_HOST}auth/${requestData.channel}/oauth-login/`,
		options
	);

	const response = await req.json();

	// Log the posted data to the console
	return NextResponse.json({ ...response, status: req.status });
}
