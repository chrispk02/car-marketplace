'use client';
import { useState } from 'react';
import { Heart, MapPin, Calendar, Gauge, MessageSquare, Car, ShieldCheck } from 'lucide-react';

const carsData = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1617469767053-d3b523a0b9f1?q=80&w=800&auto=format&fit=crop',
    title: 'Mercedes-Benz G63 AMG',
    year: 2023,
    km: '15,000',
    location: 'Saitama',
    price: '1,500',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1599912027611-484b9fc4d7af?q=80&w=800&auto=format&fit=crop',
    title: 'Range Rover SV',
    year: 2022,
    km: '28,000',
    location: 'Kanagawa',
    price: '1,280',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1632516643720-e7f5d7d6ecc9?q=80&w=800&auto=format&fit=crop',
    title: 'BMW M8 Competition',
    year: 2023,
    km: '9,500',
    location: 'Tokyo',
    price: '1,350',
  }
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Navigation */}
      <nav className="bg-white border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-12">
            <h1 className="text-2xl font-black italic text-blue-700 tracking-tighter">CARBROKER PRO</h1>
            <div className="hidden md:flex gap-8 text-sm font-bold text-gray-500 uppercase tracking-widest">
              <a href="#" className="hover:text-blue-600 transition">Mua xe</a>
              <a href="#" className="hover:text-blue-600 transition">Tin tức</a>
              <a href="#" className="hover:text-blue-600 transition">Về chúng tôi</a>
            </div>
          </div>
          <div className="flex gap-4">
            <button className="px-6 py-2.5 text-sm font-bold text-gray-700 hover:bg-gray-50 rounded-full transition">Log in</button>
            <button className="px-6 py-2.5 bg-blue-600 text-white text-sm font-bold rounded-full shadow-lg shadow-blue-200 hover:bg-blue-700 transition">Đăng ký ngay</button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="py-16 px-6 max-w-7xl mx-auto">
        <div className="bg-blue-700 rounded-[2.5rem] p-12 text-white flex flex-col items-center text-center relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl"></div>
          <ShieldCheck className="w-12 h-12 mb-6 text-blue-300" />
          <h2 className="text-4xl md:text-5xl font-black mb-4">Nền tảng Môi giới Xe Bảo mật</h2>
          <p className="text-blue-100 max-w-xl text-lg opacity-90">Kết nối trực tiếp với Admin để đảm bảo giao dịch an toàn và minh bạch tuyệt đối.</p>
        </div>
      </header>

      {/* Listings */}
      <main className="max-w-7xl mx-auto px-6 pb-24">
        <div className="flex items-baseline justify-between mb-12">
          <h3 className="text-3xl font-black text-gray-900 tracking-tight">Danh sách xe nổi bật</h3>
          <span className="text-gray-400 font-medium">{carsData.length} kết quả tìm thấy</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {carsData.map((car) => (
            <div key={car.id} className="group bg-white rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 overflow-hidden">
              {/* Image Area */}
              <div className="relative aspect-[16/10] overflow-hidden">
                <img src={car.image} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] font-black text-blue-700 uppercase tracking-widest shadow-sm">
                  Verified Broker
                </div>
                <button className="absolute top-4 right-4 p-2.5 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white hover:text-red-500 transition-all shadow-lg">
                  <Heart className="w-5 h-5" />
                </button>
              </div>

              {/* Content Area */}
              <div className="p-8">
                <h4 className="text-xl font-black text-gray-900 mb-6 truncate">{car.title}</h4>
                
                <div className="grid grid-cols-2 gap-y-4 gap-x-2 mb-8 border-b border-gray-50 pb-8">
                  <div className="flex items-center gap-3 text-gray-500">
                    <Calendar className="w-4 h-4 text-blue-500" />
                    <span className="text-sm font-bold">{car.year}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-500">
                    <Gauge className="w-4 h-4 text-blue-500" />
                    <span className="text-sm font-bold">{car.km} km</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-500">
                    <MapPin className="w-4 h-4 text-blue-500" />
                    <span className="text-sm font-bold">{car.location}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-gray-400 text-[10px] font-black uppercase tracking-widest block mb-1">Giá chào bán</span>
                    <span className="text-3xl font-black text-gray-950 tracking-tighter">{car.price} <span className="text-lg font-bold">万円</span></span>
                  </div>
                  <button className="p-4 bg-gray-950 text-white rounded-2xl hover:bg-blue-600 transition-colors shadow-xl group-hover:scale-110 duration-300">
                    <MessageSquare className="w-6 h-6" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}