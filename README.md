# Slotwise

<div align="center">

_A comprehensive time management platform for organizing your calendar, reminders, emails, and messages in one place._

</div>

---

## Overview

<img src="./public/slotwise homepage.png">

Slotwise is a modern, full-stack web application designed to help users manage their time effectively. It combines multiple productivity tools—calendar events, smart reminders, email drafting, and messaging—into a unified, intuitive interface.

## Tech Stack

### Frontend

- **Next.js 16** - React framework for production
- **React 19** - UI library
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Radix UI** - Unstyled, accessible component library
- **Lucide Icons** - Beautiful icon library

### Backend

- **Next.js API Routes** - Serverless functions
- **Prisma ORM** - Database ORM with type safety
- **PostgreSQL** - Relational database
- **NextAuth.js 5** - Authentication solution
- **Google APIs** - Calendar and email integration

## Getting Started

### Prerequisites

- **Node.js** 18+ (recommended 20+)
- **npm** package manager
- **PostgreSQL** database (local or cloud-based)
- **Google Cloud** credentials (for OAuth and API access)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/aaqib605/slotwise
   cd slotwise
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create a `.env.local` file in the root directory:

   ```env
   # Database
   DATABASE_URL=postgresql://user:password@localhost:5432/slotwise

   # NextAuth
   NEXTAUTH_SECRET=your-secret-key-here
   NEXTAUTH_URL=http://localhost:3000

   # Google OAuth
   GOOGLE_CLIENT_ID=your-google-client-id
   GOOGLE_CLIENT_SECRET=your-google-client-secret

   # Google APIs (for calendar and Gmail)
   GOOGLE_API_KEY=your-google-api-key
   ```

4. **Set up the database**

   ```bash
   npm run migrate
   ```

5. **Generate Prisma Client**

   ```bash
   npm run generate
   ```

6. **Start the development server**

   ```bash
   npm run dev
   ```

   The application will be available at `http://localhost:3000`

## Development

### Available Scripts

```bash
# Start development server
npm run dev

# Run database migrations
npm run migrate

# Generate Prisma Client
npm run generate
```

### Database Schema

The application uses the following main models:

- **User** - User accounts with profile information
- **Account** - OAuth account connections
- **Session** - User sessions for authentication
- **CalendarEvent** - Calendar events associated with users
- **Reminder** - Reminders for tasks and events
- **Email** - Email drafts and management
- **Message** - Messaging between users
- **VerificationToken** - Email verification tokens

For the complete schema, see `prisma/schema.prisma`

## Environment Configuration

### Required Environment Variables

| Variable               | Description                  | Example                                    |
| ---------------------- | ---------------------------- | ------------------------------------------ |
| `DATABASE_URL`         | PostgreSQL connection string | `postgresql://user:pass@localhost:5432/db` |
| `NEXTAUTH_SECRET`      | Secret for JWT signing       | `your-secret-key`                          |
| `NEXTAUTH_URL`         | Auth callback URL            | `http://localhost:3000`                    |
| `GOOGLE_CLIENT_ID`     | Google OAuth Client ID       | `xxx.apps.googleusercontent.com`           |
| `GOOGLE_CLIENT_SECRET` | Google OAuth Secret          | `your-secret`                              |

---

<div align="center">

Made with ❤️ by Aaqib Javaid

[⬆ Back to top](#slotwise)

</div>
