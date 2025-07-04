import React, { useState } from 'react';
import { Plus, Minus, HelpCircle } from 'lucide-react';
import ContactModal from './ContactModal';
import { sendTelegramNotification, getDeviceInfo } from '../utils/telegramNotifications';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const faqs = [
    {
      question: 'How does your AI analysis work?',
      answer: 'Our artificial intelligence analyzes over 10,000 parameters for each match: team statistics, player form, weather conditions, head-to-head history, team motivation and much more. The algorithm learns from data over the last 10 years and constantly improves.'
    },
    {
      question: 'What is the accuracy of your predictions?',
      answer: 'The average accuracy of our predictions is 89.5%. This is confirmed by independent verification and statistics from our clients. We publish all results publicly and maintain honest statistics.'
    },
    {
      question: 'Can I get a refund?',
      answer: 'Yes, we provide a 30-day money back guarantee. If you are not satisfied with the quality of our predictions within the first month, we will refund your money without unnecessary questions.'
    },
    {
      question: 'How many predictions will I receive?',
      answer: 'The number of predictions depends on your chosen plan: Professional - 15 predictions per day, Elite - unlimited predictions. All predictions are high quality with detailed analysis.'
    },
    {
      question: 'What sports do you cover?',
      answer: 'We provide predictions for football, basketball, tennis, hockey, baseball and other popular sports. We cover over 50 leagues worldwide, including all top championships.'
    },
    {
      question: 'How quickly will I get access?',
      answer: 'Access is activated instantly after payment. You will immediately receive login and password for your personal account, as well as an invitation to the VIP Telegram channel with predictions.'
    },
    {
      question: 'Is there a mobile app?',
      answer: 'Yes, we have a convenient mobile app for iOS and Android. You can also receive predictions via Telegram channel and use the web version from any device.'
    },
    {
      question: 'What support is provided?',
      answer: 'We provide 24/7 support via chat, email and Telegram. Professional and Elite plan clients receive priority support and a personal manager.'
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // Функция для отслеживания нажатия кнопки открытия модалки
  const handleModalOpen = async (buttonType: string) => {
    const deviceInfo = getDeviceInfo();
    
    const buttonClickData = {
      buttonType, // 'contact_support', 'request_call'
      clickedAt: Date.now(),
      url: window.location.href,
      referrer: document.referrer,
      section: 'faq',
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
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12 sm:mb-16">
            <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold mb-4 sm:mb-6">
              <HelpCircle className="w-3 h-3 sm:w-4 sm:h-4" />
              <span>Frequently Asked Questions</span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 mb-4 sm:mb-6">
              Have
              <span className="block bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
                Questions?
              </span>
            </h2>
            <p className="text-base sm:text-xl text-gray-600">
              We've collected answers to the most popular questions from our clients
            </p>
          </div>

          {/* FAQ Items */}
          <div className="space-y-3 sm:space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white border-2 border-gray-200 rounded-xl sm:rounded-2xl overflow-hidden hover:border-emerald-300 transition-all duration-300"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-4 py-4 sm:px-6 sm:py-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
                >
                  <span className="text-base sm:text-lg font-bold text-gray-900 pr-4">
                    {faq.question}
                  </span>
                  <div className={`w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-emerald-500 to-blue-600 rounded-full flex items-center justify-center transition-transform duration-300 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}>
                    {openIndex === index ? (
                      <Minus className="w-3 h-3 sm:w-5 sm:h-5 text-white" />
                    ) : (
                      <Plus className="w-3 h-3 sm:w-5 sm:h-5 text-white" />
                    )}
                  </div>
                </button>
                
                {openIndex === index && (
                  <div className="px-4 pb-4 sm:px-6 sm:pb-6">
                    <div className="border-t border-gray-200 pt-3 sm:pt-4">
                      <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Contact CTA */}
          <div className="mt-12 sm:mt-16 text-center">
            <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-gray-200">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">
                Didn't find the answer to your question?
              </h3>
              <p className="text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base">
                Our support team is ready to help you 24/7
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-4">
                <button 
                  onClick={() => handleModalOpen('contact_support')}
                  className="bg-gradient-to-r from-emerald-500 to-blue-600 text-white px-6 py-3 sm:px-8 sm:py-4 rounded-lg sm:rounded-xl font-bold hover:from-emerald-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg w-full sm:w-auto text-sm sm:text-base"
                >
                  Contact Support
                </button>
                <button 
                  onClick={() => handleModalOpen('request_call')}
                  className="bg-white text-gray-700 px-6 py-3 sm:px-8 sm:py-4 rounded-lg sm:rounded-xl font-bold border-2 border-gray-200 hover:border-emerald-300 hover:bg-emerald-50 transition-all duration-300 w-full sm:w-auto text-sm sm:text-base"
                >
                  Request a Call
                </button>
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

export default FAQ;