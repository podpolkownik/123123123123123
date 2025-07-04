// Telegram Bot API для отправки уведомлений
const TELEGRAM_BOT_TOKEN = 'YOUR_BOT_TOKEN'; // Замените на ваш токен бота
const TELEGRAM_CHAT_ID = 'YOUR_CHAT_ID'; // Замените на ваш chat ID

interface TelegramNotification {
  type: 'modal_opened' | 'failed_lead' | 'successful_lead';
  data: any;
}

export const sendTelegramNotification = async (notification: TelegramNotification) => {
  try {
    let message = '';
    
    switch (notification.type) {
      case 'modal_opened':
        message = `🔔 *МОДАЛЬНОЕ ОКНО ОТКРЫТО*\n\n` +
                 `⏰ Время: ${new Date(notification.data.modalOpenedAt).toLocaleString('ru-RU')}\n` +
                 `🌐 URL: ${notification.data.url}\n` +
                 `📱 Устройство: ${notification.data.isMobile ? 'Мобильное' : 'Десктоп'}\n` +
                 `🔗 Referrer: ${notification.data.referrer || 'Прямой переход'}\n` +
                 `🆔 Session ID: ${notification.data.sessionId}\n\n` +
                 `👀 *Пользователь смотрит на форму!*`;
        break;
        
      case 'failed_lead':
        const timeSpent = Math.round(notification.data.timeSpentInModal / 1000);
        const reasonEmoji = {
          'closed_after_interaction': '❌',
          'closed_without_interaction': '👻',
          'browser_closed': '🚪',
          'tab_switched': '🔄'
        };
        
        const reasonText = {
          'closed_after_interaction': 'Закрыл после взаимодействия',
          'closed_without_interaction': 'Закрыл без взаимодействия',
          'browser_closed': 'Закрыл браузер',
          'tab_switched': 'Переключил вкладку'
        };
        
        message = `🚨 *НЕУДАВШИЙСЯ ЛИД*\n\n` +
                 `${reasonEmoji[notification.data.reason as keyof typeof reasonEmoji]} Причина: ${reasonText[notification.data.reason as keyof typeof reasonText]}\n` +
                 `⏱️ Время в модалке: ${timeSpent} сек\n` +
                 `🤝 Взаимодействовал: ${notification.data.userInteracted ? 'Да ✅' : 'Нет ❌'}\n` +
                 `📝 Частично заполнил: ${notification.data.formData?.contact ? `"${notification.data.formData.contact}"` : 'Нет'}\n` +
                 `🌐 URL: ${notification.data.url}\n` +
                 `📱 Устройство: ${notification.data.isMobile ? 'Мобильное' : 'Десктоп'}\n` +
                 `🆔 Session ID: ${notification.data.sessionId}`;
        break;
        
      case 'successful_lead':
        message = `✅ *УСПЕШНЫЙ ЛИД!*\n\n` +
                 `🎉 *Новая заявка получена!*\n\n` +
                 `📞 Мессенджер: ${notification.data.formData.messenger.toUpperCase()}\n` +
                 `📱 Контакт: \`${notification.data.formData.contact}\`\n` +
                 `⏰ Время: ${new Date(notification.data.submittedAt).toLocaleString('ru-RU')}\n` +
                 `🆔 Lead ID: ${notification.data.id}\n\n` +
                 `💰 *Свяжитесь с клиентом!*`;
        break;
    }
    
    const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: message,
        parse_mode: 'Markdown',
        disable_web_page_preview: true
      })
    });
    
    if (!response.ok) {
      throw new Error(`Telegram API error: ${response.status}`);
    }
    
    console.log(`📤 Уведомление отправлено в Telegram: ${notification.type}`);
    
  } catch (error) {
    console.error('❌ Ошибка отправки в Telegram:', error);
    
    // Fallback - сохраняем в localStorage для повторной отправки
    const failedNotifications = JSON.parse(localStorage.getItem('failedTelegramNotifications') || '[]');
    failedNotifications.push({
      ...notification,
      failedAt: Date.now(),
      retryCount: 0
    });
    localStorage.setItem('failedTelegramNotifications', JSON.stringify(failedNotifications));
  }
};

// Функция для повторной отправки неудавшихся уведомлений
export const retryFailedNotifications = async () => {
  const failedNotifications = JSON.parse(localStorage.getItem('failedTelegramNotifications') || '[]');
  
  if (failedNotifications.length === 0) return;
  
  const successfulRetries: number[] = [];
  
  for (let i = 0; i < failedNotifications.length; i++) {
    const notification = failedNotifications[i];
    
    if (notification.retryCount < 3) { // Максимум 3 попытки
      try {
        await sendTelegramNotification({
          type: notification.type,
          data: notification.data
        });
        successfulRetries.push(i);
      } catch (error) {
        notification.retryCount++;
        console.log(`🔄 Повторная попытка ${notification.retryCount}/3 для уведомления ${notification.type}`);
      }
    }
  }
  
  // Удаляем успешно отправленные уведомления
  const remainingNotifications = failedNotifications.filter((_, index) => !successfulRetries.includes(index));
  localStorage.setItem('failedTelegramNotifications', JSON.stringify(remainingNotifications));
  
  if (successfulRetries.length > 0) {
    console.log(`✅ Повторно отправлено ${successfulRetries.length} уведомлений`);
  }
};

// Определение типа устройства
export const getDeviceInfo = () => {
  const userAgent = navigator.userAgent;
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
  
  let deviceType = 'Desktop';
  if (/iPad/i.test(userAgent)) deviceType = 'iPad';
  else if (/iPhone/i.test(userAgent)) deviceType = 'iPhone';
  else if (/Android/i.test(userAgent)) deviceType = 'Android';
  else if (isMobile) deviceType = 'Mobile';
  
  return {
    isMobile,
    deviceType,
    userAgent: userAgent.substring(0, 100) // Обрезаем для краткости
  };
};