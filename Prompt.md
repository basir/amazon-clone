You are an expert Full Stack Developer specializing in React Native, Next.js, and Firebase.

Create an **Amazon Clone** application consisting of a **Mobile App** for users and an **Admin Dashboard** for management.

### Tech Stack

**Mobile App (`mobile` folder):**
- **Framework:** React Native with Expo (~54.0.25)
- **Routing:** Expo Router (~6.0.15)
- **Styling:** NativeWind v4 (Tailwind CSS) & Gluestack UI
- **Language:** TypeScript
- **State Management:** React Context (Auth)
- **Payments:** Stripe (@stripe/stripe-react-native)
- **Backend Integration:** Firebase (Auth, Firestore)
- **Icons:** Lucide React Native

**Admin Dashboard (`admin` folder):**
- **Framework:** Next.js 16 (App Router)
- **Styling:** Tailwind CSS v4
- **Language:** TypeScript
- **Charts:** Recharts
- **Icons:** Lucide React
- **Backend Integration:** Firebase (Auth, Firestore)

**Backend (`backend` folder):**
- **Core:** Firebase Functions & Firestore
- **Data Seeding:** `db.json` with `seed.js` script

### Folder Structure

**Mobile (`/mobile`):**
- `app/`:
  - `(tabs)/`: Main navigation (Home, Search, Cart, Profile)
  - `(auth)/`: Authentication screens (Login, Signup)
  - `checkout.tsx`: Checkout flow
  - `orders/`: Order details and history
- `components/`: Reusable UI components
- `services/`: API calls (Firebase integration)
- `context/`: Global state (AuthContext, CartContext)

**Admin (`/admin`):**
- `app/`:
  - `login/`: Admin authentication
  - `orders/`: Order management
  - `products/`: Product CRUD operations
  - `users/`: User management
  - `settings/`: Admin settings
- `components/`: Dashboard UI components
- `lib/`: Utility functions

### Key Features

1.  **Authentication:**
    - Email/Password login for Users and Admins.
    - Persistent auth state using AsyncStorage (Mobile).

2.  **Product Management:**
    - **Admin:** Create, Read, Update, Delete products.
    - **Mobile:** Browse products, search, filter by category/brand.

3.  **Shopping Experience:**
    - Add to Cart.
    - Checkout with Stripe integration.
    - Order history for users.

4.  **Admin Dashboard:**
    - Overview charts (Sales, Orders) using Recharts.
    - Manage Orders (Update status).
    - Manage Users.

5.  **Design:**
    - **Mobile:** Native look and feel with Gluestack UI and NativeWind.
    - **Admin:** Clean, responsive dashboard with Tailwind CSS.

### Instructions
- Use the specified versions (Next.js 16, Expo 54, NativeWind v4).
- Ensure strict TypeScript typing.
- Follow the folder structure precisely.
- Implement a premium, modern UI.
