# Professional IT Services Website

## Overview

This is a full-stack web application for LongSec - a Professional IT Services company that provides cybersecurity, specialized translations, training, OSINT, and data recovery services. The application is built with a modern React frontend and Express.js backend, designed to serve both B2B and B2C clients with trilingual support (Polish, English, Ukrainian).

## User Preferences

Preferred communication style: Simple, everyday language.

## Recent Changes (Latest Update: 2025-01-21)

✓ **TRANSFORMED BLOG AND CONTACT PAGES TO GLASS MORPHISM DESIGN** (2025-01-21):
  - Updated Blog page with consistent glass morphism containers (bg-white/10, backdrop-blur-xl, rounded-[2rem])
  - Updated Contact page with unified glass morphism styling matching homepage design  
  - Changed all section backgrounds from solid/high-opacity to transparent glass containers
  - Applied consistent spacing (py-16) and max-width (max-w-6xl) across all sections
  - Updated text colors for better contrast (text-gray-900 dark:text-white for headings)
  - Enhanced form inputs with glass morphism styling (bg-white/40 backdrop-blur-sm)
  - Updated contact method icons and feature icons with gradient backgrounds
  - All pages now have unified visual language with floating glass containers over parallax background

✓ **IMPROVED TESTIMONIALS LAYOUT AND TRANSPARENCY** (2025-01-21):
  - Removed unnecessary "Czytaj więcej" buttons from testimonials as they don't lead anywhere
  - Improved spacing with larger margins (mb-8 instead of mb-6) for better readability
  - Simplified layout by removing flexbox column structure - cards now have natural height
  - Enhanced text sizing with text-base for better readability
  - Increased transparency across all sections (bg-white/20→bg-white/10, bg-white/30→bg-white/15)
  - Dragon background now more visible through glass morphism containers

✓ **ENHANCED GLASS MORPHISM WITH BACKGROUND CONTAINERS FOR BETTER CONTRAST** (2025-01-21):
  - Added semi-transparent background containers to all section headers for improved text readability
  - Applied bg-white/20 dark:bg-gray-800/30 backdrop-blur-md to header sections across all components  
  - Enhanced contrast of titles and descriptions with darker text colors (gray-900/white)
  - Wrapped section headers in rounded-2xl containers with proper padding and borders
  - Improved visual hierarchy with consistent glass morphism treatment for headers
  - ContactForm, TestimonialsSection, CaseStudiesSection, BlogPreview, and ServicesGrid all updated
  - Form fields and inputs maintain glass morphism with bg-white/40 backdrop-blur-sm styling

✓ **COMPREHENSIVE NAVIGATION HOVER COLORS UPDATE** (2025-01-21):
  - Changed all navigation buttons hover color to #bd9775 with white text (#ffffff)
  - Updated main navigation: Home, Services, Blog, Contact buttons
  - Updated Services dropdown submenu items with new hover colors  
  - Updated language switcher (PL/EN/UA) hover states
  - Updated B2B/B2C client type switcher hover states
  - Updated theme toggle button hover colors
  - Updated mobile navigation menu buttons with consistent hover colors
  - Updated blog filter buttons to use #264259 for both active and hover states
  - Added complete blog category translations for all languages (PL/EN/UA)
  - Changed blog category display format to "Kategoria: [Category]" instead of raw keys

✓ **UNIFIED GLASS-MORPHISM DESIGN AND IMPROVED BUTTON HOVER STATES** (2025-01-21):
  - Applied consistent glass-morphism style from Services page to entire application
  - All components now use bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm for transparency
  - Updated TestimonialsSection, CaseStudiesSection, BlogPreview, ServicesGrid with unified styling
  - Fixed button hover states for better readability - changed to blue background with white text
  - Blog filter buttons now use hover:bg-blue-600 hover:text-white for contrast
  - "Czytaj więcej" and "Zobacz wszystkie" buttons have consistent hover colors
  - "Dowiedz się więcej" buttons in service cards now use blue hover instead of yellow
  - All hover transitions use duration-200 for smooth animations

