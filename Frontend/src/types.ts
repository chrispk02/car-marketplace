export interface Car {
  id: string;
  title: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  location?: string;
  image: string;
  images?: string[];
  badge?: string;
  isNew?: boolean;
  sellerId: string;
  sellerType: 'NEW' | 'USED';
  status: 'PENDING' | 'APPROVED' | 'SOLD';
  description?: string;
  bodyType: string;
  color?: string;
  fuelType?: string;
  transmission?: string;
  condition?: string;
  engineSize?: string;
  horsepower?: number;
  driveType?: string;
  interior?: string;
  features?: string[];
  exteriorColor?: string;
  interiorColor?: string;
  owner?: string;
  isActive?: boolean;
  createdAt?: string;
}

export interface BodyType {
  id: string;
  name: string;
  icon: string;
}

export interface Lead {
  id: string;
  listingId: string;
  buyerId: string;
  buyerName: string;
  phone: string;
  budget: number;
  status: 'PENDING' | 'CONTACTED' | 'REJECTED';
  createdAt: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'BUYER' | 'SELLER' | 'ADMIN';
  sellerType?: 'NEW' | 'USED';
  createdAt: string;
}

export interface AuthUser {
  id: string;
  email: string;
  name?: string;
  role: 'BUYER' | 'SELLER' | 'ADMIN';
  sellerType?: 'NEW' | 'USED';
}
