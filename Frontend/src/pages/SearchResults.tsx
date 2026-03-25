import { useState, useEffect } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import { API_BASE_URL, API_ENDPOINTS, BODY_TYPES, CAR_BRANDS, SELLER_TYPES } from '../constants';

interface Listing {
  id: string;
  title: string;
  price: number;
  brand: string;
  model: string;
  year: number;
  bodyType: string;
  color: string;
  mileage: number;
  fuelType: string;
  transmission: string;
  condition: string;
  owner: string;
  images: string[];
  description?: string;
  seller: {
    sellerType: string;
  };
  createdAt: string;
}

const conditionLabels = ['EXCELLENT', 'GOOD', 'FAIR', 'POOR'];
const fuelTypes = ['GASOLINE', 'DIESEL', 'ELECTRIC', 'HYBRID'];
const transmissionTypes = ['AUTOMATIC', 'MANUAL', 'CVT'];
const owners = ['PRIVATE', 'DEALER'];

export default function SearchResults() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [compareIds, setCompareIds] = useState<string[]>([]);

  const defaultFilters = {
    query: searchParams.get('query') || '',
    make: searchParams.get('brand') || '',
    model: searchParams.get('model') || '',
    minPrice: searchParams.get('minPrice') || '',
    maxPrice: searchParams.get('maxPrice') || '',
    minYear: searchParams.get('minYear') || '',
    maxYear: searchParams.get('maxYear') || '',
    bodyType: searchParams.get('bodyType') || '',
    fuelType: searchParams.get('fuelType') || '',
    transmission: searchParams.get('transmission') || '',
    condition: searchParams.get('condition') || '',
    owner: searchParams.get('owner') || '',
    sellerType: searchParams.get('sellerType') || '',
  };

  const [filters, setFilters] = useState(defaultFilters);

  const getConditionColor = (condition: string) => {
    switch (condition) {
      case 'EXCELLENT': return 'text-green-600';
      case 'GOOD': return 'text-blue-600';
      case 'FAIR': return 'text-yellow-600';
      case 'POOR': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const applyFilters = (newFilters = filters, page = 1) => {
    const params = new URLSearchParams();
    if (newFilters.query) params.set('search', newFilters.query);
    if (newFilters.make) params.set('brand', newFilters.make);
    if (newFilters.model) params.set('model', newFilters.model);
    if (newFilters.minPrice) params.set('minPrice', newFilters.minPrice);
    if (newFilters.maxPrice) params.set('maxPrice', newFilters.maxPrice);
    if (newFilters.minYear) params.set('minYear', newFilters.minYear);
    if (newFilters.maxYear) params.set('maxYear', newFilters.maxYear);
    if (newFilters.bodyType) params.set('bodyType', newFilters.bodyType);
    if (newFilters.fuelType) params.set('fuelType', newFilters.fuelType);
    if (newFilters.transmission) params.set('transmission', newFilters.transmission);
    if (newFilters.condition) params.set('condition', newFilters.condition);
    if (newFilters.owner) params.set('owner', newFilters.owner);
    if (newFilters.sellerType) params.set('sellerType', newFilters.sellerType);
    params.set('page', page.toString());
    params.set('limit', '20');
    params.set('sortBy', sortBy);
    params.set('sortOrder', sortOrder);

    setSearchParams(params);
    setCurrentPage(page);
    // ensure state remains consistent in URL
    setFilters(newFilters);
  };

  const fetchListings = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams(searchParams);
      params.set('page', currentPage.toString());
      params.set('limit', '20');
      params.set('sortBy', sortBy);
      params.set('sortOrder', sortOrder);

      const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.LISTINGS.GET_ALL}?${params.toString()}`);
      const data = await response.json();
      setListings(data.listings || []);
      setTotal(data.pagination?.total || 0);
    } catch (error) {
      console.error('Error fetching listings:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setFilters({
      query: searchParams.get('search') || '',
      make: searchParams.get('brand') || '',
      model: searchParams.get('model') || '',
      minPrice: searchParams.get('minPrice') || '',
      maxPrice: searchParams.get('maxPrice') || '',
      minYear: searchParams.get('minYear') || '',
      maxYear: searchParams.get('maxYear') || '',
      bodyType: searchParams.get('bodyType') || '',
      fuelType: searchParams.get('fuelType') || '',
      transmission: searchParams.get('transmission') || '',
      condition: searchParams.get('condition') || '',
      owner: searchParams.get('owner') || '',
      sellerType: searchParams.get('sellerType') || '',
    });
    fetchListings();
  }, [searchParams, currentPage, sortBy, sortOrder]);

  useEffect(() => {
    const compare = localStorage.getItem('compare_cars');
    if (compare) {
      setCompareIds(JSON.parse(compare));
    }
  }, []);

  const toggleCompare = (id: string) => {
    const next = compareIds.includes(id) ? compareIds.filter((x) => x !== id) : [...compareIds, id];
    setCompareIds(next);
    localStorage.setItem('compare_cars', JSON.stringify(next));
  };

  const clearFilters = () => applyFilters({
    query: '', make: '', model: '', minPrice: '', maxPrice: '', minYear: '', maxYear: '', bodyType: '', fuelType: '', transmission: '', condition: '', owner: '', sellerType: ''
  }, 1);

  const handleSort = (newSortBy: string) => {
    if (sortBy === newSortBy) {
      const next = sortOrder === 'asc' ? 'desc' : 'asc';
      setSortOrder(next);
      setCurrentPage(1);
      const params = new URLSearchParams(searchParams);
      params.set('sortBy', newSortBy);
      params.set('sortOrder', next);
      setSearchParams(params);
    } else {
      setSortBy(newSortBy);
      setSortOrder('desc');
      setCurrentPage(1);
      const params = new URLSearchParams(searchParams);
      params.set('sortBy', newSortBy);
      params.set('sortOrder', 'desc');
      setSearchParams(params);
    }
  };

  return (
    <div className="min-h-screen pt-24 px-4 md:px-6 lg:px-10 pb-20 bg-slate-50">
      <div className="max-w-[1440px] mx-auto">
        <div className="flex flex-col md:flex-row md:items-start gap-6">
          {/* Filter Sidebar */}
          <aside className="w-full md:w-[320px] bg-white border border-gray-200 rounded-3xl p-6 sticky top-28 h-fit shadow-sm">
            <h2 className="text-xl font-black text-gray-900 mb-5">Tìm xe</h2>

            <div className="space-y-4">
              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-gray-500">Từ khóa</label>
                <input
                  value={filters.query}
                  onChange={(e) => setFilters((prev) => ({ ...prev, query: e.target.value }))}
                  className="w-full mt-2 border border-gray-200 rounded-xl p-3 text-sm outline-none focus:border-primary"
                  placeholder="Tên xe, model..."
                />
              </div>

              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-gray-500">Hãng</label>
                <select
                  value={filters.make}
                  onChange={(e) => setFilters((prev) => ({ ...prev, make: e.target.value }))}
                  className="w-full mt-2 border border-gray-200 rounded-xl p-3 text-sm outline-none focus:border-primary"
                >
                  <option value="">Tất cả hãng</option>
                  {CAR_BRANDS.map((brand) => <option key={brand} value={brand}>{brand}</option>)}
                </select>
              </div>

              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-gray-500">Model</label>
                <input
                  value={filters.model}
                  onChange={(e) => setFilters((prev) => ({ ...prev, model: e.target.value }))}
                  className="w-full mt-2 border border-gray-200 rounded-xl p-3 text-sm outline-none focus:border-primary"
                  placeholder="Model (ví dụ: M4)"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wider text-gray-500">Giá min</label>
                  <input
                    value={filters.minPrice}
                    onChange={(e) => setFilters((prev) => ({ ...prev, minPrice: e.target.value }))}
                    type="number"
                    min={0}
                    className="w-full mt-2 border border-gray-200 rounded-xl p-3 text-sm outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wider text-gray-500">Giá max</label>
                  <input
                    value={filters.maxPrice}
                    onChange={(e) => setFilters((prev) => ({ ...prev, maxPrice: e.target.value }))}
                    type="number"
                    min={0}
                    className="w-full mt-2 border border-gray-200 rounded-xl p-3 text-sm outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wider text-gray-500">Năm từ</label>
                  <input
                    value={filters.minYear}
                    onChange={(e) => setFilters((prev) => ({ ...prev, minYear: e.target.value }))}
                    type="number"
                    min={1990}
                    className="w-full mt-2 border border-gray-200 rounded-xl p-3 text-sm outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wider text-gray-500">Năm đến</label>
                  <input
                    value={filters.maxYear}
                    onChange={(e) => setFilters((prev) => ({ ...prev, maxYear: e.target.value }))}
                    type="number"
                    min={1990}
                    className="w-full mt-2 border border-gray-200 rounded-xl p-3 text-sm outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-gray-500">Loại thân xe</label>
                <select
                  value={filters.bodyType}
                  onChange={(e) => setFilters((prev) => ({ ...prev, bodyType: e.target.value }))}
                  className="w-full mt-2 border border-gray-200 rounded-xl p-3 text-sm outline-none focus:border-primary"
                >
                  <option value="">Tất cả</option>
                  {BODY_TYPES.map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wider text-gray-500">Nhiên liệu</label>
                  <select
                    value={filters.fuelType}
                    onChange={(e) => setFilters((prev) => ({ ...prev, fuelType: e.target.value }))}
                    className="w-full mt-2 border border-gray-200 rounded-xl p-3 text-sm outline-none focus:border-primary"
                  >
                    <option value="">Tất cả</option>
                    {fuelTypes.map((fuel) => <option key={fuel} value={fuel}>{fuel}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wider text-gray-500">Hộp số</label>
                  <select
                    value={filters.transmission}
                    onChange={(e) => setFilters((prev) => ({ ...prev, transmission: e.target.value }))}
                    className="w-full mt-2 border border-gray-200 rounded-xl p-3 text-sm outline-none focus:border-primary"
                  >
                    <option value="">Tất cả</option>
                    {transmissionTypes.map((item) => <option key={item} value={item}>{item}</option>)}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wider text-gray-500">Tình trạng</label>
                  <select
                    value={filters.condition}
                    onChange={(e) => setFilters((prev) => ({ ...prev, condition: e.target.value }))}
                    className="w-full mt-2 border border-gray-200 rounded-xl p-3 text-sm outline-none focus:border-primary"
                  >
                    <option value="">Tất cả</option>
                    {conditionLabels.map((item) => <option key={item} value={item}>{item}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wider text-gray-500">Người bán</label>
                  <select
                    value={filters.owner}
                    onChange={(e) => setFilters((prev) => ({ ...prev, owner: e.target.value }))}
                    className="w-full mt-2 border border-gray-200 rounded-xl p-3 text-sm outline-none focus:border-primary"
                  >
                    <option value="">Tất cả</option>
                    {owners.map((item) => <option key={item} value={item}>{item}</option>)}
                  </select>
                </div>
              </div>

              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-gray-500">Loại người bán</label>
                <select
                  value={filters.sellerType}
                  onChange={(e) => setFilters((prev) => ({ ...prev, sellerType: e.target.value }))}
                  className="w-full mt-2 border border-gray-200 rounded-xl p-3 text-sm outline-none focus:border-primary"
                >
                  <option value="">Tất cả</option>
                  <option value={SELLER_TYPES.NEW}>New Dealer</option>
                  <option value={SELLER_TYPES.USED}>Used Dealer</option>
                </select>
              </div>

              <div className="flex items-center gap-3 pt-3">
                <button
                  onClick={() => applyFilters(filters, 1)}
                  className="w-full py-3 text-sm font-bold rounded-xl bg-primary text-white hover:bg-primary/90 transition"
                >
                  Áp dụng bộ lọc
                </button>
                <button
                  onClick={clearFilters}
                  className="w-full py-3 text-sm font-bold rounded-xl border border-gray-200 text-gray-700 hover:bg-gray-100 transition"
                >
                  Xóa
                </button>
              </div>
            </div>
          </aside>

          {/* Results */}
          <section className="flex-1">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
              <div>
                <h1 className="text-3xl font-black text-gray-900">{total} Kết quả</h1>
                <p className="text-sm text-gray-500">Tìm kiếm theo tiêu chí của bạn</p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleSort('price')}
                  className={`px-3 py-2 rounded-lg text-sm font-semibold ${sortBy === 'price' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                >Giá {sortBy === 'price' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}</button>
                <button
                  onClick={() => handleSort('year')}
                  className={`px-3 py-2 rounded-lg text-sm font-semibold ${sortBy === 'year' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                >Năm {sortBy === 'year' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}</button>
                <button
                  onClick={() => handleSort('mileage')}
                  className={`px-3 py-2 rounded-lg text-sm font-semibold ${sortBy === 'mileage' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                >Mileage {sortBy === 'mileage' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}</button>
                <button
                  onClick={() => handleSort('createdAt')}
                  className={`px-3 py-2 rounded-lg text-sm font-semibold ${sortBy === 'createdAt' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                >Mới nhất {sortBy === 'createdAt' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}</button>
              </div>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="bg-white border border-gray-200 rounded-2xl overflow-hidden animate-pulse h-[380px]"></div>
                ))}
              </div>
            ) : listings.length === 0 ? (
              <div className="rounded-3xl bg-white p-12 text-center">Không tìm thấy xe phù hợp.</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {listings.map((listing) => {
                  const isCompare = compareIds.includes(listing.id);
                  return (
                    <div key={listing.id} className="bg-white border border-gray-200 rounded-3xl overflow-hidden shadow-sm hover:shadow-lg transition">
                      <div className="relative aspect-video overflow-hidden">
                        <img
                          src={listing.images[0] || 'https://via.placeholder.com/600x400?text=No+Image'}
                          alt={listing.title}
                          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                        />
                        <button
                          onClick={() => toggleCompare(listing.id)}
                          className={`absolute top-3 right-3 bg-white/90 px-3 py-1 rounded-full text-xs font-bold ${isCompare ? 'text-primary border border-primary' : 'text-gray-700 border border-gray-200'}`}>
                          {isCompare ? 'Đã chọn so sánh' : 'So sánh'}
                        </button>
                      </div>

                      <div className="p-4 flex flex-col gap-3">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-black uppercase text-gray-500 tracking-[0.2em]">{listing.seller.sellerType === 'NEW' ? 'Xe mới' : 'Xe cũ'}</span>
                          <span className={`text-[10px] font-black uppercase px-3 py-1 rounded-full ${listing.condition === 'EXCELLENT' ? 'bg-emerald-100 text-emerald-800' : listing.condition === 'GOOD' ? 'bg-blue-100 text-blue-800' : listing.condition === 'FAIR' ? 'bg-amber-100 text-amber-800' : 'bg-rose-100 text-rose-800'}`}>
                            {listing.condition}
                          </span>
                        </div>
                        <h3 className="text-xl font-extrabold leading-tight text-gray-900 truncate">{listing.year} {listing.brand} {listing.model}</h3>
                        <p className="text-2xl font-black text-primary">${listing.price.toLocaleString()}</p>
                        <p className="text-sm text-gray-600 line-clamp-2">{listing.description || 'Không có mô tả cụ thể.'}</p>
                        <div className="grid grid-cols-2 gap-2 text-xs text-gray-600 pt-2 border-t border-gray-100">
                          <span>{listing.mileage.toLocaleString()} mi</span>
                          <span>{listing.fuelType}</span>
                          <span>{listing.transmission}</span>
                          <span>{listing.bodyType}</span>
                        </div>
                        <div className="flex items-center justify-between gap-2 pt-3">
                          <Link to={`/listings/${listing.id}`} className="flex-1 text-center py-2 rounded-xl bg-primary text-white text-sm font-bold hover:bg-primary/90 transition">Chi tiết</Link>
                          <button onClick={() => navigate(`/listings/${listing.id}`)} className="flex-1 border border-primary text-primary py-2 rounded-xl text-sm font-bold hover:bg-primary/10 transition">Gọi NGAY</button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {total > 20 && (
              <div className="mt-8 flex justify-center gap-2">
                <button
                  onClick={() => applyFilters(filters, Math.max(currentPage - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 rounded-lg border border-gray-300 bg-white hover:bg-gray-100 disabled:opacity-40"
                >Previous</button>
                <span className="px-4 py-2 rounded-lg border border-gray-300 bg-white text-sm">{currentPage} / {Math.ceil(total / 20)}</span>
                <button
                  onClick={() => applyFilters(filters, currentPage + 1)}
                  disabled={currentPage >= Math.ceil(total / 20)}
                  className="px-4 py-2 rounded-lg border border-gray-300 bg-white hover:bg-gray-100 disabled:opacity-40"
                >Next</button>
              </div>
            )}
          </section>
        </div>

        {compareIds.length > 1 && (
          <div className="mt-8 bg-white p-4 border border-gray-200 rounded-xl shadow-sm">
            <h3 className="text-lg font-black mb-2">So sánh xe</h3>
            <p className="text-sm text-gray-600">Đã chọn {compareIds.length} xe so sánh. <Link to={`/compare?ids=${compareIds.join(',')}`} className="ml-2 text-primary font-bold">Mở so sánh</Link></p>
          </div>
        )}
      </div>
    </div>
  );
}