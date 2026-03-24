# Car Marketplace

A full-stack car marketplace application built with NestJS (Backend) and React + Vite (Frontend).

## Project Structure

```
car-marketplace/
├── Backend/
│   ├── src/
│   │   ├── auth/              # Authentication module
│   │   │   ├── auth.service.ts
│   │   │   ├── auth.controller.ts
│   │   │   ├── auth.module.ts
│   │   │   └── dto/
│   │   ├── prisma/
│   │   │   └── prisma.service.ts
│   │   ├── app.module.ts
│   │   └── main.ts
│   ├── prisma/
│   │   └── schema.prisma
│   ├── package.json
│   └── tsconfig.json
│
├── Frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── lib/
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── package.json
│   ├── vite.config.ts
│   └── tsconfig.json
│
├── .env.example
├── .gitignore
└── README.md
```

## Getting Started

### Prerequisites
- Node.js >= 18.0.0
- npm or yarn
- PostgreSQL database

### Backend Setup

1. Navigate to Backend directory:
```bash
cd Backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file from example:
```bash
cp .env.example .env
```

4. Update `.env` with your database URL and JWT secret:
```
DATABASE_URL="postgresql://user:password@localhost:5432/car_marketplace"
JWT_SECRET="your-secret-key-here"
PORT=4000
FRONTEND_URL="http://localhost:3000"
```

5. Run Prisma migrations:
```bash
npm run db:migrate
```

6. Generate Prisma Client:
```bash
npm run db:generate
```

7. Start development server:
```bash
npm run start:dev
```

The backend will run on `http://localhost:4000`

### Frontend Setup

1. Navigate to Frontend directory:
```bash
cd Frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file from example:
```bash
cp .env.example .env
```

4. Update `.env` with API URL:
```
VITE_API_URL="http://localhost:4000"
```

5. Start development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:3000`

## API Endpoints

### Authentication
- `POST /auth/signup` - Register new user
- `POST /auth/signin` - Login user

### Request Body Examples

#### Sign Up
```json
{
  "email": "user@example.com",
  "password": "securePassword123",
  "role": "BUYER",
  "sellerType": null
}
```

#### Sign In
```json
{
  "email": "user@example.com",
  "password": "securePassword123"
}
```

## Available Scripts

### Backend
- `npm run start` - Start production server
- `npm run start:dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run db:migrate` - Run database migrations
- `npm run db:generate` - Generate Prisma Client
- `npm run lint` - Run linter
- `npm run format` - Format code with Prettier

### Frontend
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Type check
- `npm run clean` - Clean dist folder

## Technology Stack

### Backend
- NestJS - Progressive Node.js framework
- Prisma - ORM for database
- PostgreSQL - Database
- JWT - Authentication
- bcrypt - Password hashing

### Frontend
- React 19 - UI library
- Vite - Build tool
- TypeScript - Type safety
- Tailwind CSS - Styling
- Axios - HTTP client

## Code Standards

This project follows these standards:
- **Code Format**: Prettier configured in `.prettierrc`
- **Linting**: ESLint configured in `.eslintrc.json`
- **Type Safety**: Strict TypeScript in both Backend and Frontend
- **Naming Conventions**: 
  - PascalCase for classes and components
  - camelCase for functions and variables
  - UPPER_SNAKE_CASE for constants

## Contributing

1. Create a feature branch
2. Make your changes
3. Format code: `npm run format`
4. Ensure types are correct: `npm run lint`
5. Submit a pull request

## License

This project is licensed under the Apache License 2.0
