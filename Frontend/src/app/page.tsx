'use client';
import { useState } from 'react';
import { Search, MapPin, Calendar, Gauge, Heart, MessageSquare } from 'lucide-react';

const cars = [
  {
    id: 1,
    name: '2023 Mercedes-Benz G63 AMG',
    price: '1,500 万円',
    mileage: '15,000 km',
    location: 'Saitama',
    img: 'https://images.unsplash.com/photo-1520031441872-265e4ff70366?q=80&w=800&auto=format&fit=crop', // Ảnh G-Wagon
  },
  {
    id: 2,
    name: '2022 Land Rover Range Rover SV',
    price: '1,280 万円',
    mileage: '28,000 km',
    location: 'Kanagawa',
    img: 'https://images.unsplash.com/photo-1606214510006-2581699f57c1?q=80&w=800&auto=format&fit=crop', // Ảnh Range Rover
  },
  {
    id: 3,
    name: '2024 Porsche 911 Carrera S',
    price: '1,350 万円',
    mileage: '5,000 km',
    location: 'Tokyo',
    img: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=800&auto=format&fit=crop', // Ảnh Porsche
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-[#f1f4f8]">
      {/* 1. Header (Thanh điều hướng) */}
      <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-[#8c52ff] rounded-lg">
              <span className="font-bold text-white text-xl">C</span>
            </div>
            <h1 className="text-2xl font-extrabold text-[#0b1c3c]">CARBROKER <span className="text-[#8c52ff]">PRO</span></h1>
          </div>
          <div className="flex items-center gap-6 text-sm font-semibold text-[#0b1c3c]">
            <span className="cursor-pointer hover:text-[#8c52ff]">Mua xe</span>
            <span className="cursor-pointer hover:text-[#8c52ff]">Tin tức</span>
            <span className="cursor-pointer hover:text-[#8c52ff]">Về chúng tôi</span>
          </div>
          <div className="flex gap-3">
            <button className="text-sm font-semibold text-[#0b1c3c]">Log in</button>
            <button className="bg-[#8c52ff] text-white px-5 py-2 rounded-full font-bold text-sm hover:bg-[#7a41eb]">Đăng ký ngay</button>
          </div>
        </div>
      </nav>

      {/* 2. Hero Section (Banner lớn giống Cars.com) */}
      <section className="bg-[#0b1c3c] py-20 px-6 text-center text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/dark-dot-grid.png')]"></div>
        <div className="relative z-10 max-w-4xl mx-auto">
          <h2 className="text-5xl font-extrabold leading-tight mb-6">Nền tảng Môi giới Xe <span className="text-[#8c52ff]">Bảo mật</span> Số 1</h2>
          <p className="text-lg text-gray-300 mb-10 max-w-2xl mx-auto">Kết nối trực tiếp với Admin để đảm bảo giao dịch an toàn và minh bạch tuyệt đối.</p>
          
          {/* Thanh tìm kiếm (Hình khối nổi bật) */}
          <div className="max-w-3xl mx-auto bg-white p-4 rounded-full shadow-2xl flex flex-col md:flex-row gap-2 items-center">
            <input type="text" placeholder="Thương hiệu, Model xe..." className="flex-grow p-4 rounded-full border-none outline-none text-gray-800 font-medium" />
            <div className="flex gap-2">
                <input type="text" placeholder="Địa điểm" className="w-40 p-4 rounded-full border border-gray-100 outline-none text-gray-800" />
                <button className="bg-[#8c52ff] text-white p-4 rounded-full font-bold flex items-center justify-center gap-2 hover:bg-[#7a41eb] px-8">
                    <Search size={22} /> Tìm kiếm
                </button>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Car Listing (Danh sách xe dạng hình khối) */}
      <main className="max-w-7xl mx-auto px-6 py-16">
        <div className="flex justify-between items-center mb-10">
          <h3 className="text-3xl font-bold text-[#0b1c3c]">Danh sách xe nổi bật</h3>
          <span className="text-gray-600 font-medium">{cars.length} kết quả tìm thấy</span>
        </div>

        {/* Đây là Grid tạo ra các hình khối xếp cạnh nhau */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cars.map((car) => (
            <div key={car.id} className="bg-white rounded-3xl shadow-lg overflow-hidden border border-gray-100 group hover:shadow-2xl transition-all duration-300">
              <div className="relative h-60">
                <img src={car.img} alt={car.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute top-4 left-4 bg-white/90 px-3 py-1 rounded-full text-xs font-bold text-[#8c52ff] flex items-center gap-1.5 shadow-sm">
                  <Heart size={14} className="fill-[#8c52ff]" /> Verified Broker
                </div>
                <button className="absolute top-4 right-4 bg-white/70 p-2.5 rounded-full hover:bg-white text-gray-700">
                  <Heart size={18} />
                </button>
              </div>
              
              <div className="p-7">
                <h4 className="text-xl font-bold text-[#0b1c3c] mb-5 group-hover:text-[#8c52ff] cursor-pointer truncate">{car.name}</h4>
                
                <div className="grid grid-cols-2 gap-x-4 gap-y-3 text-sm text-gray-600 mb-7 border-t border-gray-100 pt-5">
                  <div className="flex items-center gap-2"><Calendar size={17} className="text-[#8c52ff]/70" /> {car.mileage.split(' ')[0]}</div>
                  <div className="flex items-center gap-2"><Gauge size={17} className="text-[#8c52ff]/70" /> {car.mileage}</div>
                  <div className="flex items-center gap-2"><MapPin size={17} className="text-[#8c52ff]/70" /> {car.location}</div>
                </div>

                <div className="border-t border-gray-100 pt-5 flex items-center justify-between">
                  <p className="text-2xl font-extrabold text-[#0b1c3c]">{car.price}</p>
                  <button className="bg-white border-2 border-[#8c52ff] text-[#8c52ff] p-3 rounded-xl font-bold flex items-center justify-center hover:bg-[#8c52ff] hover:text-white transition-colors">
                    <MessageSquare size={19} />
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