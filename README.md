<div align="center">

# 💳 Fingerpays

### The Future of Campus Payments

A modern, secure digital wallet application designed for seamless campus transactions using biometric authentication.

[![React](https://img.shields.io/badge/React-18.3-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.0-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-Backend-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)](https://supabase.com/)

[Demo](#) • [Features](#-features) • [Installation](#-getting-started) • [Documentation](#-api-reference)

</div>

---

## 📖 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [Database Schema](#-database-schema)
- [API Reference](#-api-reference)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🎯 Overview

**Fingerpays** is a comprehensive digital wallet solution built specifically for educational institutions. It enables students to perform cashless transactions across campus facilities including canteens, libraries, bookstores, and more—all secured with biometric authentication.

### ✨ Why Fingerpays?

| Feature | Description |
|---------|-------------|
| 🔐 **Bank-Level Security** | 256-bit encryption with biometric data stored locally on device |
| ⚡ **Instant Transactions** | Complete payments with just a fingerprint touch |
| 📊 **Smart Analytics** | Track spending patterns with detailed reports and insights |
| 🎁 **Rewards System** | Earn exciting rewards through referrals and transactions |
| 📱 **Mobile First** | Optimized for mobile devices with responsive design |

---

## ✨ Features

### 🏠 Landing Page
- Modern, responsive hero section with gradient animations
- Step-by-step usage guide
- User testimonials and reviews carousel
- Comprehensive FAQ section with accordion
- Refer & Earn program showcase
- Contact form and social links

### 🔐 Authentication System
- **Email/Password** - Traditional sign up and sign in
- **OAuth Integration** - Google, Facebook, Twitter login
- **Password Recovery** - Secure password reset via email
- **Form Validation** - Real-time validation with Zod schemas
- **Session Management** - Secure sessions via Supabase Auth

### 📱 User Dashboard
- Real-time wallet balance display with show/hide toggle
- Quick action buttons for recharge, send, and history
- Recent transactions overview
- Spending analytics with visual charts
- Demo data generation for testing purposes

### 💰 Wallet Management
- **Quick Recharge** - Preset amounts: ₹100, ₹250, ₹500, ₹1000
- **Custom Amounts** - Flexible amounts from ₹50 to ₹10,000
- **Payment Methods** - UPI, Credit/Debit Cards, Net Banking
- **Smart Limits** - Daily transaction limits and maximum balance caps
- **Balance Protection** - Prevents exceeding wallet limits

### 📜 Transaction History
- Filter by type: All, Recharges, Payments, Refunds
- Transaction statistics dashboard
- Pagination for large transaction lists
- Detailed status tracking with timestamps
- Export functionality

### 👤 User Profile
- Editable personal information
- Student details management (Branch, Year, ID)
- Email and phone verification status
- Account security settings
- Profile avatar support

---

## 🛠 Tech Stack

### Frontend

| Technology | Version | Purpose |
|------------|---------|---------|
| React | 18.3 | UI Library |
| TypeScript | 5.0+ | Type Safety |
| Vite | 5.0+ | Build Tool & Dev Server |
| React Router | 6.30 | Client-side Routing |
| TanStack Query | 5.83 | Server State Management |
| Tailwind CSS | 3.4 | Utility-first Styling |
| shadcn/ui | Latest | Pre-built Components |
| Radix UI | Latest | Headless UI Primitives |
| React Hook Form | 7.61 | Form Management |
| Zod | Latest | Schema Validation |
| Recharts | 2.15 | Data Visualization |
| Lucide React | 0.462 | Icon Library |
| date-fns | 4.1 | Date Formatting |

### Backend

| Technology | Purpose |
|------------|---------|
| Supabase | Backend-as-a-Service |
| PostgreSQL | Relational Database |
| Supabase Auth | User Authentication |
| Edge Functions | Serverless API (Deno Runtime) |
| Row Level Security | Fine-grained Authorization |

---

## 📁 Project Structure

```
fingerpays/
├── 📂 public/                    # Static assets
│   └── robots.txt
├── 📂 src/
│   ├── 📂 assets/               # Images and media
│   ├── 📂 components/           # React components
│   │   ├── 📂 ui/              # shadcn/ui components
│   │   ├── AuthModal.tsx       # Authentication modal
│   │   ├── Hero.tsx            # Landing hero section
│   │   ├── Navigation.tsx      # App navigation bar
│   │   ├── WalletDashboard.tsx # Wallet overview
│   │   ├── HowToUse.tsx        # Usage guide
│   │   ├── FAQ.tsx             # FAQ section
│   │   ├── Testimonials.tsx    # User reviews
│   │   ├── ReferEarn.tsx       # Referral program
│   │   ├── Contact.tsx         # Contact form
│   │   ├── Footer.tsx          # Page footer
│   │   ├── ProtectedRoute.tsx  # Auth guard
│   │   └── DemoDataButton.tsx  # Demo generator
│   ├── 📂 contexts/            # React contexts
│   │   └── AuthContext.tsx     # Auth state management
│   ├── 📂 hooks/               # Custom hooks
│   │   ├── useWallet.ts        # Wallet operations
│   │   ├── use-toast.ts        # Toast notifications
│   │   └── use-mobile.tsx      # Mobile detection
│   ├── 📂 integrations/        # External services
│   │   └── 📂 supabase/        # Supabase client & types
│   ├── 📂 lib/                 # Utilities
│   │   └── utils.ts            # Helper functions
│   ├── 📂 pages/               # Page components
│   │   ├── Index.tsx           # Landing page
│   │   ├── Dashboard.tsx       # User dashboard
│   │   ├── Recharge.tsx        # Wallet recharge
│   │   ├── Transactions.tsx    # Transaction history
│   │   ├── Profile.tsx         # User profile
│   │   ├── ResetPassword.tsx   # Password reset
│   │   └── NotFound.tsx        # 404 page
│   ├── App.tsx                 # Root component
│   ├── App.css                 # Global styles
│   ├── index.css               # Tailwind imports
│   ├── main.tsx                # Entry point
│   └── vite-env.d.ts           # Vite types
├── 📂 supabase/
│   ├── 📂 functions/           # Edge functions
│   │   ├── 📂 wallet-operations/  # Wallet API
│   │   └── 📂 demo-transactions/  # Demo data API
│   ├── 📂 migrations/          # Database migrations
│   └── config.toml             # Supabase config
├── components.json             # shadcn/ui config
├── tailwind.config.ts          # Tailwind config
├── tsconfig.json               # TypeScript config
├── vite.config.ts              # Vite config
├── package.json                # Dependencies
└── bun.lockb                   # Bun lockfile
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** >= 18.0.0
- **Bun** (recommended) or npm/yarn
- **Supabase Account** for backend services

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/fingerpays.git
   cd fingerpays
   ```

2. **Install dependencies**
   ```bash
   # Using Bun (recommended)
   bun install

   # Using npm
   npm install

   # Using yarn
   yarn install
   ```

3. **Configure environment variables**
   ```bash
   # Create environment file
   cp .env.example .env.local
   ```
   
   Update `.env.local` with your Supabase credentials (see [Environment Variables](#-environment-variables))

4. **Start the development server**
   ```bash
   # Using Bun
   bun run dev

   # Using npm
   npm run dev
   ```

5. **Open in browser**
   
   Navigate to [http://localhost:5173](http://localhost:5173)

### Available Scripts

| Command | Description |
|---------|-------------|
| `bun run dev` | Start development server |
| `bun run build` | Build for production |
| `bun run build:dev` | Build for development |
| `bun run preview` | Preview production build |
| `bun run lint` | Run ESLint |

---

## 🔧 Environment Variables

Create a `.env.local` file in the project root:

```env
# Supabase Configuration
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

### Getting Supabase Credentials

1. Create a project at [supabase.com](https://supabase.com)
2. Go to **Project Settings** → **API**
3. Copy the **Project URL** and **anon public** key

---

## 🗄 Database Schema

### `profiles` Table
Stores user profile information linked to Supabase Auth.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | UUID | PRIMARY KEY | Unique identifier |
| `user_id` | UUID | UNIQUE, FK | Reference to auth.users |
| `full_name` | TEXT | NOT NULL | User's full name |
| `email` | TEXT | NOT NULL | Email address |
| `phone_number` | TEXT | NOT NULL | Phone number |
| `branch` | TEXT | NOT NULL | Academic branch/department |
| `year_of_study` | TEXT | CHECK | 1st Year - 4th Year |
| `student_id` | TEXT | NOT NULL | Student ID number |
| `email_verified` | BOOLEAN | DEFAULT false | Email verification status |
| `phone_verified` | BOOLEAN | DEFAULT false | Phone verification status |
| `created_at` | TIMESTAMPTZ | DEFAULT now() | Creation timestamp |
| `updated_at` | TIMESTAMPTZ | DEFAULT now() | Last update timestamp |

### `wallets` Table
Stores wallet information and transaction limits.

| Column | Type | Description |
|--------|------|-------------|
| `id` | UUID | Unique identifier |
| `user_id` | UUID | Reference to auth.users |
| `balance` | DECIMAL | Current wallet balance |
| `total_recharged` | DECIMAL | Lifetime total recharged |
| `total_spent` | DECIMAL | Lifetime total spent |
| `monthly_spent` | DECIMAL | Current month spending |
| `daily_limit` | DECIMAL | Daily transaction limit |
| `max_balance` | DECIMAL | Maximum allowed balance |
| `created_at` | TIMESTAMPTZ | Creation timestamp |
| `updated_at` | TIMESTAMPTZ | Last update timestamp |

### `transactions` Table
Records all wallet transactions.

| Column | Type | Description |
|--------|------|-------------|
| `id` | UUID | Unique identifier |
| `user_id` | UUID | Reference to auth.users |
| `wallet_id` | UUID | Reference to wallets |
| `type` | ENUM | recharge, payment, refund, transfer_in, transfer_out |
| `amount` | DECIMAL | Transaction amount |
| `status` | ENUM | pending, completed, failed, cancelled |
| `merchant_name` | TEXT | Merchant name (optional) |
| `description` | TEXT | Transaction description |
| `payment_method` | TEXT | Payment method used |
| `reference_id` | TEXT | External reference ID |
| `metadata` | JSONB | Additional data |
| `created_at` | TIMESTAMPTZ | Creation timestamp |
| `updated_at` | TIMESTAMPTZ | Last update timestamp |

### Row Level Security (RLS)

All tables have RLS enabled with policies ensuring users can only access their own data:

```sql
-- Example: Users can only view their own profile
CREATE POLICY "Users can view their own profile" 
ON public.profiles FOR SELECT 
USING (auth.uid() = user_id);
```

---

## 📡 API Reference

### Edge Functions

#### `wallet-operations`

Base URL: `/functions/v1/wallet-operations`

| Endpoint | Method | Auth | Description |
|----------|--------|------|-------------|
| `/wallet` | GET | ✅ | Get current user's wallet |
| `/wallet` | POST | ✅ | Create wallet (auto on first access) |
| `/transactions` | GET | ✅ | Get transaction history |
| `/transactions?type=recharge` | GET | ✅ | Filter by transaction type |
| `/transactions?page=1&limit=20` | GET | ✅ | Paginated results |
| `/recharge` | POST | ✅ | Initiate wallet recharge |

#### `demo-transactions`

Base URL: `/functions/v1/demo-transactions`

| Endpoint | Method | Auth | Description |
|----------|--------|------|-------------|
| `/` | POST | ✅ | Generate demo transactions |

### Request Headers

```http
Authorization: Bearer <access_token>
Content-Type: application/json
```

### Response Format

```json
{
  "wallet": {
    "id": "uuid",
    "balance": 500.00,
    "total_recharged": 1000.00,
    "total_spent": 500.00
  }
}
```

---

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork** the repository
2. **Create** a feature branch
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit** your changes
   ```bash
   git commit -m 'Add amazing feature'
   ```
4. **Push** to the branch
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open** a Pull Request

### Development Guidelines

- ✅ Follow existing code style and TypeScript conventions
- ✅ Write meaningful commit messages
- ✅ Add appropriate TypeScript types for all code
- ✅ Test changes thoroughly before submitting
- ✅ Update documentation for any new features
- ✅ Ensure all linting passes (`bun run lint`)

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 📞 Support & Contact

| Channel | Link |
|---------|------|
| 📧 Email | support@fingerpays.com |
| 🌐 Website | [fingerpays.com](https://fingerpays.com) |
| 🐛 Issues | [GitHub Issues](https://github.com/yourusername/fingerpays/issues) |
| 💬 Discussions | [GitHub Discussions](https://github.com/yourusername/fingerpays/discussions) |

---

<div align="center">

### Built with ❤️ for Campus Communities

**[⬆ Back to Top](#-fingerpays)**

</div>
