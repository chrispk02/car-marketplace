# Car Marketplace - API Documentation

## Authentication Endpoints

### 1. Sign Up (Đăng ký)
**Endpoint**: `POST /auth/signup`

**Request Body**:
```json
{
  "email": "user@example.com",
  "password": "securePassword123",
  "role": "BUYER",
  "sellerType": null
}
```

**Response** (200 OK):
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "email": "user@example.com",
  "role": "BUYER"
}
```

**Error** (400 Bad Request):
```json
{
  "error": "Validation failed",
  "message": ["email must be an email"]
}
```

**Error** (409 Conflict):
```json
{
  "statusCode": 409,
  "message": "Email đã được đăng ký"
}
```

**Valid Roles**: `BUYER`, `SELLER`, `ADMIN`
**Seller Types** (only if role is SELLER): `NEW`, `USED`

---

### 2. Sign In (Đăng nhập)
**Endpoint**: `POST /auth/signin`

**Request Body**:
```json
{
  "email": "user@example.com",
  "password": "securePassword123"
}
```

**Response** (200 OK):
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "email": "user@example.com",
  "role": "BUYER"
}
```

**Error** (401 Unauthorized):
```json
{
  "statusCode": 401,
  "message": "Sai tài khoản hoặc mật khẩu"
}
```

---

## Future Endpoints (To be implemented)

### Listings Management

**GET /listings** - Get all listings
**GET /listings/:id** - Get single listing
**POST /listings** - Create new listing (Auth required)
**PUT /listings/:id** - Update listing (Auth required)
**DELETE /listings/:id** - Delete listing (Auth required)

### Leads Management

**GET /leads** - Get all leads
**POST /leads** - Create new lead (Auth required)
**PUT /leads/:id** - Update lead status (Auth required)

---

## Authentication Headers

For protected endpoints, include JWT token:

```
Authorization: Bearer <your_jwt_token_here>
```

Example:
```bash
curl -X GET http://localhost:4000/listings \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

---

## Response Format

### Success Response
```json
{
  "data": {...},
  "message": "Operation successful",
  "statusCode": 200
}
```

### Error Response
```json
{
  "statusCode": 400,
  "message": "Error description",
  "error": "Bad Request"
}
```

---

## HTTP Status Codes

| Code | Meaning |
|------|---------|
| 200  | OK - Request successful |
| 400  | Bad Request - Invalid input |
| 401  | Unauthorized - Invalid/missing token |
| 409  | Conflict - Email already registered |
| 500  | Internal Server Error |

---

## Testing with cURL

### Sign Up
```bash
curl -X POST http://localhost:4000/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "email": "buyer@example.com",
    "password": "password123",
    "role": "BUYER"
  }'
```

### Sign In
```bash
curl -X POST http://localhost:4000/auth/signin \
  -H "Content-Type: application/json" \
  -d '{
    "email": "buyer@example.com",
    "password": "password123"
  }'
```

### Using Token (Example)
```bash
TOKEN="<token_from_signin_response>"

curl -X GET http://localhost:4000/listings \
  -H "Authorization: Bearer $TOKEN"
```

---

## Environment Variables

Required for backend (.env):

```bash
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/car_marketplace"
JWT_SECRET="your-secret-key-here"
JWT_EXPIRATION="7d"
PORT=4000
FRONTEND_URL="http://localhost:3000"
```

---

## Common Errors & Solutions

### Error: "Email đã được đăng ký"
- **Cause**: Trying to register with email that already exists
- **Solution**: Use different email or sign in instead

### Error: "Sai tài khoản hoặc mật khẩu"
- **Cause**: Wrong email/password combination
- **Solution**: Check email and password are correct

### Error: "Validation failed"
- **Cause**: Invalid request format
- **Solution**: Check request body matches required format

### Error: Cannot connect to database
- **Cause**: PostgreSQL not running or wrong DATABASE_URL
- **Solution**: Ensure PostgreSQL is running and URL is correct

---

## JWT Token Structure

Decoded payload example:
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "role": "BUYER",
  "iat": 1711270800,
  "exp": 1711875600
}
```

- **iat**: Issued at timestamp
- **exp**: Expiration timestamp (7 days)

---

## Rate Limiting

Currently: No rate limiting implemented
Future: Consider implementing rate limiting for production

---

## CORS Configuration

Backend allows requests from:
```
http://localhost:3000
```

Configured via `FRONTEND_URL` environment variable

---

*Last Updated: 2026-03-24*
