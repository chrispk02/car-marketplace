import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { authService } from '../lib/authService';

interface Listing {
  id: string;
  title: string;
  price: number;
  status: string;
  createdAt: string;
  _count: {
    leads: number;
  };
}

export default function SellerDashboard() {
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'active' | 'pending' | 'sold'>('active');

  useEffect(() => {
    fetchMyListings();
  }, []);

  const fetchMyListings = async () => {
    try {
      const response = await fetch('/api/listings/my-listings', {
        headers: {
          'Authorization': `Bearer ${authService.getToken()}`,
        },
      });
      const data = await response.json();
      setListings(data.listings || []);
    } catch (error) {
      console.error('Error fetching listings:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredListings = listings.filter(listing => {
    switch (activeTab) {
      case 'active':
        return listing.status === 'APPROVED';
      case 'pending':
        return listing.status === 'PENDING';
      case 'sold':
        return listing.status === 'SOLD';
      default:
        return true;
    }
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'APPROVED':
        return 'text-green-600 bg-green-50';
      case 'PENDING':
        return 'text-yellow-600 bg-yellow-50';
      case 'REJECTED':
        return 'text-red-600 bg-red-50';
      case 'SOLD':
        return 'text-blue-600 bg-blue-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-20 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Quản Lý Xe Của Tôi</h1>
          <Link
            to="/listings/create"
            className="px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors"
          >
            Đăng Xe Mới
          </Link>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 mb-6 bg-gray-100 p-1 rounded-lg">
          {[
            { key: 'active', label: 'Đang Bán', count: listings.filter(l => l.status === 'APPROVED').length },
            { key: 'pending', label: 'Chờ Duyệt', count: listings.filter(l => l.status === 'PENDING').length },
            { key: 'sold', label: 'Đã Bán', count: listings.filter(l => l.status === 'SOLD').length },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors ${
                activeTab === tab.key
                  ? 'bg-white text-primary shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab.label} ({tab.count})
            </button>
          ))}
        </div>

        {/* Listings */}
        <div className="space-y-4">
          {filteredListings.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">Chưa có xe nào trong danh mục này</p>
              {activeTab === 'active' && (
                <Link
                  to="/listings/create"
                  className="inline-block mt-4 px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors"
                >
                  Đăng Xe Đầu Tiên
                </Link>
              )}
            </div>
          ) : (
            filteredListings.map((listing) => (
              <div key={listing.id} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{listing.title}</h3>
                    <p className="text-2xl font-bold text-primary mb-2">
                      ${listing.price.toLocaleString()}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span>Đăng ngày: {new Date(listing.createdAt).toLocaleDateString('vi-VN')}</span>
                      <span>{listing._count.leads} liên hệ</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(listing.status)}`}>
                      {listing.status === 'APPROVED' ? 'Đang Bán' :
                       listing.status === 'PENDING' ? 'Chờ Duyệt' :
                       listing.status === 'SOLD' ? 'Đã Bán' : listing.status}
                    </span>
                    <Link
                      to={`/listings/${listing.id}/edit`}
                      className="px-4 py-2 text-primary border border-primary rounded-lg hover:bg-primary hover:text-white transition-colors"
                    >
                      Chỉnh Sửa
                    </Link>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}