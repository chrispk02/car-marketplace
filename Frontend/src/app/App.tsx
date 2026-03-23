/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { 
  Search, 
  Heart, 
  User, 
  ChevronDown, 
  ArrowRight, 
  ShieldCheck, 
  CreditCard, 
  Truck 
} from 'lucide-react';
import { motion } from 'motion/react';

// --- Components ---

const Navbar = () => (
  <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-xl shadow-xl shadow-zinc-900/5">
    <div className="flex justify-between items-center max-w-7xl mx-auto px-6 h-20">
      <div className="text-2xl font-black tracking-tighter text-zinc-900">
        Precision Curator
      </div>
      <div className="hidden md:flex items-center gap-8">
        <a href="#" className="font-headline tracking-tight font-bold text-sm uppercase text-primary border-b-2 border-primary pb-1">Shop</a>
        <a href="#" className="font-headline tracking-tight font-bold text-sm uppercase text-zinc-600 hover:text-zinc-900 transition-colors">Sell</a>
        <a href="#" className="font-headline tracking-tight font-bold text-sm uppercase text-zinc-600 hover:text-zinc-900 transition-colors">Service</a>
      </div>
      <div className="flex items-center gap-6">
        <button className="text-zinc-600 hover:text-primary transition-colors">
          <Heart size={20} />
        </button>
        <button className="text-zinc-600 hover:text-primary transition-colors">
          <User size={20} />
        </button>
      </div>
    </div>
  </nav>
);

const Hero = () => (
  <section className="relative min-h-[800px] flex flex-col items-center justify-center px-6 hero-gradient overflow-hidden">
    <div className="absolute inset-0 opacity-10 pointer-events-none">
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary rounded-full blur-[120px]"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary-container rounded-full blur-[100px]"></div>
    </div>
    
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="relative z-10 max-w-4xl w-full text-center mb-12"
    >
      <h1 className="font-headline text-5xl md:text-7xl font-extrabold tracking-tight text-zinc-900 mb-6">
        Find your <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-container">perfect machine.</span>
      </h1>
      <p className="text-lg md:text-xl text-tertiary max-w-2xl mx-auto font-light leading-relaxed">
        A curated gallery of exceptional vehicles. Experience automotive excellence through our precision-vetted marketplace.
      </p>
    </motion.div>

    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.2, duration: 0.6 }}
      className="relative z-20 w-full max-w-6xl"
    >
      <div className="bg-white p-2 md:p-3 rounded-2xl shadow-2xl shadow-primary/10 border border-zinc-100 grid grid-cols-1 md:grid-cols-5 gap-2">
        {[
          { label: 'Make', value: 'All Makes' },
          { label: 'Model', value: 'Any Model' },
          { label: 'Price Range', value: 'Up to $150k' },
          { label: 'Distance', value: '50 Miles' },
        ].map((filter, i) => (
          <div key={i} className="flex flex-col px-4 py-2 hover:bg-zinc-50 rounded-xl transition-colors cursor-pointer group">
            <span className="text-[10px] uppercase font-bold tracking-widest text-zinc-400 mb-1">{filter.label}</span>
            <div className="flex justify-between items-center">
              <span className="font-semibold text-zinc-900">{filter.value}</span>
              <ChevronDown size={14} className="text-zinc-400 group-hover:text-primary transition-colors" />
            </div>
          </div>
        ))}
        <button className="bg-gradient-to-r from-primary to-primary-container text-white font-headline font-bold rounded-xl h-full flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-primary/30 transition-all active:scale-95 py-4 md:py-0">
          <Search size={20} />
          <span>Search Inventory</span>
        </button>
      </div>
    </motion.div>
  </section>
);

