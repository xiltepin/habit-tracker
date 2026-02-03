# Habit Tracker Backend (NestJS)

NestJS REST API with PostgreSQL, JWT authentication, and TypeORM.

## 📦 Installation
```bash
npm install
```

## 🔧 Configuration

Create `.env` file:
```env
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=habit_tracker
DB_PASSWORD=your_password
DB_DATABASE=habit_tracker

JWT_SECRET=your-secret-key
JWT_EXPIRATION=7d

PORT=3100
NODE_ENV=development

FRONTEND_URL=http://localhost:4300
```

## 🚀 Running
```bash
# Development
npm run start:dev

# Production
npm run build
npm run start:prod
```

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Habits (requires JWT)
- `GET /api/habits` - Get all habits
- `POST /api/habits` - Create habit
- `GET /api/habits/:id` - Get single habit
- `PUT /api/habits/:id` - Update habit
- `DELETE /api/habits/:id` - Delete habit

### Habit Entries (requires JWT)
- `POST /api/habits/:id/entries` - Create/update entry
- `GET /api/habits/:id/entries` - Get entries
- `DELETE /api/habits/:id/entries/:entryId` - Delete entry

## 🗄️ Database Schema

- **users**: id, email, password, createdAt
- **habits**: id, userId, name, color, createdAt
- **habit_entries**: id, habitId, date, completed, createdAt

## 🔒 Security

- Passwords hashed with bcrypt (10 rounds)
- JWT tokens (7 day expiration)
- CORS enabled for frontend
- Input validation with class-validator

## 🧪 Testing
```bash
# Test endpoint
curl http://localhost:3100/api
```
