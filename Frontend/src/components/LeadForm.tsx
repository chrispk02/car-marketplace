import { useState } from 'react';
import axios from 'axios';

// Frontend/src/components/LeadForm.tsx
export default function LeadForm({ listingId }: { listingId: string }) {
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    const payload = {
      listingId,
      buyerName: e.target.name.value,
      phone: e.target.phone.value,
      budget: Number(e.target.budget.value),
    };
    try {
      await axios.post('http://localhost:3000/leads', payload);
      alert('Yêu cầu đã gửi tới Admin. Chúng tôi sẽ gọi bạn trong 5 phút!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="bg-gray-100 p-6 rounded-xl border-2 border-blue-400">
      <h2 className="text-xl font-bold mb-4">Bạn quan tâm chiếc xe này?</h2>
      <input name="name" placeholder="Họ tên" className="w-full p-2 mb-3 border rounded" required />
      <input name="phone" placeholder="Số điện thoại" className="w-full p-2 mb-3 border rounded" required />
      <input name="budget" type="number" placeholder="Ngân sách dự kiến (đ)" className="w-full p-2 mb-4 border rounded" />
      <button disabled={loading} className="w-full bg-red-600 text-white font-bold py-3 rounded uppercase">
        {loading ? 'Đang gửi...' : 'Đăng ký tư vấn ngay'}
      </button>
    </form>
  );
}