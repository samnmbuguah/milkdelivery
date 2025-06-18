# FreshDairy Delivery App 🥛

A modern, full-stack milk delivery web application built with React, TypeScript, and FastAPI. Users can order fresh milk with automatic delivery fee calculation, geolocation support, and order management.

## ✨ Features

### Customer Features
- **Smart Order Form:** Enter name, phone, address (or use GPS location)
- **Automatic Pricing:** Calculates total (70 sh/liter + 50 sh delivery fee)
- **Order Confirmation:** Review order details before submission
- **User Convenience:** Saves customer details in localStorage for quick reorders
- **Responsive Design:** Works perfectly on desktop and mobile devices

### Admin Features
- **Order Management:** View all orders in a clean, sortable table
- **Google Maps Integration:** Click any address to open in Google Maps
- **Status Tracking:** Mark orders as delivered with real-time updates
- **Order Status:** Visual indicators for pending vs delivered orders

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern UI library with hooks
- **TypeScript** - Type-safe JavaScript development
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **Axios** - HTTP client for API calls
- **React Toastify** - Toast notifications

### Backend
- **FastAPI** - Modern, fast web framework for APIs
- **SQLAlchemy** - SQL toolkit and ORM
- **Alembic** - Database migration tool
- **SQLite** - Lightweight database (can be switched to MySQL/PostgreSQL)
- **Pydantic** - Data validation using Python type annotations
- **Uvicorn** - ASGI server

### Development Tools
- **ESLint** - JavaScript/TypeScript linting
- **Prettier** - Code formatting
- **Husky** - Git hooks for code quality

## 🚀 Quick Start

### Prerequisites
- **Node.js** (v18 or higher)
- **Python** (3.10 or higher)
- **Git**

### Backend Setup

1. **Clone and navigate to backend:**
   ```bash
   cd backend
   ```

2. **Create virtual environment:**
   ```bash
   python3 -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Set up database:**
   ```bash
   alembic upgrade head
   ```

5. **Start the server:**
   ```bash
   uvicorn main:app --reload --host 0.0.0.0 --port 8000
   ```

   The API will be available at `http://localhost:8000`
   - API Documentation: `http://localhost:8000/docs`
   - Alternative docs: `http://localhost:8000/redoc`

### Frontend Setup

1. **Navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start development server:**
   ```bash
   npm run dev
   ```

   The app will be available at `http://localhost:5173`

## 📁 Project Structure

```
milkdelivery/
├── backend/                 # FastAPI backend
│   ├── alembic/            # Database migrations
│   ├── venv/               # Python virtual environment
│   ├── crud.py             # Database operations
│   ├── database.py         # Database configuration
│   ├── main.py             # FastAPI application
│   ├── models.py           # SQLAlchemy models
│   └── schemas.py          # Pydantic schemas
├── frontend/               # React frontend
│   ├── src/
│   │   ├── api/            # API client functions
│   │   ├── components/     # React components
│   │   ├── hooks/          # Custom React hooks
│   │   ├── types/          # TypeScript type definitions
│   │   └── App.tsx         # Main application component
│   ├── package.json        # Node.js dependencies
│   └── vite.config.ts      # Vite configuration
├── .gitignore              # Git ignore rules
└── README.md               # This file
```

## 🔧 API Endpoints

- `GET /` - Health check
- `POST /orders` - Create new order
- `GET /admin/orders` - Get all orders (admin)
- `PUT /admin/orders/{order_id}/status` - Update order status

## 🎨 UI/UX Features

- **Dark Theme:** Modern dark interface with excellent contrast
- **Responsive Design:** Optimized for desktop, tablet, and mobile
- **Loading States:** Smooth loading indicators
- **Error Handling:** User-friendly error messages
- **Toast Notifications:** Success/error feedback
- **Form Validation:** Real-time input validation

## 🗄️ Database Schema

```sql
orders (
  id INTEGER PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  address VARCHAR(255) NOT NULL,
  liters INTEGER NOT NULL,
  total FLOAT NOT NULL,
  latitude FLOAT,
  longitude FLOAT,
  status VARCHAR(20) DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)
```

## 🔄 Development Workflow

1. **Backend Development:**
   - Make changes to models/schemas
   - Create migration: `alembic revision --autogenerate -m "description"`
   - Apply migration: `alembic upgrade head`
   - Test API endpoints

2. **Frontend Development:**
   - Update components in `src/components/`
   - Add new API functions in `src/api/`
   - Update types in `src/types/`
   - Test with hot reload

## 🚀 Deployment

### Backend Deployment
- Use production ASGI server (Gunicorn + Uvicorn)
- Set up environment variables
- Configure database (PostgreSQL recommended for production)
- Set up CORS for your frontend domain

### Frontend Deployment
- Build: `npm run build`
- Deploy to Vercel, Netlify, or any static hosting
- Update API URL in production

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

If you encounter any issues:
1. Check the console for error messages
2. Ensure all dependencies are installed
3. Verify database migrations are up to date
4. Check that both frontend and backend servers are running

---

**Built with ❤️ using modern web technologies** 