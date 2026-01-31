# Repeek

> **Intuitive sports analysis and prediction marketplace.**

Repeek is a social platform where sports analysts ("Tipsters") can post game predictions and analysis. Newcomers can follow, favorite, and pay to unlock premium picks ("Peeks").

![Repeek Banner](https://via.placeholder.com/1200x400?text=Repeek+Banner)

## 🚀 Overview

Repeek aims to democratize sports analysis by creating a transparent marketplace for predictions. Unlike traditional betting sites, Repeek focuses on the **analysis** and the **community** aspect.

- **For Tipsters:** A platform to showcase expertise, track win/loss records transparently, and monetize high-quality insights.
- **For Followers:** A place to find reliable predictions, filter by league or "hot" analysts, and "Peek" at premium content.

## 🛠️ Tech Stack

Built with a focus on speed, reactivity, and simplicity.

- **Frontend:** [Vite](https://vitejs.dev/) + [TypeScript](https://www.typescriptlang.org/) (Vanilla) - keeping it clean, fast, and lightweight.
- **Backend & Database:** [Convex](https://www.convex.dev/) - Handles real-time data syncing, serverless functions, and reactive UI updates.
- **Authentication:** [Clerk](https://clerk.com/) - Secure and standard authentication integration for Convex.
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) - For rapid and modern UI development.
- **Odds Engine:** [TheOddsAPI](https://the-odds-api.com/) or [Sportmonks](https://sportmonks.com/) - Reliable JSON feeds for real-time betting odds.

## ✨ Key Features

### 1. Real-time Odds Syncing

- **Cron Jobs**: Convex HTTP Actions fetch data from the specific Odds API every 1–5 minutes.
- **State Patching**: Updates the `games` table in Convex.
- **Instant Feedback**: Use `useQuery` on the frontend to reflect odds changes live on user screens.

### 2. Prediction & Monetization ("The Peek")

- **Post Creation**: Analysts select a game and write their analysis.
- **Paywall Logic**: If `isPremium` is set, the actual prediction is blurred.
- **Unlocking**: Users pay (e.g., virtual credits/Stripe) to "Peek" at the prediction.
- **Favorites**: Track specific analysts or games.

### 3. Transparent Statistics

- **Profile Pages**: Automatically calculated Win/Loss ratios for every user.
- **Leaderboards**: Filter "Hot" tipsters by recent performance.

### 4. Admin Dashboard

- **Overseer View**: Monitor total predictions and reported posts.
- **Manual Override**: Ability to settle games if API feeds are delayed.

## 📦 Getting Started

### Prerequisites

- Node.js (v18+)
- npm or pnpm

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/repeek.git
   cd repeek
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env.local` file and add your keys for Convex and Clerk:

   ```env
   VITE_CONVEX_URL=your_convex_url
   VITE_CLERK_PUBLISHABLE_KEY=your_clerk_key
   ```

4. **Run Development Server**

   ```bash
   npm run dev
   ```

5. **Start Convex**
   In a separate terminal, run:
   ```bash
   npx convex dev
   ```

## 🔮 Future Roadmap

- **AI Insights**: LLM integration to scan past game stats and generate a "Neutral AI Opinion."
- **Notification Engine**: Alerts when favorites post "Max Bet" picks.
- **Mobile App**: Capacitor or React Native wrapper for iOS/Android.

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

## 📄 License

This project is licensed under the [MIT License](LICENSE).
