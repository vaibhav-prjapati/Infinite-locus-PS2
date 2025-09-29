# Canteen Ordering System

A modern web application for managing canteen orders with real-time order tracking and automatic cancellation features.

## Features

- 🍽️ Real-time menu display with stock tracking
- 🛒 Shopping cart functionality
- 👤 User authentication (Register/Login)
- 📱 Responsive design for all devices
- ⏲️ Order countdown timer with automatic cancellation
- 📊 Order history tracking
- 💰 Stock management system
- 🔄 Automatic stock restoration on order cancellation

## Tech Stack

### Frontend
- React 19
- React Router DOM
- Axios for API calls
- TailwindCSS for styling
- React Hot Toast for notifications
- Vite for build tooling

### Backend
- Node.js with Express
- MongoDB with Mongoose
- JWT for authentication
- Node-cron for scheduled tasks
- CORS for cross-origin resource sharing

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/vaibhav-prjapati/Infinite-locus-PS2.git
cd Infinite-locus-PS2
```

2. Install Frontend Dependencies:
```bash
cd client
npm install
```

3. Install Backend Dependencies:
```bash
cd ../server
npm install
```

4. Set up environment variables:

Frontend (.env in client folder):
```
VITE_BACKEND_URL=http://localhost:5000
```

Backend (.env in server folder):
```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
NODE_ENV=development
PORT=5000
```

### Running the Application

1. Start the Backend Server:
```bash
cd server
npm run dev
```

2. Start the Frontend Development Server:
```bash
cd client
npm run dev
```

The frontend will be available at `http://localhost:3000`
The backend will be running at `http://localhost:5000`

### Seeding the Database

To populate the database with sample menu items:
```bash
cd server
npm run data:import
```

To clear the database:
```bash
npm run data:destroy
```

## Key Features Explained

### Order Management
- Orders are automatically cancelled if not completed within 30 seconds
- Stock is automatically restored when orders are cancelled
- Real-time stock updates prevent overselling

### Authentication
- JWT-based authentication
- Protected routes for order history and status
- Secure password hashing

### Shopping Cart
- Local storage based cart system
- Real-time stock validation
- Multiple items support

## API Endpoints

### Items
- GET `/api/items` - Get all menu items
- POST `/api/items` - Create new item (protected)

### Users
- POST `/api/users/register` - Register new user
- POST `/api/users/login` - User login

### Orders
- POST `/api/orders` - Create new order (protected)
- GET `/api/orders/history` - Get user's order history (protected)
- POST `/api/orders/:id/cancel` - Cancel specific order (protected)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License.
