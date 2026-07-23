# Nest — marketing site

The site behind [nestsleepapp.com](https://nestsleepapp.com): landing page,
privacy policy, and support for **Nest**, a free, private baby tracker for
iPhone. No accounts, no ads, no servers — data stays on-device and in the
user's own iCloud.

## Stack

- Next.js (App Router), GSAP + ScrollTrigger for the scroll story
- One dynamic route: `/api/contact`, a rate-limited support form that relays
  to our inbox via Resend
- Deployed on Vercel; pushes to `main` go live automatically

## Develop

```bash
npm install
npm run dev
```

The contact form needs `RESEND_API_KEY` and `RESEND_FROM_ADDRESS` in
`.env.local` to send mail locally; without them the endpoint returns 503 and
everything else works.