const CarCard = ({ 
  image, 
  title, 
  price, 
  details, 
  tags = [], 
  large = false, 
  estMonthly 
}: { 
  image: string, 
  title: string, 
  price: string, 
  details: string, 
  tags?: string[], 
  large?: boolean,
  estMonthly?: string
}) => (
  <motion.div 
    whileHover={{ y: -8 }}
    className={`${large ? 'md:col-span-8' : 'md:col-span-4'} group cursor-pointer`}
  >
    <div className="relative overflow-hidden rounded-2xl bg-white shadow-sm hover:shadow-xl transition-all duration-500 h-full flex flex-col">
      <div className={`${large ? 'aspect-[16/9]' : 'aspect-video'} w-full bg-zinc-100 overflow-hidden`}>
        <img 
          src={image} 
          alt={title} 
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
        />
      </div>
      <div className="p-8 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-4">
          <div className="flex-grow">
            <div className="flex gap-2 mb-3">
              {tags.map((tag, i) => (
                <span key={i} className={`px-3 py-1 ${i === 0 && large ? 'bg-primary/10 text-primary' : 'bg-zinc-100 text-zinc-600'} text-[10px] font-bold uppercase tracking-widest rounded-full`}>
                  {tag}
                </span>
              ))}
            </div>
            <h3 className={`font-headline ${large ? 'text-3xl' : 'text-xl'} font-bold mb-1 text-zinc-900`}>{title}</h3>
            <p className="text-tertiary font-medium text-sm">{details}</p>
          </div>
          <div className="text-right">
            <span className={`block ${large ? 'text-3xl' : 'text-xl'} font-headline font-black text-zinc-900 ${large ? 'text-primary' : ''}`}>{price}</span>
            {estMonthly && <span className="text-[10px] text-zinc-400 uppercase font-bold tracking-tighter">{estMonthly}</span>}
          </div>
        </div>
      </div>
    </div>
  </motion.div>
);

