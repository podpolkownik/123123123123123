import React, { useState, useEffect, useRef } from 'react';
import { Star, TrendingUp, Shield, Award, Users, Clock, DollarSign, Quote } from 'lucide-react';
import ContactModal from './ContactModal';
import { sendTelegramNotification, getDeviceInfo } from '../utils/telegramNotifications';

const Testimonials = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [testimonialsVisible, setTestimonialsVisible] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const testimonials = [
    {
      name: 'Alex Peterson',
      location: 'New York, USA',
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      rating: 5,
      text: 'BetSignal completely changed my approach to betting. The AI predictions are incredibly accurate and the support team is always helpful.',
      profit: '$4,250',
      period: '3 months',
      verified: true
    },
    {
      name: 'Maria Silva',
      location: 'São Paulo, Brazil',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      rating: 5,
      text: 'I was skeptical at first, but the results speak for themselves. Consistent profits month after month.',
      profit: '$3,890',
      period: '2 months',
      verified: true
    },
    {
      name: 'David Kim',
      location: 'Seoul, South Korea',
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      rating: 5,
      text: 'The detailed analysis behind each prediction gives me confidence. Best investment I\'ve made this year.',
      profit: '$5,120',
      period: '4 months',
      verified: true
    },
    {
      name: 'Sophie Chen',
      location: 'Singapore',
      avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      rating: 5,
      text: 'Professional service with amazing results. The mobile app makes it easy to follow predictions anywhere.',
      profit: '$2,340',
      period: '6 weeks',
      verified: true
    },
    {
      name: 'Carlos Rodriguez',
      location: 'Madrid, Spain',
      avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      rating: 5,
      text: 'Elite plan subscriber here. The personal analyst feature is worth every penny. Highly recommended!',
      profit: '$6,680',
      period: '5 months',
      verified: true
    },
    {
      name: 'Emma Johnson',
      location: 'London, UK',
      avatar: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      rating: 5,
      text: 'Started small but now I\'m making consistent profits. The accuracy rate is impressive.',
      profit: '$1,950',
      period: '1 month',
      verified: true
    },
    {
      name: 'James Wilson',
      location: 'Toronto, Canada',
      avatar: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      rating: 5,
      text: 'The AI analysis is incredibly detailed. I\'ve never seen anything like this before.',
      profit: '$3,420',
      period: '2 months',
      verified: true
    },
    {
      name: 'Lisa Zhang',
      location: 'Hong Kong',
      avatar: 'https://images.pexels.com/photos/1181424/pexels-photo-1181424.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      rating: 5,
      text: 'Consistent results every month. The predictions are spot on most of the time.',
      profit: '$2,890',
      period: '7 weeks',
      verified: true
    }
  ];

  const stats = [
    { icon: Users, value: '15,000+', label: 'Happy Clients', color: 'from-purple-500 to-pink-500' },
    { icon: Award, value: '89%', label: 'Average Accuracy', color: 'from-purple-600 to-blue-500' },
    { icon: Shield, value: '$2.5M+', label: 'Total Client Profit', color: 'from-pink-500 to-purple-600' },
    { icon: Star, value: '4.9/5', label: 'Service Rating', color: 'from-purple-400 to-pink-400' }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2, rootMargin: '50px' }
    );

    const testimonialsObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTestimonialsVisible(true);
        }
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    const section = document.getElementById('testimonials');
    const testimonialsSection = document.getElementById('testimonials-cards');
    
    if (section) observer.observe(section);
    if (testimonialsSection) testimonialsObserver.observe(testimonialsSection);

    return () => {
      observer.disconnect();
      testimonialsObserver.disconnect();
    };
  }, []);

  // Функция для отслеживания нажатия кнопки открытия модалки
  const handleModalOpen = async (buttonType: string) => {
    const deviceInfo = getDeviceInfo();
    
    const buttonClickData = {
      buttonType, // 'start_earning', 'get_started_today'
      clickedAt: Date.now(),
      url: window.location.href,
      referrer: document.referrer,
      section: 'testimonials',
      ...deviceInfo,
      sessionId: `click_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    };
    
    console.log(`🔔 НАЖАТА КНОПКА: ${buttonType}`, buttonClickData);
    
    // Отправляем уведомление в Telegram о нажатии кнопки
    await sendTelegramNotification({
      type: 'modal_opened',
      data: {
        ...buttonClickData,
        modalOpenedAt: Date.now(),
        status: 'button_clicked_modal_opening'
      }
    });
    
    setIsModalOpen(true);
  };

  return (
    <>
      {/* What Our Clients Say Section - Dark Background */}
      <section id="testimonials" className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-[500px] h-[500px] bg-blue-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
          <div className="absolute top-1/2 left-1/3 w-72 h-72 bg-emerald-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }} />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Header */}
          <div className={`text-center mb-12 sm:mb-16 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4 sm:mb-6">
              What Our
              <span className="block bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
                Clients Say
              </span>
            </h2>
            <p className="text-base sm:text-xl text-purple-200 max-w-3xl mx-auto">
              Real reviews from real people who are already earning with BetSignal
            </p>
          </div>

          {/* Stats Grid - Responsive */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-12 sm:mb-16">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div 
                  key={index} 
                  className={`text-center p-3 sm:p-4 lg:p-6 bg-white/10 backdrop-blur-sm rounded-xl sm:rounded-2xl border border-purple-300/20 transition-all duration-500 hover:bg-white/20 hover:scale-105 ${
                    isVisible ? 'animate-fade-in-up' : 'opacity-0'
                  }`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className={`w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-gradient-to-r ${stat.color} rounded-lg sm:rounded-xl flex items-center justify-center mx-auto mb-2 sm:mb-3`}>
                    <IconComponent className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-white" />
                  </div>
                  <div className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-black text-white mb-1">{stat.value}</div>
                  <div className="text-purple-200 font-semibold text-xs sm:text-sm lg:text-base">{stat.label}</div>
                </div>
              );
            })}
          </div>

          {/* CTA */}
          <div className={`text-center transition-all duration-1000 delay-300 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl sm:rounded-3xl p-6 sm:p-8 text-white">
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-3 sm:mb-4">Become Our Next Success Story!</h3>
              <p className="text-sm sm:text-base lg:text-xl text-purple-100 mb-4 sm:mb-6">
                Join thousands of happy clients and start earning today
              </p>
              <button 
                onClick={() => handleModalOpen('start_earning')}
                className="bg-white text-gray-900 px-6 py-3 sm:px-8 sm:py-4 rounded-lg sm:rounded-xl text-sm sm:text-base lg:text-lg font-bold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-xl w-full sm:w-auto"
              >
                <span className="flex items-center justify-center space-x-2">
                  <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
                  <span>Start Earning</span>
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Client Reviews Section - Light Background with Swipe Navigation */}
      <section id="testimonials-cards" className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
        {/* Light Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-96 h-96 bg-emerald-200/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-[500px] h-[500px] bg-blue-200/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
          <div className="absolute top-1/2 left-1/3 w-72 h-72 bg-purple-200/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }} />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Header */}
          <div className={`text-center mb-12 sm:mb-16 transition-all duration-1000 ${
            testimonialsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-emerald-100 to-blue-100 text-gray-800 px-3 py-2 sm:px-4 sm:py-2 lg:px-6 lg:py-3 rounded-full text-xs sm:text-sm font-bold mb-4 sm:mb-6 lg:mb-8 border border-emerald-200 shadow-lg">
              <Quote className="w-3 h-3 sm:w-4 sm:h-4 text-emerald-600" />
              <span>Client Reviews</span>
            </div>
            
            <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-black text-gray-900 mb-3 sm:mb-4 lg:mb-6">
              Success Stories from
              <span className="block bg-gradient-to-r from-emerald-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
                Real Clients
              </span>
            </h2>
            <p className="text-sm sm:text-base lg:text-xl text-gray-600 max-w-3xl mx-auto">
              See how our AI predictions have transformed the betting experience for thousands of clients
            </p>
          </div>

          {/* Swipeable Testimonials Container */}
          <div className="relative mb-12 sm:mb-16">
            {/* Scroll hint for mobile */}
            <div className="block md:hidden text-center mb-4">
              <p className="text-sm text-gray-500 font-medium">
                👈 Swipe to see more reviews 👉
              </p>
            </div>

            {/* Testimonials Scroll Container */}
            <div 
              ref={scrollContainerRef}
              className="flex gap-6 overflow-x-auto scrollbar-hide pb-4 snap-x snap-mandatory"
              style={{
                scrollBehavior: 'smooth',
                WebkitOverflowScrolling: 'touch'
              }}
            >
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="group relative bg-gradient-to-br from-white via-gray-50 to-white rounded-3xl p-6 sm:p-8 border-2 border-gray-100 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:border-emerald-200 overflow-hidden flex-shrink-0 w-80 sm:w-96 snap-center"
                >
                  {/* Gradient Border Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 via-blue-600 to-purple-600 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" style={{ padding: '2px' }}>
                    <div className="bg-white rounded-3xl w-full h-full"></div>
                  </div>

                  {/* Floating Quote Icon */}
                  <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-r from-emerald-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg transform rotate-12 group-hover:rotate-0 transition-transform duration-500">
                    <Quote className="w-8 h-8 text-white" />
                  </div>

                  {/* User Avatar and Info */}
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="relative">
                      <img 
                        src={testimonial.avatar} 
                        alt={testimonial.name}
                        className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-3 border-emerald-200 shadow-lg group-hover:scale-110 transition-transform duration-300"
                      />
                      {testimonial.verified && (
                        <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center border-2 border-white shadow-lg">
                          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-black text-gray-900 text-lg sm:text-xl mb-1">{testimonial.name}</h4>
                      <p className="text-gray-500 text-sm font-semibold">{testimonial.location}</p>
                      {/* Rating Stars */}
                      <div className="flex space-x-1 mt-2">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Testimonial Text */}
                  <div className="mb-6">
                    <p className="text-gray-700 leading-relaxed text-base font-medium italic">
                      "{testimonial.text}"
                    </p>
                  </div>

                  {/* Profit and Time Badges */}
                  <div className="flex flex-wrap gap-3 justify-center">
                    <div className="flex items-center space-x-2 bg-gradient-to-r from-emerald-50 to-emerald-100 px-4 py-3 rounded-2xl border-2 border-emerald-200 shadow-md group-hover:shadow-lg transition-shadow duration-300">
                      <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center">
                        <DollarSign className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <div className="text-emerald-700 text-sm font-black">{testimonial.profit}</div>
                        <div className="text-emerald-600 text-xs font-semibold">Profit</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 bg-gradient-to-r from-blue-50 to-blue-100 px-4 py-3 rounded-2xl border-2 border-blue-200 shadow-md group-hover:shadow-lg transition-shadow duration-300">
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                        <Clock className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <div className="text-blue-700 text-sm font-black">{testimonial.period}</div>
                        <div className="text-blue-600 text-xs font-semibold">Period</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Scroll indicator for desktop */}
            <div className="hidden md:block text-center mt-6">
              <p className="text-sm text-gray-500 font-medium">
                ← Scroll horizontally to see more reviews →
              </p>
            </div>
          </div>

          {/* Bottom CTA */}
          <div className={`text-center transition-all duration-1000 delay-500 ${
            testimonialsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <div className="bg-gradient-to-r from-emerald-500 via-blue-600 to-purple-600 rounded-2xl sm:rounded-3xl p-6 sm:p-8 text-white">
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-3 sm:mb-4">Ready to Join Our Success Stories?</h3>
              <p className="text-sm sm:text-base lg:text-xl text-blue-100 mb-4 sm:mb-6">
                Start your journey to consistent profits with our AI-powered predictions
              </p>
              <button 
                onClick={() => handleModalOpen('get_started_today')}
                className="bg-white text-gray-900 px-6 py-3 sm:px-8 sm:py-4 rounded-lg sm:rounded-xl text-sm sm:text-base lg:text-lg font-bold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-xl w-full sm:w-auto"
              >
                <span className="flex items-center justify-center space-x-2">
                  <Star className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
                  <span>Get Started Today</span>
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Modal */}
      <ContactModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </>
  );
};

export default Testimonials;