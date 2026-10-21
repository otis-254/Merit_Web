# Merit Graphics Solutions Website

A modern, interactive website for Merit Graphics Solutions, showcasing their creative agency services and portfolio.

## Features

- Modern, responsive design
- Next.js 14 with App Router
- Smooth animations with Framer Motion
- Interactive UI components
- Mobile-first approach
- Dark mode support
- Portfolio showcase
- Contact form with validation

## Tech Stack

- Next.js 14
- TypeScript
- Tailwind CSS
- Framer Motion
- GSAP
- Headless UI
- React Hook Form
- Yup Validation

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
src/
├── app/                 # App router pages
├── components/          # Reusable components
│   ├── layout/         # Layout components
│   ├── ui/             # UI components
│   └── sections/       # Page sections
├── lib/                # Utility functions
├── styles/             # Global styles
└── types/              # TypeScript types
```

## Development

- [Design system and where it is applied](docs/design-system.md)
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript compiler
- `npm run test:quote` - Run the quote calculation tests
- `npm run test:ui` - Run the portfolio and contact browser tests (install Chromium first with `npx playwright install chromium`)

The browser tests start a Next.js development server and mock contact submissions; they do not send messages. Because this repository currently tracks some `.next` files, run the tests in a temporary project copy if you need to preserve those existing build artifacts.
