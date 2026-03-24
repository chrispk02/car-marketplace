# Car Marketplace - Quick Start Guide

## Các bước khởi động nhanh

### 1. Chuẩn bị Database

Nếu bạn có Docker, chạy lệnh này để khởi động PostgreSQL:
```bash
docker-compose up -d
```

Hoặc cài đặt PostgreSQL cục bộ với:
- Host: localhost
- Port: 5432
- User: postgres
- Password: postgres
- Database: car_marketplace

### 2. Cài đặt Backend

```bash
cd Backend
cp .env.example .env
npm install
npm run db:generate
npm run db:migrate
npm run start:dev
```

Backend sẽ chạy trên http://localhost:4000

### 3. Cài đặt Frontend

```bash
cd Frontend
cp .env.example .env
npm install
npm run dev
```

Frontend sẽ chạy trên http://localhost:3000

### 4. Test API

Sử dụng Postman hoặc cURL để test:

```bash
# Sign Up
curl -X POST http://localhost:4000/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "email": "buyer@example.com",
    "password": "password123",
    "role": "BUYER"
  }'

# Sign In
curl -X POST http://localhost:4000/auth/signin \
  -H "Content-Type: application/json" \
  -d '{
    "email": "buyer@example.com",
    "password": "password123"
  }'
```

## Các cách sửa tấn công tiêu chuẩn đã được thực hiện

### Backend Improvements (NestJS)

✅ **TypeScript Configuration**
- Tạo `tsconfig.json` đầy đủ với strict mode
- Enable decorators và proper module resolution

✅ **Project Structure**
- Tạo `app.module.ts` - Module chính
- Tạo `auth.module.ts` - Auth module với JWT setup
- Tạo `auth.controller.ts` - API endpoints
- Tạo `prisma.service.ts` - Database service

✅ **Type Safety**
- Tạo DTOs (Data Transfer Objects) cho signup/signin
- Tạo `types.ts` với interfaces
- Thay đổi `any` types thành proper types
- Thêm `class-validator` cho validation

✅ **Configuration**
- Tạo `app.module.ts` với ConfigModule
- Thêm `.env` file với proper secrets
- Thêm CORS configuration
- Thêm global validation pipe

✅ **Database (Prisma)**
- Cập nhật schema.prisma với:
  - Proper indexes
  - Cascade delete relationships
  - Table mapping names
  - Timestamps (createdAt, updatedAt)

✅ **Package.json**
- Cập nhật scripts cho dev/build/db
- Thêm thiếu dependencies: @nestjs/config, class-validator, class-transformer
- Thêm type definitions: @types/bcrypt, @types/express

✅ **Security**
- Use BCRYPT_ROUNDS constant
- Check email duplication trước signup
- Proper error handling với ConflictException

### Frontend Improvements (React + Vite)

✅ **Package Configuration**
- Thêm `axios` dependency (thiếu nhưng dùng trong code)
- Thêm TypeScript types: @types/react, @types/react-dom
- Thêm prettier for code formatting
- Cập nhật tên project thành `car-marketplace-frontend`
- Cập nhật build script với TypeScript check

✅ **Configuration Files**
- Sửa `vite.config.ts` - Xóa encoding issue (â character)
- Fix alias path configuration
- Enable proper HMR configuration

✅ **Constants & Utils**
- Cập nhật `constants.ts`:
  - Sử dụng import.meta.env cho environment variables
  - Thêm API endpoints constants
  - Thêm UI constants, user roles, seller types
  - Thêm local storage keys

✅ **Utilities**
- Cập nhật `lib/utils.ts`:
  - Thêm `createApiClient()` - Axios instance với interceptors
  - Thêm `formatCurrency()`, `formatDate()`
  - Thêm `debounce()` function
  - Thêm validation functions: `isValidEmail()`, `isValidPhone()`
  - Thêm auth helpers: `getAuthToken()`, `setAuthToken()`, `clearAuthData()`

### Project-wide Improvements

✅ **Configuration Files**
- Tạo `.prettierrc` - Code formatting standards
- Tạo `.eslintrc.json` - Linting configuration
- Tạo `.gitignore` - Proper ignore patterns
- Tạo `docker-compose.yml` - PostgreSQL setup
- Tạo `.env` files với proper values
- Tạo `.env.example` files cho documentation

✅ **Documentation**
- Tạo `README_SETUP.md` - Complete setup guide
- Tạo `QUICK_START.md` - Quick start guide

## Cấu trúc Project Sau Khi Sửa

```
Backend/
├── src/
│   ├── app.module.ts (NEW)
│   ├── main.ts (FIXED)
│   ├── types.ts (NEW)
│   ├── auth/
│   │   ├── auth.controller.ts (NEW)
│   │   ├── auth.module.ts (NEW)
│   │   ├── auth.service.ts (IMPROVED)
│   │   ├── dto/
│   │   │   ├── signup.dto.ts (NEW)
│   │   │   ├── signin.dto.ts (NEW)
│   │   │   └── auth-response.dto.ts (NEW)
│   │   └── interfaces/
│   │       └── auth.interface.ts (NEW)
│   └── prisma/
│       └── prisma.service.ts (NEW)
├── prisma/
│   └── schema.prisma (IMPROVED)
├── tsconfig.json (FIXED)
└── package.json (UPDATED)

Frontend/
├── src/
│   ├── constants.ts (IMPROVED)
│   └── lib/
│       └── utils.ts (IMPROVED)
├── vite.config.ts (FIXED)
├── tsconfig.json (OK)
└── package.json (UPDATED)

Project Root/
├── .env (NEW)
├── .env.example (NEW)
├── .gitignore (NEW)
├── .prettierrc (NEW)
├── .eslintrc.json (NEW)
├── docker-compose.yml (NEW)
├── README_SETUP.md (NEW)
└── QUICK_START.md (NEW - this file)
```

## Next Steps

1. **Database Migration**
   ```bash
   cd Backend
   npm run db:migrate
   ```

2. **Generate Prisma Client**
   ```bash
   npm run db:generate
   ```

3. **Start Development**
   ```bash
   # Terminal 1 - Backend
   cd Backend && npm run start:dev

   # Terminal 2 - Frontend
   cd Frontend && npm run dev
   ```

4. **Code Standards**
   - Format code: `npm run format`
   - Type check: `npm run lint`
   - Build: `npm run build`

## Công cụ hữu ích

- **Postman**: Test API endpoints
- **DBeaver**: Quản lý PostgreSQL database
- **VSCode Extensions**: REST Client, Prettier, ESLint, Thunder Client

## Support

Nếu gặp lỗi:
1. Kiểm tra `.env` file có đúng không
2. Đảm bảo PostgreSQL đang chạy
3. Xóa `node_modules` và chạy `npm install` lại
4. Check terminal logs để tìm error details
