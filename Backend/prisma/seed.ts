// Seed script to populate database with sample data
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // Create sample users
  const hashedPassword = await bcrypt.hash('password123', 10);

  const user1 = await prisma.user.upsert({
    where: { email: 'seller@example.com' },
    update: {},
    create: {
      email: 'seller@example.com',
      password: hashedPassword,
      role: 'SELLER',
      sellerType: 'USED',
    },
  });

  const user2 = await prisma.user.upsert({
    where: { email: 'dealer@example.com' },
    update: {},
    create: {
      email: 'dealer@example.com',
      password: hashedPassword,
      role: 'SELLER',
      sellerType: 'NEW',
    },
  });

  // Create sample listings
  const listings = [
    {
      title: 'BMW M4 Competition 2022',
      price: 84900,
      brand: 'BMW',
      model: 'M4 Competition',
      year: 2022,
      bodyType: 'COUPE',
      color: 'Alpine White',
      mileage: 12450,
      fuelType: 'GASOLINE',
      transmission: 'AUTOMATIC',
      condition: 'EXCELLENT',
      engineSize: '3.0L',
      horsepower: 503,
      driveType: 'RWD',
      interior: 'Leather',
      features: JSON.stringify(['Navigation', 'Heated Seats', 'Premium Audio', 'Sunroof']),
      description: 'Stunning BMW M4 Competition with low miles. Fully loaded with premium features.',
      images: JSON.stringify(['https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800']),
      sellerId: user1.id,
      sellerType: 'USED',
      owner: 'PRIVATE',
    },
    {
      title: 'Porsche 911 Carrera S 2021',
      price: 112500,
      brand: 'Porsche',
      model: '911 Carrera S',
      year: 2021,
      bodyType: 'COUPE',
      color: 'Guards Red',
      mileage: 8200,
      fuelType: 'GASOLINE',
      transmission: 'AUTOMATIC',
      condition: 'EXCELLENT',
      engineSize: '3.0L',
      horsepower: 444,
      driveType: 'RWD',
      interior: 'Leather',
      features: JSON.stringify(['PDK Transmission', 'Sport Chrono', 'BOSE Audio', 'Adaptive Suspension']),
      description: 'Beautiful Porsche 911 Carrera S in excellent condition with full service history.',
      images: JSON.stringify(['https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800']),
      sellerId: user1.id,
      sellerType: 'USED',
      owner: 'PRIVATE',
    },
    {
      title: 'Audi RS e-tron GT 2024',
      price: 147000,
      brand: 'Audi',
      model: 'RS e-tron GT',
      year: 2024,
      bodyType: 'SEDAN',
      color: 'Mythos Black',
      mileage: 249,
      fuelType: 'ELECTRIC',
      transmission: 'AUTOMATIC',
      condition: 'EXCELLENT',
      engineSize: 'Electric',
      horsepower: 469,
      driveType: 'AWD',
      interior: 'Premium Leather',
      features: JSON.stringify(['Virtual Cockpit', 'Matrix LED', 'Air Suspension', 'Wireless Charging']),
      description: 'Brand new Audi RS e-tron GT with all-wheel drive and premium features.',
      images: JSON.stringify(['https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?w=800']),
      sellerId: user2.id,
      sellerType: 'NEW',
      owner: 'DEALER',
    },
    {
      title: 'Mercedes-Benz G-Class G63 2023',
      price: 198000,
      brand: 'Mercedes-Benz',
      model: 'G-Class G63',
      year: 2023,
      bodyType: 'SUV',
      color: 'Obsidian Black',
      mileage: 1100,
      fuelType: 'GASOLINE',
      transmission: 'AUTOMATIC',
      condition: 'EXCELLENT',
      engineSize: '4.0L V8',
      horsepower: 577,
      driveType: 'AWD',
      interior: 'Nappa Leather',
      features: JSON.stringify(['Off-Road Package', 'Air Suspension', 'Burmester Audio', '360 Camera']),
      description: 'Luxurious Mercedes G-Wagon with premium off-road capabilities.',
      images: JSON.stringify(['https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800']),
      sellerId: user2.id,
      sellerType: 'NEW',
      owner: 'DEALER',
    },
    {
      title: 'Tesla Model 3 Performance 2023',
      price: 58990,
      brand: 'Tesla',
      model: 'Model 3 Performance',
      year: 2023,
      bodyType: 'SEDAN',
      color: 'Pearl White',
      mileage: 5200,
      fuelType: 'ELECTRIC',
      transmission: 'AUTOMATIC',
      condition: 'GOOD',
      engineSize: 'Electric',
      horsepower: 456,
      driveType: 'RWD',
      interior: 'Vegan Leather',
      features: JSON.stringify(['Autopilot', 'Supercharger Access', 'Glass Roof', 'Premium Audio']),
      description: 'High-performance Tesla Model 3 with excellent range and features.',
      images: JSON.stringify(['https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800']),
      sellerId: user1.id,
      sellerType: 'USED',
      owner: 'PRIVATE',
    },
  ];

  for (const listing of listings) {
    await prisma.listing.create({
      data: listing,
    });
  }

  console.log('Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });