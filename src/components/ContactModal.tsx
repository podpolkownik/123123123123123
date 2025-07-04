import React, { useState, useEffect } from 'react';
import { X, MessageCircle, Mail, Phone, Instagram, Send, CheckCircle, ChevronDown } from 'lucide-react';
import { sendTelegramNotification, retryFailedNotifications, getDeviceInfo } from '../utils/telegramNotifications';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    messenger: 'whatsapp',
    contact: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [modalOpenTime, setModalOpenTime] = useState<number | null>(null);
  const [userInteracted, setUserInteracted] = useState(false);

  const messengers = [
    { id: 'whatsapp', name: 'WhatsApp', icon: MessageCircle, placeholder: '+1234567890', color: 'from-green-500 to-green-600' },
    { id: 'telegram', name: 'Telegram', icon: Send, placeholder: '@username or +1234567890', color: 'from-blue-500 to-blue-600' },
    { id: 'email', name: 'Email', icon: Mail, placeholder: 'your@email.com', color: 'from-purple-500 to-purple-600' },
    { id: 'phone', name: 'Phone', icon: Phone, placeholder: '+1234567890', color: 'from-orange-500 to-orange-600' }
  ];

  const socialLinks = [
    { 
      name: 'WhatsApp', 
      icon: MessageCircle, 
      url: 'https://wa.me/+46722600461?text=GET%20FREE%20PREDICTION',
      color: 'from-green-500 to-green-600'
    },
    { 
      name: 'Telegram', 
      icon: Send, 
      url: 'https://t.me/Bet_Signal_Vip_bot',
      color: 'from-blue-500 to-blue-600'
    },
    { 
      name: 'Instagram', 
      icon: Instagram, 
      url: 'https://www.instagram.com/bet.signal/',
      color: 'from-pink-500 to-purple-600'
    }
  ];

  // Функция для отправки уведомления о неудавшемся лиде
  const sendFailedLeadNotification = async (leadData: any) => {
    console.log('🚨 НЕУДАВШИЙСЯ ЛИД:', {
      ...leadData,
      timestamp: new Date().toISOString()
    });
    
    // Отправляем в Telegram
    await sendTelegramNotification({
      type: 'failed_lead',
      data: leadData
    });
  };

  // Отслеживаем открытие модального окна
  useEffect(() => {
    if (isOpen) {
      const openTime = Date.now();
      setModalOpenTime(openTime);
      setUserInteracted(false);
      
      const deviceInfo = getDeviceInfo();
      
      // Сохраняем информацию об открытии модального окна
      const leadTrackingData = {
        modalOpenedAt: openTime,
        sessionId: `session_${openTime}_${Math.random().toString(36).substr(2, 9)}`,
        userAgent: deviceInfo.userAgent,
        isMobile: deviceInfo.isMobile,
        deviceType: deviceInfo.deviceType,
        url: window.location.href,
        referrer: document.referrer,
        status: 'modal_opened'
      };
      
      localStorage.setItem('betSignalLeadTracking', JSON.stringify(leadTrackingData));
      
      console.log('📊 МОДАЛЬНОЕ ОКНО ОТКРЫТО:', leadTrackingData);
      
      // Отправляем уведомление в Telegram о открытии модального окна
      sendTelegramNotification({
        type: 'modal_opened',
        data: leadTrackingData
      });
      
      // Пытаемся повторно отправить неудавшиеся уведомления
      retryFailedNotifications();
      
    } else {
      // Когда модальное окно закрывается
      if (modalOpenTime && !isSubmitted) {
        const trackingData = localStorage.getItem('betSignalLeadTracking');
        if (trackingData) {
          const parsedData = JSON.parse(trackingData);
          const timeSpent = Date.now() - modalOpenTime;
          
          const failedLeadData = {
            ...parsedData,
            modalClosedAt: Date.now(),
            timeSpentInModal: timeSpent,
            userInteracted,
            formData: formData.contact ? formData : null,
            status: 'failed_lead',
            reason: userInteracted ? 'closed_after_interaction' : 'closed_without_interaction'
          };
          
          sendFailedLeadNotification(failedLeadData);
          localStorage.removeItem('betSignalLeadTracking');
        }
      }
      
      setModalOpenTime(null);
      setUserInteracted(false);
    }
  }, [isOpen, isSubmitted, modalOpenTime, userInteracted, formData]);

  // Проверяем состояние успешного лида при загрузке компонента
  useEffect(() => {
    const checkLeadStatus = () => {
      const leadData = localStorage.getItem('betSignalLead');
      if (leadData) {
        try {
          const parsedData = JSON.parse(leadData);
          const now = Date.now();
          
          // Проверяем, не истек ли срок показа success экрана (5 минут)
          if (parsedData.submittedAt && (now - parsedData.submittedAt) < 5 * 60 * 1000) {
            setIsSubmitted(true);
            setFormData(parsedData.formData || { messenger: 'whatsapp', contact: '' });
            
            // Автоматически закрываем через оставшееся время
            const remainingTime = 5 * 60 * 1000 - (now - parsedData.submittedAt);
            setTimeout(() => {
              setIsSubmitted(false);
              localStorage.removeItem('betSignalLead');
              onClose();
            }, remainingTime);
          } else {
            // Если время истекло, очищаем данные
            localStorage.removeItem('betSignalLead');
          }
        } catch (error) {
          console.error('Error parsing lead data:', error);
          localStorage.removeItem('betSignalLead');
        }
      }
    };

    if (isOpen) {
      checkLeadStatus();
    }
  }, [isOpen, onClose]);

  // Отслеживаем закрытие браузера/вкладки
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      const trackingData = localStorage.getItem('betSignalLeadTracking');
      const leadData = localStorage.getItem('betSignalLead');
      
      // Если есть активное отслеживание модального окна (неудавшийся лид)
      if (trackingData && !isSubmitted) {
        const parsedData = JSON.parse(trackingData);
        const timeSpent = modalOpenTime ? Date.now() - modalOpenTime : 0;
        
        const failedLeadData = {
          ...parsedData,
          browserClosedAt: Date.now(),
          timeSpentInModal: timeSpent,
          userInteracted,
          formData: formData.contact ? formData : null,
          status: 'failed_lead',
          reason: 'browser_closed'
        };
        
        // Используем sendBeacon для надежной отправки при закрытии браузера
        if (navigator.sendBeacon) {
          const blob = new Blob([JSON.stringify(failedLeadData)], { type: 'application/json' });
          navigator.sendBeacon('/api/failed-leads', blob);
        }
        
        sendFailedLeadNotification(failedLeadData);
        localStorage.removeItem('betSignalLeadTracking');
      }
      
      // Если есть успешный лид, предупреждаем пользователя
      if (leadData && isSubmitted) {
        e.preventDefault();
        e.returnValue = 'You have a pending prediction request. Are you sure you want to leave?';
        return e.returnValue;
      }
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        const trackingData = localStorage.getItem('betSignalLeadTracking');
        
        // Если пользователь переключился на другую вкладку с открытым модальным окном
        if (trackingData && isOpen && !isSubmitted) {
          const parsedData = JSON.parse(trackingData);
          const timeSpent = modalOpenTime ? Date.now() - modalOpenTime : 0;
          
          const failedLeadData = {
            ...parsedData,
            tabSwitchedAt: Date.now(),
            timeSpentInModal: timeSpent,
            userInteracted,
            formData: formData.contact ? formData : null,
            status: 'failed_lead',
            reason: 'tab_switched'
          };
          
          sendFailedLeadNotification(failedLeadData);
          localStorage.setItem('betSignalLeadTracking', JSON.stringify({
            ...parsedData,
            tabSwitched: true
          }));
        }
        
        // Сохраняем состояние успешного лида
        const leadData = localStorage.getItem('betSignalLead');
        if (leadData && isSubmitted) {
          const parsedData = JSON.parse(leadData);
          localStorage.setItem('betSignalLead', JSON.stringify({
            ...parsedData,
            lastSeen: Date.now()
          }));
        }
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [isSubmitted, isOpen, modalOpenTime, userInteracted, formData]);

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (!formData.contact.trim()) {
      newErrors.contact = 'Contact information is required';
    } else {
      // Basic validation based on messenger type
      if (formData.messenger === 'email' && !formData.contact.includes('@')) {
        newErrors.contact = 'Please enter a valid email address';
      }
      if ((formData.messenger === 'whatsapp' || formData.messenger === 'phone') && 
          !formData.contact.match(/^\+?[\d\s\-\(\)]+$/)) {
        newErrors.contact = 'Please enter a valid phone number';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      const deviceInfo = getDeviceInfo();
      
      const submissionData = {
        formData,
        submittedAt: Date.now(),
        id: `lead_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        deviceInfo,
        url: window.location.href,
        referrer: document.referrer
      };

      // Сохраняем данные успешного лида в localStorage
      localStorage.setItem('betSignalLead', JSON.stringify(submissionData));
      
      // Удаляем отслеживание неудавшегося лида, так как лид успешен
      localStorage.removeItem('betSignalLeadTracking');
      
      // Отправляем данные на сервер и в Telegram
      console.log('✅ УСПЕШНЫЙ ЛИД:', submissionData);
      
      // Отправляем уведомление в Telegram о успешном лиде
      await sendTelegramNotification({
        type: 'successful_lead',
        data: submissionData
      });

      setIsSubmitted(true);
      
      // Автоматически закрываем через 5 минут и очищаем данные
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({ messenger: 'whatsapp', contact: '' });
        localStorage.removeItem('betSignalLead');
        onClose();
      }, 5 * 60 * 1000); // 5 минут
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setUserInteracted(true); // Отмечаем, что пользователь взаимодействовал с формой
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleMessengerSelect = (messengerId: string) => {
    setFormData(prev => ({ ...prev, messenger: messengerId }));
    setIsDropdownOpen(false);
    setUserInteracted(true); // Отмечаем взаимодействие
  };

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
    setUserInteracted(true); // Отмечаем взаимодействие
  };

  const handleClose = () => {
    // Если форма была отправлена, сохраняем состояние
    if (isSubmitted) {
      const leadData = localStorage.getItem('betSignalLead');
      if (leadData) {
        const parsedData = JSON.parse(leadData);
        localStorage.setItem('betSignalLead', JSON.stringify({
          ...parsedData,
          modalClosed: true,
          closedAt: Date.now()
        }));
      }
    }
    onClose();
  };

  const selectedMessenger = messengers.find(m => m.id === formData.messenger);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={handleClose}
      />
      
      {/* Modal */}
      <div className="relative bg-white rounded-3xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors duration-200 z-10"
        >
          <X className="w-5 h-5 text-gray-600" />
        </button>

        {!isSubmitted ? (
          // Form Content
          <div className="p-8">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <MessageCircle className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl font-black text-gray-900 mb-2">
                Get Access in
                <span className="block bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
                  3 Seconds!
                </span>
              </h2>
              <p className="text-gray-600">
                Choose your contact method and get your first prediction for free
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Messenger Selection - Compact Dropdown */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Contact Method *
                </label>
                
                {/* Custom Dropdown */}
                <div className="relative">
                  <button
                    type="button"
                    onClick={handleDropdownToggle}
                    className="w-full flex items-center justify-between p-4 bg-white border-2 border-gray-200 rounded-xl hover:border-emerald-300 focus:border-emerald-500 focus:outline-none transition-all duration-200"
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 bg-gradient-to-r ${selectedMessenger?.color} rounded-lg flex items-center justify-center shadow-md`}>
                        {selectedMessenger && <selectedMessenger.icon className="w-5 h-5 text-white" />}
                      </div>
                      <div className="text-left">
                        <div className="font-semibold text-gray-900">{selectedMessenger?.name}</div>
                        <div className="text-sm text-gray-500">Click to change</div>
                      </div>
                    </div>
                    <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${
                      isDropdownOpen ? 'rotate-180' : ''
                    }`} />
                  </button>

                  {/* Dropdown Menu */}
                  {isDropdownOpen && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-white border-2 border-gray-200 rounded-xl shadow-xl z-20 overflow-hidden">
                      {messengers.map((messenger) => {
                        const IconComponent = messenger.icon;
                        return (
                          <button
                            key={messenger.id}
                            type="button"
                            onClick={() => handleMessengerSelect(messenger.id)}
                            className={`w-full flex items-center space-x-3 p-4 hover:bg-gray-50 transition-colors duration-200 ${
                              formData.messenger === messenger.id ? 'bg-emerald-50 border-l-4 border-emerald-500' : ''
                            }`}
                          >
                            <div className={`w-10 h-10 bg-gradient-to-r ${messenger.color} rounded-lg flex items-center justify-center shadow-md`}>
                              <IconComponent className="w-5 h-5 text-white" />
                            </div>
                            <div className="text-left">
                              <div className="font-semibold text-gray-900">{messenger.name}</div>
                              <div className="text-sm text-gray-500">{messenger.placeholder}</div>
                            </div>
                            {formData.messenger === messenger.id && (
                              <div className="ml-auto w-2 h-2 bg-emerald-500 rounded-full"></div>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>

              {/* Contact Input - Clean without icons */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Your {selectedMessenger?.name} *
                </label>
                <input
                  type="text"
                  value={formData.contact}
                  onChange={(e) => handleInputChange('contact', e.target.value)}
                  placeholder={selectedMessenger?.placeholder}
                  className={`w-full px-4 py-4 rounded-xl border-2 transition-all duration-200 focus:outline-none text-lg ${
                    errors.contact 
                      ? 'border-red-300 focus:border-red-500' 
                      : 'border-gray-200 focus:border-emerald-500'
                  }`}
                />
                {errors.contact && (
                  <p className="text-red-500 text-sm mt-2">{errors.contact}</p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-emerald-500 to-blue-600 text-white py-4 rounded-xl font-bold text-lg hover:from-emerald-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Send & Start Earning 🚀
              </button>

              {/* Footer Text */}
              <p className="text-center text-sm text-gray-500 leading-relaxed">
                Your prediction will arrive in <span className="font-bold text-emerald-600">5 minutes</span> via your chosen messenger!
              </p>
            </form>
          </div>
        ) : (
          // Success Content
          <div className="p-8 text-center">
            {/* Success Icon */}
            <div className="w-20 h-20 bg-gradient-to-r from-emerald-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
              <CheckCircle className="w-10 h-10 text-white" />
            </div>

            {/* Success Message */}
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Excellent! Request Submitted 🎉
            </h3>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Your first prediction is being prepared!<br />
              Expect a message within 5 minutes.
            </p>

            {/* Social Links */}
            <div className="space-y-4">
              <p className="text-sm font-semibold text-gray-700 mb-4">
                Follow us on social media for exclusive content:
              </p>
              <div className="flex justify-center space-x-4">
                {socialLinks.map((social, index) => {
                  const IconComponent = social.icon;
                  return (
                    <a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-14 h-14 bg-gradient-to-r ${social.color} rounded-xl flex items-center justify-center text-white hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-xl`}
                    >
                      <IconComponent className="w-7 h-7" />
                    </a>
                  );
                })}
              </div>
              <p className="text-xs text-gray-500 mt-4">
                Get exclusive predictions and expert analysis
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactModal;