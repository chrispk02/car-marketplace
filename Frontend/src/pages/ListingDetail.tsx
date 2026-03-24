import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Car } from '../types';
import { API_BASE_URL } from '../constants';

const LeadFormModal = ({ car, onClose, onSuccess }: { car: Car; onClose: () => void; onSuccess: () => void }) => {
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

export default function ListingDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState<Car | null>(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/listings/${id}`);
        setCar(res.data);
      } catch {
        alert('Không tìm thấy xe');
        navigate('/');
      } finally {
        setLoading(false);
      }
    };
    fetchCar();
  }, [id, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl font-bold">Đang tải...</p>
      </div>
    );
  }

  if (!car) return null;

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-6">
        {/* Hero Images */}
        <div className="grid grid-cols-4 gap-4 mb-12">
          <img src={car.image || car.images?.[0]} alt={car.title} className="col-span-3 h-96 object-cover rounded-[2rem]" />
          <div className="grid grid-cols-2 gap-4">
            {(car.images || [car.image]).slice(1, 5).map((img, idx) => (
              <img key={idx} src={img} alt={`View ${idx + 2}`} className="h-44 object-cover rounded-2xl" />
            ))}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-12">
          {/* Details */}
          <div className="col-span-2">
            <div className="bg-white rounded-[2rem] p-10 border border-gray-100 mb-8">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <p className="text-sm font-black text-gray-400 uppercase tracking-widest mb-2">
                    {car.brand} {car.model} • {car.year}
                  </p>
                  <h1 className="text-4xl font-black text-primary italic mb-4">{car.title}</h1>
                  <p className="text-4xl font-black text-primary">
                    {car.price.toLocaleString('vi-VN')} VNĐ
                  </p>
                </div>
                <div className="text-right">
                  <span className="inline-block px-4 py-2 bg-primary text-white rounded-full font-bold text-sm">
                    {car.sellerType === 'NEW' ? 'Xe Mới' : 'Xe Lướt'}
                  </span>
                </div>
              </div>

              <div className="border-t border-gray-100 pt-8 grid grid-cols-2 gap-8">
                <div>
                  <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Năm sản xuất</p>
                  <p className="text-xl font-black text-gray-900">{car.year}</p>
                </div>
                <div>
                  <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Quãng đường</p>
                  <p className="text-xl font-black text-gray-900">{car.mileage.toLocaleString()} km</p>
                </div>
                <div>
                  <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Loại xe</p>
                  <p className="text-xl font-black text-gray-900">{car.bodyType}</p>
                </div>
                <div>
                  <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Tình trạng</p>
                  <p className="text-xl font-black text-gray-900">
                    {car.status === 'APPROVED' ? '✓ Đã phê duyệt' : 'Chờ phê duyệt'}
                  </p>
                </div>
              </div>

              {car.description && (
                <div className="mt-8 pt-8 border-t border-gray-100">
                  <h3 className="text-lg font-black mb-4">Mô tả</h3>
                  <p className="text-gray-600 leading-relaxed">{car.description}</p>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="col-span-1">
            <div className="bg-white rounded-[2rem] p-8 border border-gray-100 sticky top-32">
              <button
                onClick={() => setShowModal(true)}
                className="w-full bg-gradient-to-r from-primary to-secondary text-white font-black py-6 rounded-2xl shadow-xl hover:brightness-110 active:scale-95 transition-all uppercase tracking-[0.2em] text-sm mb-4"
              >
                Yêu Cầu Tư Vấn
              </button>
              <button className="w-full border-2 border-primary text-primary font-black py-6 rounded-2xl hover:bg-primary hover:text-white transition-all uppercase tracking-[0.2em] text-sm">
                Lưu Xe Yêu Thích
              </button>
              <div className="mt-8 pt-8 border-t border-gray-100">
                <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Liên hệ người bán</p>
                <p className="text-lg font-black text-gray-900 mb-4">Qua hệ thống Admin</p>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Để bảo vệ quyền riêng tư, số điện thoại và email không được hiển thị công khai. Hãy gửi yêu cầu tư vấn
                  để admin xử lý.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showModal && <LeadFormModal car={car} onClose={() => setShowModal(false)} onSuccess={() => setShowModal(false)} />}
    </div>
  );
}
