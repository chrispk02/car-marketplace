/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

const Navbar = () => (
  <nav className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 transition-all duration-300">
    <div className="flex justify-between items-center px-6 lg:px-12 py-4 max-w-[1440px] mx-auto w-full">
      <div className="flex items-center gap-12">
        <a className="text-2xl font-black italic tracking-tighter text-primary" href="#">
          Precision Curator
        </a>
        <div className="hidden lg:flex gap-8 items-center font-semibold text-sm">
          <a className="text-primary border-b-2 border-primary pb-1" href="#">Cars for Sale</a>
          <a className="text-on-surface/70 hover:text-primary transition-all duration-300" href="#">Sell Your Car</a>
          <a className="text-on-surface/70 hover:text-primary transition-all duration-300" href="#">Service & Repair</a>
          <a className="text-on-surface/70 hover:text-primary transition-all duration-300" href="#">Research</a>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <button className="px-5 py-2 rounded-lg font-bold text-sm transition-all duration-300 text-primary hover:bg-primary/5">
          Sign In/Join
        </button>
      </div>
    </div>
  </nav>
);

const Hero = () => (
  <section className="relative h-[800px] w-full flex items-center justify-center px-6 overflow-hidden pt-16">
    <div className="absolute inset-0 z-0">
      <img 
        alt="Luxury Car" 
        className="w-full h-full object-cover" 
        src="https://lh3.googleusercontent.com/aida-public/AB6AXuAGkD2HhmI1qy2A1xlP-DO7KtPuP_AQDz62a_YB0qEZqvDqZxyp8l8mEnPQeTy7aDwoBI9mYWr26BrQL0yQMrxqN7hBE9LjOcGJQm6bT9qI0uqiYS4C99sg2gBlSFtBCgNPq2Ln8nQy0jWroa7-lTv40An9r7dmV2voy1yADrTR7TGK96jHWC2OT1pxIuLf4tJUgFMDdhcMEheiYkD-xi00QWtj3L78KcI5ntCdTNH0r6UIzITkGGey_X07BYS2kiUtGDCV6Gir7PfN"
        referrerPolicy="no-referrer"
      />
      <div className="absolute inset-0 bg-black/50"></div>
    </div>
    <div className="relative z-10 w-full max-w-5xl">
      <div className="mb-12 text-center">
        <h1 className="text-white text-5xl md:text-7xl font-black tracking-tight leading-none mb-6">
          FIND YOUR <span className="text-purple-300">MOMENTUM</span>
        </h1>
        <p className="text-white/90 text-lg md:text-xl font-medium max-w-2xl mx-auto">
          Search millions of new and used cars from top-rated dealers.
        </p>
      </div>
      <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="flex bg-gray-50 border-b border-gray-100">
          <button className="flex-1 py-5 text-sm font-bold border-b-4 border-primary text-primary">Shop Buy</button>
          <button className="flex-1 py-5 text-sm font-semibold text-gray-500 hover:bg-gray-100 transition-colors">Sell</button>
          <button className="flex-1 py-5 text-sm font-semibold text-gray-500 hover:bg-gray-100 transition-colors">Service</button>
        </div>
        <div className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Stock Type</label>
              <select className="bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold p-3.5 focus:ring-2 focus:ring-primary focus:border-transparent outline-none appearance-none">
                <option>New & Used</option>
                <option>New</option>
                <option>Used</option>
                <option>Certified</option>
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Make</label>
              <select className="bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold p-3.5 focus:ring-2 focus:ring-primary focus:border-transparent outline-none appearance-none">
                <option>All Makes</option>
                <option>Porsche</option>
                <option>BMW</option>
                <option>Audi</option>
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Model</label>
              <select className="bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold p-3.5 focus:ring-2 focus:ring-primary focus:border-transparent outline-none appearance-none">
                <option>All Models</option>
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Max Price</label>
              <select className="bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold p-3.5 focus:ring-2 focus:ring-primary focus:border-transparent outline-none appearance-none">
                <option>No Max</option>
                <option>$50,000</option>
                <option>$100,000</option>
              </select>
            </div>
            <div className="flex flex-col justify-end">
              <button className="primary-gradient text-white font-bold py-4 rounded-xl shadow-lg hover:brightness-110 active:scale-[0.98] transition-all">
                Search
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const BrowseByBody = () => (
  <section className="py-24 px-6 max-w-[1440px] mx-auto overflow-hidden">
    <div className="mb-12">
      <h2 className="text-3xl font-black text-primary tracking-tight">BROWSE BY BODY</h2>
      <div className="h-1.5 w-16 bg-secondary mt-3 rounded-full"></div>
    </div>
    <div className="flex overflow-x-auto gap-6 pb-8 no-scrollbar scroll-smooth">
      {[
        { icon: 'airport_shuttle', label: 'SUV' },
        { icon: 'directions_car', label: 'Sedan' },
        { icon: 'local_shipping', label: 'Pickup' },
        { icon: 'minor_crash', label: 'Coupe' },
        { icon: 'car_tag', label: 'Hatchback' },
        { icon: 'diamond', label: 'Luxury' }
      ].map((item, idx) => (
        <a key={idx} className="flex-shrink-0 group flex flex-col items-center gap-6 p-10 rounded-3xl bg-white hover:bg-primary transition-all duration-500 w-52 shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-gray-50" href="#">
          <span className="material-symbols-outlined text-5xl text-primary group-hover:text-white transition-colors">{item.icon}</span>
          <span className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-gray-400 group-hover:text-white/80 transition-colors">{item.label}</span>
        </a>
      ))}
    </div>
  </section>
);

const FeaturedCurations = () => (
  <section className="bg-[#f8faf9] py-24 px-6">
    <div className="max-w-[1440px] mx-auto">
      <div className="flex justify-between items-end mb-12">
        <h2 className="text-3xl font-black text-primary tracking-tight">FEATURED CURATIONS</h2>
        <a className="text-sm font-extrabold text-secondary flex items-center gap-2 group transition-all" href="#">
          View All Listings <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
        </a>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {[
          {
            title: 'BMW M4 Competition',
            year: 2022,
            type: 'Used',
            price: '$84,900',
            mileage: '12,450 mi',
            location: 'Miami, FL',
            badge: 'Great Deal',
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBPcCNlU0A2f7ZoSHqGlccNHlrUtfs50mFiYakuVUh-qQjjtjzPPUdFgcKiF651CJPGdT-Z6QliN5fyJmZBZYAfB22dNsVhy2YOQlmZB6pse_4l_c4CpdnWeMinM6hBroLP5-OEMTvFSRVH3ywiasejpCpepaPbsriBV-Y8uFmeEwCwV1ZdFAUmoZ72iM89OKnIlJ9S096uGiROsUxDFB3LkFkcvF8XcL3Nrvyqas0BazL4s8q1zcphCba6Be0SVPxQffq3mO2RJyA3'
          },
          {
            title: 'Porsche 911 Carrera',
            year: 2021,
            type: 'Used',
            price: '$112,500',
            mileage: '8,200 mi',
            location: 'Austin, TX',
            badge: 'Newly Listed',
            badgeColor: 'bg-secondary',
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA3exN5CAUdDiS0eJen0WmylZk_FK3aYIQZRDiIn2uQoXVPYW612BaH7bsPbWx9B8wx5M4NXoepNhTdF9i-P2ov8DgstlZfLKCVK7NAq4AymRYmWKTy_SBcX_6GYLLmSumCoKiIgsr6sAgNfx-7oxF8k3ZQzJwj43Q0sFEE0Ns6eomrAADyqfd9gveIVksTrYzas46TxUt0qGaSlTKy5OOYLuRYRQHKRGsvv4TpKwDNEII8T840TB4cqHuOXHgX5KEn3ShX2Y8im0cx'
          },
          {
            title: 'Audi RS e-tron GT',
            year: 2024,
            type: 'New',
            price: '$147,000',
            mileage: '249 mi',
            mileageLabel: 'Range',
            location: 'Los Angeles, CA',
            badge: 'Great Deal',
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC2aIDkNQOjOaI-1lceDcZlyGXSgT9Sm0Y1CH4guoTR-KAalnrj1ZERCuQTzShADtPeVZXZUHaPqzJ1YRpylfryVd-bKW9qrTn1NMHiU3Cp5ZWfv70ETRel7kfoEsdueMuR3_KLbIeJ9uRW6OlzDT4WgGTVgZLhlXpdtd4piUWmvHlq6q6aHXRmDdryx4wT5cfsfGDhYDZMjz5jSw3_j52ucNJNHdJDQcRaFfb667Fzql9oH5vpxiFq2MXiX4sQwqnW_KxxkxHlYlH_'
          },
          {
            title: 'Range Rover Sport',
            year: 2023,
            type: 'Used',
            price: '$98,000',
            mileage: '15,100 mi',
            location: 'Greenwich, CT',
            badge: 'New Arrival',
            badgeColor: 'bg-gray-900',
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAiZp3hpA8Tt8smUGPwavdmKfz3js_FKBPHIjCYSsWBD9foVYqXwSFn0GKAlGMJxZ_kfkC9G4LawbYlhbJbwvJPCmKp4ByJzYa9L-iyC1ItoEIdUOnsNKkai06XCOZKYEDmTAWcPLGx4RzbhH7BYdnJrmdwVZRpNqIK5s94epKOMf41wInDE02QKOW2rhK2YqkTWK9qTqARrVppKBPaEPVc4-whHvy1ZgSg37UyxXwoluP2qdhasV1pYqcAd-HFcRHP6Pk63tS0U9vs'
          }
        ].map((car, idx) => (
          <div key={idx} className="bg-white rounded-2xl overflow-hidden shadow-[0_4px_25px_rgba(0,0,0,0.05)] group hover:shadow-[0_8px_40px_rgba(0,0,0,0.12)] transition-all duration-500 border border-gray-50">
            <div className="relative h-64 overflow-hidden">
              <img 
                alt={car.title} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                src={car.image}
                referrerPolicy="no-referrer"
              />
              <div className={cn("absolute top-4 left-4 text-white text-[10px] font-black px-3.5 py-1.5 rounded-full tracking-widest uppercase shadow-lg", car.badgeColor || "bg-primary")}>
                {car.badge}
              </div>
              {idx === 0 && (
                <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm p-2 rounded-xl shadow-sm text-primary hover:text-red-500 cursor-pointer transition-colors">
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>favorite</span>
                </div>
              )}
            </div>
            <div className="p-6">
              <p className="text-[11px] font-black text-gray-400 uppercase tracking-widest mb-2">{car.type} • {car.year}</p>
              <h3 className="text-xl font-black text-on-surface mb-6">{car.title}</h3>
              <div className="flex flex-col gap-3 mb-8">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400 font-medium">{car.mileageLabel || 'Mileage'}</span>
                  <span className="font-bold text-on-surface">{car.mileage}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400 font-medium">Location</span>
                  <span className="font-bold text-on-surface">{car.location}</span>
                </div>
              </div>
              <div className="flex items-center justify-between pt-6 border-t border-gray-100">
                <span className="text-2xl font-black text-primary">{car.price}</span>
                <button className="text-primary hover:bg-primary hover:text-white p-2.5 rounded-xl transition-all duration-300 bg-primary/5">
                  <span className="material-symbols-outlined">east</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const MarketingBanners = () => (
  <section className="py-24 px-6 max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10">
    <div className="relative overflow-hidden rounded-[2.5rem] bg-primary p-12 text-white group flex flex-col md:flex-row items-center gap-8">
      <div className="relative z-10 flex-1">
        <h2 className="text-4xl md:text-5xl font-black mb-6 leading-tight">THE EASIEST WAY TO SELL.</h2>
        <p className="text-white/70 mb-10 text-lg leading-relaxed max-w-sm">Get an instant offer in minutes or list your car for free. We handle the paperwork, you get paid.</p>
        <button className="bg-white text-primary font-black px-10 py-4 rounded-xl hover:bg-purple-100 transition-all shadow-xl shadow-black/20">Get Started</button>
      </div>
      <div className="relative w-48 h-48 md:w-64 md:h-64 flex items-center justify-center">
        <span className="material-symbols-outlined text-[160px] md:text-[220px] text-white/10 rotate-12 group-hover:scale-110 group-hover:rotate-0 transition-transform duration-700">sell</span>
      </div>
    </div>
    <div className="relative overflow-hidden rounded-[2.5rem] bg-white border border-gray-100 p-12 group flex flex-col md:flex-row items-center gap-8 shadow-[0_10px_40px_rgba(0,0,0,0.04)]">
      <div className="relative z-10 flex-1">
        <h2 className="text-4xl md:text-5xl font-black mb-6 leading-tight text-primary">KNOW YOUR SCORE.</h2>
        <p className="text-gray-500 mb-10 text-lg leading-relaxed max-w-sm">Check your credit score for free without impacting your credit. Find the best rates today.</p>
        <button className="bg-primary text-white font-black px-10 py-4 rounded-xl hover:brightness-110 transition-all shadow-xl shadow-primary/20">Check Now</button>
      </div>
      <div className="relative w-48 h-48 md:w-64 md:h-64 flex items-center justify-center">
        <span className="material-symbols-outlined text-[160px] md:text-[220px] text-primary/5 -rotate-12 group-hover:scale-110 group-hover:rotate-0 transition-transform duration-700">credit_score</span>
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="bg-white border-t border-gray-100 w-full pt-24 pb-12 px-6 lg:px-12">
    <div className="max-w-[1440px] mx-auto">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-12 mb-24">
        <div className="col-span-2">
          <a className="text-2xl font-black italic tracking-tighter text-primary mb-8 block" href="#">Precision Curator</a>
          <p className="text-gray-400 text-sm max-w-xs leading-relaxed font-medium">Redefining the automotive search experience with premium curation and technical precision.</p>
        </div>
        {[
          { title: 'Shop', links: ['Cars for Sale', 'Used Cars', 'New Cars', 'Certified Pre-Owned'] },
          { title: 'Service', links: ['Service Centers', 'Recall Search', 'Repair Advice'] },
          { title: 'Company', links: ['About Us', 'Contact', 'Careers'] },
          { title: 'Support', links: ['Terms of Service', 'Privacy Policy', 'Sitemap'] }
        ].map((section, idx) => (
          <div key={idx} className="flex flex-col gap-6">
            <h4 className="text-xs uppercase tracking-[0.2em] font-black text-primary">{section.title}</h4>
            <ul className="flex flex-col gap-4 text-sm font-bold text-gray-400">
              {section.links.map((link, lIdx) => (
                <li key={lIdx}><a className="hover:text-primary transition-colors" href="#">{link}</a></li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="flex flex-col md:flex-row justify-between items-center pt-10 border-t border-gray-100 gap-8">
        <div className="flex gap-8">
          <a className="text-gray-300 hover:text-primary transition-colors" href="#"><span className="material-symbols-outlined font-bold">facebook</span></a>
          <a className="text-gray-300 hover:text-primary transition-colors" href="#"><span className="material-symbols-outlined font-bold">share</span></a>
          <a className="text-gray-300 hover:text-primary transition-colors" href="#"><span className="material-symbols-outlined font-bold">mail</span></a>
        </div>
        <p className="text-[10px] uppercase tracking-[0.2em] font-black text-gray-300">
          © 2024 Precision Curator Automotive. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
);

export default function App() {
  return (
    <div className="min-h-screen bg-background text-on-surface">
      <Navbar />
      <main>
        <Hero />
        <BrowseByBody />
        <FeaturedCurations />
        <MarketingBanners />
      </main>
      <Footer />
    </div>
  );
}

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}
