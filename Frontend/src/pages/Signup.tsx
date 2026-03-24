import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authService } from '../lib/authService';

export default function SignUp() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [role, setRole] = useState<'BUYER' | 'SELLER'>('BUYER');
  const [sellerType, setSellerType] = useState<'NEW' | 'USED'>('NEW');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError('Mật khẩu không khớp');
      return;
    }

    if (formData.password.length < 6) {
      setError('Mật khẩu phải ít nhất 6 ký tự');
      return;
    }

    setLoading(true);

    try {
      await authService.signUp({
        email: formData.email,
        password: formData.password,
        name: formData.name,
        role,
        sellerType: role === 'SELLER' ? sellerType : undefined,
      });
      navigate('/');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Đăng ký thất bại');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-white to-secondary/10 flex items-center justify-center px-6 pt-24 pb-12">
      <div className="w-full max-w-md bg-white rounded-[2.5rem] shadow-xl p-10 border border-gray-100">
        <h1 className="text-3xl font-black text-primary mb-2 italic uppercase tracking-tighter">
 Đăng Ký
        </h1>
        <p className="text-gray-500 text-sm mb-8">Tạo tài khoản của bạn</p>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-2xl text-red-600 text-sm font-bold">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Role Selection */}
          <div>
            <label className="block text-xs font-black text-gray-400 uppercase mb-3 ml-1 tracking-widest">
              Vai Trò
            </label>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setRole('BUYER')}
                className={`flex-1 py-3 rounded-2xl font-bold text-sm transition-all border-2 ${
                  role === 'BUYER'
                    ? 'bg-primary text-white border-primary'
                    : 'bg-gray-50 text-gray-600 border-gray-200 hover:border-primary'
                }`}
              >
                Người Mua
              </button>
              <button
                type="button"
                onClick={() => setRole('SELLER')}
                className={`flex-1 py-3 rounded-2xl font-bold text-sm transition-all border-2 ${
                  role === 'SELLER'
                    ? 'bg-primary text-white border-primary'
                    : 'bg-gray-50 text-gray-600 border-gray-200 hover:border-primary'
                }`}
              >
                Người Bán
              </button>
            </div>
          </div>

          {/* Seller Type Selection */}
          {role === 'SELLER' && (
            <div>
              <label className="block text-xs font-black text-gray-400 uppercase mb-3 ml-1 tracking-widest">
                Loại Xe
              </label>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setSellerType('USED')}
                  className={`flex-1 py-3 rounded-2xl font-bold text-sm transition-all border-2 ${
                    sellerType === 'USED'
                      ? 'bg-primary text-white border-primary'
                      : 'bg-gray-50 text-gray-600 border-gray-200'
                  }`}
                >
                  Xe Lướt
                </button>
                <button
                  type="button"
                  onClick={() => setSellerType('NEW')}
                  className={`flex-1 py-3 rounded-2xl font-bold text-sm transition-all border-2 ${
                    sellerType === 'NEW'
                      ? 'bg-primary text-white border-primary'
                      : 'bg-gray-50 text-gray-600 border-gray-200'
                  }`}
                >
                  Xe Mới
                </button>
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-black text-gray-400 uppercase mb-2 ml-1 tracking-widest">
              Họ Tên
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none font-bold text-sm focus:ring-2 focus:ring-primary transition-all"
              placeholder="Tên của bạn"
            />
          </div>

          <div>
            <label className="block text-xs font-black text-gray-400 uppercase mb-2 ml-1 tracking-widest">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none font-bold text-sm focus:ring-2 focus:ring-primary transition-all"
              placeholder="your@email.com"
            />
          </div>

          <div>
            <label className="block text-xs font-black text-gray-400 uppercase mb-2 ml-1 tracking-widest">
              Mật Khẩu
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none font-bold text-sm focus:ring-2 focus:ring-primary transition-all"
              placeholder="••••••••"
            />
          </div>

          <div>
            <label className="block text-xs font-black text-gray-400 uppercase mb-2 ml-1 tracking-widest">
              Xác Nhận Mật Khẩu
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none font-bold text-sm focus:ring-2 focus:ring-primary transition-all"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-6 py-4 bg-gradient-to-r from-primary to-secondary text-white font-black rounded-2xl shadow-xl hover:brightness-110 active:scale-95 transition-all uppercase tracking-[0.2em] text-sm disabled:opacity-50"
          >
            {loading ? 'ĐANG XỬ LÝ...' : 'ĐĂNG KÝ'}
          </button>
        </form>

        <div className="mt-8 pt-8 border-t border-gray-100 text-center">
          <p className="text-sm text-gray-500">
            Đã có tài khoản?{' '}
            <Link to="/signin" className="text-primary font-black hover:underline">
              Đăng nhập
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
