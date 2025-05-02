import React from 'react';
import { ShoppingBag, ArrowRight, Shield, Truck, HeadphonesIcon } from 'lucide-react';
import { Link} from 'react-router-dom';

function FirstPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950">
      {/* Navigation */}
      <nav className="container mx-auto px-6 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-white p-2 rounded-xl">
              <ShoppingBag className="h-8 w-8 text-slate-800" />
            </div>
            <span className="text-3xl font-bold text-white tracking-tight">E-COM</span>
          </div>
          <Link 
            to="/login"
            className="px-8 py-3 bg-white/10 backdrop-blur-lg text-white rounded-xl font-semibold hover:bg-white/20 transition-all border border-white/20"
          >
            Login
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="container mx-auto px-6 pt-12 pb-16">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
          <div className="flex-1 text-white">
            <div className="inline-flex items-center space-x-2 px-4 py-2 bg-white/10 rounded-full backdrop-blur-lg mb-8 border border-white/20">
              <span className="text-sm font-medium">🚀 Welcome to the Future of Shopping</span>
            </div>
            <h1 className="text-6xl lg:text-7xl font-bold leading-tight mb-8 bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-300">
              Elevate Your<br />
              Shopping Game
            </h1>
            <p className="text-xl text-white/80 mb-10 max-w-xl leading-relaxed">
              Experience the next generation of e-commerce. Premium products, seamless checkout, and lightning-fast delivery.
            </p>
            <Link
              to="/login"
              className="group inline-flex items-center space-x-3 px-8 py-4 bg-white text-slate-800 rounded-xl font-semibold hover:bg-opacity-90 transition-all shadow-lg hover:shadow-xl"
            >
              <span>Start Shopping</span>
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          <div className="flex-1 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-slate-800/20 to-transparent rounded-3xl transform rotate-3"></div>
            <img
              src="https://images.unsplash.com/photo-1607082349566-187342175e2f?auto=format&fit=crop&q=80&w=2000"
              alt="Premium Shopping Experience"
              className="rounded-3xl shadow-2xl transform -rotate-3 hover:rotate-0 transition-transform duration-500"
            />
          </div>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 mt-32">
          {[
            {
              icon: HeadphonesIcon,
              title: "24/7 Premium Support",
              description: "Our dedicated team is here to assist you around the clock with any questions or concerns."
            },
            {
              icon: Shield,
              title: "Secure Transactions",
              description: "Shop with confidence knowing your data is protected by enterprise-grade security."
            },
            {
              icon: Truck,
              title: "Express Delivery",
              description: "Lightning-fast shipping with real-time tracking and guaranteed delivery dates."
            }
          ].map((feature, index) => (
            <div key={index} className="p-8 rounded-2xl bg-white/10 backdrop-blur-lg border border-white/20 hover:bg-white/15 transition-colors">
              <div className="bg-white/20 w-12 h-12 rounded-xl flex items-center justify-center mb-6">
                <feature.icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-white">{feature.title}</h3>
              <p className="text-white/70 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default FirstPage;