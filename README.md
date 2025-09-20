# 🍽️ Restaurant Analytics Dashboard

A simple restaurant analytics dashboard built with **Laravel** (Backend) and **Next.js** (Frontend). View restaurant data, order trends, and revenue analytics.

## 🚀 Quick Start

### What You Need
- PHP 8.2+
- Node.js 18+
- Composer
- Git

### 1. Setup Backend (Laravel)
```bash
cd restaurent_backend
composer install


# Configure MySQL database in .env file
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=restaurant_db
DB_USERNAME=your_username
DB_PASSWORD=your_password

php artisan migrate
php artisan db:seed
php artisan serve
```
Backend runs at: `http://localhost:8000`

### 2. Setup Frontend (Next.js)
```bash
cd front
npm install
npm run dev
```
Frontend runs at: `http://localhost:3000`

## 📊 What This App Does

### Restaurant Features
- View all restaurants
- Search restaurants by name
- Filter by location and cuisine
- Click restaurant to see analytics

### Analytics Features
- **Daily Orders Count**: Track orders per day
- **Daily Revenue**: Monitor daily earnings
- **Average Order Value**: Calculate average spending
- **Peak Order Hours**: Find busiest times
- **Top 3 Restaurants**: Revenue-based ranking
- **Advanced Filtering**: Date range, amount range, hour range

## 🛠️ Tech Stack

**Backend:**
- Laravel 12.x
- MySQL database
- REST API

**Frontend:**
- Next.js 15.x
- React 19.x
- Tailwind CSS

## 📁 Project Structure

```
restaurant/
├── front/                    # Next.js Frontend
│   ├── src/app/             # Pages
│   ├── src/components/      # React Components
│   └── src/config/          # API Config
├── restaurent_backend/      # Laravel Backend
│   ├── app/Http/Controllers/ # API Controllers
│   ├── app/Models/          # Database Models
│   ├── database/            # Database Files
│   └── routes/api.php       # API Routes
└── README.md
```

## 🔌 API Endpoints

| Method | Endpoint | What It Does |
|--------|----------|--------------|
| GET | `/api/restaurants` | Get all restaurants (with search/filter) |
| GET | `/api/restaurants/{id}` | Get restaurant details |
| GET | `/api/restaurants/{id}/orders` | Get orders with date filters |
| GET | `/api/restaurants/{id}/orderscount` | Get analytics (count, revenue, avg, peak) |
| GET | `/api/restaurants/toprevenue/allorder` | Get top 3 restaurants by revenue |

### Query Parameters
- `search` - Search restaurant name
- `location` - Filter by location  
- `cuisine` - Filter by cuisine type
- `start_date` - Filter start date
- `end_date` - Filter end date
- `count` - Get daily order counts
- `revenue` - Get daily revenue
- `avg` - Get average order value
- `peakhours` - Get peak order hours

## 📱 How to Use

1. **Home Page**: See all restaurants
2. **Search**: Type restaurant name to find it
3. **Filter**: Use location/cuisine filters
4. **Click Restaurant**: View detailed analytics
5. **Analytics**: See orders, revenue, peak hours

## 🗄️ Database

**Restaurants Table:**
- id, name, location, cuisine

**Orders Table:**
- id, restaurant_id, order_amount, order_time

**Sample Data:**
- 4 restaurants (Tandoori Treats, Sushi Bay, Pasta Palace, Burger Hub)
- 200+ orders across 7 days

n

## 📞 Need Help?

- Check the code comments
- Look at the API routes
- Review the component structure

