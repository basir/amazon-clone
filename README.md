# Amazon Clone Ready To Deploy, Customize and Monitize.

“Normally cloning Amazon takes weeks — even with AI.
But I already built it for you.
You just deploy and start making money.”

## Mobile App (`mobile` folder)

The mobile application is a high-performance, cross-platform app built with React Native and Expo. It provides a complete e-commerce experience.

### Features
- **Authentication**: Secure login and registration using Firebase Auth.
- **Home Screen**: Dynamic banner carousel, deals, bestsellers, and category navigation.
- **Product Details**: Image galleries, price info, ratings, reviews, and related products.
- **Cart & Checkout**: Full cart management, shipping calculation, and secure checkout flow.
- **Search**: Advanced search with debouncing, filtering (price, category, brand), and sorting.
- **User Profile**: Order history, address management, and wishlist.
- **Reviews**: User-generated ratings and reviews.

### Tech Stack
- **Framework**: React Native (Expo SDK 54)
- **Navigation**: Expo Router (File-based routing)
- **UI Library**: Gluestack UI (for accessible, styled components)
- **Styling**: NativeWind (Tailwind CSS for React Native)
- **State Management**: React Context (Auth, Cart, Wishlist)
- **Backend Integration**: Firebase SDK

## Backend (`backend` folder)

The backend powers the data and business logic, leveraging Firebase's serverless infrastructure.

### Features
- **Database**: Firestore for storing users, products, orders, reviews, etc.
- **Seeding**: `seed.js` script to populate the database with demo data (products, categories, reviews).
- **Serverless Functions**: Firebase Cloud Functions for complex logic.
- **Security**: Firestore Rules (`firestore.rules`) to secure data access.

### Tech Stack
- **Runtime**: Node.js
- **Database**: Firebase Firestore
- **Admin SDK**: Firebase Admin SDK (for seeding and admin tasks)
- **Functions**: Firebase Cloud Functions

## Admin Panel (`admin` folder)

A modern web-based administration dashboard to manage the platform.

### Features
- **Dashboard**: Overview of sales, orders, and user activity.
- **Product Management**: Add, edit, and remove products.
- **Order Management**: View and update order statuses.

### Tech Stack
- **Framework**: Next.js 16 (React 19)
- **Styling**: Tailwind CSS v4
- **Language**: TypeScript

## How to Deploy

### 1. Firebase (Backend & Database)

1.  **Create a Firebase Project**: Go to the [Firebase Console](https://console.firebase.google.com/) and create a new project.
2.  **Enable Services**:
    - **Authentication**: Enable Email/Password provider.
    - **Firestore Database**: Create a database in production mode.
    - **Storage**: Enable if you plan to upload images.
3.  **Install Firebase CLI**:
    ```bash
    npm install -g firebase-tools
    ```
4.  **Login**:
    ```bash
    firebase login
    ```
5.  **Initialize/Deploy**:
    Navigate to the `backend` folder:
    ```bash
    cd backend
    ```
    If `firebase.json` is missing, initialize the project:
    ```bash
    firebase init
    ```
    (Select Firestore and Functions. Use your created project. Accept defaults).
    
    Deploy rules and functions:
    ```bash
    firebase deploy
    ```
6.  **Seed Data**:
    Update `backend/.env` or service account credentials if needed (see `backend/seed.js` for details).
    ```bash
    npm install
    npm run seed
    ```

### 2. Vercel (Admin Panel)

1.  **Install Vercel CLI**:
    ```bash
    npm install -g vercel
    ```
2.  **Deploy**:
    Navigate to the `admin` folder:
    ```bash
    cd admin
    vercel
    ```
    Follow the prompts to link your project and deploy.

## How to Develop

### Prerequisites
- Node.js installed.
- Expo Go app on your phone (for mobile testing).

### Mobile App
1.  Navigate to the mobile folder:
    ```bash
    cd mobile
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Start the development server:
    ```bash
    npm start
    ```
    Scan the QR code with Expo Go (Android) or Camera (iOS).

### Backend
1.  Navigate to the backend folder:
    ```bash
    cd backend
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Run the seed script (optional, to reset data):
    ```bash
    npm run seed
    ```

### Admin Panel
1.  Navigate to the admin folder:
    ```bash
    cd admin
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Start the development server:
    ```bash
    npm run dev
    ```
    Open [http://localhost:3000](http://localhost:3000) in your browser.
