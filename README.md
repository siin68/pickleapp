# Dating/Meetup Application

A modern Next.js application for connecting people through shared hobbies and location-based meetups.

## Features

- 🌐 **Internationalization** - Support for Vietnamese and English
- 🔐 **Google OAuth** - Secure authentication with NextAuth.js
- 🎯 **Hobby Matching** - Find people with similar interests
- 📍 **Location-based** - Discover meetups in your area
- 💬 **Real-time Chat** - Communicate with event participants
- 📱 **Responsive Design** - Works on all devices

## Tech Stack

- **Framework:** Next.js 14+ (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Authentication:** NextAuth.js
- **Internationalization:** next-intl
- **State:** React Hooks (currently mock data)

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Google OAuth credentials (for login functionality)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd date-rnd
```

2. Install dependencies:
```bash
npm install
```

3. Setup environment variables:
```bash
copy .env.example .env
```

Then edit `.env` and add your credentials:
```
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

### Generate NextAuth Secret

```bash
npx auth secret
```

### Get Google OAuth Credentials

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable Google+ API
4. Go to Credentials → Create Credentials → OAuth 2.0 Client ID
5. Add authorized redirect URI: `http://localhost:3000/api/auth/callback/google`
6. Copy Client ID and Client Secret to `.env`

### Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
date-rnd/
├── app/
│   ├── [locale]/           # Internationalized routes
│   │   ├── page.tsx        # Landing page
│   │   ├── login/          # Login page
│   │   ├── onboarding/     # 3-step onboarding
│   │   ├── dashboard/      # Main dashboard with sub-routes
│   │   ├── event/[id]/     # Event details
│   │   ├── profile/[id]/   # User profile
│   │   ├── chat/[id]/      # Chat room
│   │   └── location/[id]/  # Location-based events
│   ├── api/
│   │   └── auth/           # NextAuth routes
│   └── globals.css
├── components/
│   └── ui/                 # Reusable UI components
├── constants/              # App constants (hobbies, locations)
├── lib/                    # Utility functions
├── messages/               # i18n translations (en, vi)
├── mock-data/              # Mock data for development
├── types/                  # TypeScript type definitions
├── i18n.ts                 # i18n configuration
├── middleware.ts           # Next.js middleware
└── tailwind.config.ts
```

## Routes

### Public Routes
- `/` - Landing page
- `/login` - Google login

### Onboarding Flow
- `/onboarding/profile` - User profile setup
- `/onboarding/hobbies` - Select hobbies (3-8)
- `/onboarding/locations` - Choose preferred locations (1-3)

### Dashboard Routes
- `/dashboard` - Home dashboard
- `/dashboard/open-invites` - Browse open events
- `/dashboard/hobby-match` - Find users by hobby
- `/dashboard/create-invite` - Create new event
- `/dashboard/my-events` - View your events (created/joined)
- `/dashboard/messages` - Chat list
- `/dashboard/settings` - User settings

### Dynamic Routes
- `/event/[id]` - Event detail page
- `/profile/[id]` - Public user profile
- `/chat/[id]` - Event chat room
- `/location/[id]` - Location-based event list

## Mock Data

The app currently uses mock data for development. Mock data includes:
- 4 sample users
- 5 sample events
- 12 hobbies across different categories
- 10 locations in Tokyo, Ho Chi Minh, Hanoi, Da Nang
- Sample chat messages

## Language Support

Switch between English and Vietnamese by changing the URL:
- English: `/en/...`
- Vietnamese: `/vi/...`

## Building for Production

```bash
npm run build
npm start
```

## Future Enhancements

- [ ] Connect to real database (PostgreSQL/MongoDB)
- [ ] Real-time chat with WebSockets
- [ ] Push notifications
- [ ] Map integration for locations
- [ ] Image uploads for profiles and events
- [ ] Email notifications
- [ ] Event filtering and search
- [ ] User ratings and reviews

## License

MIT

## Contact

For questions or support, please contact the development team.
