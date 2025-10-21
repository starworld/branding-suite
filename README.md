# Branding Suite

AI-powered brand strategy generation platform. Create comprehensive brand positioning and marketing strategies in 8 simple steps with multi-language support.

## Features

- **AI-Powered Brand Strategy**: Generate complete brand positioning reports using advanced AI models
- **8-Step Wizard**: Intuitive step-by-step process for brand creation
- **Multi-language Support**: Japanese and English interface with i18n
- **Comprehensive Reports**: 
  - Brand Identity
  - Brand Archetype
  - Visual Identity
  - SWOT Analysis
  - Competitor Analysis
  - Ideal Customer Profiles
  - Marketing Copy
  - Content Strategy
  - Marketing Campaign Ideas
- **User Authentication**: Secure OAuth-based authentication
- **Credit System**: Subscription-based credit system for AI generations

## Tech Stack

### Frontend
- React 19
- TypeScript
- Tailwind CSS 4
- shadcn/ui components
- i18next for internationalization
- tRPC for type-safe API calls
- Wouter for routing

### Backend
- Express 4
- tRPC 11
- Drizzle ORM
- MySQL/TiDB database
- OpenRouter AI integration

### AI Integration
- OpenRouter API with free models:
  - deepseek/deepseek-chat-v3.1:free (primary)
  - x-ai/grok-4-fast:free
  - z-ai/glm-4.5-air:free

## Getting Started

### Prerequisites
- Node.js 22+
- pnpm
- MySQL/TiDB database

### Installation

1. Clone the repository:
```bash
git clone https://github.com/starworld/branding-suite.git
cd branding-suite
```

2. Install dependencies:
```bash
pnpm install
```

3. Set up environment variables:
```bash
# Database
DATABASE_URL=mysql://user:password@host:port/database

# Authentication
JWT_SECRET=your-jwt-secret
VITE_APP_ID=your-app-id
OAUTH_SERVER_URL=https://api.manus.im
VITE_OAUTH_PORTAL_URL=https://portal.manus.im

# OpenRouter AI
OPENROUTER_API_KEY=your-openrouter-api-key

# App Configuration
VITE_APP_TITLE=Branding Suite
VITE_APP_LOGO=/logo.svg
```

4. Push database schema:
```bash
pnpm db:push
```

5. Start development server:
```bash
pnpm dev
```

The app will be available at `http://localhost:3000`

## Project Structure

```
branding-suite/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Page components
│   │   ├── i18n/          # Internationalization
│   │   ├── lib/           # Utilities and helpers
│   │   └── App.tsx        # Main app component
├── server/                # Backend Express application
│   ├── ai/               # AI integration
│   │   ├── llm.ts        # OpenRouter integration
│   │   ├── prompts.ts    # AI prompt templates
│   │   └── generator.ts  # Report generation logic
│   ├── db.ts             # Database helpers
│   └── routers.ts        # tRPC routers
├── drizzle/              # Database schema
│   └── schema.ts         # Database tables
└── shared/               # Shared types and constants
```

## Database Schema

### Main Tables
- **users**: User accounts and authentication
- **subscriptions**: User subscription and credit management
- **brandPositionings**: Brand positioning projects
- **generatedReports**: AI-generated brand strategy reports
- **aiGenerations**: AI generation tracking and analytics
- **creditTransactions**: Credit usage history

## AI Generation Process

1. User completes 8-step wizard:
   - Basic Information (brand name, type)
   - Inspiration
   - Ideal Customer Profile (ICP)
   - Competitors
   - Brand Values
   - Brand Archetype
   - AI Generation
   - Report Complete

2. AI generates 9 sections:
   - Brand Identity
   - Brand Archetype Analysis
   - Visual Identity Guidelines
   - SWOT Analysis
   - Competitor Analysis
   - Ideal Customer Profiles
   - Marketing Copy
   - Content Strategy
   - Marketing Campaign Ideas

3. All generations are tracked with:
   - Model used
   - Tokens consumed
   - Cost (USD)
   - Generation time
   - Input/output data

## Internationalization

The app supports multiple languages using i18next:

- Japanese (ja) - Default
- English (en)

Translation files are located in `client/src/i18n/locales/`

## Development

### Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm db:push` - Push database schema changes
- `pnpm db:studio` - Open Drizzle Studio

### Adding New Features

1. Update database schema in `drizzle/schema.ts`
2. Run `pnpm db:push` to apply changes
3. Add database helpers in `server/db.ts`
4. Create tRPC procedures in `server/routers.ts`
5. Build UI components in `client/src/`
6. Add translations in `client/src/i18n/locales/`

## Deployment

The project is ready for deployment on platforms like:
- Vercel
- Railway
- Render
- Any Node.js hosting platform

Make sure to set all required environment variables in your deployment platform.

## License

MIT

## Credits

Inspired by Branding5.com, built with modern web technologies and enhanced with multi-language support and cost-effective AI integration.