const CuratedArrivals = () => (
  <section className="max-w-7xl mx-auto px-6 py-24">
    <div className="flex justify-between items-end mb-16">
      <div>
        <h2 className="font-headline text-3xl font-bold tracking-tight text-zinc-900 mb-2">Curated Arrivals</h2>
        <p className="text-tertiary">Our hand-selected highlights for this week.</p>
      </div>
      <a href="#" className="text-primary font-bold flex items-center gap-1 hover:gap-2 transition-all">
        Explore all <ArrowRight size={16} />
      </a>
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
      <CarCard 
        large
        image="https://lh3.googleusercontent.com/aida-public/AB6AXuAw7mxG6VFkRRVkHc0Iv04LZN2kCRSSbGEsxKZtlODFkpeOj9Sbzx45zm3a4Xy46B58Su0r_ID4XPuJOK7suSh1S0bZb72WZsycSmkzvX6XUUwcsxIqACAMeOjlx6xRFQdKnplKMO9J5syADA0pBgyotlLoGHW48hwdbmJ4d_Q5C9GRpPHIlcTd4ZimJBvmlKdskuM338PLo0mWsnnk-6ItL0sT5GWF1YMC0rkfStjE202N9nDeLE6i9NaZzE4_gQo28UaQFfqayDw"
        title="2024 Porsche 911 Carrera S"
        details="3,200 miles • Chalk Gray • PDK Transmission"
        price="$138,500"
        estMonthly="Est. $2,140/mo"
        tags={["New Arrival", "Certified"]}
      />
      
      <CarCard 
        image="https://lh3.googleusercontent.com/aida-public/AB6AXuCj5u3_peNdPxkqDvzGHOVTxkE1Jnlz8RH3XTERjGAOL_tgiCGXaQ6SiOJkzwkm8olaMqNanzD_G8kbS047lBJy5VTVioYjWaGQ4xb9-sT-FRHtd2yBphdPV-6BLbsqWWL0b8GM6VezQ8JwnnoSnb1dUob_7GY2rG4M1lxg9o7RrGfrliPb1RaHHAToEw62Kh6kg-6ThXbqUKgcHMKGxxfLmIYkKRKczHBXBf9hywm1w7RNVKWrHvOYGx3OBM2Rq1ERGUK6rrf-hk8"
        title="2023 Audi RS e-tron GT"
        details="Carbon Fiber Package • 590 hp"
        price="$112,000"
        tags={["Electric Performance"]}
      />

      <CarCard 
        image="https://lh3.googleusercontent.com/aida-public/AB6AXuCTK2ClKonmB7JO7i4nnni6YyJ0mGjqIcvLe0KsC9yfk9QHzPDlRJbvz-H1UhUVhfW1GTA0f0gyYO4gxdr_NnFFw0It3KM4PfuspLSjqsfi4K_HF5cFdZzb2kH-hxzmTbsOeKwF6SRNRqa0EgSVK_4JIvD910tqBrTYzEYA0KcIotOpeLWGgNK4qTT6IlFS0XrRoNnQbmPC0wBjFYV5NflMJJo5HDFrUHFW4x1icSgXYueK2VteQ5I7my017TA3ErLR4C79J6Y2Z00"
        title="2022 BMW M4 Competition"
        details="12k miles • Black Sapphire"
        price="$79,900"
      />

      <CarCard 
        image="https://lh3.googleusercontent.com/aida-public/AB6AXuCkCQgnC7s0etyv2gUIdK7dsQ1B8TlVOe72k_71DR9ybOs8txZMqyUasY3MtDr2dvxewNX5V7xNjfy3hefdDBcdnIVcGi_goFS4avBDvoNWREPumLirWt4WEjIfWQUsPFOeDwTubF0Qs68oem6NKE4Lk9bQk86iGZ2p9gl5J7YeCL7AxoGLGW0lE0t5NN_Dh8woH9UCf_VC7MQ2Quv7PDlGHcYj1HytYY4Pj2n-cQmWWAVYMrVr0ClvoEX797baM9ogEIsvYOxOJGU"
        title="2024 Range Rover SE"
        details="Delivery miles • Fuji White"
        price="$145,000"
      />

      <CarCard 
        image="https://lh3.googleusercontent.com/aida-public/AB6AXuDgQzdqS2VRE0_4klSBXZjPXxF2qcDNVqKUPGxQLNawV5R3fXPil2dp9azDZBY3W1QMWXRNm6f3lut9qbktroGhMhger94VVlsRZtQvcX7oZA-SyGKVQ5EL9JP4DMpNa-xthzs0U5P7Zg_RgvZAwCz-JcjgToqTF93qjDd2ae_vq7B4c1EdCW0qmV6uA_IB97OCqp3K-cnfbS0-VFYVXycIpk1Zkax6ODnBZ7G76ez7jEMlRtwg6yB3FgtD_pNobhTG4666Z-UENTI"
        title="2021 Mercedes-AMG G 63"
        details="22k miles • Obsidian Black"
        price="$189,000"
      />
    </div>
  </section>
);

