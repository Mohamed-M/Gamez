This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Setup

1. Install dependencies:

```bash
npm install
```

2. Copy the example env file and fill in your **free** [RAWG](https://rawg.io/apidocs) API key:

```bash
cp .env.example .env.local
```

> Never commit real keys. Each host (-production or self-hosted) supplies its own keys,
> so keep yours in `.env.local` or your hosting platform's environment settings only.

3. Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## My Gamez Collection

Your game collection ("My Gamez") lives in **your browser's local storage** — no account,
no database. This means:

- Every visitor keeps their own collection, private to their browser.
- Clearing site data (or Safari's anti-tracking cleanup) removes the collection.
- Use the **Export / Import** buttons on the My Gamez page to back up your collection or move it between browsers/devices.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
