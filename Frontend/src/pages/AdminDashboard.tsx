import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { authService } from '../lib/authService';
import { API_BASE_URL } from '../constants';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [leads, setLeads] = useState<any[]>([]);
  const [listings, setListings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'leads' | 'listings'>('leads');

  useEffect(() => {
    const user = authService.getUser();
    if (!user || user.role !== 'ADMIN') {
      navigate('/');
      return;
    }

    fetchData();
  }, [navigate]);

  const fetchData = async () => {
    try {
      const [leadsRes, listingsRes] = await Promise.all([
        axios.get(`${API_BASE_URL}/leads`),
        axios.get(`${API_BASE_URL}/listings`),
      ]);
      setLeads(leadsRes.data);
      setListings(listingsRes.data);
    } catch (error) {
      alert('Lỗi khi tải dữ liệu');
    } finally {
      setLoading(false);
    }
  };

  const approveListing = async (listingId: string) => {
    try {
      await axios.patch(`${API_BASE_URL}/listings/${listingId}/approve`);
      fetchData();
    } catch {
      alert('Lỗi khi phê duyệt');
    }
  };

  const rejectListing = async (listingId: string) => {
    try {
      await axios.patch(`${API_BASE_URL}/listings/${listingId}/reject`);
      fetchData();
    } catch {
      alert('Lỗi khi từ chối');
    }
  };

  const updateLeadStatus = async (leadId: string, status: string) => {
    try {
      await axios.patch(`${API_BASE_URL}/leads/${leadId}`, { status });
      fetchData();
    } catch {
      alert('Lỗi khi cập nhật');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-24">
        <p className="text-xl font-bold">Đang tải...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-6">
        <h1 className="text-4xl font-black text-primary mb-8 italic uppercase">Admin Dashboard</h1>

        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b">
          <button
            onClick={() => setActiveTab('leads')}
            className={`px-6 py-4 font-black uppercase text-sm border-b-4 transition-all ${
              activeTab === 'leads'
                ? 'border-primary text-primary'
                : 'border-transparent text-gray-500 hover:text-gray-900'
            }`}
          >
            Yêu Cầu ({leads.length})
          </button>
          <button
            onClick={() => setActiveTab('listings')}
            className={`px-6 py-4 font-black uppercase text-sm border-b-4 transition-all ${
              activeTab === 'listings'
                ? 'border-primary text-primary'
                : 'border-transparent text-gray-500 hover:text-gray-900'
            }`}
          >
            Tin Đăng ({listings.length})
          </button>
        </div>

        {/* Leads Tab */}
        {activeTab === 'leads' && (
          <div className="space-y-4">
            {leads.length === 0 ? (
              <p className="text-gray-500 text-center py-12">Không có yêu cầu nào</p>
            ) : (
              leads.map(lead => (
                <div key={lead.id} className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-md transition-all">
                  <div className="grid grid-cols-5 gap-6 items-center">
                    <div>
                      <p className="text-xs text-gray-500 uppercase font-bold">Khách hàng</p>
                      <p className="text-lg font-black">{lead.buyerName}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase font-bold">Số điện thoại</p>
                      <p className="text-lg font-black">{lead.phone}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase font-bold">Ngân sách</p>
                      <p className="text-lg font-black">{lead.budget.toLocaleString('vi-VN')} VNĐ</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase font-bold">Trạng thái</p>
                      <span className={`inline-block px-3 py-1 rounded-full font-bold text-xs ${
                        lead.status === 'CONTACTED' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {lead.status === 'CONTACTED' ? 'Đã liên hệ' : 'Chờ xử lý'}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => updateLeadStatus(lead.id, 'CONTACTED')}
                        className="px-4 py-2 bg-green-500 text-white font-bold rounded-lg hover:bg-green-600 transition-all text-xs uppercase"
                      >
                        Đã liên hệ
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Listings Tab */}
        {activeTab === 'listings' && (
          <div className="space-y-4">
            {listings.length === 0 ? (
              <p className="text-gray-500 text-center py-12">Không có tin đăng nào</p>
            ) : (
              listings.map(listing => (
                <div key={listing.id} className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-md transition-all">
                  <div className="grid grid-cols-6 gap-6 items-center">
                    <div>
                      <img src={listing.images[0]} alt={listing.title} className="h-20 w-20 object-cover rounded-lg" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase font-bold">Tiêu đề</p>
                      <p className="text-lg font-black">{listing.title}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase font-bold">Giá</p>
                      <p className="text-lg font-black">{listing.price.toLocaleString('vi-VN')} VNĐ</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase font-bold">Loại</p>
                      <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full font-bold text-xs">
                        {listing.sellerType === 'NEW' ? 'Xe Mới' : 'Xe Lướt'}
                      </span>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase font-bold">Trạng thái</p>
                      <span className={`inline-block px-3 py-1 rounded-full font-bold text-xs ${
                        listing.status === 'APPROVED' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {listing.status === 'APPROVED' ? 'Đã duyệt' : 'Chờ duyệt'}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      {listing.status !== 'APPROVED' && (
                        <>
                          <button
                            onClick={() => approveListing(listing.id)}
                            className="px-3 py-2 bg-green-500 text-white font-bold rounded-lg hover:bg-green-600 transition-all text-xs uppercase"
                          >
                            Phê duyệt
                          </button>
                          <button
                            onClick={() => rejectListing(listing.id)}
                            className="px-3 py-2 bg-red-500 text-white font-bold rounded-lg hover:bg-red-600 transition-all text-xs uppercase"
                          >
                            Từ chối
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}
