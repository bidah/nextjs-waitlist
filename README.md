
<p style="text-align:center; display: block;">
<img src="https://i.imgur.com/Afxev2q.png" width="100%" />
</p>

<p align="center">
  <a href="https://twitter.com/intent/follow?screen_name=bidah">
    <img src="https://img.shields.io/twitter/follow/bidah.svg?label=Follow%20@bidah" alt="Follow @bidah" />
  </a>
</p>


This is a [Next.js](https://nextjs.org) starter for a  waitlist web app built with [Neon DB](https://neon.tech/), [Resend](https://resend.com/) and styling with [TailwindCSS](https://tailwindcss.com/) and [Shadcn](https://ui.shadcn.com/).

## Demo 

See it in action at [capsulethis.com](https://capsulethis.com) (and make sure to subscribe for the waitlist 😉)

## Tech Stack

- [Next.js](https://nextjs.org/)
- [Neon Database](https://neon.tech/)
- [Resend](https://resend.com/)
- [Shadcn](https://ui.shadcn.com/)
- [TailwindCSS](https://tailwindcss.com/)

## Setup

1. Clone the repository
2. Create a new Neon database and update the `.env` file with the database URL
3. Create a new Resend account and update the `.env` file with the API key
4. Install Vercel CLI `npm i -g vercel` and run `vercel login` to login to your Vercel account
5. Run `npm install` to install the dependencies
6. Run `npm run dev` to start the development server
7. customize the landing page by editing `components/landing-page.tsx`
    - change the title, description, and background image
    - add your own favicon
8. Run `npm run deploy` to deploy the app to Vercel
9. Buy a domain on Vecel and add it to your Vercel project
10. Customize Resend settings with youor Vercel Domain

## OG Metadata

The OG metadata is defined in `app/layout.tsx` for SEO purposes and social media sharing. Replace the default values with your own.

## API Routes

The app includes two main API routes:

1. `/api/join-waitlist` (POST)
   - Adds an email to the waitlist and sends a confirmation email.
   - Request body: `{ "email": "user@example.com" }`
   - Responses:
     - 200: Email sent successfully
     - 400: Email already exists
     - 500: Error sending email

2. `/api/confirm-email` (GET)
   - Confirms a user's email address in the waitlist.
   - Query parameter: `email`
   - Responses:
     - 200: Email has been confirmed successfully
     - 400: Email is required
     - 404: Email not found in waitlist
     - 500: An error occurred while confirming the email