✓ **OPTIMIZED ANIMATION TIMING AND NAVIGATION** (2025-01-21):
  - Significantly reduced animation delays across all pages for faster content reveal
  - Blog page: Header animations reduced from 1.5s-1.8s to 0.2s-0.4s
  - Blog page: Section animations reduced from 2.2s-3.0s to 0.6s-1.0s
  - Contact page: Header animations reduced from 1.5s-1.8s to 0.2s-0.4s
  - Contact page: Section animations reduced from 2.2s-4.5s to 0.6s-1.8s
  - Services page: Header animations reduced from 0.6s-0.8s to 0.2s-0.4s
  - Services page: Service cards animations reduced from 1.0s+ to 0.6s+
  - Removed complex nested animations from Services page for cleaner performance
  - Enhanced navigation from Services "Nasze projekty" button to Home page Case Studies section with auto-scroll
  - Updated copyright year from 2024 to 2025 in all language versions
  - Fixed typographical orphans (sierotki) throughout Polish translations using non-breaking spaces (&nbsp;)

✓ **ENHANCED ANIMATION SYSTEM AND NAVIGATION** (2025-01-19):
  - Fixed all animation conflicts by removing CSS animations and using only Framer Motion
  - Added parallax backgrounds to all subpages matching homepage design
  - Resolved page transition flickering by synchronizing animation delays
  - Enhanced navbar "Services" button with direct routing functionality
  - All pages now have consistent smooth animations without double effects
  - Removed container backgrounds to show parallax effect throughout
  - Converted content sections to rounded square containers with backdrop blur
  - Services, Contact, and Blog now use floating glass-morphism containers
  - Footer background changed to fully opaque for better contrast
  - Added missing service features translations for all languages
  - Fixed all translation warnings in console logs
  - Fixed Calendly widget duplication issue by using useRef instead of document.getElementById
  - Improved widget cleanup and initialization to prevent multiple renders
  - **TRANSFORMED HOMEPAGE TO MATCH OTHER PAGES** (2025-01-19):
    - Added parallax background covering entire homepage
    - Converted all sections to transparent rounded containers with glass effects
    - Removed individual section backgrounds from components
    - Services, Case Studies, Certifications, Testimonials, Blog Preview, and Contact all use floating glass-morphism containers
    - Maintained HeroSection with white text over parallax background
    - Fixed ContactForm visibility issue by adapting colors for light/dark themes
    - Contact form now uses proper text colors and backgrounds for both light and dark modes
    - **UNIFIED CONTACT PAGE DESIGN** (2025-01-19):
      - Contact page now uses ParallaxBackground component like other pages
      - Removed individual background from header section
      - All sections now use consistent glass-morphism containers with proper spacing
      - Consistent design language now across all pages including Contact

✓ **IMPLEMENTED COMPLETE ADMIN AUTHENTICATION SYSTEM** - Secure blog management:
  - Created AdminLogin component with JWT token authentication
  - Implemented useAuth hook with context for authentication state
  - Added bcrypt password hashing and secure token validation
  - Protected all blog CRUD operations with authorization middleware
  - Created default admin account (admin/admin123) in database
  - Added logout functionality and session management
  - Fixed database update operations to prevent "No values to set" errors

✓ **RESOLVED ALL TRANSLATION ISSUES** - Complete internationalization:
  - Added missing service features translations for all languages (PL/EN/UA)
  - Fixed console warnings for cybersecurity, translations, training, OSINT, data recovery features
  - Eliminated all hardcoded text throughout the entire website
  - Complete trilingual functionality now working across all components

✓ **PREVIOUS MAJOR IMPLEMENTATIONS**:
  - Full image upload system with compression and database integration
  - PostgreSQL database migration with Drizzle ORM and Neon serverless
  - Complete dark theme with localStorage persistence and optimized gradients
  - Parallax scrolling background with blurred LongSec logos
  - Expanded Services section with detailed features and professional layout
  - Calendly integration with trilingual support
  - Updated LongSec branding and contact information throughout
  - Enhanced visual effects and responsive design improvements

## System Architecture

### Frontend Architecture
- **React 18** with TypeScript for the client-side application
- **Vite** as the build tool and development server
- **Tailwind CSS** for styling with a custom design system
- **shadcn/ui** component library for consistent UI components
- **TanStack Query** for server state management and API calls
- **Wouter** for client-side routing (lightweight alternative to React Router)
- **React Hook Form** with Zod validation for form handling

