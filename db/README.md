# Database Setup

PostgreSQL configuration for Habit Tracker.

## 📋 Requirements

- PostgreSQL 16+

## 🔧 Setup

### 1. Create Database and User
```sql
sudo -u postgres psql

CREATE DATABASE habit_tracker;
CREATE USER habit_tracker WITH ENCRYPTED PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE habit_tracker TO habit_tracker;
```

### 2. Set Permissions
```sql
\c habit_tracker

GRANT ALL ON SCHEMA public TO habit_tracker;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO habit_tracker;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO habit_tracker;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO habit_tracker;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO habit_tracker;
ALTER DATABASE habit_tracker OWNER TO habit_tracker;

\q
```

## 📊 Schema

Tables are auto-created by TypeORM on first run.

### users
- id (UUID, PK)
- email (VARCHAR, UNIQUE)
- password (VARCHAR, hashed)
- createdAt (TIMESTAMP)

### habits
- id (UUID, PK)
- userId (UUID, FK → users.id)
- name (VARCHAR)
- color (VARCHAR, default: #3b82f6)
- createdAt (TIMESTAMP)

### habit_entries
- id (UUID, PK)
- habitId (UUID, FK → habits.id)
- date (DATE)
- completed (BOOLEAN, default: true)
- createdAt (TIMESTAMP)
- UNIQUE(habitId, date)

## 🔍 Useful Commands
```sql
-- Connect to database
\c habit_tracker

-- List tables
\dt

-- View table structure
\d users
\d habits
\d habit_entries

-- View data
SELECT * FROM users;
SELECT * FROM habits;
SELECT * FROM habit_entries;
```

## 🗑️ Reset Database (if needed)
```sql
DROP DATABASE habit_tracker;
CREATE DATABASE habit_tracker;
-- Then run setup again
```
