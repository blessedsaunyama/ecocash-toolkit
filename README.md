# EcoCash API Toolkit

This application is a developer toolkit and testing dashboard for the **EcoCash Payment SDK**. It provides a user-friendly interface to interact with the core features of the EcoCash API, making it easier to build and debug integrations without writing code for every test case.

## Key Features

- **Make Payments:** Initiate Customer-to-Business (C2B) payments.
- **Lookup Transactions:** Check the status and details of past transactions using their reference.
- **Process Refunds:** Request refunds for completed transactions.
- **Live API Responses:** Instantly view the raw JSON responses from the EcoCash API for every transaction.
- **Transaction Logging:** Keep track of the most recent transaction attempts and their success/failure status.
- **Public Callback URL Display:** Automatically shows the correct, publicly accessible webhook URL for your environment, which you can easily copy into the EcoCash Developer Portal.

## Tech Stack

- **Framework:** [Next.js](https://nextjs.org/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **UI:** [React](https://react.dev/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) with [shadcn/ui](https://ui.shadcn.com/) components
- **EcoCash Integration:** [ecocash-payment-sdk](https://www.npmjs.com/package/ecocash-payment-sdk)

## Getting Started

### Prerequisites

- Node.js and npm
- An EcoCash Developer account and an API Key.

### Environment Variables

Create a `.env.local` file in the root of the project and add your EcoCash API key:

```
ECOCASH_API_KEY=your_api_key_here
```

### Running the Development Server

First, install the dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:9002](http://localhost:9002) with your browser to see the result.
