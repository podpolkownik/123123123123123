import React, { useState, useEffect } from 'react';
import { Brain, Target, Shield, Zap, BarChart3, Clock, Globe, Award, Cpu, Database, TrendingUp, Lock } from 'lucide-react';

const Features = () => {
  const [activeFeature, setActiveFeature] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const mainFeatures = [
    {
      icon: Brain,
      title: 'Deep Machine Learning',
      description: 'AI analyzes over 10,000 parameters for each match',
      details: 'Our neural network is trained on 15 years of data and constantly improving',
      color: 'from-purple-500 to-indigo-600',
      stats: ['10,000+ parameters', '15 years of data', '24/7 learning']
    },
    {
      icon: Target,
      title: 'Ultra-Precise Predictions',
      description: '89% successful predictions verified independently',
      details: 'Each prediction undergoes multi-level verification with detailed reasoning',
      color: 'from-emerald-500 to-green-600',
      stats: ['89% accuracy', 'Independent verification', 'Detailed analysis']
    },
    {
      icon: BarChart3,
      title: 'Real-Time Analytics',
      description: 'Instant updates on odds and lineup changes',
      details: 'Get notifications about important changes that could affect match outcomes',
      color: 'from-blue-500 to-cyan-600',
      stats: ['Real-time data', 'Push notifications', 'Auto-updates']
    },
    {
      icon: Shield,
      title: 'Maximum Security',
      description: 'Bank-level protection for your data and funds',
      details: 'We use AES-256 encryption and never share data with third parties',
      color: 'from-red-500 to-pink-600',
      stats: ['AES-256 encryption', 'Privacy protection', 'Secure payments']
    }
  ];

  const additionalFeatures = [
    { icon: Clock, title: '24/7 Support', description: 'Round-the-clock expert technical support', color: 'from-orange-500 to-red-500' },
    { icon: Globe, title: '50+ World Leagues', description: 'Predictions for all top championships worldwide', color: 'from-green-500 to-emerald-500' },
    { icon: Award, title: 'Quality Guarantee', description: 'Money back for unsatisfactory results', color: 'from-yellow-500 to-orange-500' },
    { icon: Zap, title: 'Instant Notifications', description: 'Push notifications for new predictions and changes', color: 'from-purple-500 to-pink-500' },
    { icon: Cpu, title: 'Quantum Computing', description: 'Using quantum algorithms for analysis', color: 'from-blue-500 to-purple-500' },
    { icon: Database, title: 'Big Data', description: 'Processing petabytes of sports statistics', color: 'from-cyan-500 to-blue-500' },
    { icon: TrendingUp, title: 'Predictive Analytics', description: 'Forecasting trends and patterns in sports', color: 'from-emerald-500 to-cyan-500' },
    { icon: Lock, title: 'Data Privacy', description: 'Complete confidentiality of your strategies', color: 'from-gray-500 to-gray-700' }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const section = document.getElementById('features');
    if (section) observer.observe(section);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % mainFeatures.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="features" className="py-12 sm:py-16 lg:py-24 bg-gradient-to-br from-gray-50 via-white to-blue-50 relative overflow-hidden">
      {/* Enhanced Background */}
      <div className="absolute inset-0">
        <div className="absolute top-10 sm:top-20 left-5 sm:left-10 w-48 h-48 sm:w-96 sm:h-96 bg-emerald-200/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-10 sm:bottom-20 right-5 sm:right-10 w-64 h-64 sm:w-[500px] sm:h-[500px] bg-blue-200/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/3 w-32 h-32 sm:w-64 sm:h-64 bg-purple-200/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Enhanced Header */}
        <div className={`text-center mb-12 sm:mb-16 lg:mb-20 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <div className="inline-flex items-center space-x-2 sm:space-x-3 bg-gradient-to-r from-emerald-100 to-blue-100 text-gray-800 px-4 py-2 sm:px-6 sm:py-3 rounded-full text-xs sm:text-sm font-bold mb-6 sm:mb-8 border border-emerald-200 shadow-lg">
            <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-emerald-500 to-blue-600 rounded-full flex items-center justify-center">
              <Brain className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
            </div>
            <span>Advanced Technologies</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-7xl font-black text-gray-900 mb-6 sm:mb-8 leading-tight">
            Why Choose
            <span className="block bg-gradient-to-r from-emerald-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
              BetSignal?
            </span>
          </h2>
          <p className="text-base sm:text-xl lg:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Revolutionary AI technologies for the most accurate predictions
            <span className="block text-sm sm:text-lg text-gray-500 mt-2">
              Every prediction is the result of analyzing millions of data points
            </span>
          </p>
        </div>

        {/* Enhanced Main Features - Mobile optimized */}
        <div className="mb-16 sm:mb-20 lg:mb-24">
          <div className="grid gap-6 sm:gap-8 lg:grid-cols-2">
            {mainFeatures.map((feature, index) => {
              const IconComponent = feature.icon;
              const isActive = index === activeFeature;
              
              return (
                <div
                  key={index}
                  className={`p-6 sm:p-8 rounded-2xl sm:rounded-3xl border-2 transition-all duration-500 cursor-pointer group ${
                    isActive 
                      ? 'border-emerald-300 bg-gradient-to-br from-white to-emerald-50 shadow-2xl scale-102 sm:scale-105' 
                      : 'border-gray-200 bg-white/80 backdrop-blur-sm hover:border-gray-300 hover:shadow-xl hover:scale-102'
                  }`}
                  onClick={() => setActiveFeature(index)}
                >
                  <div className="flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-6">
                    <div className={`w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl flex items-center justify-center bg-gradient-to-r ${feature.color} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <IconComponent className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 sm:mb-3">{feature.title}</h3>
                      <p className="text-gray-600 mb-3 sm:mb-4 text-base sm:text-lg">{feature.description}</p>
                      {isActive && (
                        <div className="animate-fade-in-up">
                          <p className="text-gray-500 mb-3 sm:mb-4 text-sm sm:text-base">{feature.details}</p>
                          <div className="flex flex-wrap gap-2">
                            {feature.stats.map((stat, statIndex) => (
                              <span key={statIndex} className="bg-emerald-100 text-emerald-800 px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm font-semibold">
                                {stat}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Enhanced Additional Features Grid - Mobile optimized */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12 sm:mb-16">
          {additionalFeatures.map((feature, index) => {
            const IconComponent = feature.icon;
            
            return (
              <div
                key={index}
                className={`group text-center p-4 sm:p-6 lg:p-8 bg-white/90 backdrop-blur-sm rounded-2xl sm:rounded-3xl border border-gray-200 hover:border-emerald-300 hover:shadow-2xl transition-all duration-300 transform hover:scale-105 ${
                  isVisible ? 'animate-fade-in-up' : 'opacity-0'
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className={`w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r ${feature.color} rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <IconComponent className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2 sm:mb-3 text-sm sm:text-lg">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed text-xs sm:text-base">{feature.description}</p>
              </div>
            );
          })}
        </div>

        {/* Technology Showcase - Mobile optimized */}
        <div className="bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-12 text-white text-center">
          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6">Future Technologies Today</h3>
          <p className="text-base sm:text-xl text-blue-100 mb-6 sm:mb-8 max-w-3xl mx-auto">
            We use the most advanced achievements in AI, machine learning and data analysis
          </p>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-black text-emerald-400 mb-1 sm:mb-2">99.9%</div>
              <div className="text-blue-200 text-xs sm:text-base">Uptime</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-black text-blue-400 mb-1 sm:mb-2">{'< 1sec'}</div>
              <div className="text-blue-200 text-xs sm:text-base">Analysis Time</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-black text-purple-400 mb-1 sm:mb-2">10PB</div>
              <div className="text-blue-200 text-xs sm:text-base">Data Processed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-black text-yellow-400 mb-1 sm:mb-2">24/7</div>
              <div className="text-blue-200 text-xs sm:text-base">Monitoring</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;