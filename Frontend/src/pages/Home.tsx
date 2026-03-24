import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../constants';

const LeadFormModal = ({ car, onClose, onSuccess }: { car: any; onClose: () => void; onSuccess: () => void }) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const fd = new FormData(e.currentTarget);
    try {
      await axios.post(`${API_BASE_URL}/leads`, {
        listingId: car.id,
        buyerName: fd.get('name'),
        phone: fd.get('phone'),
        budget: Number(fd.get('budget')),
      });
      setSuccess(true);
      setTimeout(() => {
        onSuccess();
        onClose();
      }, 2000);
    } catch (err) {
      alert('Lỗi kết nối server!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="bg-white rounded-[2.5rem] p-10 max-w-md w-full shadow-2xl relative animate-in fade-in zoom-in duration-300 border border-gray-100">
        <button onClick={onClose} className="absolute top-6 right-8 text-gray-300 hover:text-primary text-3xl font-light">
          ×
        </button>

        {success ? (
          <div className="text-center py-10">
            <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
              ✓
            </div>
            <h3 className="text-2xl font-black text-primary mb-2 italic">GỬI THÀNH CÔNG</h3>
            <p className="text-gray-500 font-medium">
              Admin sẽ liên hệ báo giá chiếc <span className="text-primary font-bold">{car.title}</span>
            </p>
          </div>
        ) : (
          <>
            <h3 className="text-2xl font-black text-primary mb-1 uppercase tracking-tighter italic">
              Yêu Cầu Tư Vấn
            </h3>
            <p className="text-gray-400 mb-8 text-[11px] font-black uppercase tracking-widest">Xe: {car.title}</p>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-black text-gray-400 uppercase ml-2">Họ và tên</label>
                <input
                  name="name"
                  required
                  className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none font-bold text-sm focus:ring-2 focus:ring-primary transition-all"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-black text-gray-400 uppercase ml-2">Số điện thoại</label>
                <input
                  name="phone"
                  required
                  className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none font-bold text-sm focus:ring-2 focus:ring-primary transition-all"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-black text-gray-400 uppercase ml-2">Ngân sách (VNĐ)</label>
                <input
                  name="budget"
                  type="number"
                  className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none font-bold text-sm focus:ring-2 focus:ring-primary transition-all"
                />
              </div>
              <button
                disabled={loading}
                className="primary-gradient text-white font-black py-5 rounded-2xl shadow-xl hover:brightness-110 active:scale-95 transition-all mt-6 uppercase tracking-[0.2em] text-[10px]"
              >
                {loading ? 'ĐANG XỬ LÝ...' : 'GỬI YÊU CẦU'}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

const Hero = ({ onSearch }: { onSearch: (f: any) => void }) => {
  const [filters, setFilters] = useState({ type: 'ALL', make: 'All Makes' });

  return (
    <section className="relative h-[850px] w-full flex items-center justify-center px-6 overflow-hidden pt-16">
      <div className="absolute inset-0 z-0">
        <img alt="Hero" className="w-full h-full object-cover scale-105" src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=2070" />
        <div className="absolute inset-0 bg-black/40"></div>
      </div>
      <div className="relative z-10 w-full max-w-5xl text-center">
        <h1 className="text-white text-6xl md:text-8xl font-black tracking-tighter mb-8 leading-none italic uppercase">
          FIND YOUR <span className="text-purple-300">MOMENTUM</span>
        </h1>
        <div className="bg-white rounded-[2.5rem] shadow-[0_32px_64px_-12px_rgba(0,0,0,0.2)] overflow-hidden text-left max-w-5xl mx-auto">
          <div className="flex bg-gray-50/50 border-b">
            <button className="flex-1 py-7 text-xs font-black border-b-4 border-primary text-primary uppercase tracking-[0.2em]">
              Shop Buy
            </button>
            <button className="flex-1 py-7 text-xs font-black text-gray-400 uppercase tracking-[0.2em] hover:bg-gray-100 transition-colors">
              Sell
            </button>
            <button className="flex-1 py-7 text-xs font-black text-gray-400 uppercase tracking-[0.2em] hover:bg-gray-100 transition-colors">
              Service
            </button>
          </div>
          <div className="p-10 grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="flex flex-col gap-3">
              <label className="text-[10px] font-black uppercase text-gray-400 tracking-[0.3em] ml-1">Seller Type</label>
              <select onChange={(e) => setFilters({...filters, type: e.target.value})} className="bg-gray-50 border border-gray-100 p-4 rounded-2xl text-sm font-bold outline-none appearance-none cursor-pointer hover:border-primary transition-colors">
                <option value="ALL">New & Used</option>
                <option value="NEW">Xe Mới (New)</option>
                <option value="USED">Xe Lướt (Used)</option>
              </select>
            </div>
            <div className="flex flex-col gap-3">
              <label className="text-[10px] font-black uppercase text-gray-400 tracking-[0.3em] ml-1">Make</label>
              <select onChange={(e) => setFilters({...filters, make: e.target.value})} className="bg-gray-50 border border-gray-100 p-4 rounded-2xl text-sm font-bold outline-none appearance-none cursor-pointer hover:border-primary transition-colors">
                <option>All Makes</option><option>Porsche</option><option>BMW</option><option>Mercedes</option>
              </select>
            </div>
            <div className="flex flex-col gap-3">
              <label className="text-[10px] font-black uppercase text-gray-400 tracking-[0.3em] ml-1">Max Price</label>
              <select className="bg-gray-50 border border-gray-100 p-4 rounded-2xl text-sm font-bold outline-none appearance-none">
                <option>No Max</option><option>$100,000</option><option>$200,000</option>
              </select>
            </div>
            <div className="flex flex-col justify-end">
              <button onClick={() => onSearch(filters)} className="primary-gradient text-white font-black py-5 rounded-2xl shadow-xl hover:brightness-110 active:scale-95 transition-all text-[10px] uppercase tracking-[0.3em]">
                Search Listings
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const FeaturedCurations = ({ onSelectCar }: { onSelectCar: (car: any) => void }) => {
  const [cars, setCars] = useState<any[]>([]);

  useEffect(() => {
    setCars([
      { id: '1', title: 'BMW M4 Competition', year: 2022, type: 'USED', price: '$84,900', mileage: '12,450 mi', location: 'My Dinh', badge: 'Great Deal', image: 'https://images.unsplash.com/photo-1617531653332-bd46c24f2068?auto=format&fit=crop&q=80&w=1000' },
      { id: '2', title: 'Porsche 911 Carrera', year: 2021, type: 'USED', price: '$112,500', mileage: '8,200 mi', location: 'Dong Da', badge: 'Newly Listed', badgeColor: 'bg-secondary', image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=1000' },
      { id: '3', title: 'Audi RS e-tron GT', year: 2024, type: 'NEW', price: '$147,000', mileage: '249 mi', location: 'Thanh Xuan', badge: 'New Car', image: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&q=80&w=1000' },
      { id: '4', title: 'Mercedes-AMG G63', year: 2023, type: 'NEW', price: '$198,000', mileage: '1,100 mi', location: 'Cau Giay', badge: 'Premium', badgeColor: 'bg-gray-900', image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80&w=1000' }
    ]);
  }, []);

  return (
    <section className="bg-white py-32 px-6">
      <div className="max-w-[1440px] mx-auto">
        <div className="flex justify-between items-end mb-16">
          <div>
            <h2 className="text-4xl font-black text-primary tracking-tight uppercase italic">FEATURED CURATIONS</h2>
            <div className="h-2 w-24 bg-secondary mt-4 rounded-full"></div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {cars.map((car) => (
            <div key={car.id} className="bg-white rounded-[2rem] overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] group hover:shadow-[0_32px_64px_rgba(0,0,0,0.08)] transition-all duration-700 border border-gray-50 flex flex-col">
              <div className="relative h-72 overflow-hidden">
                <img alt={car.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" src={car.image} />
                <div className={`absolute top-6 left-6 text-white text-[9px] font-black px-5 py-2 rounded-full tracking-[0.2em] uppercase shadow-lg ${car.badgeColor || "bg-primary"}`}>
                  {car.badge}
                </div>
              </div>
              <div className="p-8 flex-1 flex flex-col">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-3">{car.type === 'NEW' ? 'Xe Mới' : 'Xe Lướt'} • {car.year}</p>
                <h3 className="text-xl font-black text-on-surface mb-8 truncate italic">{car.title}</h3>
                <div className="flex flex-col gap-4 mb-10 border-l-2 border-gray-100 pl-4">
                  <div className="flex justify-between text-xs"><span className="text-gray-400 font-bold uppercase tracking-widest">Mileage</span><span className="font-black text-primary">{car.mileage}</span></div>
                  <div className="flex justify-between text-xs"><span className="text-gray-400 font-bold uppercase tracking-widest">Location</span><span className="font-black text-primary">{car.location}</span></div>
                </div>
                <div className="flex items-center justify-between mt-auto pt-8 border-t border-gray-100">
                  <span className="text-2xl font-black text-primary">{car.price}</span>
                  <button onClick={() => onSelectCar(car)} className="primary-gradient text-white p-4 rounded-2xl hover:scale-110 transition-all shadow-xl shadow-primary/20">
                    <span className="text-xl">🛒</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default function Home() {
  const navigate = useNavigate();
  const [selectedCar, setSelectedCar] = useState<any | null>(null);

  const handleSearch = (f: any) => {
    console.log("Searching with filters:", f);
  };

  const handleSelectCar = (car: any) => {
    setSelectedCar(car);
  };

  return (
    <main>
      <Hero onSearch={handleSearch} />
      
      {/* Browse Section */}
      <section className="py-32 px-6 max-w-[1440px] mx-auto overflow-hidden">
        <div className="mb-16">
          <h2 className="text-4xl font-black text-primary tracking-tight uppercase italic">BROWSE BY BODY</h2>
          <div className="h-2 w-24 bg-secondary mt-4 rounded-full"></div>
        </div>
        <div className="flex overflow-x-auto gap-8 pb-10 no-scrollbar scroll-smooth">
          {['SUV', 'Sedan', 'Pickup', 'Coupe', 'Hatchback', 'Luxury'].map((label, idx) => (
            <a key={idx} className="flex-shrink-0 group flex flex-col items-center gap-8 p-14 rounded-[3rem] bg-white hover:bg-primary transition-all duration-700 w-64 shadow-[0_8px_30px_rgb(0,0,0,0.02)] border border-gray-50" href="#featured">
              <span className="text-6xl">🚗</span>
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 group-hover:text-white transition-colors">{label}</span>
            </a>
          ))}
        </div>
      </section>

      <FeaturedCurations onSelectCar={handleSelectCar} />

      {/* Marketing Banners */}
      <section className="py-32 px-6 max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="relative overflow-hidden rounded-[4rem] bg-primary p-16 text-white group flex flex-col md:flex-row items-center gap-12 shadow-2xl">
          <div className="relative z-10 flex-1">
            <h2 className="text-5xl font-black mb-8 uppercase italic tracking-tighter leading-[0.9]">THE EASIEST WAY TO SELL.</h2>
            <button onClick={() => navigate('/signup')} className="bg-white text-primary font-black px-14 py-6 rounded-2xl shadow-2xl uppercase tracking-widest text-[10px] hover:scale-105 transition-transform">Get Started</button>
          </div>
          <span className="text-[240px] text-white/10 rotate-12 group-hover:scale-110 transition-all duration-1000">📱</span>
        </div>
        <div className="relative overflow-hidden rounded-[4rem] bg-white border border-gray-100 p-16 group flex flex-col md:flex-row items-center gap-12 shadow-[0_32px_64px_rgba(0,0,0,0.04)] hover:shadow-2xl transition-all duration-700">
          <div className="relative z-10 flex-1">
            <h2 className="text-5xl font-black mb-8 text-primary uppercase italic tracking-tighter leading-[0.9]">KNOW YOUR SCORE.</h2>
            <button className="bg-primary text-white font-black px-14 py-6 rounded-2xl shadow-2xl uppercase tracking-widest text-[10px] hover:scale-105 transition-transform">Check Now</button>
          </div>
          <span className="text-[240px] text-primary/5 -rotate-12 group-hover:scale-110 transition-all duration-1000">⭐</span>
        </div>
      </section>

      {selectedCar && (
        <LeadFormModal 
          car={selectedCar} 
          onClose={() => setSelectedCar(null)} 
          onSuccess={() => setSelectedCar(null)}
        />
      )}
    </main>
  );
}