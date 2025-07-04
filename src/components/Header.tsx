import React, { useState, useEffect } from 'react';
import { Menu, X, TrendingUp, Users, Zap } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showAIPowered, setShowAIPowered] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 20);
      
      // Show AI POWERED when user scrolls past the first section (around 800px)
      setShowAIPowered(scrollY > 800);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-slate-900/95 backdrop-blur-xl shadow-2xl border-b border-emerald-500/20' 
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20">
          {/* Enhanced Logo */}
          <div className="flex items-center space-x-2 sm:space-x-3 group">
            <div className="relative">
              <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-14 lg:h-14 bg-gradient-to-r from-emerald-500 via-blue-600 to-purple-600 rounded-lg sm:rounded-xl lg:rounded-2xl flex items-center justify-center shadow-2xl group-hover:scale-110 transition-all duration-300">
                <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 lg:w-8 lg:h-8 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 bg-emerald-400 rounded-full animate-pulse"></div>
            </div>
            <div className="flex flex-col">
              <span className="text-lg sm:text-2xl lg:text-3xl xl:text-4xl font-black bg-gradient-to-r from-emerald-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                BetSignal
              </span>
              {/* AI POWERED text that appears on scroll */}
              <span className={`text-xs sm:text-sm text-emerald-400 font-bold -mt-1 transition-all duration-500 ${
                showAIPowered ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'
              }`}>
                AI POWERED
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-4 lg:space-x-6 xl:space-x-8">
            <a href="#features" className="text-white/90 hover:text-emerald-400 font-semibold transition-colors text-sm lg:text-base relative group">
              Features
              <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-emerald-400 group-hover:w-full transition-all duration-300"></div>
            </a>
            <a href="#results" className="text-white/90 hover:text-emerald-400 font-semibold transition-colors text-sm lg:text-base relative group">
              Results
              <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-emerald-400 group-hover:w-full transition-all duration-300"></div>
            </a>
            <a href="#pricing" className="text-white/90 hover:text-emerald-400 font-semibold transition-colors text-sm lg:text-base relative group">
              Pricing
              <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-emerald-400 group-hover:w-full transition-all duration-300"></div>
            </a>
            <a href="#testimonials" className="text-white/90 hover:text-emerald-400 font-semibold transition-colors text-sm lg:text-base relative group">
              Reviews
              <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-emerald-400 group-hover:w-full transition-all duration-300"></div>
            </a>
          </nav>

          {/* Trust Indicators - Enhanced */}
          <div className="hidden lg:flex items-center space-x-3 xl:space-x-4">
            <div className="flex items-center space-x-2 bg-blue-500/20 backdrop-blur-sm px-3 py-2 rounded-lg border border-blue-400/30">
              <Users className="w-4 h-4 text-blue-400" />
              <span className="text-blue-300 text-sm font-bold">47K+ users</span>
            </div>
            <div className="flex items-center space-x-2 bg-purple-500/20 backdrop-blur-sm px-3 py-2 rounded-lg border border-purple-400/30">
              <Zap className="w-4 h-4 text-purple-400" />
              <span className="text-purple-300 text-sm font-bold">96% Win Rate</span>
            </div>
          </div>

          {/* Enhanced CTA Button */}
          <div className="hidden sm:block">
            <button className="bg-gradient-to-r from-emerald-500 via-blue-600 to-purple-600 text-white px-4 py-2 sm:px-6 sm:py-3 lg:px-8 lg:py-4 rounded-lg sm:rounded-xl text-sm lg:text-base font-black hover:shadow-2xl transition-all duration-300 transform hover:scale-105 relative overflow-hidden group">
              <span className="relative z-10">Get Started - $99</span>
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 via-blue-700 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg text-white hover:bg-white/10 backdrop-blur-sm"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Enhanced Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-slate-900/95 backdrop-blur-xl border-t border-white/10 py-6 rounded-b-2xl">
            <nav className="flex flex-col space-y-4">
              <a href="#features" className="text-white hover:text-emerald-400 font-semibold px-4 py-3 text-lg rounded-lg hover:bg-white/10 transition-all">
                Features
              </a>
              <a href="#results" className="text-white hover:text-emerald-400 font-semibold px-4 py-3 text-lg rounded-lg hover:bg-white/10 transition-all">
                Results
              </a>
              <a href="#pricing" className="text-white hover:text-emerald-400 font-semibold px-4 py-3 text-lg rounded-lg hover:bg-white/10 transition-all">
                Pricing
              </a>
              <a href="#testimonials" className="text-white hover:text-emerald-400 font-semibold px-4 py-3 text-lg rounded-lg hover:bg-white/10 transition-all">
                Reviews
              </a>
              <div className="px-4 pt-4">
                <button className="w-full bg-gradient-to-r from-emerald-500 via-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-black text-lg shadow-xl">
                  Get Started - $99
                </button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;