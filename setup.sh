#!/bin/bash

echo "🚀 Portfolio Setup Script"
echo "========================="
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

echo "✓ Node.js version: $(node -v)"

# Check if MySQL is installed
if ! command -v mysql &> /dev/null; then
    echo "❌ MySQL is not installed. Please install MySQL 8.0+ first."
    exit 1
fi

echo "✓ MySQL is installed"
echo ""

# Setup Backend
echo "📦 Setting up Backend..."
cd backend

if [ ! -f .env ]; then
    echo "Creating .env file..."
    cp .env.example .env
    echo "⚠️  Please update .env with your database credentials"
fi

echo "Installing backend dependencies..."
npm install

echo ""
echo "🔐 Generating admin password hash..."
node utils/generateHash.js admin123

echo ""
echo "📊 Database Setup"
echo "Please run the following commands manually:"
echo "  1. mysql -u root -p"
echo "  2. CREATE DATABASE portfolio_db;"
echo "  3. USE portfolio_db;"
echo "  4. SOURCE ../database/schema.sql;"
echo "  5. EXIT;"
echo ""
read -p "Press Enter after completing database setup..."

echo ""
echo "🌱 Seeding database..."
npm run seed

cd ..

# Setup Frontend
echo ""
echo "📦 Setting up Frontend..."
cd frontend

if [ ! -f .env ]; then
    echo "Creating .env file..."
    cp .env.example .env
fi

echo "Installing frontend dependencies..."
npm install

cd ..

echo ""
echo "✅ Setup Complete!"
echo ""
echo "To start the application:"
echo "  Backend:  cd backend && npm run dev"
echo "  Frontend: cd frontend && npm start"
echo ""
echo "Default admin credentials:"
echo "  Email: admin@portfolio.com"
echo "  Password: admin123"
echo ""
echo "⚠️  Remember to change the admin password after first login!"
