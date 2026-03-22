'use client';
import { useState } from 'react';
import { Search, ChevronDown, MapPin, Calendar, Heart } from 'lucide-react';

export default function Home() {
  const [carType, setCarType] = useState('new'); // 'new' or 'used'

  return (
    <div className="min-h-screen bg-white text-black font-sans">
      
      {/* 1. HEADER (Thanh điều hướng) - Y hệt thiết kế */}
      <nav className="bg-white sticky top-0 z-50">
        <div className="max-w-[1400px] mx-auto px-10 py-5 flex items-center justify-between">
          {/* Logo */}
          <h1 className="text-3xl font-black tracking-tighter text-black">CARBROKER PRO</h1>
          
          {/* Menu */}
          <div className="flex items-center gap-12 text-xl font-bold">
            <span className="cursor-pointer hover:text-blue-700">Mua xe</span>
            <span className="cursor-pointer hover:text-blue-700">Tin tức</span>
            <span className="cursor-pointer hover:text-blue-700">Tài chính</span>
          </div>
          
          {/* Tài khoản */}
          <div className="flex items-center gap-2 text-xl font-bold cursor-pointer hover:text-blue-700">
            <span>Tài khoản</span>
          </div>
        </div>
      </nav>

      {/* 2. HERO SECTION (Banner lớn với Form tìm kiếm) */}
      <section className="relative w-full h-[600px] bg-gray-900 overflow-hidden">
        {/* Hình ảnh nền kép y như thiết kế */}
        <img 
          src="LINK_ANH_BANNER_CUA_BAN_CUA_BAN_Ở_ĐÂY" // <--- THAY LINK ẢNH TOYOTA VÀO ĐÂY
          alt="Toyota Banner"
          className="w-full h-full object-cover"
        />
        
        {/* Lớp phủ mờ (Overlay) */}
        <div className="absolute inset-0 bg-black/10"></div>

        {/* Form Tìm kiếm (Hình khối nổi) - Y hệt thiết kế */}
        <div className="absolute top-1/2 left-20 -translate-y-1/2 bg-white/95 p-8 rounded-3xl shadow-2xl w-[380px] backdrop-blur-sm">
          <h2 className="text-2xl font-extrabold text-black mb-6">Tìm kiếm</h2>
          
          {/* Switch Mua/Bán */}
          <div className="flex gap-4 border-b mb-6 pb-2 text-base font-semibold text-gray-600">
            <span 
              className={`cursor-pointer pb-2 ${carType === 'new' ? 'text-blue-700 border-b-2 border-blue-700 font-bold' : ''}`}
              onClick={() => setCarType('new')}
            >
              Cửa hàng bán ôtô
            </span>
            <span 
              className={`cursor-pointer pb-2 ${carType === 'used' ? 'text-blue-700 border-b-2 border-blue-700 font-bold' : ''}`}
              onClick={() => setCarType('used')}
            >
              Bán xe của bạn
            </span>
          </div>

          <p className="text-sm text-gray-500 mb-5">Hãy nói cho chúng tôi biết</p>
          
          {/* Form Inputs (Hình khối Select) */}
          <div className="space-y-4">
            {[
              { label: 'Tình trạng', value: 'Xe mới' },
              { label: 'Thương hiệu', value: 'Toyota' },
              { label: 'Model', value: 'Camry' },
              { label: 'Số Km', value: '5000 km' },
            ].map((item, index) => (
              <div key={index} className="relative border border-gray-200 rounded-xl p-4 flex items-center justify-between cursor-pointer hover:border-gray-300">
                <div>
                  <p className="text-xs text-gray-400 font-medium">{item.label}</p>
                  <p className="text-base font-bold text-black">{item.value}</p>
                </div>
                <ChevronDown size={20} className="text-gray-400" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. NEWS SECTION (Tin tức) - Y hệt thiết kế */}
      <main className="max-w-[1400px] mx-auto px-10 py-16">
        
        {/* Thẻ Tin tức (News Card) */}
        <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-10 flex items-center justify-between gap-10 hover:shadow-xl transition-shadow cursor-pointer">
          <div className="flex-grow space-y-3">
            <p className="text-sm font-semibold text-gray-500">Carbrokerpro.com</p>
            <h3 className="text-2xl font-extrabold text-black leading-tight">
              Dịch vụ tìm kiếm xe tốt nhất năm 2026
            </h3>
          </div>
          
          {/* Hình ảnh tin tức (Camry xám) */}
          <div className="w-[450px] h-[220px] rounded-2xl overflow-hidden shadow-md flex-shrink-0">
            <img 
              src="https://images.unsplash.com/photo-1580273916550-e323be2ae537?q=80&w=800&auto=format&fit=crop" // Ảnh xe Camry xám
              alt="Toyota Camry 2026"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        
      </main>
    </div>
  );
}