const ValueProp = () => (
  <section className="bg-zinc-50 py-32 overflow-hidden">
    <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
      <div className="relative">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl z-20 relative"
        >
          <img 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCnm7sw7g3leGBJfFAY59X3bfDTbQ_Lk_Gx-WMuW6Dh1TxZrfPxwPJ5Fxhp6HJGW_IHyxdUDYcvRHvah4rboX9ZRaiiao_BcP2mXzsprKqKMrAoV92YOgReifx5_Qug5HEF4rEeBOvVUaW_auumaQGprDn-NxAS8OgkUKE_FsPtJEJ0YKfKRKQn2c3MBu5dg8_svUBo3Ab75eSjJS1DsplkqG0tDCHCuxCQKA0PVNyP-UgH2mHWL6ICQVoSJAno3fFu-ESD5Pl5-Z0" 
            alt="Showroom" 
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover" 
          />
        </motion.div>
        <div className="absolute -bottom-12 -right-12 w-2/3 aspect-video bg-primary-container rounded-3xl shadow-xl z-10 flex items-center justify-center p-8">
          <div className="text-white">
            <span className="block text-4xl font-black mb-2">100%</span>
            <p className="font-headline text-sm uppercase tracking-widest font-bold">Verification guarantee on every listing</p>
          </div>
        </div>
      </div>
      
      <div className="pl-0 md:pl-12">
        <h2 className="font-headline text-4xl md:text-5xl font-extrabold tracking-tighter text-zinc-900 mb-8 leading-tight">
          We don't just sell cars. We curate <span className="text-primary italic">legacies</span>.
        </h2>
        
        <div className="space-y-8">
          {[
            { 
              icon: <ShieldCheck className="text-primary" />, 
              title: 'Precision Vetted', 
              desc: 'Every vehicle undergoes a 250-point mechanical and aesthetic inspection by certified specialists.' 
            },
            { 
              icon: <CreditCard className="text-primary" />, 
              title: 'Transparent Pricing', 
              desc: 'No hidden fees, no dealership markups. The price you see is the final price for your next masterpiece.' 
            },
            { 
              icon: <Truck className="text-primary" />, 
              title: 'White-Glove Delivery', 
              desc: 'Enclosed transport direct to your residence, anywhere in the continental United States.' 
            },
          ].map((item, i) => (
            <div key={i} className="flex gap-6">
              <div className="flex-shrink-0 w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center">
                {item.icon}
              </div>
              <div>
                <h4 className="font-bold text-lg mb-1 text-zinc-900">{item.title}</h4>
                <p className="text-tertiary text-sm leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

const Newsletter = () => (
  <section className="max-w-5xl mx-auto px-6 py-24 text-center">
    <div className="bg-primary p-12 md:p-20 rounded-[3rem] relative overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full -mr-32 -mt-32"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white rounded-full -ml-24 -mb-24"></div>
      </div>
      <div className="relative z-10">
        <h2 className="font-headline text-3xl md:text-5xl font-black text-white mb-6">Join the Inner Circle</h2>
        <p className="text-white/80 text-lg mb-10 max-w-xl mx-auto">Get early access to off-market inventory and exclusive automotive market insights.</p>
        <div className="flex flex-col md:flex-row gap-4 max-w-lg mx-auto">
          <input 
            className="flex-grow bg-white/10 border border-white/20 rounded-2xl px-6 py-4 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/30 transition-all" 
            placeholder="Your professional email" 
            type="email"
          />
          <button className="bg-white text-primary font-bold px-8 py-4 rounded-2xl hover:bg-zinc-100 transition-all active:scale-95">
            Subscribe
          </button>
        </div>
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="w-full py-20 px-6 bg-white border-t border-zinc-100">
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
      <div className="col-span-1">
        <div className="text-xl font-black text-zinc-900 mb-6">Precision Curator</div>
        <p className="text-sm text-zinc-500 leading-relaxed">
          © 2024 Precision Curator. All rights reserved. Professional Grade Automotive Marketplace.
        </p>
      </div>
      {[
        { 
          title: 'Marketplace', 
          links: ['Browse Inventory', 'Sell Your Vehicle', 'Certified Partners'] 
        },
        { 
          title: 'Resources', 
          links: ['Market Reports', 'Financing Guide', 'Contact Support'] 
        },
        { 
          title: 'Legal', 
          links: ['Privacy Policy', 'Terms of Service', 'Cookie Settings'] 
        },
      ].map((col, i) => (
        <div key={i}>
          <h5 className="text-zinc-900 font-bold text-sm mb-6 uppercase tracking-widest">{col.title}</h5>
          <ul className="space-y-4">
            {col.links.map((link, j) => (
              <li key={j}>
                <a href="#" className="text-sm text-zinc-500 hover:text-primary transition-colors">{link}</a>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  </footer>
);

export default function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <CuratedArrivals />
        <ValueProp />
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
}
