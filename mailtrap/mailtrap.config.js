// import MailtrapClient  from "mailtrap";
// import dotenv from "dotenv";

// dotenv.config();


// const TOKEN = process.env.MAILTRAP_TOKEN
// const ENDPOINT = process.env.MAILTRAP_ENDPOINT

// const client = new MailtrapClient({
// 	endpoint:ENDPOINT,
// 	token: TOKEN,
// });

// const sender = {
// 	email: "hello@demomailtrap.com",
// 	name: "Nurray auth",
// };
// const recipients = [
// 	{
// 		email: "nurainande@gmail.com",
// 	}
// ];

// client
// 	.send({
// 		from: sender,
// 		to: recipients,
// 		subject: "You are awesome!",
// 		text: "Congrats for sending test email with Mailtrap!",
// 		category: "Integration Test",
// 	})
// 	.then(console.log, console.error);





import { MailtrapClient } from "mailtrap";
import dotenv from "dotenv";

dotenv.config();

export const mailtrapClient = new MailtrapClient({
	endpoint: process.env.MAILTRAP_ENDPOINT,
	token: process.env.MAILTRAP_TOKEN,
});

export const sender = {
	email: "hello@demomailtrap.com",
	name: "Nurray",
};

// export const sender = {
// 	email: "mailtrap@demomailtrap.com",
// 	name: "Burak",
// };


