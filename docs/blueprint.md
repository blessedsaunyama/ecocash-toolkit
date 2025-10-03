# **App Name**: EcoCash Toolkit

## Core Features:

- C2B Payment Initiation: Initiates a C2B (Customer to Business) payment using the EcoCash Payment SDK.  Accepts parameters like phone number, amount, description, and currency.
- Transaction Lookup: Looks up a specific transaction using the EcoCash Payment SDK, based on the phone number and transaction reference provided.
- Refund Request: Requests a refund for a processed transaction through the EcoCash Payment SDK, given the transaction reference and refund amount.
- API Route Handling: Handles requests to /api/pay, /api/lookup, and /api/refund endpoints, interfacing with the EcoCash SDK to process payment, lookup, and refund requests, and returns responses as JSON objects.
- Dashboard UI: Provides a user interface, composed of tabs or cards for 'Make Payment', 'Lookup Transaction', and 'Refund', to enable interaction with the EcoCash SDK functionalities.
- Transaction Results Panel: Displays the outcomes of transaction requests, including success/failure status, transaction reference number, and any relevant error messages.
- Transaction Logs Display: Maintains and displays a list of the last 5 transaction results in a side panel, using local state to store and manage transaction history.

## Style Guidelines:

- Primary color: Dark Green (#386641) to convey trust and security associated with financial transactions.
- Background color: Very light Green (#F2F7F2) for a clean, non-distracting backdrop.
- Accent color: Blue (#235490) for interactive elements and key calls to action, providing a clear visual contrast.
- Font pairing: 'Inter' (sans-serif) for body text and 'PT Sans' (sans-serif) for headlines.
- Use minimalist, outline-style icons related to payments and transactions to maintain a clean and professional look.
- Implement a card-based layout for the main sections, ensuring clear separation and easy navigation on the dashboard.
- Use subtle fade-in and slide-in animations to provide feedback for user interactions.