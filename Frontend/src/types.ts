export interface Car {
  id: string;
  make: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  location: string;
  image: string;
  badge?: string;
  isNew?: boolean;
}

export interface BodyType {
  id: string;
  name: string;
  icon: string;
}
