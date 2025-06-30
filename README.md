# Sify Modern Lead to Order Portal

A modern, production-ready Lead to Order (L2O) portal built with React, Vite, and a rich set of UI components. This portal is designed to streamline and modernize the lead-to-order process for enterprises, featuring advanced inventory management, proposal generation, manual entry, dashboards, and more.

## Features
- **Modern Dashboard**: Real-time insights and analytics for leads, orders, and inventory.
- **Inventory Management**: Multiple inventory views (Complete, Enhanced, Enterprise, Final, etc.) for flexible operations.
- **Lead Capture & Manual Entry**: Capture leads and manually enter data with advanced validation and UI.
- **Proposal & Quote Generation**: Automated and manual proposal/quote generation workflows.
- **Order History & Audit Trail**: Track order history and audit changes for compliance.
- **Excel Uploads**: Enhanced and fixed Excel upload flows for bulk data operations.
- **Custom & Fixed Flows**: Demo and production-ready flows for custom business logic.
- **Rich UI Library**: Built with Radix UI, Tailwind CSS, and custom components for a seamless user experience.

## Project Structure
```
src/
  components/         # Main and feature-specific React components
    ui/               # Reusable UI primitives (buttons, dialogs, tables, etc.)
  data/               # Sample/mock data for inventory and SKUs
  context/            # React context providers (e.g., AppContext)
  hooks/              # Custom React hooks
  lib/                # Utility functions
  theme/              # Theme files (CSS, JS)
  assets/             # Static assets (e.g., images, SVGs)
  App.jsx, main.jsx   # App entry points
```

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18+ recommended)
- [pnpm](https://pnpm.io/) (or npm/yarn)

### Installation
```bash
pnpm install
# or
npm install
```

### Development
```bash
pnpm dev
# or
npm run dev
```

### Build
```bash
pnpm build
# or
npm run build
```

### Preview
```bash
pnpm preview
# or
npm run preview
```

## Tech Stack
- **React 19**
- **Vite**
- **Tailwind CSS**
- **Radix UI** (Accordion, Dialog, Menu, etc.)
- **React Hook Form** & **Zod** (forms & validation)
- **Recharts** (charts & analytics)
- **Framer Motion** (animations)
- **date-fns** (date utilities)

## Contributing
Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

## License
This project is proprietary and intended for Sify internal use.

---

> For more information, see the [L2O GitHub repository](https://github.com/bhandiwad/L2O) 