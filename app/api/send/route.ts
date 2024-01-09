// @ts-nocheck
// import { Resend } from 'resend';

import { EmailTemplate } from '@/components/shared/EmailTemplate';

// const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST() {
	try {
		// const data = await resend.emails.send({
		// 	from: 'Acme <onboarding@resend.dev>',
		// 	to: ['delivered@resend.dev'],
		// 	subject: 'Hello world',
		// 	react: EmailTemplate({ firstName: 'John' }),
		// });

		let data = await fetch('https://api.resend.com/emails', {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${process.env.RESEND_SECRET}`,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				from: 'guestbook@xyruscode.com.ng',
				to: 'me@xyruscode.com.ng',
				subject: 'New Guestbook Entry',
				react: EmailTemplate({ firstName: 'John' }),
			}),
		});

		let response = await data.json();

		return Response.json(response);
	} catch (error) {
		return Response.json({ error });
	}
}
