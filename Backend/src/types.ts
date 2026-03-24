export enum UserRole {
  BUYER = 'BUYER',
  SELLER = 'SELLER',
  ADMIN = 'ADMIN',
}

export enum SellerType {
  USED = 'USED',
  NEW = 'NEW',
}

export interface User {
  id: string;
  email: string;
  role: UserRole;
  sellerType?: SellerType;
}

export interface Listing {
  id: string;
  title: string;
  price: number;
  brand: string;
  year: number;
  images: string[];
  status: string;
  sellerId: string;
  sellerType: SellerType;
  createdAt: Date;
}

export interface Lead {
  id: string;
  buyerName: string;
  phone: string;
  budget: number;
  listingId: string;
  buyerId: string;
  status: string;
  createdAt: Date;
}

export interface AuthResponse {
  token: string;
  id: string;
  email: string;
  role: UserRole;
}
