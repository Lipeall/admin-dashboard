# Admin Dashboard

This dashboard enables you to manage various aspects of your e-commerce platform seamlessly.

## Stack Used

Next.js, TailwindCSS, Prisma, Stripe, Clerk

## Features

- **Interface:** Full Responsivity and Mobile UI.
- **Themes:** Light/Dark Mode.
- **Authentication:** Secure login system to protect access to the admin dashboard.
- **Store Management:** Create, update, and delete stores effortlessly.
- **Billboards:** Dynamic billboard management for promoting featured products.
- **Categories and Colors:** Easily manage product categories and colors.
- **Product Management:** Create, update, and delete products with ease.
- **Orders:** View customer orders, with Stripe integration for payment validation.

## Setup .env file

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
DATABASE_URL=
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=
STRIPE_API_KEY=
FRONTEND_STORE_URL=
STRIPE_WEBHOOK_SECRET=
```

## Install packages

```bash
npm i
```

## Setup Prisma

```bash

npx prisma generate
npx prisma db push

```
    
## Start the app

```bash
npm run dev
```
    
    
