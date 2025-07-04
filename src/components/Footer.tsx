import React from 'react';
import { TrendingUp, Mail, Phone, MessageCircle, Instagram, Shield, Award, Clock } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    product: [
      { name: 'Features', href: '#features' },
      { name: 'Results', href: '#results' },
      { name: 'Pricing', href: '#pricing' },
      { name: 'Mobile App', href: '#' }
    ],
    support: [
      { name: 'Help Center', href: '#' },
      { name: 'FAQ', href: '#' },
      { name: 'Contact Us', href: '#' },
      { name: 'System Status', href: '#' }
    ],
    legal: [
      { name: 'Terms of Service', href: '#' },
      { name: 'Privacy Policy', href: '#' },
      { name: 'Responsible Gaming', href: '#' },
      { name: 'Refund Policy', href: '#' }
    ]
  };

  const socialLinks = [
    { icon: MessageCircle, href: '#', label: 'Telegram', color: 'hover:bg-blue-500' },
    { icon: Instagram, href: '#', label: 'Instagram', color: 'hover:bg-pink-500' },
    { icon: Mail, href: '#', label: 'Email', color: 'hover:bg-emerald-500' }
  ];

  const trustIndicators = [
    { icon: Shield, text: 'SSL Encryption' },
    { icon: Award, text: '89% Accuracy' },
    { icon: Clock, text: '24/7 Support' }
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-12 sm:py-16">
          <div className="grid gap-8 lg:grid-cols-4">
            {/* Brand Section */}
            <div className="lg:col-span-1">
              <div className="flex items-center space-x-2 sm:space-x-3 mb-4 sm:mb-6">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-emerald-500 to-blue-600 rounded-lg sm:rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 sm:w-7 sm:h-7 text-white" />
                </div>
                <span className="text-xl sm:text-2xl font-bold">BetSignal</span>
              </div>
              
              <p className="text-gray-400 mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">
                Advanced AI technologies for accurate sports predictions. 
                Helping clients earn from betting since 2020.
              </p>

              {/* Trust Indicators */}
              <div className="space-y-2 sm:space-y-3">
                {trustIndicators.map((indicator, index) => {
                  const IconComponent = indicator.icon;
                  return (
                    <div key={index} className="flex items-center space-x-2 text-xs sm:text-sm text-gray-400">
                      <IconComponent className="w-3 h-3 sm:w-4 sm:h-4 text-emerald-400" />
                      <span>{indicator.text}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Links Sections */}
            <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
              <div>
                <h3 className="font-bold text-base sm:text-lg mb-3 sm:mb-4">Product</h3>
                <ul className="space-y-2 sm:space-y-3">
                  {footerLinks.product.map((link, index) => (
                    <li key={index}>
                      <a 
                        href={link.href} 
                        className="text-gray-400 hover:text-emerald-400 transition-colors duration-200 text-sm sm:text-base"
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="font-bold text-base sm:text-lg mb-3 sm:mb-4">Support</h3>
                <ul className="space-y-2 sm:space-y-3">
                  {footerLinks.support.map((link, index) => (
                    <li key={index}>
                      <a 
                        href={link.href} 
                        className="text-gray-400 hover:text-emerald-400 transition-colors duration-200 text-sm sm:text-base"
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="font-bold text-base sm:text-lg mb-3 sm:mb-4">Legal</h3>
                <ul className="space-y-2 sm:space-y-3">
                  {footerLinks.legal.map((link, index) => (
                    <li key={index}>
                      <a 
                        href={link.href} 
                        className="text-gray-400 hover:text-emerald-400 transition-colors duration-200 text-sm sm:text-base"
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Contact Section */}
            <div className="lg:col-span-1">
              <h3 className="font-bold text-base sm:text-lg mb-3 sm:mb-4">Contact Us</h3>
              
              <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
                <div className="flex items-center space-x-2 sm:space-x-3 text-gray-400 text-sm sm:text-base">
                  <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400" />
                  <span>+1 (800) 123-45-67</span>
                </div>
                <div className="flex items-center space-x-2 sm:space-x-3 text-gray-400 text-sm sm:text-base">
                  <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400" />
                  <span>support@betsignal.com</span>
                </div>
                <div className="flex items-center space-x-2 sm:space-x-3 text-gray-400 text-sm sm:text-base">
                  <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400" />
                  <span>@BetSignalSupport</span>
                </div>
              </div>

              {/* Social Links */}
              <div>
                <h4 className="font-semibold mb-2 sm:mb-3 text-sm sm:text-base">Follow Us</h4>
                <div className="flex space-x-2 sm:space-x-3">
                  {socialLinks.map((social, index) => {
                    const IconComponent = social.icon;
                    return (
                      <a
                        key={index}
                        href={social.href}
                        className={`w-8 h-8 sm:w-10 sm:h-10 bg-gray-800 rounded-lg flex items-center justify-center text-gray-400 hover:text-white transition-all duration-200 ${social.color}`}
                        aria-label={social.label}
                      >
                        <IconComponent className="w-4 h-4 sm:w-5 sm:h-5" />
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Legal Disclaimer */}
        <div className="border-t border-gray-800 py-6 sm:py-8">
          <div className="bg-yellow-900/20 border border-yellow-600/30 rounded-lg sm:rounded-xl p-4 sm:p-6 mb-6 sm:mb-8">
            <div className="flex items-start space-x-2 sm:space-x-3">
              <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400 mt-1 flex-shrink-0" />
              <div className="text-xs sm:text-sm text-yellow-200 leading-relaxed">
                <strong className="text-yellow-100">Important Warning:</strong> Sports betting involves financial risks. 
                Past results do not guarantee future profits. Our 89% accuracy is based on historical data. 
                Play responsibly and only bet amounts you can afford to lose. 
                Participation is prohibited for persons under 18 years of age. Follow the laws of your jurisdiction.
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center space-y-3 md:space-y-0">
            <div className="text-gray-400 text-xs sm:text-sm">
              © {currentYear} BetSignal. All rights reserved.
            </div>
            
            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4 lg:space-x-6 text-xs sm:text-sm text-gray-400">
              <span>Made with ❤️ in USA</span>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                <span>System Online</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;