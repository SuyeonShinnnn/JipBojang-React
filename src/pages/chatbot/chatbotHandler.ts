import type { Message } from './useChatbot';
import {
  SERVICE_GUIDE_END,
  SERVICE_GUIDE_INTRO,
  SERVICE_GUIDE_ITEMS,
} from '../../constants/chatbot/chatbotMessages';

export const getServiceGuideMessages = (): Message[] => {
  return [SERVICE_GUIDE_INTRO, ...SERVICE_GUIDE_ITEMS, SERVICE_GUIDE_END].map(
    (item) => ({
      role: 'bot' as const,
      text: item,
    }),
  );
};