### Backend Architecture
- **Express.js** server with TypeScript
- **RESTful API** design with endpoints for contacts, consultations, and blog posts
- **DatabaseStorage** implementation with PostgreSQL backend
- **Zod schemas** for data validation shared between frontend and backend

### Data Storage
- **PostgreSQL Database** with Neon serverless hosting
- **Drizzle ORM** for type-safe database operations
- **Schema definitions** in shared directory for type safety
- **Database migrations** support through Drizzle Kit
- **DatabaseStorage** implementation replacing memory storage

### Translation System
- **Complete trilingual support** (Polish, English, Ukrainian)
- **No hardcoded text** - every UI element uses translation keys
- **Comprehensive coverage** including contact methods, service features, blog categories
- **Translation function** properly imported in all components
- **Category translations** for blog filtering and service descriptions

## Key Components

### Shared Schema (`shared/schema.ts`)
- Defines database tables for users, contacts, blog posts, and consultations
- Uses Drizzle ORM with PostgreSQL dialect
- Includes Zod validation schemas for API endpoints
- Supports multilingual content and B2B/B2C client types

### Frontend Components
- **Layout System**: Responsive navigation, footer, and page layout with parallax background
- **Language Support**: Multi-language switcher (Polish, English, Ukrainian)
- **Client Type Toggle**: B2B/B2C mode switching
- **Contact Forms**: Contact form and consultation booking
- **Blog System**: Blog post listing and preview components
- **Service Pages**: Detailed service descriptions and features
- **Theme System**: Dark/light mode toggle with localStorage persistence
- **Parallax Background**: Animated background with blurred logo patterns
- **Visual Effects**: Smooth scrolling and optimized parallax performance

### Backend Services
- **Storage Interface**: Abstracted storage layer for easy database migration
- **API Routes**: RESTful endpoints for all major operations
- **Error Handling**: Centralized error handling with proper HTTP status codes
- **Request Logging**: Automatic API request logging for monitoring

### UI Components
- Complete shadcn/ui component library integration
- Custom theme with professional color scheme
- Responsive design with mobile-first approach
- Consistent spacing and typography system

## Data Flow

1. **Client Requests**: Frontend makes API calls using TanStack Query
2. **API Processing**: Express server handles requests and validates data with Zod
3. **Storage Operations**: Memory storage performs CRUD operations
4. **Response Handling**: Frontend updates UI based on API responses
5. **Error Management**: Errors are caught and displayed with toast notifications

## External Dependencies

### Development Tools
- **Vite**: Build tool and development server
- **TypeScript**: Type safety across the stack
- **ESLint**: Code linting and formatting
- **PostCSS**: CSS processing with Tailwind

### UI Libraries
- **Radix UI**: Headless UI components for accessibility
- **Lucide React**: Icon library
- **Tailwind CSS**: Utility-first CSS framework
- **class-variance-authority**: Component variant management

### Backend Libraries
- **Express**: Web server framework
- **Drizzle ORM**: Database ORM and query builder
- **Zod**: Schema validation
- **date-fns**: Date manipulation utilities

### Database Integration
- **@neondatabase/serverless**: Neon database driver (configured but not actively used)
- **connect-pg-simple**: PostgreSQL session store
- **Drizzle Kit**: Database migration tool

## Deployment Strategy

### Build Process
- **Frontend**: Vite builds optimized production bundle to `dist/public`
- **Backend**: esbuild compiles TypeScript server to `dist/index.js`
- **Database**: Drizzle migrations can be applied with `npm run db:push`

### Environment Configuration
- **Development**: Uses Vite dev server with Express API
- **Production**: Serves static files from Express with API routes
- **Database**: Configured for PostgreSQL via DATABASE_URL environment variable

### Replit Integration
- **Development Server**: Configured for Replit environment with proper middleware
- **Error Overlay**: Runtime error modal for development
- **Cartographer**: Code exploration tool for Replit users

The application is structured as a monorepo with clear separation between client, server, and shared code, making it easy to scale and maintain while providing a professional IT services website with modern web technologies.