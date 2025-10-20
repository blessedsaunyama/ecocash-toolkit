# 🧰 EcoCash Toolkit — Developer Dashboard

This project is a **developer toolkit and testing dashboard** for the [EcoCash Payment SDK](https://github.com/Unfiltered-On-GH/Ecocash-Payment-SDK-JS).  
It provides a clean, user-friendly web interface to test and debug EcoCash API integrations without manually writing code for every request.

---

## 🌐 Live Demo

**Hosted on Vercel:**  
🔗 [Coming Soon — Live Demo will be available after testing](#)

---

## 🚀 Key Features

- **💸 Make Payments (C2B):**  
  Initiate Customer-to-Business transactions with instant response feedback.

- **🔍 Lookup Transactions:**  
  Check transaction details and statuses using reference numbers.

- **↩️ Process Refunds:**  
  Request refunds for completed transactions and view their results in real-time.

- **🧾 Live API Responses:**  
  See raw JSON responses from the EcoCash API directly on the dashboard for easy debugging.

- **📜 Transaction Logging:**  
  Automatically logs your most recent test transactions, showing whether they succeeded or failed.

- **🌐 Public Callback URL Display:**  
  Shows the correct webhook URL for your current environment (local or deployed), so you can copy it straight into your EcoCash Developer Portal.

---

## 🧠 Tech Stack

| Layer | Technology |
|-------|-------------|
| Frontend | **Next.js 14**, **React**, **TypeScript** |
| Styling | **Tailwind CSS**, **shadcn/ui** |
| Backend / API Routes | **EcoCash Payment SDK (Node.js)** |
| Hosting | **Vercel** |
| Configuration | `.env.local` for secure API keys |

---

## ⚙️ Setup & Installation

1. **Clone this repository:**
   ```bash
   git clone https://github.com/blessedsaunyama/ecocash-toolkit.git
   cd ecocash-toolkit
