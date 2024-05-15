This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

### Install PostgreSQL:

Create new project and set up 2 tables named `campaigns`, `mailinglist` inside the project on your `supabase` from the schema in `/prisma/schema.prisma`.

Copy the url of the project on your supabase and set `POSTGRE_DATABASE_URL` in your env file with this url.

To set up prisma client on the project:

```bash
npx prisma db pull
npx prisma generate
```

### Install AWS:

#### Tables in DynamoDB:

`mailmanjs-users`

Partition key : email (String)

`mailmanjs-segments`

Partition key : userEmail (String)

Sort key : segmentId (String)

#### SES:

Add some emails and set them identified to test campaigns

#### Lambda Function:

Set up lambda function named `runCampaign` from `/lambda/lambda.zip`

Set permissions to access SES

Copy ARN for lambda function and set `AWS_LAMBDA_RUN_CAMPAIGN_FUNC_ARN` of your env file with this ARN

#### Scheduler

Set up scheduler on Event Bridge and set permission to access Lambda Function.

Copy Role ARN of this scheduler and set `AWS_IAM_ROLE_OF_SCHEDULER_ARN` of your env file with this value

### Next, run the development server:

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

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
