import React, { useState, useEffect } from 'react';
import { TrendingUp, Calendar, DollarSign, Crosshair, BarChart3, Users, Star, Trophy } from 'lucide-react';
import ContactModal from './ContactModal';
import { sendTelegramNotification, getDeviceInfo } from '../utils/telegramNotifications';

const Results = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentPeriod, setCurrentPeriod] = useState(0);
  const [animatedProfit, setAnimatedProfit] = useState(0);
  const [achievementsVisible, setAchievementsVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const periods = [
    { name: 'Today', profit: 1250, matches: 8, accuracy: 87 },
    { name: 'This Week', profit: 8750, matches: 45, accuracy: 89 },
    { name: 'This Month', profit: 32500, matches: 180, accuracy: 91 }
  ];

  const monthlyStats = [
    { month: 'Jan', profit: 28500, accuracy: 88, growth: 12 },
    { month: 'Feb', profit: 31200, accuracy: 90, growth: 15 },
    { month: 'Mar', profit: 29800, accuracy: 87, growth: 8 },
    { month: 'Apr', profit: 34500, accuracy: 92, growth: 22 },
    { month: 'May', profit: 32100, accuracy: 89, growth: 18 },
    { month: 'Jun', profit: 36800, accuracy: 91, growth: 28 }
  ];

  const achievements = [
    { icon: Crosshair, title: 'Best Accuracy', value: '94.2%', description: 'Record accuracy in April 2024', color: 'from-green-400 to-green-600' },
    { icon: Trophy, title: 'Maximum Profit', value: '$45,600', description: 'Best client month', color: 'from-blue-500 to-cyan-600' },
    { icon: Users, title: 'Happy Clients', value: '15,247', description: 'Active users', color: 'from-purple-500 to-pink-600' },
    { icon: Star, title: 'Average Rating', value: '4.9/5', description: 'Client rating', color: 'from-yellow-500 to-orange-500' }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1, rootMargin: '100px' }
    );

    const achievementsObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAchievementsVisible(true);
        }
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    const section = document.getElementById('results');
    const achievementsSection = document.getElementById('achievements');
    
    if (section) observer.observe(section);
    if (achievementsSection) achievementsObserver.observe(achievementsSection);

    return () => {
      observer.disconnect();
      achievementsObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    if (isVisible) {
      // Animate profit counter
      let start = 0;
      const target = periods[currentPeriod].profit;
      const duration = 2000;
      const increment = target / (duration / 16);
      
      const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
          setAnimatedProfit(target);
          clearInterval(timer);
        } else {
          setAnimatedProfit(Math.floor(start));
        }
      }, 16);

      return () => clearInterval(timer);
    }
  }, [currentPeriod, isVisible]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPeriod((prev) => (prev + 1) % periods.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const maxProfit = Math.max(...monthlyStats.map(stat => stat.profit));

  // Функция для отслеживания нажатия кнопки открытия модалки
  const handleModalOpen = async (buttonType: string) => {
    const deviceInfo = getDeviceInfo();
    
    const buttonClickData = {
      buttonType, // 'get_first_prediction_free', 'start_earning', 'get_started_today'
      clickedAt: Date.now(),
      url: window.location.href,
      referrer: document.referrer,
      section: 'results',
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
      <section id="results" className="py-12 sm:py-16 lg:py-24 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
        {/* Enhanced Background */}
        <div className="absolute inset-0">
          <div className="absolute top-10 sm:top-20 left-5 sm:left-10 w-48 h-48 sm:w-96 sm:h-96 bg-emerald-200/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-10 sm:bottom-20 right-5 sm:right-10 w-64 h-64 sm:w-[500px] sm:h-[500px] bg-blue-200/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
          <div className="absolute top-1/2 right-1/4 w-32 h-32 sm:w-72 sm:h-72 bg-purple-200/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }} />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Enhanced Header - Always visible */}
          <div className="text-center mb-12 sm:mb-16 lg:mb-20">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-7xl font-black text-gray-900 mb-6 sm:mb-8 leading-tight">
              Our Clients Have Earned
              <span className="block text-gray-900 drop-shadow-lg font-extrabold">
                Over <span className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent">$2.5</span> Million
              </span>
            </h2>
          </div>

          {/* Achievements Grid - Mobile optimized with staggered animation */}
          <div id="achievements" className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12 sm:mb-16">
            {achievements.map((achievement, index) => {
              const IconComponent = achievement.icon;
              
              return (
                <div
                  key={index}
                  className={`text-center p-4 sm:p-6 lg:p-8 bg-white/90 backdrop-blur-sm rounded-2xl sm:rounded-3xl border border-gray-200 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 ${
                    achievementsVisible ? 'animate-fade-in-up opacity-100' : 'opacity-0'
                  }`}
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <div className={`w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r ${achievement.color} rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-lg`}>
                    <IconComponent className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                  </div>
                  <div className="text-2xl sm:text-3xl font-black text-gray-900 mb-1 sm:mb-2">{achievement.value}</div>
                  <div className="font-bold text-gray-800 mb-1 sm:mb-2 text-sm sm:text-base">{achievement.title}</div>
                  <div className="text-xs sm:text-sm text-gray-600">{achievement.description}</div>
                </div>
              );
            })}
          </div>

          {/* CTA Section - Moved here */}
          <div className="text-center mb-12 sm:mb-16">
            <div className="bg-gradient-to-r from-emerald-500 via-blue-600 to-purple-600 rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-12 text-white relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 via-blue-700 to-purple-700 opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6">Ready to Start Earning?</h3>
                <p className="text-base sm:text-xl text-blue-100 mb-6 sm:mb-8 max-w-2xl mx-auto">
                  Join thousands of successful players and start getting stable profits today
                </p>
                <button 
                  onClick={() => handleModalOpen('get_first_prediction_free')}
                  className="bg-white text-gray-900 px-6 py-3 sm:px-8 sm:py-4 lg:px-10 lg:py-5 rounded-xl sm:rounded-2xl text-lg sm:text-xl font-bold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-2xl w-full sm:w-auto"
                >
                  Get Your First Prediction Free 💰
                </button>
              </div>
            </div>
          </div>

          {/* Enhanced Monthly Performance Chart - Mobile optimized */}
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-12 shadow-2xl border border-gray-200 mb-12 sm:mb-16">
            <div className="flex flex-col lg:flex-row items-center justify-between mb-8 sm:mb-12">
              <div className="text-center lg:text-left mb-4 lg:mb-0">
                <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">Monthly Profit Dynamics</h3>
                <p className="text-gray-600 text-base sm:text-lg">Stable profit growth for our clients</p>
              </div>
              <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4 lg:space-x-6 text-xs sm:text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 sm:w-4 sm:h-4 bg-gradient-to-r from-emerald-500 to-green-600 rounded-full"></div>
                  <span className="font-semibold">Profit</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 sm:w-4 sm:h-4 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-full"></div>
                  <span className="font-semibold">Accuracy</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 sm:w-4 sm:h-4 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full"></div>
                  <span className="font-semibold">Growth</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-6 gap-2 sm:gap-4 lg:gap-8">
              {monthlyStats.map((stat, index) => (
                <div key={index} className="text-center group">
                  <div className="relative mb-4 sm:mb-6 h-32 sm:h-40 lg:h-48 flex flex-col justify-end">
                    {/* Profit Bar */}
                    <div
                      className="bg-gradient-to-t from-emerald-500 to-emerald-400 rounded-t-lg sm:rounded-t-xl mx-auto transition-all duration-1000 group-hover:from-emerald-600 group-hover:to-emerald-500 shadow-lg"
                      style={{
                        width: '16px',
                        height: isVisible ? `${(stat.profit / maxProfit) * (window.innerWidth < 640 ? 100 : 160)}px` : '0px',
                        animationDelay: `${index * 200}ms`
                      }}
                    />
                    
                    {/* Accuracy Indicator */}
                    <div
                      className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mx-auto mt-2 transition-all duration-1000 shadow-md"
                      style={{
                        width: '8px',
                        height: '8px',
                        opacity: isVisible ? stat.accuracy / 100 : 0,
                        animationDelay: `${index * 200 + 500}ms`
                      }}
                    />
                    
                    {/* Growth Indicator */}
                    <div
                      className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mx-auto mt-1 transition-all duration-1000 shadow-md"
                      style={{
                        width: '6px',
                        height: '6px',
                        opacity: isVisible ? stat.growth / 30 : 0,
                        animationDelay: `${index * 200 + 800}ms`
                      }}
                    />
                  </div>
                  
                  <div className="space-y-1">
                    <div className="text-sm sm:text-lg font-bold text-gray-900">{stat.month}</div>
                    <div className="text-xs sm:text-sm font-bold text-emerald-600">${(stat.profit / 1000).toFixed(0)}K</div>
                    <div className="text-xs text-blue-600 font-semibold">{stat.accuracy}%</div>
                    <div className="text-xs text-purple-600 font-semibold">+{stat.growth}%</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary Stats - Mobile optimized */}
            <div className="mt-8 sm:mt-12 grid grid-cols-3 gap-4 sm:gap-6 lg:gap-8 pt-6 sm:pt-8 border-t border-gray-200">
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-black text-emerald-600 mb-1 sm:mb-2">
                  ${(monthlyStats.reduce((sum, stat) => sum + stat.profit, 0) / 1000).toFixed(0)}K
                </div>
                <div className="text-gray-600 font-semibold text-xs sm:text-base">Total Profit</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-black text-blue-600 mb-1 sm:mb-2">
                  {(monthlyStats.reduce((sum, stat) => sum + stat.accuracy, 0) / monthlyStats.length).toFixed(1)}%
                </div>
                <div className="text-gray-600 font-semibold text-xs sm:text-base">Avg Accuracy</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-black text-purple-600 mb-1 sm:mb-2">
                  +{(monthlyStats.reduce((sum, stat) => sum + stat.growth, 0) / monthlyStats.length).toFixed(0)}%
                </div>
                <div className="text-gray-600 font-semibold text-xs sm:text-base">Avg Growth</div>
              </div>
            </div>
          </div>

          {/* Enhanced Profit Counter - Mobile optimized with new button design moved below stats */}
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-12 shadow-2xl border border-gray-200">
            <div className="text-center mb-6 sm:mb-8">
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">Profit Statistics</h3>
              <div className="flex items-center justify-center space-x-2 bg-emerald-100 px-3 py-2 sm:px-4 sm:py-2 rounded-full inline-flex">
                <div className="w-2 h-2 sm:w-3 sm:h-3 bg-emerald-500 rounded-full animate-pulse"></div>
                <span className="text-emerald-700 text-xs sm:text-sm font-semibold">Updates Today</span>
              </div>
            </div>

            {/* Main Profit Display - Mobile optimized */}
            <div className="text-center mb-8 sm:mb-12">
              <div className="text-4xl sm:text-6xl lg:text-8xl font-black text-gray-900 mb-3 sm:mb-4">
                ${animatedProfit.toLocaleString()}
              </div>
              <div className="text-lg sm:text-2xl text-gray-600 mb-6 sm:mb-8">
                Profit for {periods[currentPeriod].name.toLowerCase()}
              </div>

              {/* Enhanced Stats Grid - Mobile optimized */}
              <div className="grid grid-cols-3 gap-4 sm:gap-6 lg:gap-8 max-w-2xl mx-auto mb-8 sm:mb-12">
                <div className="text-center p-3 sm:p-4 lg:p-6 bg-gradient-to-br from-emerald-50 to-green-50 rounded-xl sm:rounded-2xl border border-emerald-200">
                  <Crosshair className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-emerald-600 mx-auto mb-2 sm:mb-4" />
                  <div className="text-2xl sm:text-3xl lg:text-4xl font-black text-emerald-600 mb-1 sm:mb-2">{periods[currentPeriod].accuracy}%</div>
                  <div className="text-emerald-700 font-semibold text-xs sm:text-sm lg:text-base">Accuracy</div>
                </div>
                <div className="text-center p-3 sm:p-4 lg:p-6 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl sm:rounded-2xl border border-blue-200">
                  <BarChart3 className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-blue-600 mx-auto mb-2 sm:mb-4" />
                  <div className="text-2xl sm:text-3xl lg:text-4xl font-black text-blue-600 mb-1 sm:mb-2">{periods[currentPeriod].matches}</div>
                  <div className="text-blue-700 font-semibold text-xs sm:text-sm lg:text-base">Matches</div>
                </div>
                <div className="text-center p-3 sm:p-4 lg:p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl sm:rounded-2xl border border-purple-200">
                  <TrendingUp className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-purple-600 mx-auto mb-2 sm:mb-4" />
                  <div className="text-2xl sm:text-3xl lg:text-4xl font-black text-purple-600 mb-1 sm:mb-2">+{Math.round(periods[currentPeriod].profit / periods[currentPeriod].matches)}</div>
                  <div className="text-purple-700 font-semibold text-xs sm:text-sm lg:text-base">$/match</div>
                </div>
              </div>
            </div>

            {/* Period Selector moved below stats with new design */}
            <div className="flex justify-center">
              <div className="bg-gradient-to-r from-slate-100 via-gray-100 to-slate-100 p-1.5 rounded-2xl shadow-inner border border-gray-300">
                <div className="flex space-x-1">
                  {periods.map((period, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentPeriod(index)}
                      className={`relative px-4 py-2.5 sm:px-6 sm:py-3 rounded-xl font-bold transition-all duration-500 text-sm sm:text-base overflow-hidden group ${
                        index === currentPeriod
                          ? 'bg-gradient-to-r from-emerald-500 via-blue-600 to-purple-600 text-white shadow-lg transform scale-105'
                          : 'bg-white/90 text-gray-700 hover:bg-white hover:shadow-md hover:scale-102'
                      }`}
                    >
                      {/* Active glow effect */}
                      {index === currentPeriod && (
                        <div className="absolute -inset-1 bg-gradient-to-r from-emerald-400 via-blue-500 to-purple-500 opacity-30 blur-sm rounded-xl animate-pulse"></div>
                      )}
                      
                      {/* Hover shimmer for inactive buttons */}
                      {index !== currentPeriod && (
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out"></div>
                      )}
                      
                      <span className="relative z-10 flex items-center space-x-2">
                        {index === currentPeriod && (
                          <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></div>
                        )}
                        <span>{period.name}</span>
                      </span>
                    </button>
                  ))}
                </div>
              </div>
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

export default Results;