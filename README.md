# 🧰 EcoCash Toolkit — Developer Dashboard

The **EcoCash Toolkit** is a developer-friendly web dashboard for testing and integrating the [EcoCash Payment SDK](https://github.com/Unfiltered-On-GH/Ecocash-Payment-SDK-JS.git),  
an open-source Node.js library created by [**Tafadzwa Mabika**](https://github.com/Unfiltered-On-GH).  

This toolkit provides a modern, easy-to-use interface for developers to **interact with the EcoCash API** — allowing quick testing of payments, lookups, and refunds without manually writing code for every scenario.

---

## 🌐 Live Demo

**Hosted on Vercel:**  
🔗 [Coming Soon — Link will be available once testing is complete](#)

---

## 🚀 Key Features

- **💸 Make Payments (C2B):**  
  Initiate Customer-to-Business transactions and see immediate feedback.

- **🔍 Lookup Transactions:**  
  Check the status and details of past transactions using their unique reference numbers.

- **↩️ Process Refunds:**  
  Request refunds for completed transactions and track their progress.

- **🧾 Live API Responses:**  
  Instantly view raw JSON responses returned from the EcoCash API for every transaction.

- **📜 Transaction Logging:**  
  Automatically log your recent transaction attempts, including their success or failure status.

- **🌐 Public Callback URL Display:**  
  Automatically detect and display your current public webhook URL (local or deployed),  
  making it easy to copy into your EcoCash Developer Portal configuration.

---

## 🧠 Tech Stack

| Layer | Technology |
|-------|-------------|
| Frontend | **Next.js 14**, **React**, **TypeScript** |
| Styling | **Tailwind CSS**, **shadcn/ui** |
| Backend / API Routes | **EcoCash Payment SDK (Node.js)** by [**Tafadzwa Mabika**](https://github.com/Unfiltered-On-GH/Ecocash-Payment-SDK-JS.git) |
| Hosting | **Vercel** |
| Configuration | `.env.local` for secure API keys |

---

## ⚙️ Setup & Installation

1. **Clone this repository:**
   ```bash
   git clone https://github.com/blessedsaunyama/ecocash-toolkit.git
   cd ecocash-toolkit
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Set up your environment variables:**
   Create a file named `.env.local` in the root of your project and add your EcoCash API key:
   ```
   ECOCASH_API_KEY=your_api_key_here
   ```
4. **Run the development server:**
   ```bash
   npm run dev
   ```
5. **Open your browser:**
   Navigate to [http://localhost:9002](http://localhost:9002) to see the application in action.
