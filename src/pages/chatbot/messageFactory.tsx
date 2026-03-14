import type { Message } from './useChatbot';
import ChecklistMessage from './components/ChecklistMessage';

export const createChecklistMessage = (): Message => {
  return {
    role: 'bot',
    component: <ChecklistMessage />,
  };
};
