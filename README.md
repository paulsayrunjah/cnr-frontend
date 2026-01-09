# Leads Tracker App

A modern Next.js application for tracking and managing business leads with integration to a Django backend.

## Features

- **Advanced Search**: Search for leads using natural language queries
- **Beautiful UI**: Modern, responsive design with dark mode support
- **Real-time Results**: Display search results with detailed information
- **Interactive Cards**: Click-through to Google Maps and business websites
- **Statistics Dashboard**: View new, updated, and duplicate lead counts

## Tech Stack

- **Next.js 15** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **Django Backend** integration

## Getting Started

### Prerequisites

- Node.js 18+ installed
- Django backend running on `http://127.0.0.1:8000`

### Installation

1. Install dependencies:
```bash
npm install
```

2. Configure environment variables (optional):
Create a `.env.local` file to customize the API URL:
```env
NEXT_PUBLIC_API_URL=http://127.0.0.1:8000
```

### Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production

Build for production:

```bash
npm run build
npm start
```

## Project Structure

```
leads-tracker-app/
├── app/
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Main page with search and results
│   └── globals.css         # Global styles
├── components/
│   ├── SearchBar.tsx       # Search input component
│   ├── LeadCard.tsx        # Individual lead card
│   └── LeadsList.tsx       # Leads grid display
├── lib/
│   └── api.ts              # API integration layer
└── types/
    └── lead.ts             # TypeScript interfaces
```

## API Integration

The app communicates with the Django backend using the `/api/v1/searches/simple_search/` endpoint.

### Example Request:
```json
POST http://127.0.0.1:8000/api/v1/searches/simple_search/
{
  "textSearch": "kitchen cabinets in Atlanta"
}
```

### Example Response:
```json
{
  "success": true,
  "query": "kitchen cabinets in Atlanta",
  "results_count": 20,
  "new_leads_count": 20,
  "new_leads": [...]
}
```

## Features to Add

- User authentication
- Lead filtering and sorting
- Export leads to CSV/Excel
- Lead notes and status updates
- Advanced search filters

## Contributing

Feel free to submit issues and enhancement requests!
