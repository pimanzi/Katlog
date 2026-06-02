# KatLog

A product catalogue and digital asset management platform for brands. KatLog lets teams manage products, variants, and brand assets with an approval workflow, asset status tracking, and a real-time dashboard.

## Tech Stack

| Category | Technology |
|---|---|
| Framework | React 19 + TypeScript |
| Build tool | Vite |
| Styling | Tailwind CSS 4 |
| UI Components | shadcn/ui + Radix UI |
| Routing | React Router v7 |
| Server state | TanStack React Query v5 |
| Forms | React Hook Form + Zod |
| Charts | Recharts + shadcn  |
| Icons | Lucide React |
| Notifications | Sonner |
| Date utilities | date-fns |
| Font | Inter Variable |

## Installation

```bash
# Clone the repository
git clone https://github.com/pimanzi/brandhub.git
cd brandhub

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Fill in your Cloudinary credentials in .env

# Start the development server
npm run dev
```

## Environment Variables

```env
VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name
VITE_CLOUDINARY_UPLOAD_PRESET=your_upload_preset
```

## Scripts

```bash
npm run dev      
npm run build    
npm run preview 
npm run lint     
```
