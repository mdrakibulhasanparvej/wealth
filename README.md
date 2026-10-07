# Welth 💰

A personal finance / money-management mobile app built with **Expo** and **React Native**. Track income & expenses, manage transactions, and chat with an AI assistant — all from a clean, modern UI.

> **Status:** 🚧 In early development. All screens are built with a polished UI, but data is currently mocked and Clerk authentication is scaffolded (not fully wired yet).

---

## ✨ Features

- **🔐 Authentication** — Sign in / Sign up screens with email + password, password strength meter, show/hide password, and social login buttons (Google/Apple — UI only for now), powered by [Clerk](https://clerk.com).
- **🏠 Home Dashboard** — Greeting header, total balance card (balance / income / expense), quick actions, and recent transactions.
- **📋 Transactions** — Income/expense summary, search, filter chips (All / Income / Expense), and transactions grouped by date (Today / Yesterday / This Week).
- **➕ Add Transaction** — Expense/Income toggle, large decimal amount input, category chips (Food, Transport, Shopping, Bills, Fun, Health, Salary, Other), and notes.
- **🤖 AI Assistant** — Chat interface with message bubbles, typing indicator, and suggestion chips ("Analyze my spending", "Create a budget", etc.). Demo replies for now — real API integration planned.
- **👤 Profile** — User stats (transactions / budgets / goals), grouped settings (Account, Preferences, Support), and logout.

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| Framework | [Expo SDK 57](https://docs.expo.dev/) (React Native 0.86, React 19) |
| Routing | [Expo Router](https://docs.expo.dev/router/introduction) (file-based, typed routes) |
| Auth | [Clerk](https://clerk.com) (`@clerk/expo`) with `expo-secure-store` token cache |
| Styling | [NativeWind v4](https://nativewind.dev/) (Tailwind CSS) |
| Forms / Validation | `react-hook-form` + `zod` (installed, coming soon) |
| Animation | `react-native-reanimated` + `react-native-gesture-handler` |
| Language | TypeScript (strict mode) |
| Linting | ESLint (`eslint-config-expo`) |

---

## 📁 Project Structure

```
v3/
├── app/                        # Expo Router routes (file-based routing)
│   ├── _layout.tsx             # Root layout: ClerkProvider + Stack
│   ├── index.tsx               # "/" — auth gate (redirects based on sign-in state)
│   ├── (auth)/
│   │   ├── _layout.tsx         # Auth guard (signed-out → signIn, signed-in → /)
│   │   ├── signIn.tsx          # Sign-in screen
│   │   └── signUp.tsx          # Sign-up screen
│   └── (root)/
│       ├── _layout.tsx         # Stack (headers hidden)
│       └── (tabs)/
│           ├── _layout.tsx     # Tab bar (iOS: NativeTabs, Android/Web: Tabs)
│           ├── index.tsx       # 🏠 Home dashboard
│           ├── transaction.tsx # 📋 Transactions list
│           ├── addTransaction.tsx # ➕ Add transaction form
│           ├── assistant.tsx   # 🤖 AI assistant chat
│           └── profile.tsx     # 👤 Profile & settings
├── assets/                     # Icons, splash screen, tab icons
├── app.json                    # Expo config (name, scheme, plugins)
├── tailwind.config.js          # NativeWind preset
├── babel.config.js             # NativeWind + Reanimated babel plugins
├── metro.config.js             # NativeWind Metro integration
└── global.css                  # Tailwind base styles
```

### Routes

| Path | Screen |
|---|---|
| `/` | Auth gate (redirect) |
| `/signIn` | Sign in |
| `/signUp` | Sign up |
| `/` (tabs) | Home |
| `/transaction` | Transactions |
| `/addTransaction` | Add transaction |
| `/assistant` | AI Assistant |
| `/profile` | Profile |

---

## 🚀 Getting Started

### Prerequisites

- Node.js 20+
- npm (or your preferred package manager)
- The [Expo Go](https://expo.dev/go) app on your phone, or an iOS Simulator / Android Emulator

### 1. Install dependencies

```bash
npm install
```

### 2. Set up environment variables

Create a `.env` file in the project root:

```env
EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_clerk_publishable_key_here
```

> Get a free publishable key from your [Clerk dashboard](https://dashboard.clerk.com). The app **will throw an error** on startup if this is missing.

### 3. Start the dev server

```bash
npx expo start
```

Then scan the QR code with Expo Go, or press `i` / `a` to launch the iOS Simulator / Android Emulator.

---

## 📜 Available Scripts

| Command | Description |
|---|---|
| `npm start` | Start the Expo dev server |
| `npm run android` | Start and open on Android |
| `npm run ios` | Start and open on iOS |
| `npm run web` | Start and open in the browser |
| `npm run lint` | Run ESLint |
| `npx tsc --noEmit` | TypeScript type-checking |
| `npx expo-doctor` | Diagnose dependency & config issues |

---

## 🗺 Roadmap

- [x] Project scaffold & tab navigation
- [x] UI for all core screens (Home, Transactions, Add, Assistant, Profile)
- [ ] Wire up Clerk authentication (sign-in / sign-up / logout)
- [ ] Persist transactions (backend / local database)
- [ ] Real AI assistant API integration
- [ ] Budgets & savings goals
- [ ] Charts & spending analytics
- [ ] Push notifications
- [ ] EAS build & submission (`eas build`, `eas submit`)

---

## 📄 License

This project is licensed under the MIT License — see [LICENSE](./LICENSE) for details.
