import { neon } from "@neondatabase/serverless";
import { type NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
	try {
		const { email } = await request.json();

        // biome-ignore lint/style/noNonNullAssertion: <explanation>
        const sql = neon(process.env.DATABASE_URL!);

        //check first if email is already in the database
        const emailExists = await sql`SELECT * FROM waitlist WHERE email = ${email}`;
        if (emailExists.length > 0) {
            return NextResponse.json({ error: "Email already exists" }, { status: 400 });
        }

        await sql`INSERT INTO waitlist (email) VALUES (${email})`;


		// Send confirmation email

		const emailStatus = await resend.emails.send({
			from: "Capsule <noreply@capsulethis.com>",
			to: email,
			subject: "Confirm your Capsule waitlist subscription",
			html: `
        <p>Thank you for joining the Capsule waitlist!</p>
        <p>Please click the link below to confirm your email:</p>
        <a href="https://capsulethis.com/confirm-email?email=${encodeURIComponent(
					email,
				)}">Confirm Email</a>
      `,
		});

        console.log('emailStatus', emailStatus)

		return NextResponse.json(
			{ message: "Email sent successfully" },
			{ status: 200 },
		);
	} catch (error) {
		console.error("Error sending email:", error);
		return NextResponse.json({ error: "Error sending email" }, { status: 500 });
	}
}
