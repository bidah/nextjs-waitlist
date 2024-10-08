import { NextResponse } from 'next/server';
import { neon } from "@neondatabase/serverless";

export async function GET(request: Request) {
    console.log('API route called with URL:', request.url);

    const databaseUrl = process.env.DATABASE_URL;
    if (!databaseUrl) {
        console.error('DATABASE_URL is not defined');
        throw new Error('DATABASE_URL is not defined');
    }
    const sql = neon(databaseUrl);

    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');

    console.log('Received email:', email);

    if (!email) {
        console.log('No email provided');
        return NextResponse.json({ message: 'Email is required' }, { status: 400 });
    }

    try {
        // Check if the email is already confirmed
        const checkResult = await sql`
            SELECT confirmed FROM waitlist WHERE email = ${email}
        `;

        console.log('checkResult', checkResult);
        if (checkResult.length === 0) {
            console.log('Email not found in waitlist');
            return NextResponse.json({ message: 'Email not found in waitlist' }, { status: 404 });
        }

        if (checkResult[0].confirmed) {
            console.log('Email already confirmed');
            return NextResponse.json({ message: 'Email already confirmed' });
        }

        // Update the confirmed status
        await sql`
            UPDATE waitlist SET confirmed = true WHERE email = ${email}
        `;

        console.log('Email confirmed successfully');
        return NextResponse.json({ message: 'Email has been confirmed successfully' });
    } catch (error) {
        console.error('Error confirming email:', error);
        return NextResponse.json({ message: 'An error occurred while confirming the email' }, { status: 500 });
    }
}