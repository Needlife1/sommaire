# 📚 Sommaire — Transform PDFs into a beautiful reel of impactful summaries with the power of AI!  

Built with **Next.js 15 App Router**, **Clerk** for auth, **React**, **OpenAI / Gemini**, **LangChain**, **shadcn/ui**, **Tailwind CSS**, **NeonDB**, **UploadThing**, **Stripe**, **TypeScript** and more.  

---

## ✨ Features  

### 🧩 Core Technologies  
- **Next.js 15 App Router** — server-side rendering, routing, and API endpoints with Server Components  
- **React** — interactive UIs with reusable components  
- **Clerk** — secure authentication with Passkeys, GitHub, and Google Sign-in  
- **GPT-powered summarization** — contextual understanding and emoji-enhanced output  
- **LangChain** — PDF parsing, text extraction, and document chunking  
- **shadcn/ui** — accessible, customizable React components  
- **NeonDB (PostgreSQL)** — serverless database storage of summaries and user data  
- **UploadThing** — secure PDF uploads (up to 32MB) and file management  
- **Stripe** — subscription management and secure payment processing  
- **TypeScript** — type-safety and enhanced DX  
- **Tailwind CSS 4** — utility-first, responsive styling  

---

### 🧪 Application Features  
- 🧾 Clear, structured summaries with key points and insights  
- 🎨 Beautiful, interactive summary viewer with progress tracking  
- 🔐 Secure file handling and processing  
- 🛡️ Protected routes and API endpoints  
- 💳 Flexible pricing plans (Basic and Pro)  
- 🔁 Webhook implementation for Stripe events  
- 🗂️ User dashboard for managing summaries  
- 📱 Responsive design for mobile and desktop  
- ♻️ Real-time updates and path revalidation  
- 🚀 Production-ready deployment  
- 🔔 Toast notifications for upload status, processing updates, and error handling  
- 🧭 Performance optimizations  
- 🔍 SEO-friendly summary generation  

---

## 🚀 Getting Started  

To get started with this project:  

1. **Fork** the repo  
2. Copy the variables from `.env.example` into a new `.env.local` file  
3. Create and configure required credentials:  
   - OpenAI (or Gemini) API key  
   - Clerk authentication (publishable & secret keys)  
   - UploadThing configuration  
   - Stripe (prices, webhook secret)  
   - NeonDB (PostgreSQL) connection URL  
4. Install dependencies:  
   ```bash
   npm install
