# FinSafar - Financial Literacy for Bharat

FinSafar is a gamified financial literacy learning platform designed to empower users across India with essential financial knowledge. Through interactive modules, role-playing personas, and engaging mini-games, users learn about saving, investing, fraud prevention, and budgeting.

## 📱 Mobile App

The FinSafar platform also includes a fully featured React Native mobile application for iOS and Android. For instructions on how to run, build, and deploy the mobile app, please check out the [Mobile App README](./mobile_app/README.md).

## 🚀 Features

*   **Role-Based Learning**: Tailored learning paths for different user personas:
    *   **Kisan (Farmer)**: Learn about crop loans, insurance (PMFBY), and market selling.
    *   **Entrepreneur**: Master the art of separating business and household finances.
    *   **Student**: Understand needs vs. wants and saving basics.
    *   **Young Professional**: Discover the power of compounding and retirement planning.
*   **Gamified Experience**:
    *   **Market Mandi**: Simulate selling crops at the fluctuating market prices.
    *   **Scam Smash**: Identify and block fraudulent messages and scams.
    *   **Budget Balancer**: Allocate funds effectively between different needs.
*   **Educational Resources**: Access a library of tips, videos, and documents.
*   **Progress Tracking**: Earn coins and badges as you complete modules and master skills.
*   **Multilingual Support**: (Architecture ready for multiple Indian languages).

## 🛠️ Tech Stack

*   **Framework**: [React](https://react.dev/) + [Vite](https://vitejs.dev/)
*   **Language**: [TypeScript](https://www.typescriptlang.org/)
*   **Styling**: [Tailwind CSS](https://tailwindcss.com/) + [Lucide React](https://lucide.dev/) (Icons)
*   **Routing**: [React Router DOM](https://reactrouter.com/)

## 🏃‍♂️ Getting Started

### Prerequisites

*   Node.js (v18 or higher recommended)
*   npm or yarn

### Installation

1.  Clone the repository:
    ```bash
    git clone <repository-url>
    cd fin-safar
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Start the development server:
    ```bash
    npm run dev
    ```

4.  Open your browser and navigate to `http://localhost:5173`.

### Building for Production

To create a production-ready build:

```bash
npm run build
```

The output will be in the `dist/` directory.

## 📂 Project Structure

```
src/
├── components/         # Shared UI components (Buttons, Cards, Badges)
├── features/           # Feature-specific components
│   ├── games/          # Mini-games (MarketMandi, ScamSmash)
│   ├── modules/        # Persona-specific learning modules
│   └── onboarding/     # Auth and Onboarding flow
├── pages/              # Main application pages (Home, Profile, Learn)
├── App.tsx             # Main component with Routing configuration
├── index.css           # Global styles and Tailwind directives
└── main.tsx            # Application entry point
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.
