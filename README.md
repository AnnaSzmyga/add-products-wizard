# Add Products Wizard

A product management interface with a multi-step form for adding new products.

## Live Demo

**Production:** https://add-products-wizard-phi.vercel.app/

## Tech Stack

- Next.js
- React
- TypeScript
- Tailwind CSS
- shadcn/ui
- TanStack Form
- Zod
- nuqs

## Features

- Product list with responsive desktop and mobile views
- Pagination with page number stored in the URL
- Multi-step "Add Product" form
- Form validation with Zod
- TanStack Form integration
- Linked net and gross price calculation based on VAT
- Product availability and inventory management
- Responsive layout based on the provided design
- Toast notification after adding a product

## Getting Started

### Prerequisites

- Node.js 20+
- npm

### Installation

Clone the repository and install dependencies:

````bash
npm install

### Development

Start the development server:

```bash
npm run dev
````

Open http://localhost:3000 in your browser.

### Production Build

To create a production build:

```bash
npm run build
```

To run the production build locally:

```bash
npm run start
```

The application will be available at http://localhost:3000.

## Project Structure

```text
app/                    # Next.js App Router
components/
  products/             # Product-related components
  ui/                   # shadcn/ui components
data/                   # Mock data and predefined options
lib/                    # Shared utilities
schemas/                # Zod validation schemas
types/                  # TypeScript types
```

## Deployment

The application is deployed on Vercel.

**Live version:** https://add-products-wizard-phi.vercel.app/
