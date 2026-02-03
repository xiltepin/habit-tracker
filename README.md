# Habit Tracker

A full-stack habit tracking application built with NestJS (backend) and Angular (frontend).

## 🏗️ Architecture

- **Backend**: NestJS + PostgreSQL (Port 3100)
- **Frontend**: Angular PWA (Port 4300)
- **Database**: PostgreSQL 16
- **Deployment**: WSL + Raspberry Pi + Nginx

## 📁 Project Structure
```
habit-tracker/
├── backend/          # NestJS API
├── frontend/         # Angular PWA (coming soon)
└── db/              # Database documentation
```

## 🚀 Quick Start

### Backend
```bash
cd backend
npm install
npm run start:dev
```

See [backend/README.md](backend/README.md) for detailed instructions.

### Database Setup
See [db/README.md](db/README.md) for database configuration.

## 🔗 Links

- Backend API: http://localhost:3100/api
- Frontend: http://localhost:4300 (coming soon)
- Production: https://tracker.xiltepin.me (coming soon)

## 📝 Features

- ✅ JWT Authentication
- ✅ Habit tracking with calendar view
- ✅ Streak counting
- ✅ PWA (installable on Android)
- ✅ Offline support

## 🛠️ Tech Stack

- **Backend**: NestJS, TypeORM, PostgreSQL, JWT, bcrypt
- **Frontend**: Angular 17+, RxJS, Service Workers
- **Database**: PostgreSQL 16
