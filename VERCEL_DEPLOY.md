# Vercel Deployment

## 1. Required Environment Variables
Set these in Vercel Project Settings -> Environment Variables:

- `DATABASE_URL`
- `SANITY_PROJECT_ID`
- `SANITY_DATASET`
- `SANITY_API_VERSION`
- `SANITY_API_TOKEN`

Optional:

- `VITE_CALENDLY_URL`

## 2. Build/Runtime Setup
This repo is already configured for Vercel:

- Static frontend build from `vite` to `dist/public`
- Serverless API entrypoint: `api/index.ts`
- Rewrites in `vercel.json` route `/api/*` to serverless function

## 3. Deploy
From repo root:

```bash
vercel
```

Production deploy:

```bash
vercel --prod
```

## 4. Post-deploy Checks
- Open `https://<your-project>.vercel.app`
- Verify API health by opening:
  - `/api/cms/site-settings?lang=pl`
  - `/api/cms/blog?lang=pl`
- Submit contact form once to confirm DB connectivity

